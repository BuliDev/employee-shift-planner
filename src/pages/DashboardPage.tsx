import type { Shift } from "../types/models";

type DashboardPageProps = {
  shifts: Shift[];
  todayISO: string;
  onAddShiftToday: () => void;
};

const DashboardPage = ({
  shifts,
  todayISO,
  onAddShiftToday,
}: DashboardPageProps) => {
  const shiftsToday = shifts.filter((s) => s.date === todayISO);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <button
          className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          onClick={onAddShiftToday}
        >
          Add shift for today
        </button>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-4">
        <div className="text-sm text-slate-600">Shifts today</div>
        <div className="mt-1 text-2xl font-semibold">{shiftsToday.length}</div>
        <div className="mt-2 text-xs text-slate-500">Date: {todayISO}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
