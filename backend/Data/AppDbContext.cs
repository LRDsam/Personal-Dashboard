using Microsoft.EntityFrameworkCore;
using PersonalDashboard.Models;

namespace PersonalDashboard.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Habit> Habits { get; set; }
        public DbSet<HabitCompletionDate> HabitCompletionDates { get; set; }
    }
}