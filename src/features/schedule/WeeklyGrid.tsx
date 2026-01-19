import { useLocalStorageState } from "../../lib/useLocalStorage";
import type { Employee, Shift } from "../../types/models";

type Day = {
  key: string;
  label: string;
};

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

  const getShiftForCell = (employeeId: string, dayKey: Day["key"]) => {
    const date = WEEK_DAYS[dayKey];
    return shifts.find(
      (shift) => shift.employeeId === employeeId && shift.date === date
    );
  };

  const getBadge = (shift: Shift) => {
    if (shift.type === "DAY_OFF") {
      return {
        label: "OFF",
        className: "bg-slate-100 text-slate-700",
      };
    }

    return {
      label: `${shift.type} ${shift.startTime}-${shift.endTime}`,
      className: "bg-blue-50 text-blue-700",
    };
  };
  return (
    <div className="rounded-md border border-slate-200 bg-white">
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
                    {!shift ? (
                      <div className="text-xs text-slate-400">—</div>
                    ) : (
                      (() => {
                        const badge = getBadge(shift);
                        return (
                          <span
                            className={[
                              "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
                              badge.className,
                            ].join(" ")}
                          >
                            {badge.label}
                          </span>
                        );
                      })()
                    )}
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
