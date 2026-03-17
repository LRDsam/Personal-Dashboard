namespace PersonalDashboard.Models
{
    public class HabitCompletionDate
    {
      public int Id { get; set; }
      public DateOnly Date { get; set; }
      public int HabitId { get; set; }
      public Habit? Habit { get; set; }
    }
}