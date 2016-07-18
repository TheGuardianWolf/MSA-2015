using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    public class Test
    {
        public int ID { get; set; }
        public int CourseID { get; set; }
        public string Name { get; set; }
        public DateTime CompletionDate { get; set; }
        public int Weighting { get; set; }
        public int MaxMark { get; set; }

        [JsonIgnore]
        public virtual Course Course { get; set; }
    }
}
