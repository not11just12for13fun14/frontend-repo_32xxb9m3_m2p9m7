import { useEffect, useMemo, useState } from 'react'
import { BellRing, AlarmClock, Clock, CheckCircle2, Plus, Flame } from 'lucide-react'
import { getApiBase } from '../lib/api'

const iconMap = { AlarmClock, BellRing, Clock }

export default function HomeScreen() {
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchRoutines = async () => {
    const base = getApiBase()
    if (!base) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${base}/api/routines`)
      if (!res.ok) throw new Error(`Failed to load routines: ${res.status}`)
      const json = await res.json()
      setRoutines(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoutines()
  }, [])

  const completion = useMemo(() => {
    // simple derived metric from routines list
    const total = routines.length || 1
    const completed = routines.filter(r => r.status === 'Completed' || r.status === 'On-Time').length
    const percent = Math.round((completed / total) * 100)
    // streak can later come from /api/insights; keep a placeholder number here
    const streak = Number(localStorage.getItem('streak_hint') || '7')
    return { percent, streak }
  }, [routines])

  const createRoutine = async () => {
    const base = getApiBase()
    if (!base) return
    const title = prompt('Routine title')
    if (!title) return
    const time = prompt('Time (HH:mm)', '07:00') || '07:00'
    const note = prompt('Note (optional)') || ''
    setCreating(true)
    try {
      const res = await fetch(`${base}/api/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, time, note, color: 'teal', icon: 'AlarmClock' })
      })
      if (!res.ok) throw new Error(`Create failed: ${res.status}`)
      await fetchRoutines()
    } catch (e) {
      alert(e.message)
    } finally {
      setCreating(false)
    }
  }

  const markComplete = async (id) => {
    const base = getApiBase()
    if (!base) return
    try {
      const res = await fetch(`${base}/api/routines/${id}/complete`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to mark complete')
      await fetchRoutines()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <section id="home" className="max-w-md mx-auto px-4 py-4">
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            <h2 className="text-xl font-semibold">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, Alex</h2>
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
          <div className="font-medium">Next Up: {routines[0]?.title || '—'}</div>
          <span className="text-xs text-slate-500">soon</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Snooze</button>
          <button onClick={() => routines[0]?.id && markComplete(routines[0].id)} className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition">Mark Done</button>
        </div>
      </div>

      {error && (
        <div className="mb-2 text-xs text-rose-600">{error}</div>
      )}

      {/* Task list */}
      <div className="space-y-2">
        {loading && (
          <div className="text-sm text-slate-500">Loading routines…</div>
        )}
        {routines.map((r) => {
          const Icon = iconMap[r.icon] || AlarmClock
          const color = r.color || 'teal'
          const status = r.status || 'Pending'
          const statusCfg = status === 'Completed'
            ? { bg: 'bg-lime-500/10', text: 'text-lime-600', border: 'border-lime-200 dark:border-lime-800' }
            : status === 'Pending'
            ? { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200 dark:border-amber-800' }
            : { bg: 'bg-teal-500/10', text: 'text-teal-700', border: 'border-teal-200 dark:border-teal-800' }
          return (
            <div key={r.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-500/15 text-${color}-600`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-slate-500">{r.time}</div>
                </div>
                <p className="text-xs text-slate-500 truncate">{r.note}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>{status}</span>
              {status !== 'Completed' && (
                <button onClick={() => markComplete(r.id)} className="ml-2 text-xs text-teal-700 dark:text-teal-400 underline">Done</button>
              )}
            </div>
          )
        })}
      </div>

      {/* FAB */}
      <button disabled={creating} onClick={createRoutine} className="fixed bottom-20 right-4 max-w-md w-[calc(100%-2rem)] mx-auto left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:w-auto inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-5 py-3 shadow-lg">
        <Plus size={18} />
        {creating ? 'Creating…' : 'Add Routine'}
      </button>
    </section>
  )
}
