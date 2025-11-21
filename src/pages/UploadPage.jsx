import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { createResource } from '../lib/api'

export default function UploadPage(){
  const [form, setForm] = useState({ title:'', description:'', subject:'', type:'notes', year:'', file_url:'', thumbnail_url:'' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function update(k, v){ setForm(prev=>({...prev, [k]: v})) }

  async function submit(e){
    e.preventDefault(); setLoading(true); setMessage('')
    try{
      const res = await createResource(form)
      setMessage('Uploaded! ID: '+res.id)
      setForm({ title:'', description:'', subject:'', type:'notes', year:'', file_url:'', thumbnail_url:'' })
    }catch(e){ setMessage('Error: '+(e.message||'Failed')) }
    finally{ setLoading(false) }
  }

  return (
    <div>
      <Header />
      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-xl font-semibold mb-4" style={{color:'var(--primary-800)'}}>Upload resource</h1>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input required value={form.title} onChange={e=>update('title', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea value={form.description} onChange={e=>update('description', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Subject</label>
              <input value={form.subject} onChange={e=>update('subject', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Type</label>
              <select value={form.type} onChange={e=>update('type', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70">
                <option value="notes">Notes</option>
                <option value="paper">Past Paper</option>
                <option value="cheatsheet">Cheat Sheet</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Year</label>
              <input value={form.year} onChange={e=>update('year', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Thumbnail URL (optional)</label>
              <input value={form.thumbnail_url} onChange={e=>update('thumbnail_url', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">File URL</label>
            <input required value={form.file_url} onChange={e=>update('file_url', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--bg-muted)]/70"/>
            <p className="text-xs text-muted mt-1">Paste a direct link to the PDF/image (Appwrite Storage integration coming next).</p>
          </div>
          <div className="flex items-center gap-2">
            <button disabled={loading} className="btn btn-primary" type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
            {message && <span className="text-sm text-muted">{message}</span>}
          </div>
        </form>
      </section>
      <Footer />
    </div>
  )
}
