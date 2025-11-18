import { useEffect, useState } from 'react'
import { getApiBase } from '../lib/api'

export default function GalleryScreen() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      const base = getApiBase()
      if (!base) return
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${base}/api/history`)
        if (!res.ok) throw new Error(`Failed to load history: ${res.status}`)
        const json = await res.json()
        setItems(json)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <section id="history" className="max-w-md mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">History</h3>
        <div className="text-sm text-slate-500">All • Verified • Unverified</div>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading…</div>}
      {error && <div className="text-xs text-rose-600 mb-2">{error}</div>}

      <div className="grid grid-cols-3 gap-2">
        {items.map((it) => (
          <div key={it.id} className={`aspect-square rounded-lg border ${it.verdict === 'Verified' ? 'bg-lime-500/10 border-lime-200 dark:border-lime-800' : it.verdict === 'Unclear' ? 'bg-amber-500/10 border-amber-200 dark:border-amber-800' : 'bg-rose-500/10 border-rose-200 dark:border-rose-800'}`}>
            <div className="p-1 text-[10px] text-slate-600 dark:text-slate-300">
              <div className="font-medium truncate">{it.verdict}</div>
              <div>{Math.round((it.confidence || 0) * 100)}%</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
