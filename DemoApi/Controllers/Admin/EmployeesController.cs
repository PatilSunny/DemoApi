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
using DemoApi.Edmx;
using DemoApi.Models;

namespace DemoApi.Controllers.Admin
{
    public class EmployeesController : ApiController
    {
        private Emp_mgtEntities db = new Emp_mgtEntities();
        private Return_Load rtn = new Return_Load();

        // GET: api/Employees
        [HttpGet]
        public IHttpActionResult Records()
        {
            rtn.status = 1;

            try
            {
                rtn.data = db.tblEmployees.AsNoTracking()
                    .ToList();
            }
            catch (Exception ex)
            {
                rtn.status = 0;
                rtn.error = DemoFunctions.GetException(ex);
                return Ok(rtn);
            }

            return Ok(rtn);
        }

        // GET: api/Employees/5
        [HttpGet]
        public IHttpActionResult Record(int id)
        {
            rtn.status = 1;

            try
            {
                rtn.data = db.tblEmployees.AsNoTracking()
                    .Where(w => w.EmployeeId == id)
                    .SingleOrDefault();

                if (rtn.data == null)
                {
                    rtn.status = 0;
                    rtn.error = new Errors
                    {
                        error_code = 404,
                        error = "Record Not Found."
                    };
                    return Ok(rtn);
                }

            }
            catch (Exception ex)
            {
                rtn.status = 0;
                rtn.error = DemoFunctions.GetException(ex);
                return Ok(rtn);
            }

            return Ok(rtn);
        }

        // PUT: api/Employees/5
        [HttpPut]
        public IHttpActionResult Put (int id, tblEmployee tblEmployee)
        {
            rtn.status = 1;

            if (!ModelState.IsValid)
            {
                rtn.status = 0;
                rtn.error = new Errors
                {
                    error_code = 400,
                    error = "Bad Request",
                    exception = ModelState
                };
                return Ok(rtn);
            }

            if (id != tblEmployee.EmployeeId)
            {
                rtn.status = 0;
                rtn.error = new Errors
                {
                    error_code = 400,
                    error = "Invalid Record",
                };
                return Ok(rtn);
            }

            try
            {
                var old = db.tblEmployees
                    .Where(w => w.EmployeeId == id)
                    .SingleOrDefault();
                
                if (old == null)
                {
                    rtn.status = 0;
                    rtn.error = new Errors
                    {
                        error_code = 404,
                        error = "Record Not Found."
                    };
                    return Ok(rtn);
                } 

                db.Entry(old).CurrentValues.SetValues(tblEmployee);

                db.SaveChanges();

            }
            catch (Exception ex)
            {
                rtn.status = 0;
                rtn.error = DemoFunctions.GetException(ex);
                return Ok(rtn);
            }

            return Ok(rtn);

        }

        // POST: api/Employees
        [HttpPost]
        public IHttpActionResult Post(tblEmployee tblEmployee)
        {
            rtn.status = 1;

            if (!ModelState.IsValid)
            {
                rtn.status = 0;
                rtn.error = new Errors
                {
                    error_code = 400,
                    error = "Bad Request",
                    exception = ModelState
                };
                return Ok(rtn);
            }

            try
            {
                db.tblEmployees.Add(tblEmployee);

                db.SaveChanges();

                rtn.data = tblEmployee;

            }
            catch (Exception ex)
            {
                rtn.status = 0;
                rtn.error = DemoFunctions.GetException(ex);
                return Ok(rtn);
            }

            return Ok(rtn);

        }

        // DELETE: api/Employees/5
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            rtn.status = 1;

            try
            {
                tblEmployee tblEmployee = db.tblEmployees.Find(id);

                if (tblEmployee == null)
                {
                    rtn.status = 0;
                    rtn.error = new Errors
                    {
                        error_code = 404,
                        error = "Record Not Found."
                    };
                    return Ok(rtn);
                }

                db.tblEmployees.Remove(tblEmployee);

                db.SaveChanges();

            }
            catch (Exception ex)
            {
                rtn.status = 0;
                rtn.error = DemoFunctions.GetException(ex);
                return Ok(rtn);
            }

            return Ok(rtn);

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblEmployeeExists(int id)
        {
            return db.tblEmployees.Count(e => e.EmployeeId == id) > 0;
        }


    }
}