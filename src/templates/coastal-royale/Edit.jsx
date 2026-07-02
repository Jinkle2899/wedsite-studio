import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Priya', groom: 'Rohan',
  date: '2026-01-18', venue: 'Taj Exotica Resort & Spa, Goa',
  venueAddress: 'Calwaddo, Benaulim, South Goa, Goa 403716',
  hashtag: '#RohanWedsPriya', rsvpDeadline: '2026-01-05',
  tagline: 'Where the ocean heard our names before we did.',
  herWords: "You are the reason I believe in people who show up. You showed up — even when it was inconvenient. Especially then.",
  hisWords: "I didn't know what I wanted until you made it impossible to want anything else. No more confusion — just you and whatever comes next.",
  primaryColor: '#d4af6e', accentColor: '#0a2a5c',
}

function Field({ label, name, value, onChange, type = 'text', hint, multiline }) {
  const cls = "w-full px-3 py-2 text-sm rounded-lg focus:outline-none text-slate-200"
  const style = { background: 'rgba(212,175,110,0.05)', border: '1px solid rgba(212,175,110,0.15)' }
  return (
    <div>
      <label className="block text-xs font-semibold text-amber-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-600 mb-1">{hint}</p>}
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={3} className={`${cls} resize-none`} style={style} />
        : <input type={type} name={name} value={value} onChange={onChange} className={cls} style={style} />
      }
    </div>
  )
}

function LivePreview({ data }) {
  const formatted = data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#060d1a', border: '1px solid rgba(212,175,110,0.15)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#040810', borderBottom: '1px solid rgba(212,175,110,0.1)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" /><div className="w-2.5 h-2.5 rounded-full bg-slate-700" /><div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        <div className="ml-2 flex-1 rounded-full px-3 py-0.5 text-xs font-mono truncate" style={{ background: 'rgba(212,175,110,0.05)', color: '#4a6080' }}>
          {data.groom?.toLowerCase() || 'groom'}-weds-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      <div className="px-8 py-10 text-center">
        <p className="text-xs tracking-[0.4em] uppercase mb-4 text-amber-700">Save the Date · Goa</p>
        <h1 className="font-display italic text-3xl font-light text-slate-200">{data.bride || 'Bride'}</h1>
        <p className="font-display italic text-base my-1 text-amber-500">weds</p>
        <h1 className="font-display italic text-3xl font-light text-slate-200 mb-4">{data.groom || 'Groom'}</h1>
        <p className="font-display text-sm text-amber-500 tracking-widest mb-1">{formatted}</p>
        <p className="text-xs text-slate-600 mb-4">{data.venue || 'Venue TBD'}</p>
        {data.tagline && <p className="italic text-xs text-slate-600 mb-6 max-w-xs mx-auto leading-relaxed">{data.tagline}</p>}
        <div className="inline-flex gap-5 px-6 py-3 rounded-xl mb-6" style={{ background: 'rgba(212,175,110,0.06)', border: '1px solid rgba(212,175,110,0.1)' }}>
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <p className="font-display text-2xl font-light text-amber-400">{n}</p>
              <p className="text-xs text-slate-600">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {['Envelope Reveal', 'Multi-day', 'His & Her Words', 'Ocean Story'].map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(212,175,110,0.06)', border: '1px solid rgba(212,175,110,0.15)', color: data.primaryColor }}>
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center py-3 text-xs tracking-widest text-amber-700" style={{ background: 'rgba(212,175,110,0.05)', borderTop: '1px solid rgba(212,175,110,0.08)' }}>
        {data.hashtag || '#YourHashtag'}
      </div>
    </div>
  )
}

export default function CoastalRoyaleEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  const sectionStyle = { background: 'rgba(212,175,110,0.04)', border: '1px solid rgba(212,175,110,0.1)' }

  return (
    <div className="min-h-screen font-body" style={{ background: '#040810' }}>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(4,8,16,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(212,175,110,0.1)' }}>
        <div className="flex items-center gap-3">
          <Link to="/templates/coastal-royale" className="text-xs text-slate-600 tracking-widest">← Preview</Link>
          <span className="text-slate-800">|</span>
          <p className="font-display text-base font-semibold text-amber-600">Customise: Coastal Royale</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/coastal-royale" className="text-xs px-4 py-2 rounded-full" style={{ border: '1px solid rgba(212,175,110,0.3)', color: '#d4af6e' }}>Preview Live</Link>
          <button onClick={handleSave} className="text-xs font-semibold px-5 py-2 rounded-full"
            style={{ background: 'rgba(212,175,110,0.1)', border: '1px solid rgba(212,175,110,0.3)', color: '#d4af6e' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-amber-600">Couple Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bride's Name" name="bride" value={data.bride} onChange={handle} />
              <Field label="Groom's Name" name="groom" value={data.groom} onChange={handle} />
            </div>
            <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="#YourHashtag" />
            <Field label="Tagline" name="tagline" value={data.tagline} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-amber-600">Wedding Info</h2>
            <Field label="Wedding Date" name="date" type="date" value={data.date} onChange={handle} />
            <Field label="Venue Name" name="venue" value={data.venue} onChange={handle} />
            <Field label="Venue Address" name="venueAddress" value={data.venueAddress} onChange={handle} />
            <Field label="RSVP Deadline" name="rsvpDeadline" type="date" value={data.rsvpDeadline} onChange={handle} />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-amber-600">Her Words</h2>
            <Field label="Bride's personal letter" name="herWords" value={data.herWords} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-amber-600">His Words</h2>
            <Field label="Groom's personal letter" name="hisWords" value={data.hisWords} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-amber-600 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Champagne Gold', 'primaryColor'], ['Navy', 'accentColor']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-amber-700 mb-2">{label}</label>
                  <div className="flex items-center gap-3">
                    <input type="color" name={name} value={data[name]} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer"
                      style={{ borderColor: 'rgba(212,175,110,0.3)', background: 'transparent' }} />
                    <span className="text-xs text-slate-600">{data[name]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-3 font-semibold text-sm tracking-widest uppercase rounded-xl"
            style={{ background: 'rgba(212,175,110,0.1)', border: '1px solid rgba(212,175,110,0.3)', color: '#d4af6e' }}>
            {saved ? '✓ Saved!' : 'Save & Publish'}
          </button>
        </div>
        <div className="sticky top-24">
          <p className="text-xs text-center mb-3 tracking-widest uppercase text-slate-700">Live Preview</p>
          <LivePreview data={data} />
        </div>
      </div>
    </div>
  )
}
