using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalDashboard.Data;
using PersonalDashboard.Models;

namespace PersonalDashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HabitsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public HabitsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var habits = await _db.Habits
                .Include(h => h.CompletionDates)
                .ToListAsync();
            return Ok(habits);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var habit = await _db.Habits
                .Include(h => h.CompletionDates)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (habit == null) return NotFound();
            return Ok(habit);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Habit habit)
        {
            _db.Habits.Add(habit);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = habit.Id }, habit);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var habit = await _db.Habits.FindAsync(id);
            if (habit == null) return NotFound();

            _db.Habits.Remove(habit);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}