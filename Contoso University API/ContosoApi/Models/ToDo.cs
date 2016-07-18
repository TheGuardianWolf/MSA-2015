using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    public class ToDo
    {
        public int ID { get; set; }
        public int StudentID { get; set; }
        public string Description { get; set; }
        public bool Complete { get; set; }

        [JsonIgnore]
        public virtual Student Student { get; set; }
    }
}
