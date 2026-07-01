using System.ComponentModel.DataAnnotations;

namespace Tourism_Management_system.Model
{
    public class Tourists
    {
        [Key]
        public int TouristId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Country { get; set; } = string.Empty;

        public ICollection<Bookings> Bookings { get; set; } = new List<Bookings>();
    }
}
