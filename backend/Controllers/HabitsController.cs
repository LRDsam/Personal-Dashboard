using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalDashboard.Data;
using PersonalDashboard.Models;
using PersonalDashboard.DTOs;

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

        // GET: api/habits
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var habits = await _db.Habits
                .Include(h => h.CompletionDates)
                .ToListAsync();

            var result = habits.Select(h => new HabitDto{
                Id = h.Id,
                Name = h.Name,
                Description = h.Description,
                CompletedDates = h.CompletionDates.Select(cd => cd.Date.ToString("yyyy-MM-dd")).ToList()
            });

            return Ok(result);
        }

        // GET: api/habits/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var habit = await _db.Habits
                .Include(h => h.CompletionDates)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (habit == null) return NotFound();
            
            var reslt = new HabitDto{
                Id = habit.Id,
                Name = habit.Name,
                Description = habit.Description,
                CompletedDates = habit.CompletionDates.Select(cd => cd.Date.ToString("yyyy-MM-dd")).ToList()
            };
            
            return Ok(reslt);
        }

        // POST: api/habits
        [HttpPost]
        public async Task<IActionResult> Create(Habit habit)
        {
            _db.Habits.Add(habit);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = habit.Id }, habit);
        }

        // DELETE: api/habits/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var habit = await _db.Habits.FindAsync(id);
            if (habit == null) return NotFound();

            _db.Habits.Remove(habit);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/habits/{id}/completions
        [HttpPost("{id}/completions")]
        public async Task<IActionResult> AddCompletion(int id, [FromBody] string dateStr)
        {
            if (!DateOnly.TryParse(dateStr, out var date))
                return BadRequest("Invalid date");

            var habit = await _db.Habits.FindAsync(id);
            if (habit == null) return NotFound();

            var existing = await _db.HabitCompletionDates.FirstOrDefaultAsync(h => h.HabitId == id && h.Date == date);
            if (existing != null) return BadRequest("Completion for this date already exists.");

            var completion = new HabitCompletionDate
            {
                Date = date,
                HabitId = id
            };

            _db.HabitCompletionDates.Add(completion);
            await _db.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/habits/{id}/completions
        [HttpDelete("{id}/completions")]
        public async Task<IActionResult> RemoveCompletion(int id, [FromBody] string dateStr)
        {
            if (!DateOnly.TryParse(dateStr, out var date))
                return BadRequest("Invalid date");

            var completion = await _db.HabitCompletionDates.FirstOrDefaultAsync(h => h.HabitId == id && h.Date == date);
            if (completion == null) return NotFound();

            _db.HabitCompletionDates.Remove(completion);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}