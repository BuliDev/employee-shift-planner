import { useState } from "react";
import PageCard from "../components/PageCard.tsx";
import WeeklyGrid from "../features/schedule/WeeklyGrid.tsx";
import type { Shift } from "../types/models.ts";
import { useLocalStorageState } from "../lib/useLocalStorage.ts";
import { SEED_SHIFTS } from "../features/schedule/seed.ts";
import DashboardPage from "../pages/DashboardPage";

const AppLayout = () => {
  const [shifts, setShifts] = useLocalStorageState<Shift[]>(
    "shift-planner.shifts",
    SEED_SHIFTS
  );

  const [activePage, setActivePage] = useState<
    "dashboard" | "schedule" | "employees" | "settings"
  >("dashboard");

  const [scheduleFocusDateISO, setScheduleFocusDateISO] = useState<
    string | null
  >(null);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  const getTodayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  };

  const goToSchedule = (focusDateISO?: string) => {
    if (focusDateISO) setScheduleFocusDateISO(focusDateISO);
    setActivePage("schedule");
  };

  const navItemClass = (isActive: boolean) =>
    [
      "block rounded-md px-3 py-2 text-sm",
      isActive ? "bg-slate-100 font-medium" : "hover:bg-slate-100",
    ].join(" ");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside className="w-64 border-r border-slate-200 bg-white p-4">
          <div className="text-lg font-semibold">Shift Planner</div>
          <nav className="mt-6 space-y-2 text-sm">
            <button
              className={navItemClass(activePage === "dashboard")}
              onClick={() => setActivePage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={navItemClass(activePage === "schedule")}
              onClick={() => setActivePage("schedule")}
            >
              Schedule
            </button>
            <button
              className={navItemClass(activePage === "employees")}
              onClick={() => setActivePage("employees")}
            >
              Employees
            </button>
            <button
              className={navItemClass(activePage === "settings")}
              onClick={() => setActivePage("settings")}
            >
              Settings
            </button>
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between h-16 border-b border-slate-200 bg-white px-6">
            <div className="text-sm text-slate-600 capitalize">
              {activePage}
            </div>
          </header>
          <main className="p-6">
            {activePage === "dashboard" && (
              <DashboardPage
                shifts={shifts}
                onAddShiftToday={() => goToSchedule(getTodayISO())}
              />
            )}

            {activePage === "schedule" && (
              <WeeklyGrid
                shifts={shifts}
                setShifts={setShifts}
                focusDateISO={scheduleFocusDateISO}
                onConsumeFocus={() => setScheduleFocusDateISO(null)}
              />
            )}

            {activePage === "employees" && (
              <PageCard
                title="Employees"
                description="View and manage your employees here."
              />
            )}

            {activePage === "settings" && (
              <PageCard
                title="Settings"
                description="Adjust your application settings here."
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
