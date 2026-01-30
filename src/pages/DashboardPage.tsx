import type { Shift } from "../types/models";

type DashboardPageProps = {
  shifts: Shift[];
};

const DashboardPage = ({ shifts }: DashboardPageProps) => {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const shiftsToday = shifts.filter((s) => s.date === today);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="rounded-md border border-slate-200 bg-white p-4">
        <div className="text-sm text-slate-600">Shifts today</div>
        <div className="mt-1 text-2xl font-semibold">{shiftsToday.length}</div>
        <div className="mt-2 text-xs text-slate-500">Date: {today}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
