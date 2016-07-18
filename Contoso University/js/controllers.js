contoso.controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.state = {
    loading : false,
    authenticated : false,
    sidebarCompact : true,
    ajaxBusy : false,
  };
  $scope.counters = {
    tasks : 0,
    courses : 0,
  };

  if ($scope.state.authenticated === false) {
    $location.url('');
  }

  $scope.parseDate = function(dateString) {
    return Date.parse(dateString).toString("dddd, MMMM dd, yyyy h:mm:ss tt");
  };

  $scope.toggleSidebar = function () {
    if ($scope.state.sidebarCompact) {
      $scope.state.sidebarCompact = false;
    }
    else {
      $scope.state.sidebarCompact = true;
    }
  };

  $scope.requests = function(type, route, data) {
    if (data === undefined) {
      data = $.param('');
    }
    var request = $http({
      method: type,
      url: 'https://university-contoso-api.azurewebsites.net/api/' + route.split('.').join('/'),
      headers: {
        'Authorization' : Cache.auth.header,
        'Accept' : 'application/json',
      },
      'data': data
    });
    return request;
  };
}]);

contoso.controller('authController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  var requestData = function() {
    var request = $scope.requests('GET', 'Enrollments');
    request.then(function successCallback(response) {
      if (response.data.length > 0) {
        var relevantEnrollments = [];
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].StudentID === Cache.user.ID) {
            relevantEnrollments.push(response.data[i]);
            Cache.enrolledCourseIDs.push(response.data[i].CourseID);
          }
        }
        Cache.enrollments = relevantEnrollments;
      }
      return $scope.requests('GET', 'Courses')
      .then(function successCallback(response) {
        if (response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            if (Cache.enrolledCourseIDs.indexOf(response.data[i].ID) > -1) {
              Cache.enrolledCourses.push(response.data[i]);
            }
            else {
              Cache.freeCourses.push(response.data[i]);
            }
          }
          Cache.courses = copy(response.data);
        }
        return $scope.requests('GET', 'Tests')
        .then(function successCallback(response) {
          if (response.data.length > 0) {
            Cache.tests = copy(response.data);
          }
          return $scope.requests('GET', 'Assignments')
          .then(function successCallback(response) {
            if (response.data.length > 0) {
              Cache.assignments = copy(response.data);
            }
            return $scope.requests('GET', 'AssignmentFiles')
            .then(function successCallback(response) {
              if (response.data.length > 0) {
                for (var i = 0; i< response.data.length; i++) {
                  if (response.data[i].StudentID === Cache.user.ID) {
                    Cache.assignments[response.data[i].AssignmentID] = {};
                    Cache.assignments[response.data[i].AssignmentID].link = response.data[i];
                  }
                }
                Cache.assignmentFiles = relevantFiles;
              }
              return $scope.requests('GET', 'ToDos')
              .then(function successCallback(response) {
                if (response.data.length > 0) {
                  for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].StudentID === Cache.user.ID) {
                      Cache.toDos.push(response.data[i]);
                    }
                  }
                }
                $scope.state.authenticated = true;
                $scope.counters.tasks = Cache.toDos.length;
                $scope.counters.courses = Cache.enrolledCourses.length;
                $location.url('overview');
                $scope.state.loading = false;
              }, function errorCallback(response) {
                console.log(response);
                alert(error);
              });
            }, function errorCallback(response) {
              console.log(response);
              alert(error);
              $scope.state.loading = false;
            });
          }, function errorCallback(response) {
            console.log(response);
            alert(error);
            $scope.state.loading = false;
          });
        }, function errorCallback(response) {
          console.log(response);
          alert(error);
          $scope.state.loading = false;
        });
      }, function errorCallback(response) {
        console.log(response);
        alert(error);
        $scope.state.loading = false;
      });
    }, function errorCallback(response) {
      console.log(response);
      alert(error);
      $scope.state.loading = false;
    });
    return request;
  };

  $scope.login = {
    show: true,
    data : {
      "Email" : "",
      "Password" : "",
    },
    submit : function() {
      if ($scope.state.ajaxBusy) {

        return false;
      }
      $http({
        method: 'POST',
        url: 'https://university-contoso-api.azurewebsites.net/Token',
        data: $.param({
          grant_type : 'password',
          username : $scope.login.data.Email,
          password : $scope.login.data.Password,
        })
      }).then(function successCallback(response) {
        $scope.state.loading = true;
        Cache.auth = response;
        Cache.auth.header = 'Bearer ' + response.data.access_token;
        $scope.requests('GET', 'Account.UserInfo')
        .then(function successCallback(response) {
          Cache.userAccount = response.data;
          return $scope.requests('GET', 'Students');
        }, function errorCallback(response) {
          $.Notify({
            caption: 'Error',
            content: 'Cannot retrieve remote data.',
            type: 'alert'
          });
        })
        .then(function successCallback(response) {
          if (response.data.length > 0) {
            var foundUser = false;
            for (var i=0; i < response.data.length; i++) {
              if (Cache.userAccount.ID === response.data[i].AuthID) {
                Cache.user = response.data[i];
                foundUser = true;
                break;
              }
            }
            if (!foundUser) {
              $.Notify({
                caption: 'Warning',
                content: 'You seem to be not registered but have a valid identity token, please try signing up again.',
                type: 'warning'
              });
            }
            else {
              requestData().then(function successCallback(response) {
              }, function errorCallback(response) {
                console.log(response);
                $.Notify({
                  caption: 'Error',
                  content: 'Cannot retrieve remote data.',
                  type: 'alert'
                });
                $scope.state.loading = false;
              });
            }
          }
        }, function errorCallback(response) {
          console.log(response);
          $.Notify({
            caption: 'Cannot log in',
            content: 'Credentials invalid.',
            type: 'alert'
          });
          $scope.state.loading = false;
        });
      }, function errorCallback(response) {
        console.log(response);
        $.Notify({
          caption: 'Cannot log in',
          content: 'Credentials invalid.',
          type: 'alert'
        });
        $scope.state.loading = false;
      });
    }
  };

  $scope.signup = {
    data : {
      "Email" : "",
      "Password" : "",
      "ConfirmPassword" : "",
      "FirstName" : "",
      "LastName" : "",
    },
    submit : function() {
      console.log($scope.signup.data);
      if ($scope.state.ajaxBusy) {
        return false;
      }
      if ($scope.signup.data.Password === $scope.signup.data.ConfirmPassword) {
        $scope.state.ajaxBusy = true;
        $http({
          method: 'POST',
          url: 'https://university-contoso-api.azurewebsites.net/api/Account/Register',
          data: {
            "Email": $scope.signup.data.Email,
            "Password": $scope.signup.data.Password,
            "ConfirmPassword": $scope.signup.data.ConfirmPassword}
        })
        .then(function successCallback(response) {
          return $http({
            method: 'POST',
            url: 'https://university-contoso-api.azurewebsites.net/Token',
            data: $.param({
              grant_type : 'password',
              username : $scope.signup.data.Email,
              password : $scope.signup.data.Password,
            })
          });
        }, function(error) {
          $.Notify({
            caption: 'Error',
            content: 'Unable to process auth',
            type: 'alert'
          });
        })
        .then(function(response) {
          Cache.auth = response;
          Cache.auth.header = 'Bearer ' + response.data.access_token;
          return $scope.requests('GET', 'Account.UserInfo');
        }, function(error) {

        })
        .then(function(response) {
          Cache.userAccount = response.data;
          return $http({
            method: 'POST',
            url: 'https://university-contoso-api.azurewebsites.net/api/Students',
            data: {
              "ID": 0,
              "AuthID": Cache.userAccount.ID,
              "FirstName": $scope.signup.data.FirstName,
              "LastName": $scope.signup.data.LastName,
              "EnrollmentDate": new Date().toMysqlFormat(),}
          });
        }, function(error) {
          $.Notify({
            caption: 'Error',
            content: 'Unable to process auth',
            type: 'alert'
          });
        })
        .then(function(response) {
          $scope.state.ajaxBusy = false;
          $scope.login.show = true;
          $.Notify({
            caption: 'Registered',
            content: 'Please log in now.',
            type: 'success'
          });
        }, function(error) {
          $.Notify({
            caption: 'Error',
            content: 'Unable to process registration',
            type: 'alert'
          });
        });
      }
      else {
        $.Notify({
        caption: 'Error',
        content: 'Passwords do not match.',
        type: 'alert'
        });
      }
    }
  };
}]);

