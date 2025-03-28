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
        public IEnumerable<Student> GetStudents()
        {
            return repository.students;

        }
        [HttpGet("{id:int}")]
        public Student GetStudentsbyId(int id)
        {
            return repository.students.Where(n => n.Id == id).FirstOrDefault();

        }
        [HttpGet("{name:alpha}")]
        public Student GetStudentsbyname(string name)
        {
            return repository.students.Where(n => n.Name == name).FirstOrDefault();

        }
        [HttpDelete("{id}")]
        public Student delete(int id)
        {
             if(repository.students.Remove(repository.students.Where(n => n.Id == id).FirstOrDefault()))
            {
                return repository.students.Where(n => n.Id == id).FirstOrDefault();
            }
            else
            {
                return null;
            }

        }
        [HttpDelete("{name:alpha}")]
        public Student delete(string name)
        {
            if (repository.students.Remove(repository.students.Where(n => n.Name == name).FirstOrDefault()))
            {
                return repository.students.Where(n => n.Name == name).FirstOrDefault();
            }
            else
            {
                return null;
            }

        }

    }
}
