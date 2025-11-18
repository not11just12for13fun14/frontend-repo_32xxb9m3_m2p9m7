export default function GalleryScreen() {
  const items = new Array(12).fill(0).map((_, i) => ({ id: i + 1, type: i % 3 === 0 ? 'video' : 'photo' }))
  return (
    <section id="history" className="max-w-md mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">History</h3>
        <div className="text-sm text-slate-500">All • Verified • Unverified</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((it) => (
          <div key={it.id} className="aspect-square bg-slate-200/50 rounded-lg" />
        ))}
      </div>
    </section>
  )
}
