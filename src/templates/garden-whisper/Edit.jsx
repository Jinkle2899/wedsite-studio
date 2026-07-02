import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEFAULTS = {
  bride: 'Kavya', groom: 'Rohan',
  date: '2025-11-08', venue: 'Wildflower Hall, Shimla',
  venueAddress: 'Mashobra, Shimla, HP 171007',
  hashtag: '#KavyaWedRohan', rsvpDeadline: '2025-10-15',
  story: 'Met on a Triund trek. He found her when she got lost on the trail — and they\'ve been finding each other ever since.',
  primaryColor: '#558b2f', accentColor: '#1b5e20',
  photo1: '', photo2: '', photo3: '', photo4: '', photo5: '', photo6: '',
}

function Field({ label, name, value, onChange, type = 'text', hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <input type={type} name={name} value={value} onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
    </div>
  )
}

function LivePreview({ data }) {
  const formatted = data.date ? new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
  return (
    <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl overflow-hidden border border-green-100 shadow-sm">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded-full px-3 py-0.5 text-xs text-gray-400 font-mono truncate">
          {data.groom?.toLowerCase() || 'groom'}-and-{data.bride?.toLowerCase() || 'bride'}.wedsite.in
        </div>
      </div>
      <div className="px-6 py-10 text-center relative">
        <div className="absolute top-4 left-4 text-3xl opacity-20">🌿</div>
        <div className="absolute top-4 right-4 text-3xl opacity-20">🌸</div>
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: data.primaryColor }}>A Boho Garden Wedding</p>
        <h1 className="font-display text-3xl font-bold mb-2" style={{ color: data.accentColor }}>
          {data.bride || 'Bride'} <span style={{ color: data.primaryColor }}>&amp;</span> {data.groom || 'Groom'}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
          <span style={{ color: data.primaryColor }}>🌿</span>
          <div className="h-px w-8" style={{ background: data.primaryColor + '60' }} />
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: data.primaryColor }}>{formatted}</p>
        <p className="text-gray-400 text-xs mb-6">{data.venue || 'Venue TBD'}</p>
        <div className="flex justify-center gap-2 mb-6">
          {[['42', 'Days'], ['08', 'Hrs'], ['30', 'Min'], ['00', 'Sec']].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <div className="w-11 h-11 bg-white rounded-xl border shadow-sm flex items-center justify-center font-display text-base font-bold"
                style={{ borderColor: data.primaryColor + '40', color: data.accentColor }}>{n}</div>
              <p className="text-xs mt-1" style={{ color: data.primaryColor }}>{l}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['Our Story', 'RSVP', 'Gallery', 'Venue'].map(s => (
            <span key={s} className="text-xs text-white px-3 py-1 rounded-full" style={{ background: data.primaryColor }}>{s}</span>
          ))}
        </div>
        {data.story && (
          <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-left">
            <p className="text-xs text-gray-500 line-clamp-2">{data.story}</p>
          </div>
        )}
      </div>
      {/* Gallery preview */}
      <div className="grid grid-cols-3 gap-1 px-4 pb-4">
        {[1,2,3,4,5,6].map(n => {
          const url = data[`photo${n}`] || `https://picsum.photos/seed/gw-g${n}/200/200`
          return <img key={n} src={url} alt={`Photo ${n}`} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
        })}
      </div>
      <div className="py-3 text-center border-t border-green-100" style={{ background: data.accentColor }}>
        <p className="text-xs text-white font-medium">{data.hashtag || '#YourHashtag'}</p>
      </div>
    </div>
  )
}

export default function GardenWhisperEdit() {
  const [data, setData] = useState(DEFAULTS)
  const [saved, setSaved] = useState(false)
  const handle = (e) => { setData({ ...data, [e.target.name]: e.target.value }); setSaved(false) }
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/templates/garden-whisper" className="text-sm text-gray-400 hover:text-gray-600">← Preview</Link>
          <span className="text-gray-200">|</span>
          <p className="font-display text-lg font-semibold">Customise: <span className="text-green-600">Garden Whisper</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/templates/garden-whisper" className="text-sm text-gray-500 px-4 py-2 border border-gray-200 rounded-full">Preview Live</Link>
          <button onClick={handleSave} className="text-sm font-semibold bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-800 transition-colors">
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
              <Field label="Wedding Hashtag" name="hashtag" value={data.hashtag} onChange={handle} hint="e.g. #KavyaWedRohan" />
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Your Story</h2>
            <textarea name="story" value={data.story} onChange={handle} rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Colours</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Primary (Sage Green)', 'primaryColor'], ['Accent (Deep Green)', 'accentColor']].map(([label, name]) => (
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
          <button onClick={handleSave} className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors text-sm">
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
