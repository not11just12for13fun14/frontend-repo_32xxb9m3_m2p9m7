import { useMemo } from 'react'
import { BellRing, AlarmClock, Clock, CheckCircle2, Plus, Flame } from 'lucide-react'

const routines = [
  { id: 1, title: 'Wake Up', note: 'Drink water', time: '06:30', status: 'On-Time', color: 'teal', icon: AlarmClock },
  { id: 2, title: 'Gym', note: 'Leg day', time: '07:15', status: 'Pending', color: 'amber', icon: BellRing },
  { id: 3, title: 'Work', note: 'Deep focus', time: '09:00', status: 'Completed', color: 'lime', icon: Clock },
]

export default function HomeScreen() {
  const completion = useMemo(() => ({ percent: 62, streak: 7 }), [])

  return (
    <section id="home" className="max-w-md mx-auto px-4 py-4">
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tue, Nov 18</p>
            <h2 className="text-xl font-semibold">Good morning, Alex</h2>
          </div>
          <div className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
            <Flame size={16} />
            <span className="text-sm">{completion.streak} day streak</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{completion.percent}% completed today</p>
      </header>

      {/* Next Up card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">Next Up: Gym</div>
          <span className="text-xs text-slate-500">in 12m</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Snooze</button>
          <button className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition">Mark Done</button>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {routines.map((r) => (
          <div key={r.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${r.color}-500/15 text-${r.color}-600`}>
              <r.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-slate-500">{r.time}</div>
              </div>
              <p className="text-xs text-slate-500 truncate">{r.note}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full border bg-${r.status === 'Completed' ? 'lime-500/10' : r.status === 'Pending' ? 'amber-500/10' : 'teal-500/10'} text-${r.status === 'Completed' ? 'lime-600' : r.status === 'Pending' ? 'amber-600' : 'teal-700'} border-${r.status === 'Completed' ? 'lime-200 dark:border-lime-800' : r.status === 'Pending' ? 'amber-200 dark:border-amber-800' : 'teal-200 dark:border-teal-800'}`}>{r.status}</span>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 max-w-md w-[calc(100%-2rem)] mx-auto left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:w-auto inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 shadow-lg">
        <Plus size={18} />
        Add Routine
      </button>
    </section>
  )
}
