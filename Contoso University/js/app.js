var contoso = angular.module('contoso', [
  'ngRoute',
  'ngAria',
  'ngTouch',
  'angular-loading-bar',
  'ApplicationInsightsModule'
])
.config( [
    '$compileProvider', '$routeProvider', '$locationProvider',
    'applicationInsightsServiceProvider',
    function( $compileProvider, $routeProvider, $locationProvider, applicationInsightsServiceProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|ms-appx):/);

        var options = {applicationName:'Contoso University'};
        // Configuration options are described below
        applicationInsightsServiceProvider.configure('21f3361f-6a48-4a11-8d56-dc9c4068a103', options );

        $routeProvider
            .when('/', {
                templateUrl : 'views/auth.html',
                controller  : 'authController'
            })

            .when('/overview', {
                templateUrl : 'views/overview.html',
                controller  : 'overviewController'
            })

            .when('/tasks', {
                templateUrl : 'views/tasks.html',
                controller  : 'tasksController'
            })

            .when('/courses', {
                templateUrl : 'views/courses.html',
                controller  : 'coursesController'
            })

            .when('/discussion', {
                templateUrl : 'views/discussion.html',
                controller  : 'coursesController'
            })


            // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    }
]);
