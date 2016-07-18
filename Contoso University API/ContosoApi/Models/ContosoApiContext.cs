using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace ContosoApi.Models
{
    [DbConfigurationType(typeof(MySql.Data.Entity.MySqlEFConfiguration))]
    public class ContosoApiContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public class MyConfig : DbMigrationsConfiguration<ContosoApiContext>
        {
            public MyConfig()
            {
                //Enables DB Migrations
                this.AutomaticMigrationsEnabled = true;
                this.AutomaticMigrationDataLossAllowed = true;

            }
        }

        public ContosoApiContext() : base("name=ContosoApiContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ContosoApiContext, MyConfig>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Configure Code First to ignore PluralizingTableName convention 
            // If you keep this convention, the generated tables  
            // will have pluralized names. 
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public System.Data.Entity.DbSet<ContosoApi.Models.Enrollment> Enrollments { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.Course> Courses { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.Student> Students { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.Assignment> Assignments { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.AssignmentFile> AssignmentFiles { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.Test> Tests { get; set; }

        public System.Data.Entity.DbSet<ContosoApi.Models.ToDo> ToDoes { get; set; }
    }
}