contoso.controller('overviewController', ['$scope', function($scope) {
  $scope.nextCoursework = { };
  $scope.taskList = Cache.toDos;
  $scope.courseList = Cache.enrolledCourses;

  $scope.getGrade = function(courseID) {
    var grade;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        thisCourseEnrollment = Cache.enrollments[i];
        grade = thisCourseEnrollment.Grade;
      }
    }
    if (!grade) {
      return 'Not Graded';
    }
    else {
      switch (parseInt(grade)) {
        case 0:
          return 'A';
        case 1:
          return 'B';
        case 2:
          return 'C';
        case 3:
          return 'D';
        case 4:
          return 'F';
        default:
          return 'Not Graded';
      }
    }
  };

  $scope.getPercentComplete = function (courseID){
    var thisCourseEnrollment;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        thisCourseEnrollment = Cache.enrollments[i];
        return thisCourseEnrollment.PercentComplete;
      }
    }
  };

}]);

contoso.controller('coursesController', ['$scope', function($scope) {
  var i;
  //build actions
  $scope.courses = Cache.courses;
  $scope.enrolledCourses = Cache.enrolledCourses;
  $scope.freeCourses = Cache.freeCourses;
  $scope.courseAssignments = {};
  $scope.courseTests = {};

  $scope.getPercentComplete = function (courseID){
    var thisCourseEnrollment;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        thisCourseEnrollment = Cache.enrollments[i];
        return thisCourseEnrollment.PercentComplete;
      }
    }
  };

  $scope.getCompletionInfo = function (courseID){
    var thisCourseEnrollment;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        thisCourseEnrollment = Cache.enrollments[i];
        return thisCourseEnrollment.CompletionInfo;
      }
    }
  };

  $scope.onClickChange = function(courseID) {
    $scope.changeCourse.courseID = courseID;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        $scope.changeCourse.enrollmentID = Cache.enrollments[i].ID;
        break;
      }
    }
    var dialog = $('#changeCourse').data('dialog');
    dialog.open();
  };

  $scope.changeCourse = {
    go : function() {
      if (!$scope.state.ajaxBusy) {
        $scope.state.ajaxBusy = true;
        var dialog = $('#changeCourse').data('dialog');
        var courseID = $scope.changeCourse.courseID;
        dialog.close();
        console.log($scope.changeCourse);
        var data = {
          "ID": $scope.changeCourse.enrollmentID,
          "CourseID": courseID,
          "StudentID": Cache.user.ID,
          "PercentComplete": $scope.changeCourse.completion,
          "Grade": $scope.changeCourse.grade
        };
        console.log(data.ID.toString());
        $scope.requests('PUT','Enrollments.' + data.ID.toString(), data).then(function(response) {
          console.log(response);
          var i;
          var updatedEnrollment = response.data;
          for (i = 0; i < Cache.enrollments.length; i++) {
            if (Cache.enrollments[i].CourseID === courseID) {
              Cache.enrollments[i].PercentComplete = $scope.changeCourse.completion;
              Cache.enrollments[i].Grade = $scope.changeCourse.grade;
              break;
            }
          }
          $scope.state.ajaxBusy = false;
          $.Notify({
            caption: 'Update complete',
            content: 'Course has been changed',
            type: 'success'
          });
        }, function(error) {
          $scope.state.ajaxBusy = false;
          console.log(error);
          $.Notify({
            caption: 'Error',
            content: 'An error has occured.',
            type: 'alert'
          });
        });
      }
      else {
        $.Notify({
          caption: 'Busy',
          content: 'Updating enrollments.',
          type: 'warning'
        });
      }
    },
    enrollmentID : 0,
    courseID : 0,
    grade : "",
    completion : 0,
  };



  $scope.dropCourse = function(courseID) {
    if (!$scope.state.ajaxBusy) {
      $scope.state.ajaxBusy = true;
      $.Notify({
        caption: 'Removing course',
        content: 'Please wait while the course is removed from your enrollments.',
        type: 'info'
      });
      var thisCourseEnrollment;
      var enrollmentIndex;
      for (var i = 0; i < Cache.enrollments.length; i++) {
        if (Cache.enrollments[i].CourseID === courseID) {
          enrollmentIndex = i;
          thisCourseEnrollment = Cache.enrollments[i];
        }
      }
      $scope.requests('DELETE', 'Enrollments.' + thisCourseEnrollment.ID).then(function successCallback(response) {
        $.Notify({
          caption: 'Update complete',
          content: 'Course has been removed.',
          type: 'Success'
        });
        $scope.state.ajaxBusy = false;
        var deletedCourse;

        for (var i = 0; i < $scope.enrolledCourses.length; i++) {
          if ($scope.enrolledCourses[i].ID === courseID) {
            deletedCourse = $scope.enrolledCourses[i];
            $scope.enrolledCourses.splice(i,1);
          }
        }
        $scope.freeCourses.push(deletedCourse);
        Cache.enrollments.splice(enrollmentIndex,1);
        Cache.enrolledCourseIDs.splice(Cache.enrolledCourseIDs.indexOf(courseID));
        $scope.counters.courses = Cache.enrolledCourses.length;
      }, function errorCallback(response) {
        $scope.state.ajaxBusy = false;
        $.Notify({
          caption: 'Error',
          content: 'An error has occured.',
          type: 'Alert'
        });
      });
    }
    else {
      $.Notify({
        caption: 'Busy',
        content: 'Updating enrollments.',
        type: 'warning'
      });
    }

  };

  $scope.enrollCourse = function(courseID) {
    if (!$scope.state.ajaxBusy) {
      $scope.state.ajaxBusy = true;
      $.Notify({
        caption: 'Enrolling in course',
        content: 'Please wait while the course is added to your enrollments.',
        type: 'info'
      });
      var thisCourseEnrollment = {
        "ID": 0,
        "CourseID": courseID,
        "StudentID": Cache.user.ID,
        "PercentComplete": "0",
        "Grade": undefined,
      };
      $scope.requests('POST', 'Enrollments', thisCourseEnrollment)
      .then(function successCallback(response) {
        $.Notify({
          caption: 'Update complete',
          content: 'Course has been added.',
          type: 'Success'
        });
        var newEnrollment = response.data;
        $scope.requests('GET', 'Enrollments')
        .then(function successCallback(response) {
          for (var i = 0; i < Cache.courses.length; i++) {
            if (Cache.courses[i].ID === courseID) {
              $scope.enrolledCourses.push(Cache.courses[i]);
              break;
            }
          }
          for (var j = 0; j < Cache.freeCourses.length; j++) {
            if (Cache.freeCourses[j].ID === courseID) {
              Cache.freeCourses.splice(j,1);
              break;
            }
          }
          Cache.enrollments.push(newEnrollment);
          Cache.enrolledCourseIDs.push(newEnrollment.courseID);
          $scope.counters.courses = Cache.enrolledCourses.length;
        },
        function errorCallback(response) {
          $scope.state.ajaxBusy = false;
          $.Notify({
            caption: 'Error',
            content: 'An error has occured.',
            type: 'Alert'
          });
        });
        $scope.state.ajaxBusy = false;
      }, function errorCallback(response) {
        $scope.state.ajaxBusy = false;
        $.Notify({
          caption: 'Error',
          content: 'An error has occured.',
          type: 'Alert'
        });
      });
    }
    else {
      $.Notify({
        caption: 'Busy',
        content: 'Updating enrollments.',
        type: 'warning'
      });
    }

  };

  $scope.getGrade = function(courseID) {
    var grade;
    for (var i = 0; i < Cache.enrollments.length; i++) {
      if (Cache.enrollments[i].CourseID === courseID) {
        thisCourseEnrollment = Cache.enrollments[i];
        grade = thisCourseEnrollment.Grade;
      }
    }
    if (!grade) {
      return 'Not Graded';
    }
    else {
      switch (parseInt(grade)) {
        case 0:
          return 'A';
        case 1:
          return 'B';
        case 2:
          return 'C';
        case 3:
          return 'D';
        case 4:
          return 'F';
        default:
          return 'Not Graded';
      }
    }
  };

  $scope.hasCoursework = function(courseID, completionText) {
    if (!$scope.courseAssignments[courseID] && !$scope.courseTests[courseID] && !completionText) {
      return false;
    }
    return true;
  };

  for (i = 0; i < Cache.assignments.length; i++) {
    if ($scope.courseAssignments[Cache.assignments[i].CourseID] === undefined) {
      $scope.courseAssignments[Cache.assignments[i].CourseID] = [];
    }
    $scope.courseAssignments[Cache.assignments[i].CourseID].push(Cache.assignments[i]);
  }

  for (i = 0; i < Cache.tests.length; i++) {
    if ($scope.courseTests[Cache.tests[i].CourseID] === undefined) {
      $scope.courseTests[Cache.tests[i].CourseID] = [];
    }
    $scope.courseTests[Cache.tests[i].CourseID].push(Cache.tests[i]);
  }
}]);

contoso.controller('tasksController', ['$scope', function($scope) {
  $scope.toDos = Cache.toDos;

  //$scope.requests =

}]);

contoso.controller('discussionController', ['$scope', function($scope) {
  var contosoChatHubProxy = $.connection.contosoChatHub;
  contosoChatHubProxy.client.addContosoChatMessageToPage = function (name, message) {
      console.log(userName + ' ' + message);
  };
  $.connection.hub.start()
  .done(function(){ console.log('Now connected, connection ID=' + $.connection.hub.id); })
  .fail(function(){ console.log('Could not Connect!'); });
}]);
