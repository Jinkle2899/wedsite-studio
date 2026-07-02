import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Aisha',
  groom: 'Arjun',
  date: '2025-03-22',
  venue: 'The Oberoi, New Delhi',
  venueAddress: 'Dr. Zakir Hussain Marg, New Delhi',
  hashtag: '#AishaWedArjun',
  rsvpDeadline: '2025-03-01',
  streamLink: 'https://youtube.com/live/example',
  story: 'Met at IIM Ahmedabad and have been inseparable ever since. He proposed at The Oberoi with her grandmother\'s ring.',
  primaryColor: '#c9956b',
  accentColor: '#ffffff',
  photo1: '', photo2: '', photo3: '', photo4: '', photo5: '', photo6: '',
}

function Field({ label, name, value, onChange, type = 'text', hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-600 mb-1">{hint}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-700 placeholder-gray-600"
      />
    </div>
  )
}

function LivePreview({ data }) {
  const formatted = data.date
    ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div className="bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="ml-2 flex-1 bg-white/5 rounded-full px-3 py-0.5 text-xs text-gray-600 font-mono truncate">
          {data.groom?.toLowerCase() || 'groom'}-and-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>

      {/* Preview */}
      <div className="px-6 py-10 text-center relative">
        {/* Decorative ring */}
        <div className="absolute w-48 h-48 rounded-full border border-yellow-800/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: data.primaryColor }}>
          An Intimate Celebration
        </p>
        <h1 className="font-display text-3xl font-bold mb-3" style={{ color: data.accentColor }}>
          {data.bride || 'Bride'}{' '}
          <span style={{ color: data.primaryColor }}>&amp;</span>{' '}
          {data.groom || 'Groom'}
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
          <span style={{ color: data.primaryColor }}>♦</span>
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
        </div>

        <p className="text-sm font-medium mb-1 tracking-wider" style={{ color: data.primaryColor }}>{formatted}</p>
        <p className="text-gray-600 text-xs mb-6">{data.venue || 'Venue TBD'}</p>

        {/* Countdown tiles */}
        <div className="flex justify-center gap-2 mb-6">
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center font-display text-base font-bold bg-white/5"
                style={{ border: `1px solid ${data.primaryColor}40`, color: data.primaryColor }}
              >
                {n}
              </div>
              <p className="text-xs mt-1 text-gray-600">{l}</p>
            </div>
          ))}
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Our Story', 'Schedule', 'RSVP', 'Live Stream'].map((s) => (
            <span
              key={s}
              className="text-xs px-3 py-1 rounded-full border font-semibold"
              style={{ borderColor: data.primaryColor + '60', color: data.primaryColor }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Story */}
        {data.story && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-left">
            <p className="text-xs font-semibold mb-1" style={{ color: data.primaryColor }}>Our Story</p>
            <p className="text-xs text-gray-500 line-clamp-3">{data.story}</p>
          </div>
        )}
      </div>

      {/* Gallery preview */}
      <div className="grid grid-cols-3 gap-1 px-4 pb-4">
        {[1,2,3,4,5,6].map(n => {
          const url = data[`photo${n}`] || `https://picsum.photos/seed/ne-g${n}/200/200`
          return <img key={n} src={url} alt={`Photo ${n}`} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
        })}
      </div>
      {/* Footer strip */}
      <div className="py-4 text-center border-t border-white/10 bg-zinc-950">
        <p className="text-xs font-medium" style={{ color: data.primaryColor }}>{data.hashtag || '#YourWeddingHashtag'}</p>
      </div>
    </div>
  )
}

export default function NoirEleganceEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setSaved(false)
  }
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputClass = "w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-700"

  return (
    <div className="min-h-screen bg-zinc-950 font-body">
      {/* Top bar */}
      <div className="bg-black border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/templates/noir-elegance" className="text-sm text-gray-500 hover:text-gray-300">← Preview</Link>
          <span className="text-gray-800">|</span>
          <p className="font-display text-lg font-semibold text-white">
            Customise: <span className="text-yellow-600">Noir Elegance</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/templates/noir-elegance"
            className="text-sm text-gray-400 hover:text-white px-4 py-2 border border-white/10 rounded-full"
          >
            Preview Live
          </Link>
          <button
            onClick={handleSave}
            className="text-sm font-semibold bg-yellow-600 text-black px-5 py-2 rounded-full hover:bg-yellow-500 transition-colors"
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-4">Couple Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bride's Name" name="bride" value={data.bride} onChange={handle} />
              <Field label="Groom's Name" name="groom" value={data.groom} onChange={handle} />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-4">Wedding Info</h2>
            <div className="flex flex-col gap-4">
              <Field label="Wedding Date" name="date" type="date" value={data.date} onChange={handle} />
              <Field label="Venue Name" name="venue" value={data.venue} onChange={handle} />
              <Field label="Venue Address" name="venueAddress" value={data.venueAddress} onChange={handle} />
              <Field label="RSVP Deadline" name="rsvpDeadline" type="date" value={data.rsvpDeadline} onChange={handle} />
              <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="e.g. #AishaWedArjun" />
              <Field label="Live Stream Link" name="streamLink" value={data.streamLink} onChange={handle} hint="YouTube / Zoom link" />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-4">Your Story</h2>
            <label className="block text-xs font-semibold text-gray-400 mb-1">How you met</label>
            <textarea
              name="story"
              value={data.story}
              onChange={handle}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Rose Gold Accent</label>
                <div className="flex items-center gap-2">
                  <input type="color" name="primaryColor" value={data.primaryColor} onChange={handle} className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent" />
                  <span className="text-xs text-gray-500">{data.primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Text Colour</label>
                <div className="flex items-center gap-2">
                  <input type="color" name="accentColor" value={data.accentColor} onChange={handle} className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent" />
                  <span className="text-xs text-gray-500">{data.accentColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-2">Gallery Photos</h2>
            <p className="text-xs text-gray-600 mb-4">Paste image URLs — leave blank to use beautiful placeholders</p>
            <div className="flex flex-col gap-3">
              {[1,2,3,4,5,6].map(n => (
                <Field key={n} label={`Photo ${n} URL`} name={`photo${n}`} value={data[`photo${n}`]} onChange={handle} hint={n === 1 ? 'e.g. https://your-image-host.com/photo.jpg' : ''} />
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-yellow-600 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors text-sm tracking-wider uppercase"
          >
            {saved ? '✓ Changes Saved!' : 'Save & Publish Changes'}
          </button>
        </div>

        {/* Live preview */}
        <div className="sticky top-24">
          <p className="text-xs text-gray-600 text-center mb-3 tracking-widest uppercase">Live Preview</p>
          <LivePreview data={data} />
          <p className="text-xs text-gray-700 text-center mt-3">Updates as you type</p>
        </div>
      </div>
    </div>
  )
}
