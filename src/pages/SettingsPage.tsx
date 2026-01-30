import { useState } from "react";
import type { Employee, Shift } from "../types/models.ts";

type SettingsPageProps = {
  employees: Employee[];
  shifts: Shift[];
  onResetDemoData: () => void;
  onClearAllData: () => void;
  onImportData: (data: { employees: Employee[]; shifts: Shift[] }) => void;
};

const SettingsPage = ({
  employees,
  shifts,
  onResetDemoData,
  onClearAllData,
  onImportData,
}: SettingsPageProps) => {
  const [importError, setImportError] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="rounded-md border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-medium text-slate-900">Data</h2>
        <p className="mt-1 text-sm text-slate-600">
          Reset to demo content or clear everything from local storage.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
            onClick={() => {
              const payload = {
                version: 1,
                exportedAt: new Date().toISOString(),
                employees,
                shifts,
              };

              const blob = new Blob([JSON.stringify(payload, null, 2)], {
                type: "application/json",
              });

              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "shift-planner-data.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </button>

          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
            onClick={() => {
              const ok = window.confirm(
                "Reset demo data? This will overwrite current data."
              );
              if (!ok) return;
              onResetDemoData();
            }}
          >
            Reset demo data
          </button>

          <button
            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            onClick={() => {
              const ok = window.confirm(
                "Clear ALL data? This cannot be undone."
              );
              if (!ok) return;
              onClearAllData();
            }}
          >
            Clear all data
          </button>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="text-sm font-medium text-slate-900">Import</h3>
          <p className="mt-1 text-sm text-slate-600">
            Import will replace your current employees and shifts.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <input
              type="file"
              accept="application/json"
              className="text-sm"
              onChange={async (e) => {
                setImportError(null);

                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  const text = await file.text();
                  const parsed = JSON.parse(text);

                  const employees = parsed?.employees;
                  const shifts = parsed?.shifts;

                  if (!Array.isArray(employees) || !Array.isArray(shifts)) {
                    setImportError(
                      "Invalid file format. Expected employees and shifts arrays."
                    );
                    return;
                  }

                  const ok = window.confirm(
                    "Import data? This will overwrite current data."
                  );
                  if (!ok) return;

                  onImportData({ employees, shifts });
                } catch {
                  setImportError("Failed to read JSON file.");
                }
              }}
            />

            {importError ? (
              <div className="text-sm text-red-600">{importError}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
