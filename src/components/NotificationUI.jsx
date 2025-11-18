export default function NotificationUI() {
  return (
    <section id="notify" className="max-w-md mx-auto px-4 py-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 p-4">
        <h3 className="font-semibold mb-3">Reminder Notification</h3>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
          <div className="text-sm">Gym starts in 10 minutes</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Snooze 10m</button>
            <button className="py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white">Mark Done</button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Tapping Mark Done opens the camera instantly</p>
        </div>
      </div>
    </section>
  )
}
