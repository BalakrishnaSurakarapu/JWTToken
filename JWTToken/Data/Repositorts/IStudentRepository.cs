using JWTToken.Model;

namespace JWTToken.Data.Repositorts
{
    public interface IStudentRepository : ICollegeRepository<Student>
    {
        Task<List<Student>> GetStudentsByFeeStatusAsync(int feeStatus);
    }
}
