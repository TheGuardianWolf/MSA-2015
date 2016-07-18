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
    public class ToDosController : ApiController
    {
        private ContosoApiContext db = new ContosoApiContext();

        // GET: api/ToDos
        public IQueryable<ToDo> GetToDoes()
        {
            return db.ToDoes;
        }

        // GET: api/ToDos/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult GetToDo(int id)
        {
            ToDo toDo = db.ToDoes.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            return Ok(toDo);
        }

        // PUT: api/ToDos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDo(int id, ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDo.ID)
            {
                return BadRequest();
            }

            db.Entry(toDo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoExists(id))
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

        // POST: api/ToDos
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult PostToDo(ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDoes.Add(toDo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDo.ID }, toDo);
        }

        // DELETE: api/ToDos/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult DeleteToDo(int id)
        {
            ToDo toDo = db.ToDoes.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            db.ToDoes.Remove(toDo);
            db.SaveChanges();

            return Ok(toDo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoExists(int id)
        {
            return db.ToDoes.Count(e => e.ID == id) > 0;
        }
    }
}