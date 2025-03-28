namespace JWTToken.Model
{
    public static class repository
    {
        public static List<Student> students { get; set; } = new List<Student>()
        {
            new Student
                {
                    Id = 1,
                    StudentName = "John",
                    Email = "john@gmail.com",
                    Address = "USA"
                },
                new Student
                {
                    Id = 2,
                    StudentName = "balu",
                    Email = "balu@gmail.com",
                    Address = "Canada"
                },
                 new Student
                {
                    Id = 3,
                    StudentName = "Jane",
                    Email = "jane@gmail.com",
                    Address = "Canada"
                }
        };
    }
}
