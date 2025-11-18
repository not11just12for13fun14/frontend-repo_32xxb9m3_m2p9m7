import { useEffect, useMemo, useState } from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'
import { getApiBase } from '../lib/api'

export default function InsightsScreen() {
  const [data, setData] = useState({ summary: { completionRate: 0, streak: 0, totalChecks: 0 }, weekly: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      const base = getApiBase()
      if (!base) return
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${base}/api/insights`)
        if (!res.ok) throw new Error(`Failed to load insights: ${res.status}`)
        const json = await res.json()
        setData(json)
        // share streak hint with Home for the header chip
        localStorage.setItem('streak_hint', String(json?.summary?.streak || 0))
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const bars = data.weekly || []
  const completion = Math.round(data?.summary?.completionRate || 0)
  const streak = data?.summary?.streak || 0

  return (
    <section id="insights" className="max-w-md mx-auto px-4 py-4">
      {loading && <div className="text-sm text-slate-500">Loading…</div>}
      {error && <div className="text-xs text-rose-600 mb-2">{error}</div>}

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">On-time %</div>
          <div className="text-2xl font-semibold">{completion}%</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">Current streak</div>
          <div className="text-2xl font-semibold">{streak}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm mb-2">
          <BarChart3 size={16} /> Weekly Completions
        </div>
        <div className="h-24 flex items-end gap-2">
          {bars.map((b,i)=> (
            <div key={i} className="flex-1 bg-teal-500/20 rounded" style={{height: `${(b.count||0)*6}px`}} />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm mb-2">
          <TrendingUp size={16} /> Verification Rate
        </div>
        <div className="h-24 relative">
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full">
            <polyline fill="none" stroke="rgb(13,148,136)" strokeWidth="2" points="0,30 20,28 40,24 60,18 80,16 100,12" />
          </svg>
        </div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Keep the streak going! Great consistency this week.</div>
      </div>
    </section>
  )
}
