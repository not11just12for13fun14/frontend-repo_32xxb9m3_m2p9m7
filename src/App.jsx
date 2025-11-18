import NavBar from './components/NavBar'
import HomeScreen from './components/HomeScreen'
import NotificationUI from './components/NotificationUI'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'
import GalleryScreen from './components/GalleryScreen'
import InsightsScreen from './components/InsightsScreen'
import SettingsScreen from './components/SettingsScreen'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <NavBar />

      <main className="space-y-4 pb-28">
        <HomeScreen />
        <NotificationUI />
        <CameraScreen />
        <ResultScreen />
        <GalleryScreen />
        <InsightsScreen />
        <SettingsScreen />
      </main>
    </div>
  )
}

export default App
