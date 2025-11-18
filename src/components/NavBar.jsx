import { Flame, Plus, Bell, BarChart3, Camera, Home, Settings } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
  return (
    <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70 bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-300">
          <Flame className="text-amber-500" size={22} />
          <span className="font-semibold">Smart Routine</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      {/* bottom nav for mobile */}
      <div className="max-w-md mx-auto px-2 pb-2">
        <div className="grid grid-cols-5 gap-2 rounded-2xl bg-slate-900/5 dark:bg-white/5 p-2 border border-slate-200 dark:border-slate-800">
          <a href="#home" className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </a>
          <a href="#notify" className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5">
            <Bell size={20} />
            <span className="text-xs">Reminder</span>
          </a>
          <a href="#camera" className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5">
            <Camera size={20} />
            <span className="text-xs">Capture</span>
          </a>
          <a href="#insights" className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5">
            <BarChart3 size={20} />
            <span className="text-xs">Insights</span>
          </a>
          <a href="#settings" className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5">
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </a>
        </div>
      </div>
    </div>
  )
}
