import { useState } from "react";
import type { ReactNode } from "react";
import PageCard from "../components/PageCard.tsx";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [activePage, setActivePage] = useState<
    "dashboard" | "schedule" | "employees" | "settings"
  >("dashboard");

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
            <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              + New shift
            </button>
          </header>
          <main className="p-6">
            {activePage === "dashboard" && children}

            {activePage === "schedule" && (
              <PageCard
                title="Schedule"
                description="Manage and view the shift schedule here."
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
