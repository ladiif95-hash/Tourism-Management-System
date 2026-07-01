using System.ComponentModel.DataAnnotations;

namespace Tourism_Management_system.Model
{
    public class Bookings
    {
        [Key]
        public int BookingId { get; set; }

        [Range(1, int.MaxValue)]
        public int TouristId { get; set; }

        [Range(1, int.MaxValue)]
        public int DestinationId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }

        [Range(1, int.MaxValue)]
        public int NumberOfVisitors { get; set; }
    }
}
