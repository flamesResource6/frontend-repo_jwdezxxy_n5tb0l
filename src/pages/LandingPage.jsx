import Header from '../components/Header'
import Footer from '../components/Footer'
import ResourceCard from '../components/ResourceCard'
import { useEffect, useState } from 'react'
import { fetchResources, likeResource } from '../lib/api'

export default function LandingPage(){
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ load() },[])

  async function load(){
    setLoading(true)
    try{
      const res = await fetchResources({ q })
      setItems(res.items || [])
    }catch(e){
      console.error(e)
    }finally{ setLoading(false) }
  }

  async function handleLike(id){
    try{ await likeResource(id); await load() }catch(e){ console.error(e) }
  }

  return (
    <div>
      <Header onSearch={(v)=>{ setQ(v); }} />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{color:'var(--primary-800)'}}>Latest resources</h2>
          <button onClick={load} className="btn btn-ghost">Refresh</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({length:10}).map((_,i)=> (
              <div key={i} className="card aspect-[4/3] animate-pulse bg-[color:var(--bg-muted)]/60" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map(item => (
              <ResourceCard key={item.id} item={item} onLike={handleLike} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
