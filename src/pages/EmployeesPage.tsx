import { useState } from "react";
import type { Employee } from "../types/models";

type EmployeesPageProps = {
  employees: Employee[];
  onAddEmployee: (name: string) => void;
};

const EmployeesPage = ({ employees, onAddEmployee }: EmployeesPageProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Employees</h1>
      <form
        className="flex items-start gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);

          const trimmed = name.trim();
          if (!trimmed) {
            setError("Please enter a name.");
            return;
          }

          onAddEmployee(trimmed);
          setName("");
        }}
      >
        <div className="flex-1">
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            placeholder="Employee name (e.g. Ana)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error ? (
            <div className="mt-1 text-xs text-red-600">{error}</div>
          ) : null}
        </div>

        <button
          className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          type="submit"
        >
          Add
        </button>
      </form>

      <div className="rounded-md border border-slate-200 bg-white">
        {employees.length === 0 ? (
          <div className="p-4 text-sm text-slate-600">No employees yet.</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {employees.map((e) => (
              <li key={e.id} className="flex items-center justify-between p-4">
                <div className="font-medium text-slate-900">{e.name}</div>
                <div className="text-xs text-slate-500">{e.id}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
