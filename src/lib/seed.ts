import type { Shift } from "../types/models";
import type { Employee } from "../types/models";

export const SEED_SHIFTS: Shift[] = [
  {
    id: "s1",
    employeeId: "e1",
    date: "2026-01-12",
    startTime: "06:00",
    endTime: "14:00",
    type: "EARLY",
  },
  {
    id: "s2",
    employeeId: "e2",
    date: "2026-01-13",
    startTime: "14:00",
    endTime: "22:00",
    type: "LATE",
  },
  {
    id: "s3",
    employeeId: "e3",
    date: "2026-01-14",
    startTime: "00:00",
    endTime: "00:00",
    type: "DAY_OFF",
  },
];

export const SEED_EMPLOYEES: Employee[] = [
  { id: "e1", name: "Buli" },
  { id: "e2", name: "Marko" },
  { id: "e3", name: "Sara" },
  { id: "e4", name: "Omar" },
  { id: "e5", name: "Ivan" },
  { id: "e6", name: "Lana" },
  { id: "e7", name: "Nina" },
  { id: "e8", name: "Ema" },
  { id: "e9", name: "Dino" },
  { id: "e10", name: "Mila" },
];