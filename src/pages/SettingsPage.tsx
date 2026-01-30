type SettingsPageProps = {
  onResetDemoData: () => void;
  onClearAllData: () => void;
};

const SettingsPage = ({
  onResetDemoData,
  onClearAllData,
}: SettingsPageProps) => {
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
      </div>
    </div>
  );
};

export default SettingsPage;
