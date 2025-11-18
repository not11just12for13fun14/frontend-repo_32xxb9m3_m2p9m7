import { BarChart3, TrendingUp } from 'lucide-react'

export default function InsightsScreen() {
  return (
    <section id="insights" className="max-w-md mx-auto px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">On-time %</div>
          <div className="text-2xl font-semibold">82%</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">Verified %</div>
          <div className="text-2xl font-semibold">76%</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">Avg lateness</div>
          <div className="text-2xl font-semibold">+4m</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div className="text-xs text-slate-500">Current streak</div>
          <div className="text-2xl font-semibold">7</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm mb-2">
          <BarChart3 size={16} /> Weekly Completions
        </div>
        <div className="h-24 flex items-end gap-2">
          {[12,9,10,15,8,14,16].map((v,i)=> (
            <div key={i} className="flex-1 bg-teal-500/20 rounded" style={{height: `${v*4}px`}} />
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
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">You're late to Gym on Wednesdays. Try 5:30 PM.</div>
      </div>
    </section>
  )
}
