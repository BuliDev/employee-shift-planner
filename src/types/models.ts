export type Employee = {
  id: string;
  name: string;
  team?: string;
};

export type ShiftType = "EARLY" | "LATE" | "DAY_OFF";

export type Shift = {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
};
