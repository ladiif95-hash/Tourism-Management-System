using System.ComponentModel.DataAnnotations;

namespace Tourism_Management_system.Model
{
    public class Hotels
    {
        [Key]
        public int HotelId { get; set; }

        [Required]
        [MaxLength(100)]
        public string HotelName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int DestinationId { get; set; }
    }
}
