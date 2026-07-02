import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Sana', groom: 'Dev',
  date: '2025-10-03T00:00:00',
  venue: 'The Leela Palace, Bengaluru',
  venueAddress: '23, HAL Airport Road, Kodihalli, Bengaluru, 560008',
  hashtag: '#SanaWedDev',
}

function useFadeIn(t = 0.1) {
  const ref = useRef(null); const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: t })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, vis] = useFadeIn()
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)', transition: `opacity 0.75s ease ${delay}s,transform 0.75s ease ${delay}s` }}>{children}</div>
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-amber-100 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-amber-700 hover:text-amber-900">← Back to WedSite Studio</Link>
      <p className="text-xs text-gray-400 italic">Preview — Ivory Classic Template</p>
      <Link to="/templates/ivory-classic/edit" className="text-sm font-semibold bg-amber-700 text-white px-4 py-1.5 rounded-full hover:bg-amber-900 transition-colors">Customise This →</Link>
    </div>
  )
}

function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className="min-h-screen bg-amber-50 flex flex-col items-center justify-center text-center px-6 pt-20">
      {/* Monogram circle */}
      <div className="w-24 h-24 border border-amber-300 rounded-full flex items-center justify-center mb-6 bg-white">
        <span className="font-display text-2xl font-bold text-amber-700">{bride[0]}&amp;{groom[0]}</span>
      </div>
      <p className="text-amber-600 text-xs tracking-[0.5em] uppercase mb-5 font-medium">Request the honour of your presence</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-amber-900 mb-2">
        {bride}
      </h1>
      <p className="font-display text-2xl text-amber-500 italic mb-2">and</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-amber-900 mb-6">
        {groom}
      </h1>
      <p className="text-amber-600 text-sm tracking-[0.2em] mb-2">{formatted}</p>
      <p className="text-gray-400 text-sm mb-12">{venue}</p>

      <div className="flex gap-6 md:gap-10 mb-12">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
          <div key={label} className="flex flex-col items-center">
            <p className="font-display text-4xl md:text-5xl font-light text-amber-800">{String(val).padStart(2, '0')}</p>
            <p className="text-xs text-amber-500 mt-1 tracking-widest uppercase">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mb-12">
        <div className="h-px w-24 bg-amber-200" />
        <span className="text-amber-400 text-lg">✦</span>
        <div className="h-px w-24 bg-amber-200" />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Gallery', 'Venue'].map((s) => (
          <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 text-amber-700 border border-amber-300 text-sm font-medium rounded-full hover:bg-amber-700 hover:text-white transition-colors tracking-wide">
            {s}
          </a>
        ))}
      </div>
    </section>
  )
}

