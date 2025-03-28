using JWTToken.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWTToken.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        [Route("GetStudents")]
        public ActionResult<IEnumerable<Student>> GetStudents()
        {
            return repository.students;

        }
        [HttpGet("{id:int}")]
        public ActionResult<Student> GetStudentsbyId(int id)
        {   //bad request --400 error client error
            if(id <= 0)
            {
                return BadRequest();
            }
            var student = repository.students.Where(n => n.Id == id).FirstOrDefault();
            //not found --404 error client error
            if (student == null)
            {
                return NotFound($"the student id {id} not found");
            }
            //200 success
            return Ok(student);

        }
        [HttpGet("{name:alpha}")]
        public ActionResult<Student> GetStudentsbyname(string name)
        {
            //400 error client error
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest();
            }
            var student = repository.students.Where(n => n.Name == name).FirstOrDefault();
            //404 error client error
            if (student == null)
            {
                return NotFound($"the student name {name} not found");
            }
            //200 success
            return Ok(student);

        }
        [HttpDelete("{id}")]
        public ActionResult<bool> delete(int id)
        {
            //400 error client error
            if (id <= 0)
            {
                return BadRequest();
            }
            var student = repository.students.Where(n => n.Id == id).FirstOrDefault();
            //404 error client error
            if (student == null)
            {
                return NotFound($"the student id {id} not found");
            }
            repository.students.Remove(student);
            //200 success
            return Ok(true);

        }
        [HttpDelete("{name:alpha}")]
        public ActionResult<Student> delete(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest();
            }
            var student = repository.students.Where(n => n.Name == name).FirstOrDefault();
            if (student == null)
            {
                return NotFound($"the student name {name} not found");
            }
            repository.students.Remove(student);
            return Ok(student);

        }

    }
}
