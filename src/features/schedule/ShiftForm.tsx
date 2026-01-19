import type { Day } from "./types";
import type { Employee, Shift } from "../../types/models";

type ShiftFormProps = {
  employees: Employee[];
  days: Day[];
  selectedEmployeeId: string;
  selectedDayKey: Day["key"];
  selectedType: Shift["type"];
  startTime: string;
  endTime: string;
  error: string | null;
  isEditing: boolean;
  onChangeEmployeeId: (id: string) => void;
  onChangeDayKey: (key: Day["key"]) => void;
  onChangeType: (t: Shift["type"]) => void;
  onChangeStartTime: (v: string) => void;
  onChangeEndTime: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export function ShiftForm(props: ShiftFormProps) {
  const {
    employees,
    days,
    selectedEmployeeId,
    selectedDayKey,
    selectedType,
    startTime,
    endTime,
    error,
    isEditing,
    onChangeEmployeeId,
    onChangeDayKey,
    onChangeType,
    onChangeStartTime,
    onChangeEndTime,
    onSubmit,
    onCancel,
  } = props;

  const handleDayChange = (value: string) => {
    onChangeDayKey(value as Day["key"]);
  };

  const handleTypeChange = (value: string) => {
    onChangeType(value as Shift["type"]);
  };

  return (
    <form onSubmit={onSubmit} className="border-b border-slate-200 p-4">
      <div className="grid gap-3 sm:grid-cols-5">
        {/* Employee */}
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Employee</span>
          <select
            value={selectedEmployeeId}
            onChange={(e) => onChangeEmployeeId(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </label>

        {/* Day */}
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Day</span>
          <select
            value={selectedDayKey}
            onChange={(e) => handleDayChange(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            {days.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        {/* Type */}
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Type</span>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            <option value="EARLY">EARLY</option>
            <option value="LATE">LATE</option>
            <option value="DAY_OFF">DAY_OFF</option>
          </select>
        </label>

        {/* Start */}
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Start</span>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onChangeStartTime(e.target.value)}
            disabled={selectedType === "DAY_OFF"}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 disabled:opacity-50"
          />
        </label>

        {/* End */}
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">End</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onChangeEndTime(e.target.value)}
            disabled={selectedType === "DAY_OFF"}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 disabled:opacity-50"
          />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {error ? <div className="text-sm text-red-600">{error}</div> : <div />}

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isEditing ? "Save shift" : "Add shift"}
          </button>
        </div>
      </div>
    </form>
  );
}
