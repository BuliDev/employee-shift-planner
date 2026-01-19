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

  const badge =
    shift.type === "DAY_OFF"
      ? { label: "OFF", className: "bg-slate-100 text-slate-700" }
      : {
          label: `${shift.type} ${shift.startTime}-${shift.endTime}`,
          className: "bg-blue-50 text-blue-700",
        };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onEdit(shift)}
        className={[
          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
          badge.className,
          "hover:opacity-80",
        ].join(" ")}
        title="Edit shift"
      >
        {badge.label}
      </button>

      <button
        type="button"
        onClick={() => onDelete(shift.id)}
        className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        title="Delete shift"
        aria-label="Delete shift"
      >
        ✕
      </button>
    </div>
  );
}
