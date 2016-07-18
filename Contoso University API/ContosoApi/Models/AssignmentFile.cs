using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    public class AssignmentFile
    {
        public int ID { get; set; }
        public int StudentID { get; set; }
        public int AssignmentID { get; set; }
        public string Link { get; set; }

        [JsonIgnore]
        public virtual Student Student { get; set; }

        [JsonIgnore]
        public virtual Assignment Assignment { get; set; }
    }
}
