import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Ananya', groom: 'Arjun',
  date: '2025-12-07', venue: 'Dera Amer, Jaipur',
  venueAddress: 'Dera Amer, Opposite Hathroyi Fort, Jaipur, Rajasthan 302028',
  hashtag: '#ArjunWedAnanya', rsvpDeadline: '2025-11-20',
  tagline: 'Where jasmine meets the courtyard, and old roses spell forever.',
  herWords: "I never expected to find you in the middle of someone else's party. But here we are — choosing the same future.",
  hisWords: "I watched you read book spines at a party where no one reads. I knew then that I wanted to spend my life with you.",
  primaryColor: '#1a4731', accentColor: '#5db87a',
}

function Field({ label, name, value, onChange, type = 'text', hint, multiline }) {
  const cls = "w-full px-3 py-2 text-sm rounded-lg focus:outline-none"
  const style = { background: 'rgba(26,71,49,0.08)', border: '1px solid rgba(26,71,49,0.25)', color: '#c8e0c8' }
  return (
    <div>
      <label className="block text-xs font-semibold text-emerald-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-emerald-900/50 mb-1">{hint}</p>}
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
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0a1a0f', border: '1px solid rgba(26,71,49,0.3)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#070f09', borderBottom: '1px solid rgba(26,71,49,0.2)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-900" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-900" /><div className="w-2.5 h-2.5 rounded-full bg-green-900" />
        <div className="ml-2 flex-1 rounded-full px-3 py-0.5 text-xs font-mono truncate" style={{ background: 'rgba(26,71,49,0.1)', color: '#3d6b4a' }}>
          {data.groom?.toLowerCase() || 'groom'}-weds-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      <div className="px-8 py-10 text-center">
        <p className="text-xs tracking-[0.4em] uppercase mb-4 text-emerald-700">Save the Date · Jaipur</p>
        <h1 className="font-display italic text-3xl font-light mb-0" style={{ color: '#e8f0e8' }}>{data.bride || 'Bride'}</h1>
        <p className="font-display italic text-base my-1 text-emerald-600">weds</p>
        <h1 className="font-display italic text-3xl font-light mb-4" style={{ color: '#e8f0e8' }}>{data.groom || 'Groom'}</h1>
        <p className="font-display text-sm text-emerald-600 tracking-widest mb-1">{formatted}</p>
        <p className="text-xs text-emerald-900/60 mb-6">{data.venue || 'Venue TBD'}</p>
        {data.tagline && <p className="italic text-xs text-emerald-900/60 mb-6 max-w-xs mx-auto leading-relaxed">{data.tagline}</p>}
        <div className="inline-flex gap-5 px-6 py-3 rounded-xl mb-6"
          style={{ background: 'rgba(26,71,49,0.12)', border: '1px solid rgba(26,71,49,0.25)' }}>
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <p className="font-display text-2xl font-light text-emerald-500">{n}</p>
              <p className="text-xs text-emerald-900/60">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {['Envelope Reveal', 'Multi-day', 'Her Words', 'Botanical'].map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(26,71,49,0.12)', border: '1px solid rgba(26,71,49,0.25)', color: data.accentColor }}>
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center py-3 text-xs tracking-widest text-emerald-700" style={{ background: 'rgba(26,71,49,0.1)', borderTop: '1px solid rgba(26,71,49,0.2)' }}>
        {data.hashtag || '#YourHashtag'}
      </div>
    </div>
  )
}

export default function MughalGardenEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  const sectionStyle = { background: 'rgba(26,71,49,0.06)', border: '1px solid rgba(26,71,49,0.15)' }

  return (
    <div className="min-h-screen font-body" style={{ background: '#070f09' }}>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(7,15,9,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(26,71,49,0.2)' }}>
        <div className="flex items-center gap-3">
          <Link to="/templates/mughal-garden" className="text-xs text-emerald-900/60 tracking-widest">← Preview</Link>
          <span className="text-emerald-950">|</span>
          <p className="font-display text-base font-semibold text-emerald-600">Customise: Mughal Garden</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/mughal-garden" className="text-xs px-4 py-2 rounded-full" style={{ border: '1px solid rgba(26,71,49,0.4)', color: '#5db87a' }}>Preview Live</Link>
          <button onClick={handleSave} className="text-xs font-semibold px-5 py-2 rounded-full"
            style={{ background: 'rgba(26,71,49,0.2)', border: '1px solid rgba(26,71,49,0.5)', color: '#5db87a' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-5">
          {[
            { title: 'Couple Details', fields: [
              { row: true, fields: [{ label: "Bride's Name", name: 'bride' }, { label: "Groom's Name", name: 'groom' }] },
              { label: 'Wedding Hashtag', name: 'hashtag', hint: '#YourHashtag' },
              { label: 'Tagline', name: 'tagline', multiline: true },
            ]},
            { title: 'Wedding Info', fields: [
              { label: 'Wedding Date', name: 'date', type: 'date' },
              { label: 'Venue Name', name: 'venue' },
              { label: 'Venue Address', name: 'venueAddress' },
              { label: 'RSVP Deadline', name: 'rsvpDeadline', type: 'date' },
            ]},
            { title: 'Her Words', fields: [{ label: "Bride's personal letter", name: 'herWords', multiline: true }] },
            { title: 'His Words', fields: [{ label: "Groom's personal letter", name: 'hisWords', multiline: true }] },
          ].map(sec => (
            <div key={sec.title} className="rounded-2xl p-5 flex flex-col gap-4" style={sectionStyle}>
              <h2 className="font-display text-lg font-semibold text-emerald-600">{sec.title}</h2>
              {sec.fields.map((f, i) =>
                f.row
                  ? <div key={i} className="grid grid-cols-2 gap-4">{f.fields.map(rf => <Field key={rf.name} {...rf} value={data[rf.name]} onChange={handle} />)}</div>
                  : <Field key={f.name} {...f} value={data[f.name]} onChange={handle} />
              )}
            </div>
          ))}
          <div className="rounded-2xl p-5" style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold text-emerald-600 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Emerald', 'primaryColor'], ['Light Green', 'accentColor']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-emerald-700 mb-2">{label}</label>
                  <div className="flex items-center gap-3">
                    <input type="color" name={name} value={data[name]} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer"
                      style={{ borderColor: 'rgba(26,71,49,0.4)', background: 'transparent' }} />
                    <span className="text-xs text-emerald-900/50">{data[name]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-3 font-semibold text-sm tracking-widest uppercase rounded-xl"
            style={{ background: 'rgba(26,71,49,0.2)', border: '1px solid rgba(26,71,49,0.5)', color: '#5db87a' }}>
            {saved ? '✓ Saved!' : 'Save & Publish'}
          </button>
        </div>
        <div className="sticky top-24">
          <p className="text-xs text-center mb-3 tracking-widest uppercase text-emerald-900/60">Live Preview</p>
          <LivePreview data={data} />
        </div>
      </div>
    </div>
  )
}
