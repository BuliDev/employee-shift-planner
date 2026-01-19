import type { Shift } from "../../types/models";

type ShiftCellProps = {
  shift?: Shift;
  onEdit: (shift: Shift) => void;
  onDelete: (shiftId: string) => void;
};

export function ShiftCell(props: ShiftCellProps) {
  const { shift, onEdit, onDelete } = props;

  if (!shift) {
    return <div className="text-xs text-slate-400">—</div>;
  }

  const isOff = shift.type === "DAY_OFF";

  const timeLabel = isOff ? "Day off" : `${shift.startTime}–${shift.endTime}`;
  const typeLabel = isOff ? "OFF" : shift.type;

  const fullLabel = isOff
    ? "OFF"
    : `${shift.type} ${shift.startTime}–${shift.endTime}`;

  const badgeClass = isOff
    ? "bg-slate-100 text-slate-700"
    : "bg-blue-50 text-blue-700";

  return (
    <div className="grid gap-1">
      {/* Line 1: time (click = edit) */}
      <button
        type="button"
        onClick={() => onEdit(shift)}
        className={[
          "w-full rounded-md px-2 py-1 text-left text-xs font-medium",
          badgeClass,
          "hover:opacity-80",
        ].join(" ")}
        title={fullLabel}
      >
        {timeLabel}
      </button>

      {/* Line 2: type + delete */}
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium text-slate-600">
          {typeLabel}
        </div>

        <button
          type="button"
          onClick={() => onDelete(shift.id)}
          className="shrink-0 rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          title="Delete shift"
          aria-label="Delete shift"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
