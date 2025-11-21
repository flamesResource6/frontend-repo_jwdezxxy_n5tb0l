import { FileText, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ResourceCard({ item, onLike }) {
  return (
    <div className="card overflow-hidden">
      <Link to={`/r/${item.id}`} className="block">
        <div className="aspect-[4/3] bg-[color:var(--bg-muted)]/60 flex items-center justify-center">
          {item.thumbnail_url ? (
            <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover"/>
          ) : (
            <FileText className="w-10 h-10 text-muted"/>
          )}
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
          <button onClick={()=>onLike?.(item.id)} className="inline-flex items-center gap-1 text-xs text-muted hover:text-red-600">
            <Heart className="w-4 h-4"/> {item.likes ?? 0}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          {item.subject && <span className="chip">{item.subject}</span>}
          {item.year && <span className="chip">{item.year}</span>}
          {item.type && <span className="chip">{item.type}</span>}
        </div>
      </div>
    </div>
  )
}
