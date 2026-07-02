import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Yoshita', groom: 'Jinkle',
  date: '2025-11-26', venue: 'Aashish Vatika, Udaipur',
  venueAddress: 'Fateh Sagar Lake Road, Udaipur, Rajasthan 313001',
  hashtag: '#JinkleWedYoshita', rsvpDeadline: '2025-11-01',
  tagline: 'Two souls. One monsoon. A forever begins by the lakes of Mewar.',
  herWords: "I didn't know what I was looking for — but I knew it when I found it. You are the home I didn't know I needed.",
  hisWords: "You make ordinary moments feel significant. I'm not nervous about forever. I just don't want it to start without you.",
  primaryColor: '#c9a84c', accentColor: '#8b6914',
}

function Field({ label, name, value, onChange, type = 'text', hint, multiline }) {
  const cls = "w-full px-3 py-2 text-sm rounded-lg focus:outline-none"
  const style = { background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#e8dab8' }
  return (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: '#c9a84c' }}>{label}</label>
      {hint && <p className="text-xs mb-1" style={{ color: '#6b5d3a' }}>{hint}</p>}
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
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#0f0a04', border: '1px solid rgba(201,168,76,0.15)' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#1a1108', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-800" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-800" /><div className="w-2.5 h-2.5 rounded-full bg-green-900" />
        <div className="ml-2 flex-1 rounded-full px-3 py-0.5 text-xs font-mono truncate" style={{ background: 'rgba(201,168,76,0.06)', color: '#6b5d3a' }}>
          {data.groom?.toLowerCase() || 'groom'}-weds-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      {/* Preview content */}
      <div className="px-8 py-10 text-center relative" style={{ background: 'linear-gradient(180deg, #0f0a04 0%, #1a1108 100%)' }}>
        {/* Decorative ring */}
        <div className="absolute w-48 h-48 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.08)' }} />
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: data.primaryColor }}>Save the Date · Udaipur</p>
        <div className="mb-4">
          <h1 className="font-display italic text-3xl font-light" style={{ color: '#f5e8c5' }}>{data.bride || 'Bride'}</h1>
          <p className="font-display italic text-base my-1" style={{ color: data.primaryColor }}>weds</p>
          <h1 className="font-display italic text-3xl font-light" style={{ color: '#f5e8c5' }}>{data.groom || 'Groom'}</h1>
        </div>
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
          <p className="font-display text-sm" style={{ color: data.primaryColor }}>{formatted}</p>
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
        </div>
        <p className="text-xs mb-4" style={{ color: '#6b5d3a' }}>{data.venue || 'Venue TBD'}</p>
        {data.tagline && <p className="italic text-xs max-w-xs mx-auto leading-relaxed mb-6" style={{ color: '#8b7a56' }}>{data.tagline}</p>}
        {/* Mini countdown */}
        <div className="inline-flex gap-5 px-6 py-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.1)' }}>
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <p className="font-display text-2xl font-light" style={{ color: data.primaryColor }}>{n}</p>
              <p className="text-xs" style={{ color: '#6b5d3a' }}>{l}</p>
            </div>
          ))}
        </div>
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['Envelope Reveal', 'Multi-day Schedule', 'Her Words', 'Chapter Story'].map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: data.primaryColor }}>
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center py-3 text-xs tracking-widest" style={{ background: 'rgba(201,168,76,0.06)', color: data.primaryColor }}>
        {data.hashtag || '#YourHashtag'}
      </div>
    </div>
  )
}

export default function LakePalaceEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  const section = "rounded-2xl p-5 flex flex-col gap-4"
  const sectionStyle = { background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }

  return (
    <div className="min-h-screen font-body" style={{ background: '#0a0702' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(10,7,2,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="flex items-center gap-3">
          <Link to="/templates/lake-palace" className="text-xs tracking-widest" style={{ color: '#6b5d3a' }}>← Preview</Link>
          <span style={{ color: '#2d2010' }}>|</span>
          <p className="font-display text-base font-semibold" style={{ color: '#c9a84c' }}>Customise: Lake Palace</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/lake-palace" className="text-xs px-4 py-2 rounded-full" style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}>
            Preview Live
          </Link>
          <button onClick={handleSave} className="text-xs font-semibold px-5 py-2 rounded-full transition-colors"
            style={{ background: saved ? '#3a6b1a' : 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="flex flex-col gap-5">
          <div className={section} style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#c9a84c' }}>Couple Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bride's Name" name="bride" value={data.bride} onChange={handle} />
              <Field label="Groom's Name" name="groom" value={data.groom} onChange={handle} />
            </div>
            <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="#YourHashtag" />
            <Field label="Tagline" name="tagline" value={data.tagline} onChange={handle} multiline hint="Short poetic line on the hero" />
          </div>

          <div className={section} style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#c9a84c' }}>Wedding Info</h2>
            <Field label="Wedding Date" name="date" type="date" value={data.date} onChange={handle} />
            <Field label="Venue Name" name="venue" value={data.venue} onChange={handle} />
            <Field label="Venue Address" name="venueAddress" value={data.venueAddress} onChange={handle} />
            <Field label="RSVP Deadline" name="rsvpDeadline" type="date" value={data.rsvpDeadline} onChange={handle} />
          </div>

          <div className={section} style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#c9a84c' }}>Her Words</h2>
            <Field label="Bride's personal letter" name="herWords" value={data.herWords} onChange={handle} multiline />
          </div>

          <div className={section} style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#c9a84c' }}>His Words</h2>
            <Field label="Groom's personal letter" name="hisWords" value={data.hisWords} onChange={handle} multiline />
          </div>

          <div className={section} style={sectionStyle}>
            <h2 className="font-display text-lg font-semibold" style={{ color: '#c9a84c' }}>Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Gold', 'primaryColor'], ['Deep Gold', 'accentColor']].map(([label, name]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold mb-2" style={{ color: '#c9a84c' }}>{label}</label>
                  <div className="flex items-center gap-3">
                    <input type="color" name={name} value={data[name]} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer"
                      style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'transparent' }} />
                    <span className="text-xs" style={{ color: '#6b5d3a' }}>{data[name]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSave} className="w-full py-3 font-semibold text-sm tracking-widest uppercase rounded-xl transition-colors"
            style={{ background: saved ? 'rgba(58,107,26,0.3)' : 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
            {saved ? '✓ Saved!' : 'Save & Publish'}
          </button>
        </div>

        {/* Preview */}
        <div className="sticky top-24">
          <p className="text-xs text-center mb-3 tracking-widest uppercase" style={{ color: '#6b5d3a' }}>Live Preview</p>
          <LivePreview data={data} />
        </div>
      </div>
    </div>
  )
}
