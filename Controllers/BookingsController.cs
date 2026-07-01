using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Management_system.Data;
using Tourism_Management_system.Model;

namespace Tourism_Management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public BookingsController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookings>>> GetBookings()
        {
            return await _context.Bookings.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bookings>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        [HttpPost]
        public async Task<ActionResult<Bookings>> PostBooking(Bookings booking)
        {
            if (await BookingDuplicateExists(booking))
            {
                return BadRequest("This tourist already has a booking for the same destination on this date.");
            }

            if (!await RelatedRecordsExist(booking))
            {
                return BadRequest("Selected tourist or destination does not exist.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Bookings booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            if (await BookingDuplicateExists(booking, id))
            {
                return BadRequest("This tourist already has a booking for the same destination on this date.");
            }

            if (!await RelatedRecordsExist(booking))
            {
                return BadRequest("Selected tourist or destination does not exist.");
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BookingExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> BookingExists(int id)
        {
            return await _context.Bookings.AnyAsync(booking => booking.BookingId == id);
        }

        private async Task<bool> BookingDuplicateExists(Bookings booking, int? currentId = null)
        {
            return await _context.Bookings.AnyAsync(existing =>
                existing.BookingId != currentId &&
                existing.TouristId == booking.TouristId &&
                existing.DestinationId == booking.DestinationId &&
                existing.BookingDate.Date == booking.BookingDate.Date);
        }

        private async Task<bool> RelatedRecordsExist(Bookings booking)
        {
            return await _context.Tourists.AnyAsync(tourist => tourist.TouristId == booking.TouristId) &&
                await _context.Destinations.AnyAsync(destination => destination.DestinationId == booking.DestinationId);
        }
    }
}
