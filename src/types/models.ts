export type Employee = {
  id: string;
  name: string;
  team?: string;
};

export type ShiftType = "EARLY" | "LATE" | "DAY_OFF";

export type Shift = {
    id: string;
    employeeId: string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    type: ShiftType;
}