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

type EmployeeRow = {
  id: string;
  name: string;
};

const EMPLOYEES: EmployeeRow[] = [
  { id: "e1", name: "Buli" },
  { id: "e2", name: "Marko" },
  { id: "e3", name: "Sara" },
  { id: "e4", name: "Nina" },
  { id: "e5", name: "Ivan" },
  { id: "e6", name: "Lana" },
  { id: "e7", name: "Omar" },
  { id: "e8", name: "Ema" },
  { id: "e9", name: "Dino" },
  { id: "e10", name: "Mila" },
];

const WeeklyGrid = () => {
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
              {DAYS.map((day) => (
                <div
                  key={day.key}
                  className="min-h-[64px] border-l border-slate-200 p-3"
                >
                  <div className="text-xs text-slate-400">—</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyGrid;
