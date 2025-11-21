import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ResourceCard from '../components/ResourceCard'
import { fetchResources } from '../lib/api'

export default function SearchPage(){
  const [q, setQ] = useState('')
  const [subject, setSubject] = useState('')
  const [type, setType] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function run(){
    setLoading(true)
    try{ const res = await fetchResources({ q, subject, type }); setItems(res.items||[]) }catch(e){ console.error(e) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ run() },[])

  return (
    <div>
      <Header onSearch={setQ} />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="card p-4 flex flex-col md:flex-row gap-3 items-end">
          <div className="w-full md:w-1/3">
            <label className="block text-xs mb-1">Subject</label>
            <input value={subject} onChange={e=>setSubject(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-xs mb-1">Type</label>
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70">
              <option value="">Any</option>
              <option value="notes">Notes</option>
              <option value="paper">Past Paper</option>
              <option value="cheatsheet">Cheat Sheet</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-xs mb-1">Text</label>
            <input value={q} onChange={e=>setQ(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
          </div>
          <button onClick={run} className="btn btn-primary w-full md:w-auto">Search</button>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading ? Array.from({length:10}).map((_,i)=> <div key={i} className="card aspect-[4/3] animate-pulse bg-[color:var(--bg-muted)]/60" />) :
            items.map(item=> <ResourceCard key={item.id} item={item} />)
          }
        </div>
      </section>
      <Footer />
    </div>
  )
}
