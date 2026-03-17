namespace PersonalDashboard.Models
{
    public class Habit
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<HabitCompletionDate> CompletionDates { get; set; } = new();
    }
}