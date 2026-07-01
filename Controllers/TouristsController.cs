using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Management_system.Data;
using Tourism_Management_system.Model;

namespace Tourism_Management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TouristsController : ControllerBase
    {
        private readonly TourismDbContext _context;

        public TouristsController(TourismDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tourists>>> GetTourists()
        {
            return await _context.Tourists.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tourists>> GetTourist(int id)
        {
            var tourist = await _context.Tourists.FindAsync(id);

            if (tourist == null)
            {
                return NotFound();
            }

            return tourist;
        }

        [HttpPost]
        public async Task<ActionResult<Tourists>> PostTourist(Tourists tourist)
        {
            if (await TouristDuplicateExists(tourist))
            {
                return BadRequest("A tourist with the same email already exists.");
            }

            _context.Tourists.Add(tourist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTourist), new { id = tourist.TouristId }, tourist);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTourist(int id, Tourists tourist)
        {
            if (id != tourist.TouristId)
            {
                return BadRequest();
            }

            if (await TouristDuplicateExists(tourist, id))
            {
                return BadRequest("A tourist with the same email already exists.");
            }

            _context.Entry(tourist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await TouristExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTourist(int id)
        {
            var tourist = await _context.Tourists.FindAsync(id);

            if (tourist == null)
            {
                return NotFound();
            }

            var bookings = await _context.Bookings.Where(booking => booking.TouristId == id).ToListAsync();

            _context.Bookings.RemoveRange(bookings);
            _context.Tourists.Remove(tourist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> TouristExists(int id)
        {
            return await _context.Tourists.AnyAsync(tourist => tourist.TouristId == id);
        }

        private async Task<bool> TouristDuplicateExists(Tourists tourist, int? currentId = null)
        {
            return await _context.Tourists.AnyAsync(existing =>
                existing.TouristId != currentId &&
                existing.Email == tourist.Email);
        }
    }
}
