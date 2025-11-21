export default function Footer(){
  return (
    <footer className="mt-16 border-t border-black/5 bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p>© {new Date().getFullYear()} StudyShare • 100% free resources</p>
        <div className="flex items-center gap-4">
          <a href="#">About</a>
          <a href="#">Contribute</a>
          <a href="#">Community Guidelines</a>
        </div>
      </div>
    </footer>
  )
}
