import type { FormEvent } from "react";
import type { Employee, Shift } from "../../types/models";
import { useState, useEffect } from "react";
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

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

const getWeekStartISO = (dateISO: string) => {
  // Parse as UTC midnight to avoid timezone surprises
  const d = new Date(`${dateISO}T00:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7; // Mon=0 ... Sun=6
  d.setUTCDate(d.getUTCDate() - day);
  return toISODate(d);
};

const addDaysISO = (dateISO: string, days: number) => {
  const d = new Date(`${dateISO}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return toISODate(d);
};

const buildWeekDays = (weekStartISO: string): Record<Day["key"], string> => ({
  mon: addDaysISO(weekStartISO, 0),
  tue: addDaysISO(weekStartISO, 1),
  wed: addDaysISO(weekStartISO, 2),
  thu: addDaysISO(weekStartISO, 3),
  fri: addDaysISO(weekStartISO, 4),
  sat: addDaysISO(weekStartISO, 5),
  sun: addDaysISO(weekStartISO, 6),
});

type WeeklyGridProps = {
  employees: Employee[];
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
  focusDateISO?: string | null;
  onConsumeFocus?: () => void;
  onGoToEmployees?: () => void;
};

const WeeklyGrid = ({
  employees,
  shifts,
  setShifts,
  focusDateISO,
  onConsumeFocus,
  onGoToEmployees,
}: WeeklyGridProps) => {
  if (employees.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">No employees yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add employees first, then you can assign shifts in the schedule.
        </p>

        <button
          className="mt-4 rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          onClick={() => onGoToEmployees?.()}
        >
          Go to Employees
        </button>
      </div>
    );
  }

  const [weekStartISO, setWeekStartISO] = useState("2026-01-12");
  const weekDays = buildWeekDays(weekStartISO);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    employees[0]?.id ?? ""
  );
  const [selectedDayKey, setSelectedDayKey] = useState<Day["key"]>("mon");
  const [selectedType, setSelectedType] = useState<Shift["type"]>("EARLY");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("14:00");
  const [error, setError] = useState<string | null>(null);
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);

  useEffect(() => {
    if (employees.length === 0) {
      setSelectedEmployeeId("");
      return;
    }

    const exists = employees.some((e) => e.id === selectedEmployeeId);
    if (!exists) {
      setSelectedEmployeeId(employees[0].id);
    }
  }, [employees, selectedEmployeeId]);

  useEffect(() => {
    if (!focusDateISO) return;

    const newWeekStart = getWeekStartISO(focusDateISO);
    setWeekStartISO(newWeekStart);

    const newWeekDays = buildWeekDays(newWeekStart);
    const entry = Object.entries(newWeekDays).find(
      ([, d]) => d === focusDateISO
    );

    if (entry) {
      setSelectedDayKey(entry[0] as Day["key"]);
    }

    onConsumeFocus?.();
  }, [focusDateISO]);

  const getShiftForCell = (employeeId: string, dayKey: Day["key"]) => {
    const date = weekDays[dayKey];
    return shifts.find(
      (shift) => shift.employeeId === employeeId && shift.date === date
    );
  };

  const getDayKeyFromDate = (date: string): Day["key"] | null => {
    const entry = Object.entries(weekDays).find(([, d]) => d === date);
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

    const date = weekDays[selectedDayKey];

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
        employees={employees}
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
          {employees.map((emp) => (
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
