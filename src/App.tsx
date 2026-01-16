import AppLayout from "./app/AppLayout";

export default function App() {
  return (
    <AppLayout>
      <div className="rounded-md border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Welcome to the Shift Planner dashboard!
        </p>
      </div>
    </AppLayout>
  );
}
