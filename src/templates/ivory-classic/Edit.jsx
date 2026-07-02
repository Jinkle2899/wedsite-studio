import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Sana', groom: 'Dev',
  date: '2025-10-03', venue: 'The Leela Palace, Bengaluru',
  venueAddress: '23, HAL Airport Road, Kodihalli, Bengaluru',
  hashtag: '#SanaWedDev', rsvpDeadline: '2025-09-15',
  story: 'Introduced through mutual friends at a literature festival in Jaipur. They talked all night and have never stopped since.',
  primaryColor: '#d4af37', accentColor: '#5d4037',
  photo1: '', photo2: '', photo3: '', photo4: '', photo5: '', photo6: '',
}

function Field({ label, name, value, onChange, type = 'text', hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <input type={type} name={name} value={value} onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
    </div>
  )
}

function LivePreview({ data }) {
  const formatted = data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
  return (
    <div className="bg-amber-50 rounded-2xl overflow-hidden border border-amber-100 shadow-sm">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded-full px-3 py-0.5 text-xs text-gray-400 font-mono truncate">
          {data.groom?.toLowerCase() || 'groom'}-and-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      <div className="px-6 py-10 text-center">
        <div className="w-14 h-14 border rounded-full flex items-center justify-center mx-auto mb-4 bg-white"
          style={{ borderColor: data.primaryColor + '80' }}>
          <span className="font-display text-lg font-bold" style={{ color: data.accentColor }}>
            {(data.bride?.[0] || 'B')}&amp;{(data.groom?.[0] || 'G')}
          </span>
        </div>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: data.primaryColor }}>Request the honour of your presence</p>
        <h1 className="font-display text-3xl font-light mb-1" style={{ color: data.accentColor }}>{data.bride || 'Bride'}</h1>
        <p className="font-display text-lg italic mb-1" style={{ color: data.primaryColor }}>and</p>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: data.accentColor }}>{data.groom || 'Groom'}</h1>
        <p className="text-sm mb-1 tracking-wider" style={{ color: data.primaryColor }}>{formatted}</p>
        <p className="text-gray-400 text-xs mb-6">{data.venue || 'Venue TBD'}</p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
          <span style={{ color: data.primaryColor }}>✦</span>
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['Our Story', 'Schedule', 'RSVP', 'Gallery'].map(s => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border font-medium tracking-wide"
              style={{ borderColor: data.primaryColor, color: data.accentColor }}>{s}</span>
          ))}
        </div>
        {data.story && <p className="text-xs text-gray-500 italic line-clamp-2 bg-white rounded-lg p-3 border border-amber-100">{data.story}</p>}
      </div>
      {/* Gallery preview */}
      <div className="grid grid-cols-3 gap-1 px-4 pb-4">
        {[1,2,3,4,5,6].map(n => {
          const url = data[`photo${n}`] || `https://picsum.photos/seed/ic-g${n}/200/200`
          return <img key={n} src={url} alt={`Photo ${n}`} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
        })}
      </div>
      <div className="py-3 text-center border-t border-amber-200" style={{ background: data.accentColor }}>
        <p className="text-xs text-white tracking-wider">{data.hashtag || '#YourHashtag'}</p>
      </div>
    </div>
  )
}

export default function IvoryClassicEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/templates/ivory-classic" className="text-sm text-gray-400 hover:text-gray-600">← Preview</Link>
          <span className="text-gray-200">|</span>
          <p className="font-display text-lg font-semibold">Customise: <span className="text-amber-700">Ivory Classic</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/ivory-classic" className="text-sm text-gray-500 px-4 py-2 border border-gray-200 rounded-full">Preview Live</Link>
          <button onClick={handleSave} className="text-sm font-semibold bg-amber-700 text-white px-5 py-2 rounded-full hover:bg-amber-900 transition-colors">
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Couple Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bride's Name" name="bride" value={data.bride} onChange={handle} />
              <Field label="Groom's Name" name="groom" value={data.groom} onChange={handle} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Wedding Info</h2>
            <div className="flex flex-col gap-4">
              <Field label="Wedding Date" name="date" type="date" value={data.date} onChange={handle} />
              <Field label="Venue Name" name="venue" value={data.venue} onChange={handle} />
              <Field label="Venue Address" name="venueAddress" value={data.venueAddress} onChange={handle} />
              <Field label="RSVP Deadline" name="rsvpDeadline" type="date" value={data.rsvpDeadline} onChange={handle} />
              <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="e.g. #SanaWedDev" />
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Your Story</h2>
            <textarea name="story" value={data.story} onChange={handle} rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 resize-none" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Gold Accent', 'primaryColor'], ['Deep Brown', 'accentColor']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" name={name} value={data[name]} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer" />
                    <span className="text-xs text-gray-400">{data[name]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-2">Gallery Photos</h2>
            <p className="text-xs text-gray-400 mb-4">Paste image URLs — leave blank to use beautiful placeholders</p>
            <div className="flex flex-col gap-3">
              {[1,2,3,4,5,6].map(n => (
                <Field key={n} label={`Photo ${n} URL`} name={`photo${n}`} value={data[`photo${n}`]} onChange={handle} hint={n === 1 ? 'e.g. https://your-image-host.com/photo.jpg' : ''} />
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-3 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-900 transition-colors text-sm">
            {saved ? '✓ Saved!' : 'Save & Publish'}
          </button>
        </div>
        <div className="sticky top-24">
          <p className="text-xs text-gray-400 text-center mb-3 tracking-widest uppercase">Live Preview</p>
          <LivePreview data={data} />
        </div>
      </div>
    </div>
  )
}
