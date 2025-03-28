using JWTToken.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace JWTToken.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        [Route("GetStudents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<Student>> GetStudents()
        {
           // var students = new List<StudentDTO>();

            //foreach (var student in repository.students)
            //{
            //    StudentDTO studentDTO = new StudentDTO
            //    {
            //        Id = student.Id,
            //        Name = student.Name,
            //        Email = student.Email,
            //        Address = student.Address
            //    };
            //    students.Add(studentDTO);
            //}
            //return Ok(students);

            var students = repository.students.Select(s => new StudentDTO
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Address = s.Address
            });
            return Ok(students);

            // return Ok(repository.students);

        }
        [HttpGet]
        [Route("{id:int}",Name= "GetById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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

        [HttpPost]
        [Route("AddStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<StudentDTO> AddStudent([FromBody] StudentDTO model)
        {
            //if (!ModelState.IsValid)
            
            //    return BadRequest();
            
            if (model==null)
            
                return BadRequest();
            
          //  int newid = repository.students.Max(n => n.Id) + 1; 
            int id = repository.students.LastOrDefault().Id + 1;
            Student student = new Student {
                Id = id,
                Address = model.Address, 
                Email = model.Email, 
                Name = model.Name 
            };
            repository.students.Add(student);
            model.Id = id;
            //return Ok(model.Id);
            //status:201 created
            return CreatedAtRoute("GetById", new { id = model.Id }, model);

        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<StudentDTO> UpdateStudent(int id, [FromBody] StudentDTO model)
        {
            if (model==null ||model.Id <= 0)
                return BadRequest();
      
            var existingstudent = repository.students.Where(s => s.Id == id).FirstOrDefault();
            if (model == null)
            return NotFound($"the student id {id} not found");
            
            existingstudent.Id = model.Id;
            existingstudent.Name = model.Name;
            existingstudent.Email = model.Email;
            existingstudent.Address = model.Address;
            return NoContent();
        }
        [HttpPatch]
        [Route("{id:int}/updatePartial")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult UpdatePartial(int id, [FromBody] JsonPatchDocument<StudentDTO> patchDocument)
        {
            if (patchDocument == null || id<=0)
                return BadRequest();

            var existingstudent = repository.students.Where(s => s.Id == id).FirstOrDefault();
            if (existingstudent == null)
                return NotFound($"the student id {id} not found");

            var studentDTO = new StudentDTO
                {
                    Id = existingstudent.Id,
                    Name = existingstudent.Name,
                    Email = existingstudent.Email,
                    Address = existingstudent.Address
                };
            patchDocument.ApplyTo(studentDTO, ModelState);
            if(ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            existingstudent.Id = studentDTO.Id;
            existingstudent.Name = studentDTO.Name;
            existingstudent.Email = studentDTO.Email;
            existingstudent.Address = studentDTO.Address;
            //204 nocontent
            return NoContent();
        }
    }
}
