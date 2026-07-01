using Microsoft.EntityFrameworkCore;
using Tourism_Management_system.Model;

namespace Tourism_Management_system.Data
{
    public class TourismDbContext : DbContext
    {
        public TourismDbContext(DbContextOptions<TourismDbContext> options) : base(options)
        {
        }

        public DbSet<Tourists> Tourists { get; set; }
        public DbSet<Destinations> Destinations { get; set; }
        public DbSet<Hotels> Hotels { get; set; }
        public DbSet<Bookings> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Destinations>()
                .HasMany(destination => destination.Hotels)
                .WithOne()
                .HasForeignKey(hotel => hotel.DestinationId);

            modelBuilder.Entity<Destinations>()
                .HasMany(destination => destination.Bookings)
                .WithOne()
                .HasForeignKey(booking => booking.DestinationId);

            modelBuilder.Entity<Tourists>()
                .HasMany(tourist => tourist.Bookings)
                .WithOne()
                .HasForeignKey(booking => booking.TouristId);
        }
    }
}
