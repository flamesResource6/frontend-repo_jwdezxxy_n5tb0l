import { Search, Upload, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header({ onSearch }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold" style={{color: 'var(--primary-800)'}}>
          <span className="inline-block w-2.5 h-6 rounded-full" style={{backgroundColor:'var(--primary-500)'}} />
          StudyShare
        </Link>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input onChange={(e)=>onSearch?.(e.target.value)} placeholder="Search subjects, exams, years..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70 text-sm outline-none" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/upload" className="btn btn-primary hidden sm:inline-flex"><Upload className="w-4 h-4 mr-2"/>Upload</Link>
          <Link to="/auth" className="btn btn-ghost inline-flex"><User className="w-4 h-4 mr-2"/>Sign in</Link>
        </div>
      </div>
    </header>
  )
}
