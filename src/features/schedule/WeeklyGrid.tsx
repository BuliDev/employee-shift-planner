import type { FormEvent } from "react";
import { useLocalStorageState } from "../../lib/useLocalStorage";
import type { Employee, Shift } from "../../types/models";
import { useState } from "react";
import type { Day } from "./types";
import { ShiftForm } from "./ShiftForm";
import { ShiftCell } from "./ShiftCell";

const DAYS: Day[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const EMPLOYEES: Employee[] = [
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

const SEED_SHIFTS: Shift[] = [
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

const WEEK_DAYS: Record<Day["key"], string> = {
  mon: "2026-01-12",
  tue: "2026-01-13",
  wed: "2026-01-14",
  thu: "2026-01-15",
  fri: "2026-01-16",
  sat: "2026-01-17",
  sun: "2026-01-18",
};

const WeeklyGrid = () => {
  const [shifts, setShifts] = useLocalStorageState<Shift[]>(
    "shift-planner.shifts",
    SEED_SHIFTS
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    EMPLOYEES[0]?.id ?? ""
  );
  const [selectedDayKey, setSelectedDayKey] = useState<Day["key"]>("mon");
  const [selectedType, setSelectedType] = useState<Shift["type"]>("EARLY");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("14:00");
  const [error, setError] = useState<string | null>(null);
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);

  const getShiftForCell = (employeeId: string, dayKey: Day["key"]) => {
    const date = WEEK_DAYS[dayKey];
    return shifts.find(
      (shift) => shift.employeeId === employeeId && shift.date === date
    );
  };

  const getDayKeyFromDate = (date: string): Day["key"] | null => {
    const entry = Object.entries(WEEK_DAYS).find(([, d]) => d === date);
    return (entry?.[0] as Day["key"]) ?? null;
  };

  const startEditShift = (shift: Shift) => {
    setError(null);
    setEditingShiftId(shift.id);

    setSelectedEmployeeId(shift.employeeId);

    const dayKey = getDayKeyFromDate(shift.date);
    if (dayKey) setSelectedDayKey(dayKey);

    setSelectedType(shift.type);

    if (shift.type !== "DAY_OFF") {
      setStartTime(shift.startTime);
      setEndTime(shift.endTime);
    } else {
      setStartTime("06:00");
      setEndTime("14:00");
    }
  };

  const updateShift = (updated: Shift) => {
    setShifts(shifts.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAddShift = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!selectedEmployeeId) {
      setError("Please select an employee.");
      return;
    }

    const date = WEEK_DAYS[selectedDayKey];

    const payload = {
      employeeId: selectedEmployeeId,
      date,
      startTime: selectedType === "DAY_OFF" ? "00:00" : startTime,
      endTime: selectedType === "DAY_OFF" ? "00:00" : endTime,
      type: selectedType,
    };

    if (editingShiftId) {
      const updated: Shift = { id: editingShiftId, ...payload };

      updateShift(updated);
      setEditingShiftId(null);
      setError(null);
      return;
    }

    const existing = shifts.find(
      (s) => s.employeeId === selectedEmployeeId && s.date === date
    );

    if (existing) {
      setError("Shift already exists for this employee on the selected day.");
      return;
    }

    const newShift: Shift = {
      id: crypto.randomUUID(),
      employeeId: selectedEmployeeId,
      date,
      startTime: selectedType === "DAY_OFF" ? "00:00" : startTime,
      endTime: selectedType === "DAY_OFF" ? "00:00" : endTime,
      type: selectedType,
    };

    setShifts([...shifts, newShift]);
  };

  const cancelEdit = () => {
    setEditingShiftId(null);
    setError(null);
  };

  const handleDeleteShift = (shiftId: string) => {
    if (editingShiftId === shiftId) {
      setEditingShiftId(null);
    }

    setShifts(shifts.filter((s) => s.id !== shiftId));
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white">
      <ShiftForm
        employees={EMPLOYEES}
        days={DAYS}
        selectedEmployeeId={selectedEmployeeId}
        selectedDayKey={selectedDayKey}
        selectedType={selectedType}
        startTime={startTime}
        endTime={endTime}
        error={error}
        isEditing={editingShiftId !== null}
        onChangeEmployeeId={setSelectedEmployeeId}
        onChangeDayKey={setSelectedDayKey}
        onChangeType={setSelectedType}
        onChangeStartTime={setStartTime}
        onChangeEndTime={setEndTime}
        onSubmit={handleAddShift}
        onCancel={cancelEdit}
      />

      <div className="max-h-[420px] overflow-auto">
        {/* Header row */}
        <div className="sticky top-0 z-20 grid grid-cols-8 border-b border-slate-200 bg-slate-50 shadow-sm">
          <div className="sticky left-0 z-20 bg-slate-50 p-3 text-sm font-medium text-slate-700 shadow-sm">
            Employees
          </div>

          {DAYS.map((day) => (
            <div
              key={day.key}
              className="p-3 text-sm font-medium text-slate-700"
            >
              {day.label}
            </div>
          ))}
        </div>

        {/* Body (placeholder cells) */}
        <div className="divide-y divide-slate-200">
          {EMPLOYEES.map((emp) => (
            <div key={emp.id} className="grid grid-cols-8">
              {/* Left column: employee name */}
              <div className="sticky left-0 z-10 bg-white p-3 text-sm font-medium text-slate-800 shadow-sm">
                {emp.name}
              </div>

              {/* 7 day cells */}
              {DAYS.map((day) => {
                const shift = getShiftForCell(emp.id, day.key);
                return (
                  <div
                    key={day.key}
                    className="min-h-[64px] border-l border-slate-200 p-3"
                  >
                    <ShiftCell
                      shift={shift}
                      onEdit={startEditShift}
                      onDelete={handleDeleteShift}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyGrid;
