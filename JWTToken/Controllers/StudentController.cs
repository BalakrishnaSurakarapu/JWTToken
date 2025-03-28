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
        [HttpGet("{id}")]
        public Student GetStudentsbyId(int id)
        {
            return repository.students.Where(n => n.Id == id).FirstOrDefault();

        }
    }
}