function OurStory() {
  const milestones = [
    { year: '2018', icon: '📚', event: 'Introduced through mutual friends at a literature festival in Jaipur. She was reading Tagore; he pretended he was too.' },
    { year: '2021', icon: '🎭', event: 'First date at a theatre performance in Bengaluru — they talked all night over masala chai afterward.' },
    { year: '2023', icon: '🌄', event: 'A quiet weekend in Coorg turned into their favourite memory.' },
    { year: '2025', icon: '🕊️', event: 'He proposed during a private dinner at Leela — with her mother\'s blessing and a single white rose.' },
  ]
  return (
    <section id="our-story" className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-amber-200" /><span className="text-amber-400">✦</span><div className="h-px w-12 bg-amber-200" />
        </div>
        <h2 className="font-display text-4xl font-light text-amber-900 mb-12">Our Story</h2>
        <div className="flex flex-col gap-8">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-6 text-left items-start">
              <div className="shrink-0 text-right w-16">
                <p className="text-amber-600 text-sm font-semibold">{m.year}</p>
                <p className="text-2xl mt-1">{m.icon}</p>
              </div>
              <div className="border-l border-amber-200 pl-6 pb-2">
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
    { time: '10:00 AM', title: 'Haldi Ceremony', location: 'Garden Terrace', icon: '🌼' },
    { time: '01:00 PM', title: 'Wedding Luncheon', location: 'The Grand Ballroom', icon: '🍽️' },
    { time: '04:30 PM', title: 'Wedding Ceremony', location: 'Palace Lawn', icon: '🕊️' },
    { time: '06:00 PM', title: 'Cocktail Hour', location: 'The Lobby Lounge', icon: '🥂' },
    { time: '08:00 PM', title: 'Reception Dinner', location: 'Grand Ballroom', icon: '✨' },
    { time: '10:30 PM', title: 'Farewell', location: 'Grand Foyer', icon: '🌙' },
  ]
  return (
    <section id="schedule" className="py-24 bg-amber-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-light text-amber-900 mb-12">Schedule</h2>
        <div className="flex flex-col">
          {events.map((e, i) => (
            <div key={e.time} className={`flex items-start gap-4 py-5 ${i < events.length - 1 ? 'border-b border-amber-100' : ''}`}>
              <p className="text-amber-600 text-sm font-medium w-20 shrink-0 text-right pt-0.5">{e.time}</p>
              <span className="text-amber-300 text-lg mt-0.5">✦</span>
              <div className="text-left">
                <p className="font-semibold text-amber-900">{e.icon} {e.title}</p>
                <p className="text-xs text-gray-400">{e.location}</p>
              </div>
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
  const cls = "w-full border border-amber-200 bg-amber-50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-gray-700"
  return (
    <section id="rsvp" className="py-24 bg-white px-6">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-4xl font-light text-amber-900 mb-2">RSVP</h2>
        <p className="text-gray-400 text-sm mb-10">Kindly respond by 15th September 2025</p>
        {submitted ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10">
            <p className="text-4xl mb-4">🕊️</p>
            <h3 className="font-display text-2xl font-light text-amber-800 mb-2">Thank you, {form.name}</h3>
            <p className="text-gray-400 text-sm">We look forward to celebrating with you.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={cls}>
                <option value="yes">Accepts with pleasure</option>
                <option value="no">Declines with regrets</option>
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
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A note for the couple" className={`${cls} resize-none`} />
            <button type="submit" className="border-2 border-amber-700 text-amber-700 font-semibold py-3 rounded-lg hover:bg-amber-700 hover:text-white transition-colors text-sm tracking-widest uppercase">
              Send Reply
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const IC_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/ic-g1/800/560', caption: 'Engagement' },
  { id: 2, img: 'https://picsum.photos/seed/ic-g2/560/780', caption: 'Getting Ready' },
  { id: 3, img: 'https://picsum.photos/seed/ic-g3/800/540', caption: 'The Proposal' },
  { id: 4, img: 'https://picsum.photos/seed/ic-g4/560/800', caption: 'Mehendi Morning' },
  { id: 5, img: 'https://picsum.photos/seed/ic-g5/800/560', caption: 'The Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/ic-g6/560/720', caption: 'Reception Dinner' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-amber-50 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-amber-500 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-light text-amber-900">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {IC_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(120,90,30,0.75) 0%, transparent 60%)' }}>
                  <p className="text-amber-100 text-sm font-display italic">{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-amber-300">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(180,120,20,0.25)', color: '#fcd34d', border: '1px solid rgba(180,120,20,0.4)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 bg-white px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-light text-amber-900 mb-4">Venue</h2>
        <p className="text-gray-700 font-medium mb-1">{venue}</p>
        <p className="text-gray-400 text-sm mb-8">{venueAddress}</p>
        <div className="bg-amber-50 border border-amber-100 rounded-xl h-52 flex flex-col items-center justify-center gap-3 mb-6">
          <span className="text-4xl">🗺️</span>
          <p className="text-amber-400 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 border border-amber-700 text-amber-700 font-medium rounded-full hover:bg-amber-700 hover:text-white transition-colors text-sm tracking-wide">
          View on Google Maps →
        </a>
      </div>
    </section>
  )
}

function WeddingFooter({ bride, groom, hashtag }) {
  return (
    <footer className="bg-amber-900 text-white py-16 px-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16 bg-amber-700" /><span className="text-amber-500 text-xl">✦</span><div className="h-px w-16 bg-amber-700" />
      </div>
      <p className="font-display text-4xl font-light mb-2">{bride} &amp; {groom}</p>
      <p className="text-amber-500 text-sm mb-6 tracking-wider">{hashtag}</p>
      <p className="text-amber-700 text-xs">Made with ❤️ by <Link to="/" className="underline hover:text-white">WedSite Studio</Link></p>
    </footer>
  )
}

export default function IvoryClassicPreview() {
  return (
    <div className="font-body">
      <TopBar />
      <Hero bride={W.bride} groom={W.groom} date={W.date} venue={W.venue} />
      <OurStory />
      <Schedule />
      <RSVP />
      <Gallery />
      <Venue venue={W.venue} venueAddress={W.venueAddress} />
      <WeddingFooter bride={W.bride} groom={W.groom} hashtag={W.hashtag} />
    </div>
  )
}
