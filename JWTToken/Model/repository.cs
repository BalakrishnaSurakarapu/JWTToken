namespace JWTToken.Model
{
    public static class repository
    {
        public static List<Student> students { get; set; } = new List<Student>()
        {
            new Student
                {
                    Id = 1,
                    Name = "John",
                    Email = "john@gmail.com",
                    Address = "USA"
                },
                new Student
                {
                    Id = 2,
                    Name = "Jane",
                    Email = "jane@gmail.com",
                    Address = "Canada"
                },
                 new Student
                {
                    Id = 3,
                    Name = "Jane",
                    Email = "jane@gmail.com",
                    Address = "Canada"
                }
        };
    }
}
