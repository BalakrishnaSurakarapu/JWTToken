﻿using System.ComponentModel.DataAnnotations;

namespace JWTToken.Model
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
