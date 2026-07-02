import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Priya',
  groom: 'Rahul',
  date: '2025-02-14',
  venue: 'The Grand Leela Palace, Mumbai',
  venueAddress: 'Sahar Airport Rd, Andheri East, Mumbai',
  hashtag: '#PriyaWedRahul',
  rsvpDeadline: '2025-01-31',
  story: 'We met at a college fest in Pune and have been inseparable ever since. After years of adventures together, he proposed under fairy lights on a Mumbai rooftop — and she said yes!',
  primaryColor: '#f48fb1',
  accentColor: '#880e4f',
  photo1: '', photo2: '', photo3: '', photo4: '', photo5: '', photo6: '',
}

function Field({ label, name, value, onChange, type = 'text', hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
      />
    </div>
  )
}

function LivePreview({ data }) {
  const formatted = data.date
    ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded-full px-3 py-0.5 text-xs text-gray-400 font-mono truncate">
          {data.groom?.toLowerCase() || 'groom'}-and-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>

      {/* Hero preview */}
      <div className="px-6 py-10 text-center">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: data.primaryColor }}>
          Together Forever
        </p>
        <h1 className="font-display text-3xl font-bold mb-1" style={{ color: data.accentColor }}>
          {data.bride || 'Bride'} <span style={{ color: data.primaryColor }}>&amp;</span> {data.groom || 'Groom'}
        </h1>
        <p className="text-sm font-medium mt-1 mb-0.5" style={{ color: data.primaryColor }}>{formatted}</p>
        <p className="text-xs text-gray-400 mb-6">{data.venue || 'Venue TBD'}</p>

        {/* Countdown tiles */}
        <div className="flex justify-center gap-2 mb-6">
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Mins'], ['00', 'Secs']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-xl border flex items-center justify-center font-display text-lg font-bold shadow-sm" style={{ color: data.accentColor, borderColor: data.primaryColor + '40' }}>
                {n}
              </div>
              <p className="text-xs mt-1" style={{ color: data.primaryColor }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Nav pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Our Story', 'Schedule', 'RSVP', 'Gallery'].map((s) => (
            <span key={s} className="text-xs text-white px-3 py-1 rounded-full" style={{ background: data.primaryColor }}>
              {s}
            </span>
          ))}
        </div>

        {/* Story snippet */}
        {data.story && (
          <div className="bg-white/70 rounded-xl p-4 border text-left" style={{ borderColor: data.primaryColor + '30' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: data.primaryColor }}>Our Story</p>
            <p className="text-xs text-gray-500 line-clamp-3">{data.story}</p>
          </div>
        )}
      </div>

      {/* Gallery preview */}
      <div className="grid grid-cols-3 gap-1 px-4 pb-4">
        {[1,2,3,4,5,6].map(n => {
          const url = data[`photo${n}`] || `https://picsum.photos/seed/br-g${n}/200/200`
          return <img key={n} src={url} alt={`Photo ${n}`} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
        })}
      </div>

      {/* Hashtag footer */}
      <div className="py-4 text-center border-t" style={{ borderColor: data.primaryColor + '30', background: data.accentColor }}>
        <p className="text-xs text-white font-medium">{data.hashtag || '#YourWeddingHashtag'}</p>
      </div>
    </div>
  )
}

export default function BlushRomanceEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    // In production this would POST to your backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/templates/blush-romance" className="text-sm text-gray-400 hover:text-gray-600">← Preview</Link>
          <span className="text-gray-200">|</span>
          <p className="font-display text-lg font-semibold text-pink-800">
            Customise: <span className="text-pink-400">Blush Romance</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/templates/blush-romance"
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded-full"
          >
            Preview Live
          </Link>
          <button
            onClick={handleSave}
            className="text-sm font-semibold bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition-colors"
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Editor layout */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: form */}
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
              <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="e.g. #PriyaWedRahul" />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Your Story</h2>
            <label className="block text-xs font-semibold text-gray-600 mb-1">How you met</label>
            <textarea
              name="story"
              value={data.story}
              onChange={handle}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400 resize-none"
            />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Primary Colour</label>
                <div className="flex items-center gap-2">
                  <input type="color" name="primaryColor" value={data.primaryColor} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-400">{data.primaryColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Accent Colour</label>
                <div className="flex items-center gap-2">
                  <input type="color" name="accentColor" value={data.accentColor} onChange={handle} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-400">{data.accentColor}</span>
                </div>
              </div>
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

          <button
            onClick={handleSave}
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-700 transition-colors text-sm"
          >
            {saved ? '✓ Changes Saved!' : 'Save & Publish Changes'}
          </button>
        </div>

        {/* Right: live preview */}
        <div className="sticky top-24">
          <p className="text-xs text-gray-400 text-center mb-3 tracking-widest uppercase">Live Preview</p>
          <LivePreview data={data} />
          <p className="text-xs text-gray-300 text-center mt-3">Updates as you type</p>
        </div>
      </div>
    </div>
  )
}
