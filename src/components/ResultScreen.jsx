import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

export default function ResultScreen() {
  const verdict = 'Verified' // Verified | Unclear | Not Verified
  const confidence = 0.81

  const config = {
    Verified: { icon: CheckCircle2, color: 'bg-lime-500/10 text-lime-700 border-lime-300 dark:border-lime-800' },
    Unclear: { icon: AlertTriangle, color: 'bg-amber-500/10 text-amber-700 border-amber-300 dark:border-amber-800' },
    'Not Verified': { icon: XCircle, color: 'bg-rose-500/10 text-rose-700 border-rose-300 dark:border-rose-800' },
  }

  const Icon = config[verdict].icon

  return (
    <section id="result" className="max-w-md mx-auto px-4 py-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-16 h-16 bg-slate-200/50 rounded-xl" />
          <div className="flex-1">
            <div className="text-sm text-slate-500">+3 min late</div>
            <div className="text-xs text-slate-500">Today, 7:24 AM</div>
          </div>
        </div>

        <div className={`border rounded-2xl p-4 flex items-center gap-3 ${config[verdict].color}`}>
          <Icon size={22} />
          <div className="font-semibold">{verdict}</div>
          <div className="ml-auto text-sm">{Math.round(confidence * 100)}%</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white">Mark Complete</button>
          <a href="#camera" className="py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center">Retake</a>
        </div>
        <div className="mt-2 text-center">
          <a href="#override" className="text-xs text-slate-500 underline">Override</a>
        </div>
      </div>
    </section>
  )
}
