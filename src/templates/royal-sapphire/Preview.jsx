import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useFadeIn() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, visible]
}
function FadeUp({ children, delay = 0, fromX = 0, className = '' }) {
  const [ref, visible] = useFadeIn()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateY(28px) translateX(${fromX}px)`,
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>{children}</div>
  )
}

const W = {
  bride: 'Meera', groom: 'Vikram',
  date: '2025-12-20T00:00:00',
  venue: 'Taj Falaknuma Palace, Hyderabad',
  venueAddress: 'Engine Bowli, Falaknuma, Hyderabad, Telangana 500053',
  hashtag: '#MeeraWedVikram',
}

function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id) }, [])
  return time
}

function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-indigo-100 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800">← Back to WedSite Studio</Link>
      <p className="text-xs text-gray-400 italic">Preview — Royal Sapphire Template</p>
      <Link to="/templates/royal-sapphire/edit" className="text-sm font-semibold bg-indigo-700 text-white px-4 py-1.5 rounded-full hover:bg-indigo-900 transition-colors">Customise This →</Link>
    </div>
  )
}

function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-center text-center px-6 pt-20 relative">
      {/* Royal crest decoration */}
      <div className="w-20 h-20 border-2 border-indigo-200 rounded-full flex items-center justify-center mb-6 bg-white shadow-sm">
        <span className="text-3xl">👑</span>
      </div>
      <p className="text-indigo-400 text-xs tracking-[0.4em] uppercase mb-4 font-medium">A Royal Celebration</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold text-indigo-900 mb-3">
        {bride} <span className="text-indigo-400 italic">&amp;</span> {groom}
      </h1>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-16 bg-indigo-200" />
        <span className="text-indigo-400">◆</span>
        <div className="h-px w-16 bg-indigo-200" />
      </div>
      <p className="text-indigo-600 font-medium mb-1 tracking-wider">{formatted}</p>
      <p className="text-gray-400 text-sm mb-10">{venue}</p>

      <div className="flex gap-4 md:gap-8 mb-12">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-700 rounded-2xl shadow-lg flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-white">
              {String(val).padStart(2, '0')}
            </div>
            <p className="text-xs text-indigo-400 mt-2 tracking-widest uppercase">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Registry', 'Venue'].map((s) => (
          <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 border-2 border-indigo-700 text-indigo-700 text-sm font-semibold rounded-full hover:bg-indigo-700 hover:text-white transition-colors">
            {s}
          </a>
        ))}
      </div>
      <div className="mt-16 text-indigo-300 text-2xl animate-bounce">↓</div>
    </section>
  )
}

function OurStory() {
  const milestones = [
    { year: '2017', icon: '🎓', event: 'Both studied law at NLSIU Bangalore. They debated everything — and fell for each other anyway.' },
    { year: '2020', icon: '🌃', event: 'Their first official date: dinner at Taj West End. Meera wore blue. Vikram remembered.' },
    { year: '2023', icon: '🇮🇹', event: 'A holiday in Italy. Venice, Rome, Florence — and the moment he knew.' },
    { year: '2025', icon: '💎', event: 'He proposed at Falaknuma — the most royal setting for the most important question.' },
  ]
  return (
    <section id="our-story" className="py-24 bg-indigo-50 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">A Story Worth Telling</p>
        <h2 className="font-display text-4xl font-bold text-indigo-900 mb-12">Our Story</h2>
        <div className="flex flex-col gap-8">
          {milestones.map((m, i) => (
            <div key={m.year} className={`flex items-start gap-6 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center text-2xl shrink-0 shadow-md">{m.icon}</div>
              <div className="bg-white border border-indigo-100 rounded-2xl p-5 flex-1 text-left shadow-sm">
                <p className="text-indigo-400 text-xs font-semibold mb-1 tracking-widest">{m.year}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Schedule() {
  const events = [
    { time: '11:00 AM', title: 'Baraat Procession', location: 'Palace Gates', icon: '🐎' },
    { time: '12:30 PM', title: 'Varmaala Ceremony', location: 'Durbar Hall', icon: '💐' },
    { time: '02:00 PM', title: 'Wedding Lunch', location: 'Zenana Courtyard', icon: '🍽️' },
    { time: '05:00 PM', title: 'Pheras & Vows', location: 'Palace Garden', icon: '🔥' },
    { time: '07:30 PM', title: 'Cocktail Hour', location: 'Billiard Room', icon: '🥃' },
    { time: '09:00 PM', title: 'Grand Reception Dinner', location: 'Ballroom', icon: '✨' },
  ]
  return (
    <section id="schedule" className="py-24 bg-white px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">The Royal Day</p>
        <h2 className="font-display text-4xl font-bold text-indigo-900 mb-12">Schedule</h2>
        <div className="flex flex-col gap-3">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 border-l-4 border-indigo-700 bg-indigo-50 rounded-r-2xl px-6 py-4 text-left">
              <span className="text-2xl">{e.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-indigo-900">{e.title}</p>
                <p className="text-xs text-gray-400">{e.location}</p>
              </div>
              <p className="text-sm font-bold text-indigo-700 whitespace-nowrap">{e.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RSVP() {
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'yes', meal: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }
  const cls = "w-full border border-indigo-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
  return (
    <section id="rsvp" className="py-24 bg-indigo-50 px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">Your Presence Is Requested</p>
        <h2 className="font-display text-4xl font-bold text-indigo-900 mb-4">RSVP</h2>
        <p className="text-gray-400 text-sm mb-10">Kindly respond by 30th November 2025</p>
        {submitted ? (
          <div className="bg-white border border-indigo-200 rounded-2xl p-10 shadow-sm">
            <p className="text-4xl mb-4">👑</p>
            <h3 className="font-display text-2xl font-bold text-indigo-700 mb-2">We are honoured, {form.name}</h3>
            <p className="text-gray-400 text-sm">We look forward to celebrating this royal occasion with you.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={cls}>
                <option value="yes">Accept with pleasure</option>
                <option value="no">Regretfully decline</option>
              </select>
              <select name="guests" value={form.guests} onChange={handle} className={cls}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <select name="meal" value={form.meal} onChange={handle} className={cls}>
              <option value="">Meal preference…</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="jain">Jain</option>
            </select>
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A message for the couple" className={`${cls} resize-none`} />
            <button type="submit" className="bg-indigo-700 text-white font-semibold py-3 rounded-xl hover:bg-indigo-900 transition-colors text-sm tracking-wide">
              Confirm Attendance ◆
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const RS_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/rs-g1/800/560', caption: 'Orientation Week' },
  { id: 2, img: 'https://picsum.photos/seed/rs-g2/560/780', caption: 'First Date' },
  { id: 3, img: 'https://picsum.photos/seed/rs-g3/800/540', caption: 'Italy Together' },
  { id: 4, img: 'https://picsum.photos/seed/rs-g4/560/800', caption: 'The Proposal' },
  { id: 5, img: 'https://picsum.photos/seed/rs-g5/800/560', caption: 'Getting Ready' },
  { id: 6, img: 'https://picsum.photos/seed/rs-g6/560/720', caption: 'The Ceremony' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-indigo-50 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-bold text-indigo-900">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {RS_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(55,48,163,0.75) 0%, transparent 60%)' }}>
                  <p className="text-indigo-100 text-sm font-display italic">{p.caption}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }} onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.caption} className="w-full max-h-[82vh] object-contain rounded-2xl" />
            <p className="text-center font-display italic mt-4 text-indigo-300">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(55,48,163,0.25)', color: '#818cf8', border: '1px solid rgba(55,48,163,0.4)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

function Registry() {
  const items = [
    { store: 'Pottery Barn', icon: '🏠', desc: 'Premium home furnishings' },
    { store: 'Tanishq Gold', icon: '💛', desc: 'Fine gold & jewellery' },
    { store: 'Europe Honeymoon Fund', icon: '✈️', desc: 'Help us explore the world' },
  ]
  return (
    <section id="registry" className="py-24 bg-white px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">Gift Registry</p>
        <h2 className="font-display text-4xl font-bold text-indigo-900 mb-4">Registry</h2>
        <p className="text-gray-400 text-sm mb-10">Your presence is our greatest gift. Should you wish to contribute further:</p>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <a key={item.store} href="#"
              className="flex items-center gap-5 border-2 border-indigo-100 rounded-2xl px-6 py-5 text-left hover:border-indigo-400 transition-colors group">
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-indigo-900 group-hover:text-indigo-700">{item.store}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <span className="text-indigo-300 group-hover:text-indigo-600">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 bg-indigo-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-indigo-400 text-xs tracking-widest uppercase mb-3">Location</p>
        <h2 className="font-display text-4xl font-bold text-indigo-900 mb-4">Venue</h2>
        <p className="text-gray-700 font-medium mb-1">{venue}</p>
        <p className="text-gray-400 text-sm mb-8">{venueAddress}</p>
        <div className="bg-white border border-indigo-100 rounded-2xl h-52 flex flex-col items-center justify-center gap-3 mb-6 shadow-sm">
          <span className="text-4xl">🗺️</span>
          <p className="text-indigo-300 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-900 transition-colors text-sm">
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏰', title: 'Stay', info: 'Taj Falaknuma Palace — on-site luxury rooms available' },
            { icon: '🚁', title: 'Transport', info: 'Helicopter transfers from Hyderabad airport (on request)' },
            { icon: '✈️', title: 'Airport', info: '40 min from Rajiv Gandhi International Airport' },
          ].map(t => (
            <div key={t.title} className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-sm">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-semibold text-indigo-900 text-sm mb-1">{t.title}</p>
              <p className="text-xs text-gray-400">{t.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WeddingFooter({ bride, groom, hashtag }) {
  return (
    <footer className="bg-indigo-900 text-white py-16 px-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-12 bg-indigo-700" />
        <span className="text-indigo-400 text-lg">◆</span>
        <div className="h-px w-12 bg-indigo-700" />
      </div>
      <p className="font-display text-3xl font-bold mb-2">{bride} &amp; {groom}</p>
      <p className="text-indigo-400 text-sm mb-6">{hashtag}</p>
      <p className="text-indigo-600 text-xs">Made with ❤️ by <Link to="/" className="underline hover:text-white">WedSite Studio</Link></p>
    </footer>
  )
}

export default function RoyalSapphirePreview() {
  return (
    <div className="font-body">
      <TopBar />
      <Hero bride={W.bride} groom={W.groom} date={W.date} venue={W.venue} />
      <OurStory />
      <Schedule />
      <RSVP />
      <Gallery />
      <Registry />
      <Venue venue={W.venue} venueAddress={W.venueAddress} />
      <WeddingFooter bride={W.bride} groom={W.groom} hashtag={W.hashtag} />
    </div>
  )
}
