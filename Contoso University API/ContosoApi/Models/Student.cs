using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    public class Student
    {
        public int ID { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(128)]
        public string AuthID { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        [JsonIgnore]
        public virtual ICollection<Enrollment> Enrollments { get; set; }

        [JsonIgnore]
        public virtual ICollection<AssignmentFile> AssignmentFile { get; set; }

        [JsonIgnore]
        public virtual ICollection<ToDo> ToDo { get; set; }
    }
}
