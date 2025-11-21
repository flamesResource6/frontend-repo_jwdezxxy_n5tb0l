import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchResource, likeResource } from '../lib/api'
import { FileText, ExternalLink, Heart } from 'lucide-react'

export default function ResourceDetailPage(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{ load() },[id])

  async function load(){
    setLoading(true); setError('')
    try{
      const res = await fetchResource(id)
      setItem(res)
    }catch(e){
      setError('Could not load resource')
    }finally{ setLoading(false) }
  }

  async function handleLike(){
    try{ await likeResource(id); await load() }catch(e){}
  }

  return (
    <div>
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-10">
        {loading && (
          <div className="card p-8 animate-pulse bg-[color:var(--bg-muted)]/40 h-56" />
        )}
        {!loading && error && (
          <div className="card p-6 text-red-700 bg-red-50">{error}</div>
        )}
        {!loading && item && (
          <div className="card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-[color:var(--bg-muted)]/60 aspect-[4/3] flex items-center justify-center">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover"/>
                ) : (
                  <FileText className="w-10 h-10 text-muted"/>
                )}
              </div>
              <div className="p-6">
                <h1 className="text-xl font-semibold" style={{color:'var(--primary-800)'}}>{item.title}</h1>
                {item.description && <p className="mt-2 text-muted text-sm">{item.description}</p>}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  {item.subject && <span className="chip">{item.subject}</span>}
                  {item.year && <span className="chip">{item.year}</span>}
                  {item.type && <span className="chip">{item.type}</span>}
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <a href={item.file_url} target="_blank" rel="noreferrer" className="btn btn-primary inline-flex"><ExternalLink className="w-4 h-4 mr-2"/>Open file</a>
                  <button onClick={handleLike} className="btn btn-ghost inline-flex"><Heart className="w-4 h-4 mr-2"/>Like ({item.likes ?? 0})</button>
                </div>
                <div className="mt-6 text-xs text-muted">ID: {item.id}</div>
                <div className="mt-4">
                  <Link to="/" className="btn btn-ghost">← Back</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
