using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tourism_Management_system.Model
{
    public class Destinations
    {
        [Key]
        public int DestinationId { get; set; }

        [Required]
        [MaxLength(100)]
        public string DestinationName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Description { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal EntryFee { get; set; }

        public ICollection<Hotels> Hotels { get; set; } = new List<Hotels>();
        public ICollection<Bookings> Bookings { get; set; } = new List<Bookings>();
    }
}
