import { useState } from "react";
import type { Employee } from "../types/models";

type EmployeesPageProps = {
  employees: Employee[];
  onAddEmployee: (name: string) => void;
  onDeleteEmployee: (id: string) => void;
  onUpdateEmployee: (id: string, name: string) => void;
};

const EmployeesPage = ({
  employees,
  onAddEmployee,
  onDeleteEmployee,
  onUpdateEmployee,
}: EmployeesPageProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

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
              <li
                key={e.id}
                className="flex items-center justify-between gap-3 p-4"
              >
                {editingId === e.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      className="w-full rounded-md border border-slate-200 px-2 py-1 text-sm"
                      value={editingName}
                      onChange={(ev) => setEditingName(ev.target.value)}
                    />

                    <button
                      className="rounded-md bg-slate-900 px-2 py-1 text-sm text-white"
                      onClick={() => {
                        const trimmed = editingName.trim();
                        if (!trimmed) return;
                        onUpdateEmployee(e.id, trimmed);
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="font-medium text-slate-900">{e.name}</div>

                    <div className="flex gap-2">
                      <button
                        className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                        onClick={() => {
                          setEditingId(e.id);
                          setEditingName(e.name);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-md border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50"
                        onClick={() => {
                          const ok = window.confirm(`Delete ${e.name}?`);
                          if (!ok) return;
                          onDeleteEmployee(e.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
