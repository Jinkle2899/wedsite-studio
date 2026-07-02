import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Kavya', groom: 'Dev',
  date: '2026-02-14', venue: 'Suryagarh Palace, Jaisalmer',
  venueAddress: 'Sam Road, Near Gala, Jaisalmer, Rajasthan 345001',
  hashtag: '#DevWedKavya', rsvpDeadline: '2026-01-30',
  tagline: 'The desert remembered our names. The dunes held the light.',
  herWords: "You are the most honest person I have ever known — honest about your flaws, your feelings, your love. That kind of honesty is rare.",
  hisWords: "I never thought a person could feel like a place. You feel like Jaisalmer at dusk — warm, vast, and completely unhurried.",
  primaryColor: '#c1693a', accentColor: '#b87333',
}

function Field({ label, name, value, onChange, type = 'text', hint, multiline }) {
  const cls = "w-full px-3 py-2 text-sm rounded-lg focus:outline-none"
  const style = { background: 'rgba(193,105,58,0.06)', border: '1px solid rgba(193,105,58,0.18)', color: '#e0c4a0' }
  return (
    <div>
      <label className="block text-xs font-semibold text-orange-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-orange-900/40 mb-1">{hint}</p>}
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
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#180f06', border: '1px solid rgba(193,105,58,0.2)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#0f0804', borderBottom: '1px solid rgba(193,105,58,0.12)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-orange-950" /><div className="w-2.5 h-2.5 rounded-full bg-orange-950" /><div className="w-2.5 h-2.5 rounded-full bg-orange-950" />
        <div className="ml-2 flex-1 rounded-full px-3 py-0.5 text-xs font-mono truncate" style={{ background: 'rgba(193,105,58,0.06)', color: '#5a3020' }}>
          {data.groom?.toLowerCase() || 'groom'}-weds-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      <div className="px-8 py-10 text-center">
        <p className="text-xs tracking-[0.4em] uppercase mb-4 text-orange-700">Save the Date · Jaisalmer</p>
        <h1 className="font-display italic text-3xl font-light mb-0" style={{ color: '#f0d4b8' }}>{data.bride || 'Bride'}</h1>
        <p className="font-display italic text-base my-1 text-orange-600">weds</p>
        <h1 className="font-display italic text-3xl font-light mb-4" style={{ color: '#f0d4b8' }}>{data.groom || 'Groom'}</h1>
        <p className="font-display text-sm text-orange-600 tracking-widest mb-1">{formatted}</p>
        <p className="text-xs text-orange-900/50 mb-4">{data.venue || 'Venue TBD'}</p>
        {data.tagline && <p className="italic text-xs text-orange-900/50 mb-6 max-w-xs mx-auto leading-relaxed">{data.tagline}</p>}
        <div className="inline-flex gap-5 px-6 py-3 rounded-xl mb-6"
          style={{ background: 'rgba(193,105,58,0.06)', border: '1px solid rgba(193,105,58,0.15)' }}>
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <p className="font-display text-2xl font-light text-orange-500">{n}</p>
              <p className="text-xs text-orange-900/50">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {['Envelope Reveal', 'Multi-day', 'Her Words', 'Desert Story'].map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(193,105,58,0.08)', border: '1px solid rgba(193,105,58,0.2)', color: data.primaryColor }}>
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center py-3 text-xs tracking-widest text-orange-700" style={{ background: 'rgba(193,105,58,0.06)', borderTop: '1px solid rgba(193,105,58,0.1)' }}>
        {data.hashtag || '#YourHashtag'}
      </div>
    </div>
  )
}

export default function DesertDuskEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  const sectionStyle = { background: 'rgba(193,105,58,0.04)', border: '1px solid rgba(193,105,58,0.12)' }

  return (
    <div className="min-h-screen font-body" style={{ background: '#0f0804' }}>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(15,8,4,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(193,105,58,0.15)' }}>
        <div className="flex items-center gap-3">
          <Link to="/templates/desert-dusk" className="text-xs text-orange-900/50 tracking-widest">← Preview</Link>
          <span className="text-orange-950">|</span>
          <p className="font-display text-base font-semibold text-orange-600">Customise: Desert Dusk</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/desert-dusk" className="text-xs px-4 py-2 rounded-full" style={{ border: '1px solid rgba(193,105,58,0.35)', color: '#c1693a' }}>Preview Live</Link>
          <button onClick={handleSave} className="text-xs font-semibold px-5 py-2 rounded-full"
            style={{ background: 'rgba(193,105,58,0.12)', border: '1px solid rgba(193,105,58,0.35)', color: '#c1693a' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-orange-600">Couple Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bride's Name" name="bride" value={data.bride} onChange={handle} />
              <Field label="Groom's Name" name="groom" value={data.groom} onChange={handle} />
            </div>
            <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="#YourHashtag" />
            <Field label="Tagline" name="tagline" value={data.tagline} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-orange-600">Wedding Info</h2>
            <Field label="Wedding Date" name="date" type="date" value={data.date} onChange={handle} />
            <Field label="Venue Name" name="venue" value={data.venue} onChange={handle} />
            <Field label="Venue Address" name="venueAddress" value={data.venueAddress} onChange={handle} />
            <Field label="RSVP Deadline" name="rsvpDeadline" type="date" value={data.rsvpDeadline} onChange={handle} />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-orange-600">Her Words</h2>
            <Field label="Bride's personal letter" name="herWords" value={data.herWords} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-orange-600">His Words</h2>
            <Field label="Groom's personal letter" name="hisWords" value={data.hisWords} onChange={handle} multiline />
          </div>
          <div className="rounded-2xl p-5" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-orange-600 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Terracotta', 'primaryColor'], ['Copper', 'accentColor']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-orange-700 mb-2">{label}</label>
                  <div className="flex items-center gap-3">
                    <input type="color" name={name} value={data[name]} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer"
                      style={{ borderColor: 'rgba(193,105,58,0.4)', background: 'transparent' }} />
                    <span className="text-xs text-orange-900/40">{data[name]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-3 font-semibold text-sm tracking-widest uppercase rounded-xl"
            style={{ background: 'rgba(193,105,58,0.12)', border: '1px solid rgba(193,105,58,0.35)', color: '#c1693a' }}>
            {saved ? '✓ Saved!' : 'Save & Publish'}
          </button>
        </div>
        <div className="sticky top-24">
          <p className="text-xs text-center mb-3 tracking-widest uppercase text-orange-900/40">Live Preview</p>
          <LivePreview data={data} />
        </div>
      </div>
    </div>
  )
}
