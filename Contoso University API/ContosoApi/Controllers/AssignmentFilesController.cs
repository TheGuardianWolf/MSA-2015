using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ContosoApi.Models;

namespace ContosoApi.Controllers
{
    [Authorize]
    public class AssignmentFilesController : ApiController
    {
        private ContosoApiContext db = new ContosoApiContext();

        // GET: api/AssignmentFiles
        public IQueryable<AssignmentFile> GetAssignmentFiles()
        {
            return db.AssignmentFiles;
        }

        // GET: api/AssignmentFiles/5
        [ResponseType(typeof(AssignmentFile))]
        public IHttpActionResult GetAssignmentFile(int id)
        {
            AssignmentFile assignmentFile = db.AssignmentFiles.Find(id);
            if (assignmentFile == null)
            {
                return NotFound();
            }

            return Ok(assignmentFile);
        }

        // PUT: api/AssignmentFiles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssignmentFile(int id, AssignmentFile assignmentFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assignmentFile.ID)
            {
                return BadRequest();
            }

            db.Entry(assignmentFile).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentFileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AssignmentFiles
        [ResponseType(typeof(AssignmentFile))]
        public IHttpActionResult PostAssignmentFile(AssignmentFile assignmentFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AssignmentFiles.Add(assignmentFile);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assignmentFile.ID }, assignmentFile);
        }

        // DELETE: api/AssignmentFiles/5
        [ResponseType(typeof(AssignmentFile))]
        public IHttpActionResult DeleteAssignmentFile(int id)
        {
            AssignmentFile assignmentFile = db.AssignmentFiles.Find(id);
            if (assignmentFile == null)
            {
                return NotFound();
            }

            db.AssignmentFiles.Remove(assignmentFile);
            db.SaveChanges();

            return Ok(assignmentFile);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentFileExists(int id)
        {
            return db.AssignmentFiles.Count(e => e.ID == id) > 0;
        }
    }
}