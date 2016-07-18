using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    public class Course
    {
        public int ID { get; set; }
        public string CourseName { get; set; }
        public int Credits { get; set; }
        public string CompletionInfo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Assignment> Assignments { get; set; }

        [JsonIgnore]
        public virtual ICollection<Test> Tests { get; set; }

        [JsonIgnore]
        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}
