using Microsoft.AspNetCore.Mvc;
using PersonalDashboard.Models;

namespace PersonalDashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HabitsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(new List<Habit>());
        }
    }
}