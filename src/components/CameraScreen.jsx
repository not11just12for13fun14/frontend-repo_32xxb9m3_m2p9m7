import { useRef, useState, useEffect } from 'react'
import { Camera, RotateCw, Zap } from 'lucide-react'

export default function CameraScreen() {
  const videoRef = useRef(null)
  const mediaStream = useRef(null)
  const [mode, setMode] = useState('photo') // photo | video
  const [recording, setRecording] = useState(false)
  const [previewURL, setPreviewURL] = useState('')
  const [hint, setHint] = useState('Show your workout area')

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: mode === 'video' })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream.current
      }
    } catch (e) {
      console.error(e)
    }
  }

  const stopCamera = () => {
    mediaStream.current?.getTracks().forEach((t) => t.stop())
  }

  const capturePhoto = async () => {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setPreviewURL(dataUrl)
  }

  return (
    <section id="camera" className="max-w-md mx-auto px-0 py-4">
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black aspect-[9/16] relative">
        {!previewURL && (
          <>
            <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[70%] h-[55%] rounded-3xl border-2 border-white/60" />
            </div>
            <div className="absolute top-3 left-3 right-3 text-white text-center text-sm bg-black/30 rounded-full px-3 py-1">{hint}</div>
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-6">
              <button onClick={capturePhoto} className="w-16 h-16 rounded-full bg-white/90 hover:bg-white transition shadow-inner" aria-label="Shutter" />
            </div>
          </>
        )}
        {previewURL && (
          <div className="absolute inset-0 bg-black/90 text-white flex flex-col">
            <img src={previewURL} alt="preview" className="flex-1 object-contain" />
            <div className="p-3 grid grid-cols-2 gap-2">
              <button onClick={() => setPreviewURL('')} className="py-2 rounded-xl border border-white/30">Retake</button>
              <a href="#result" className="py-2 rounded-xl bg-teal-600 text-white text-center">Accept</a>
            </div>
            <p className="text-[11px] text-white/70 text-center pb-3">Photos are used only for verification. Stored on-device unless cloud backup is enabled.</p>
          </div>
        )}
      </div>
    </section>
  )
}
