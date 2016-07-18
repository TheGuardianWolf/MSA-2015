using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ContosoApi.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    [DbConfigurationType(typeof(MySql.Data.Entity.MySqlEFConfiguration))]
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        //public class MyConfig : DbMigrationsConfiguration<ApplicationDbContext>
        //{
        //    public MyConfig()
        //    {
        //        //Enables DB Migrations
        //        this.AutomaticMigrationsEnabled = true;
        //        this.AutomaticMigrationDataLossAllowed = true;
        //    }
        //}        

        public ApplicationDbContext() : base("DefaultConnection", throwIfV1Schema: false)
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, MyConfig>());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}

// NEVER ENABLE MIGRATIONS HERE (Very bad idea)

// SQL Commands to generate Identity database tables
// create table `__MigrationHistory` (
//  `MigrationId` nvarchar(150) not null,
//  `ContextKey` nvarchar(300)  not null,
//  `Model` longblob not null,
//  `ProductVersion` nvarchar(32) not null,
//  primary key( `MigrationId`)
//) engine=InnoDb auto_increment = 0