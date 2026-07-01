using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Management_system.Data;
using Tourism_Management_system.Model;

namespace Tourism_Management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public HotelsController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotels>>> GetHotels()
        {
            return await _context.Hotels.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotels>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            return hotel;
        }

        [HttpPost]
        public async Task<ActionResult<Hotels>> PostHotel(Hotels hotel)
        {
            if (await HotelDuplicateExists(hotel))
            {
                return BadRequest("A hotel with the same name, location, phone, and destination already exists.");
            }

            if (!await _context.Destinations.AnyAsync(destination => destination.DestinationId == hotel.DestinationId))
            {
                return BadRequest("Selected destination does not exist.");
            }

            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHotel), new { id = hotel.HotelId }, hotel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id, Hotels hotel)
        {
            if (id != hotel.HotelId)
            {
                return BadRequest();
            }

            if (await HotelDuplicateExists(hotel, id))
            {
                return BadRequest("A hotel with the same name, location, phone, and destination already exists.");
            }

            if (!await _context.Destinations.AnyAsync(destination => destination.DestinationId == hotel.DestinationId))
            {
                return BadRequest("Selected destination does not exist.");
            }

            _context.Entry(hotel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await HotelExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);

            if (hotel == null)
            {
                return NotFound();
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> HotelExists(int id)
        {
            return await _context.Hotels.AnyAsync(hotel => hotel.HotelId == id);
        }

        private async Task<bool> HotelDuplicateExists(Hotels hotel, int? currentId = null)
        {
            return await _context.Hotels.AnyAsync(existing =>
                existing.HotelId != currentId &&
                existing.HotelName == hotel.HotelName &&
                existing.Location == hotel.Location &&
                existing.Phone == hotel.Phone &&
                existing.DestinationId == hotel.DestinationId);
        }
    }
}
