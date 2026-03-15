export interface Habit {
    id: number;
    name: string;
    description: string;
    color: string; // Kleurcode voor de gewoonte, bijv. '#FF5733'
    completedDates: string[]; // Array van datums waarop de gewoonte is voltooid, in 'YYYY-MM-DD' formaat
}