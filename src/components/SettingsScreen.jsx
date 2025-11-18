import { Shield, Sliders, Cloud, Bell, Trash2, Download } from 'lucide-react'

export default function SettingsScreen() {
  return (
    <section id="settings" className="max-w-md mx-auto px-4 py-4">
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="font-semibold mb-2">Privacy & Storage</div>
          <div className="space-y-2 text-sm">
            <label className="flex items-center justify-between">
              <span>Local only (default)</span>
              <input type="radio" name="storage" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2"><Cloud size={16}/> Cloud backup</span>
              <input type="radio" name="storage" />
            </label>
            <p className="text-xs text-slate-500 mt-1">Media stays on your device by default. You control backups.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="font-semibold mb-2">Model sensitivity</div>
          <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>Flexible</span><span>Strict</span></div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="font-semibold mb-2">Data control</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button className="py-2 rounded-xl border border-slate-200 dark:border-slate-700 inline-flex items-center justify-center gap-2"><Download size={16}/> Export</button>
            <button className="py-2 rounded-xl border border-rose-300 text-rose-600 inline-flex items-center justify-center gap-2"><Trash2 size={16}/> Delete all</button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="font-semibold mb-2">Notifications</div>
          <div className="space-y-2 text-sm">
            <label className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Bell size={16}/> Reminders</span><input type="checkbox" defaultChecked/></label>
            <label className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Shield size={16}/> Permission status</span><span className="text-xs text-teal-700 bg-teal-500/10 px-2 py-1 rounded-full">Granted</span></label>
          </div>
        </div>
      </div>
    </section>
  )
}
