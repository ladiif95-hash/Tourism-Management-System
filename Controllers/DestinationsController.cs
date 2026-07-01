using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Management_system.Data;
using Tourism_Management_system.Model;

namespace Tourism_Management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public DestinationsController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destinations>>> GetDestinations()
        {
            return await _context.Destinations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Destinations>> GetDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);

            if (destination == null)
            {
                return NotFound();
            }

            return destination;
        }

        [HttpPost]
        public async Task<ActionResult<Destinations>> PostDestination(Destinations destination)
        {
            if (await DestinationDuplicateExists(destination))
            {
                return BadRequest("A destination with the same name and location already exists.");
            }

            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDestination), new { id = destination.DestinationId }, destination);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDestination(int id, Destinations destination)
        {
            if (id != destination.DestinationId)
            {
                return BadRequest();
            }

            if (await DestinationDuplicateExists(destination, id))
            {
                return BadRequest("A destination with the same name and location already exists.");
            }

            _context.Entry(destination).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await DestinationExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);

            if (destination == null)
            {
                return NotFound();
            }

            var bookings = await _context.Bookings.Where(booking => booking.DestinationId == id).ToListAsync();
            var hotels = await _context.Hotels.Where(hotel => hotel.DestinationId == id).ToListAsync();

            _context.Bookings.RemoveRange(bookings);
            _context.Hotels.RemoveRange(hotels);
            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> DestinationExists(int id)
        {
            return await _context.Destinations.AnyAsync(destination => destination.DestinationId == id);
        }

        private async Task<bool> DestinationDuplicateExists(Destinations destination, int? currentId = null)
        {
            return await _context.Destinations.AnyAsync(existing =>
                existing.DestinationId != currentId &&
                existing.DestinationName == destination.DestinationName &&
                existing.Location == destination.Location);
        }
    }
}
