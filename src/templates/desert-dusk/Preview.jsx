import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Kavya', groom: 'Dev',
  date: '2026-02-14T00:00:00',
  venue: 'Suryagarh Palace, Jaisalmer',
  venueAddress: 'Sam Road, Near Gala, Jaisalmer, Rajasthan 345001',
  hashtag: '#DevWedKavya',
  tagline: 'The desert remembered our names. The dunes held the light.',
}

const SCHEDULE = [
  { day: 'DAY ONE', date: '12 Feb 2026', city: 'JAISALMER', events: [{ time: '4:00 PM', name: 'Desert Welcome', location: 'Suryagarh Palace Courtyard' }, { time: '8:00 PM', name: 'Mehendi Night', location: 'Palace Gardens' }] },
  { day: 'DAY TWO', date: '13 Feb 2026', city: 'JAISALMER', events: [{ time: '8:00 AM', name: 'Haldi at Sunrise', location: 'Rooftop, Suryagarh' }, { time: '6:00 PM', name: 'Sangeet in the Dunes', location: 'Sam Sand Dunes' }] },
  { day: 'DAY THREE', date: '14 Feb 2026', city: 'JAISALMER', events: [{ time: '4:30 PM', name: 'Wedding Ceremony', location: 'Suryagarh Amphitheatre' }, { time: '8:00 PM', name: 'Reception Dinner', location: 'Palace Rooftop' }] },
]

const GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/dd-g1/800/560', caption: 'Desert Welcome' },
  { id: 2, img: 'https://picsum.photos/seed/dd-g2/560/780', caption: 'Mehendi Night' },
  { id: 3, img: 'https://picsum.photos/seed/dd-g3/800/540', caption: 'Sangeet in the Dunes' },
  { id: 4, img: 'https://picsum.photos/seed/dd-g4/560/800', caption: 'Haldi at Sunrise' },
  { id: 5, img: 'https://picsum.photos/seed/dd-g5/800/560', caption: 'Wedding Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/dd-g6/560/720', caption: 'The Pheras' },
  { id: 7, img: 'https://picsum.photos/seed/dd-g7/800/580', caption: 'Palace Rooftop' },
  { id: 8, img: 'https://picsum.photos/seed/dd-g8/560/760', caption: 'Golden Hour Together' },
]

const CHAPTERS = [
  { num: '01', title: 'Lost in the Same City', img: 'https://picsum.photos/seed/dd-city/640/480', text: 'Both in Bangalore, mutual friends for years. A hike in Coorg where they talked all night around a fire and discovered they\'d been looking for exactly what the other one was.' },
  { num: '02', title: 'Slow Burn', img: 'https://picsum.photos/seed/dd-burn/640/480', text: 'It wasn\'t a lightning bolt — more like a long golden hour that kept refusing to end. They argued about everything and agreed on what mattered. Slowly, there was no one else.' },
  { num: '03', title: 'Golden Hour, Always', img: 'https://picsum.photos/seed/dd-golden/640/480', text: 'He chose Jaisalmer — the fort at dusk, her favourite colour in the sky. She said yes before the sentence was done. Some things are just obvious, even in the dark.' },
]

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null); const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function FadeUp({ children, delay = 0, fromX = 0, className = '' }) {
  const [ref, vis] = useFadeIn()
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translate(${fromX}px,32px)`, transition: `opacity 0.85s ease ${delay}s,transform 0.85s ease ${delay}s` }}>{children}</div>
}

function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id) }, [])
  return time
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 px-6" style={{ background: '#0f0804' }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
            <p className="text-orange-700 text-xs tracking-[0.4em] uppercase">Gallery</p>
            <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
          </div>
          <h2 className="font-display text-4xl font-light italic text-center mb-12" style={{ color: '#f0d4b8' }}>
            Captured at <span className="text-orange-500">golden hour.</span>
          </h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(15,8,4,0.85) 0%, transparent 60%)' }}>
                  <p className="font-display italic text-sm" style={{ color: '#e0c4a0' }}>{p.caption}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }} onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.caption} className="w-full max-h-[82vh] object-contain rounded-2xl" />
            <p className="text-center font-display italic mt-4 text-base text-orange-400">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'rgba(193,105,58,0.15)', color: '#c1693a', border: '1px solid rgba(193,105,58,0.35)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Dune ornament ─────────────────────────────────────────────────────────────
const Dune = ({ style }) => (
  <svg viewBox="0 0 300 40" fill="none" style={{ width: 300, height: 40, ...style }}>
    <path d="M0 35 Q75 5 150 20 Q225 35 300 15" stroke="rgba(193,105,58,0.25)" strokeWidth="1.5" fill="none" />
  </svg>
)

// ── Envelope Reveal ──────────────────────────────────────────────────────────
function EnvelopeReveal({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const handleOpen = () => { setOpening(true); setTimeout(onOpen, 1200) }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#180f06' }}>
      <div className={`relative cursor-pointer transition-all duration-700 ${opening ? 'scale-110 opacity-0' : 'hover:scale-105'}`}
        onClick={handleOpen}>
        <div className="w-80 h-52 rounded-lg relative shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #f0d4b8 0%, #e0c0a0 100%)' }}>
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #d4a880 50%, transparent 50%)' }} />
          </div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top right, #c4906c 50%, transparent 50%)' }} />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top left, #c4906c 50%, transparent 50%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-10"
            style={{ background: 'radial-gradient(circle at 35% 35%, #7a2c0e, #4a1a06)' }}>
            <span className="font-display text-lg font-bold text-orange-200">
              {W.groom[0]}&amp;{W.bride[0]}
            </span>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400">Jaisalmer · Rajasthan</p>
          </div>
        </div>
      </div>
      <p className="mt-8 text-orange-900/60 text-sm italic animate-pulse">Tap the seal to open</p>
    </div>
  )
}

// ── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ bride, groom }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{ background: 'rgba(24,15,6,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(193,105,58,0.2)' }}>
      <Link to="/" className="text-xs text-orange-900 hover:text-orange-700 tracking-widest uppercase">← WedSite Studio</Link>
      <p className="font-display text-lg font-semibold tracking-widest" style={{ color: '#f0d4b8' }}>
        {groom[0]} <span className="text-orange-600">&amp;</span> {bride[0]}
        <span className="text-orange-900/50 text-sm ml-3 font-normal">14 · 02 · 2026</span>
      </p>
      <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-orange-900/50">
        {['Story', 'Schedule', 'RSVP', 'Venue'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-orange-500 transition-colors">{s}</a>
        ))}
        <Link to="/templates/desert-dusk/edit"
          className="px-4 py-1.5 border border-orange-800/50 text-orange-600 rounded-full hover:bg-orange-800 hover:text-white transition-colors text-xs">
          Customise
        </Link>
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ bride, groom, date, venue, tagline, entered }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const anim = (delay) => entered ? { animation: `ddFadeUp 1s ease ${delay}s both` } : { opacity: 0 }
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #180f06 0%, #2d1a0e 50%, #180f06 100%)' }}>
      <style>{`@keyframes ddFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}`}</style>
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(193,105,58,0.08), transparent)' }} />
      {[280, 460].map(size => (
        <div key={size} className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: size, height: size, border: '1px solid rgba(193,105,58,0.08)' }} />
      ))}

      <div style={anim(0.1)}><p className="text-orange-700 text-xs tracking-[0.5em] uppercase mb-6">Save the Date</p><Dune style={{ marginBottom: 16 }} /></div>
      <div>
        <div style={anim(0.3)}><h1 className="font-display italic text-6xl md:text-8xl font-light leading-none" style={{ color: '#f0d4b8' }}>{bride}</h1></div>
        <div style={anim(0.5)}><p className="font-display text-3xl italic my-2 text-orange-600">weds</p></div>
        <div style={anim(0.7)}><h1 className="font-display italic text-6xl md:text-8xl font-light leading-none" style={{ color: '#f0d4b8' }}>{groom}</h1></div>
      </div>
      <div style={anim(0.9)}>
        <p className="text-orange-900/50 text-sm italic max-w-md mt-6 mb-2 leading-relaxed">{tagline}</p>
        <Dune style={{ marginTop: 16, marginBottom: 16, transform: 'scaleX(-1) scaleY(-1)' }} />
        <div className="flex items-center gap-4 my-4">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(193,105,58,0.5))' }} />
          <p className="font-display text-orange-600 tracking-widest">{formatted}</p>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(193,105,58,0.5))' }} />
        </div>
        <p className="text-orange-900/40 text-xs tracking-widest uppercase mb-10">{venue}</p>
      </div>
      <div style={anim(1.1)} className="flex gap-8">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([l, v]) => (
          <div key={l} className="flex flex-col items-center">
            <p className="font-display text-4xl font-light text-orange-500">{String(v).padStart(2, '0')}</p>
            <p className="text-xs text-orange-900/40 tracking-widest uppercase mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div style={anim(1.3)} className="mt-16 text-orange-900/40 animate-bounce text-xl">↓</div>
    </section>
  )
}

// ── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: '#0f0804' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
          <p className="text-orange-700 text-xs tracking-[0.4em] uppercase">Our Story</p>
        </div>
        <h2 className="font-display text-4xl font-light italic mb-16" style={{ color: '#f0d4b8' }}>
          A slow fire.<br /><span className="text-orange-500">The best kind.</span>
        </h2>
        <div className="flex flex-col gap-16">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.num} delay={0.1} fromX={i % 2 === 0 ? -20 : 20}>
            <div className={`flex gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-64 h-48 shrink-0 rounded-xl overflow-hidden group"
                style={{ border: '1px solid rgba(193,105,58,0.15)' }}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-orange-900/40 text-xs tracking-widest mb-2">CHAPTER {c.num}</p>
                <h3 className="font-display text-2xl italic mb-3" style={{ color: '#e0c4a0' }}>{c.title}</h3>
                <p className="text-orange-900/60 text-sm leading-relaxed">{c.text}</p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Schedule ─────────────────────────────────────────────────────────────────
function Schedule() {
  return (
    <section id="schedule" className="py-24 px-6" style={{ background: '#180f06' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
          <p className="text-orange-700 text-xs tracking-[0.4em] uppercase">The Schedule</p>
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
        </div>
        <h2 className="font-display text-4xl font-light italic text-center mb-4" style={{ color: '#f0d4b8' }}>
          Three evenings in <span className="text-orange-500">gold.</span>
        </h2>
        <p className="text-orange-900/50 text-sm text-center mb-16 italic">From palace courtyard to sand dunes — Jaisalmer at its finest.</p>
        <div className="flex flex-col gap-10">
          {SCHEDULE.map((day) => (
            <div key={day.day} className="border-l-2 pl-8" style={{ borderColor: 'rgba(193,105,58,0.3)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-orange-700 tracking-widest">{day.day}</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-orange-800"
                  style={{ background: 'rgba(193,105,58,0.1)', border: '1px solid rgba(193,105,58,0.2)' }}>{day.city}</span>
              </div>
              <p className="font-display text-2xl italic mb-1" style={{ color: '#e0c4a0' }}>{day.date}</p>
              {day.events.map((e) => (
                <div key={e.name} className="flex items-center gap-6 py-3" style={{ borderBottom: '1px solid rgba(193,105,58,0.08)' }}>
                  <p className="font-display italic text-base text-orange-600 w-28 shrink-0">{e.time}</p>
                  <p className="font-medium flex-1" style={{ color: '#e0c4a0' }}>{e.name}</p>
                  <p className="text-orange-900/40 text-xs">{e.location}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── RSVP ─────────────────────────────────────────────────────────────────────
function RSVP() {
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'yes', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }
  const cls = "w-full px-4 py-3 text-sm focus:outline-none rounded-lg"
  const st = { background: 'rgba(193,105,58,0.06)', border: '1px solid rgba(193,105,58,0.18)', color: '#e0c4a0' }
  return (
    <section id="rsvp" className="py-24 px-6" style={{ background: '#0f0804' }}>
      <div className="max-w-lg mx-auto text-center">
        <p className="text-orange-700 text-xs tracking-[0.4em] uppercase mb-3">You Are Invited</p>
        <h2 className="font-display text-4xl font-light italic mb-4" style={{ color: '#f0d4b8' }}>RSVP</h2>
        <p className="text-orange-900/50 text-sm italic mb-10">Kindly respond by 30th January 2026</p>
        {submitted ? (
          <div className="rounded-2xl p-12" style={{ background: 'rgba(193,105,58,0.05)', border: '1px solid rgba(193,105,58,0.15)' }}>
            <p className="font-display text-3xl italic mb-2" style={{ color: '#e0c4a0' }}>Thank you, {form.name}</p>
            <p className="text-orange-900/50 text-sm">We look forward to celebrating with you in Jaisalmer.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} style={st} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} style={st} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={cls} style={st}>
                <option value="yes">Joyfully Accepts</option>
                <option value="no">Regretfully Declines</option>
              </select>
              <select name="guests" value={form.guests} onChange={handle} className={cls} style={st}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
              </select>
            </div>
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A note for the couple" className={`${cls} resize-none`} style={st} />
            <button type="submit" className="py-3 font-semibold text-sm tracking-widest uppercase rounded-lg"
              style={{ background: 'rgba(193,105,58,0.15)', border: '1px solid rgba(193,105,58,0.4)', color: '#c1693a' }}>
              Confirm Attendance
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ── Her Words ────────────────────────────────────────────────────────────────
function HerWords() {
  return (
    <section className="py-24 px-6" style={{ background: '#180f06' }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
          <p className="text-orange-700 text-xs tracking-[0.4em] uppercase">Her Words</p>
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
        </div>
        <p className="font-display text-xl italic leading-relaxed mt-8 mb-6" style={{ color: '#e0c4a0' }}>
          "You are the most honest person I have ever known — honest about your flaws, your feelings, your love. That kind of honesty is rare. I want to build a life with it."
        </p>
        <p className="text-orange-600 font-display italic text-lg">— Kavya</p>

        <div className="my-12" style={{ borderTop: '1px solid rgba(193,105,58,0.12)' }} />

        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
          <p className="text-orange-700 text-xs tracking-[0.4em] uppercase">His Words</p>
          <div className="h-px w-8" style={{ background: 'rgba(193,105,58,0.4)' }} />
        </div>
        <p className="font-display text-xl italic leading-relaxed mt-8 mb-6" style={{ color: '#e0c4a0' }}>
          "I never thought a person could feel like a place. You feel like Jaisalmer at dusk — warm, vast, and completely unhurried. I want to stay here for the rest of my life."
        </p>
        <p className="text-orange-600 font-display italic text-lg">— Dev</p>
      </div>
    </section>
  )
}

// ── Venue ─────────────────────────────────────────────────────────────────────
function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 px-6" style={{ background: '#0f0804' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-orange-700 text-xs tracking-[0.4em] uppercase mb-3">Find Your Way</p>
        <h2 className="font-display text-4xl font-light italic mb-4" style={{ color: '#f0d4b8' }}>Venue</h2>
        <p className="font-medium mb-1" style={{ color: '#e0c4a0' }}>{venue}</p>
        <p className="text-orange-900/50 text-sm mb-8">{venueAddress}</p>
        <div className="h-52 rounded-2xl flex flex-col items-center justify-center gap-3 mb-6"
          style={{ background: 'rgba(193,105,58,0.05)', border: '1px solid rgba(193,105,58,0.12)' }}>
          <span className="text-4xl">🗺️</span>
          <p className="text-orange-900/30 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 text-sm font-medium tracking-wider rounded-full"
          style={{ border: '1px solid rgba(193,105,58,0.4)', color: '#c1693a' }}>
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏜️', title: 'Stay', info: 'Suryagarh (on-site), Fort Rajwada (10 min)' },
            { icon: '✈️', title: 'Airport', info: '90 min from Jodhpur Airport, 15 min from Jaisalmer Airport' },
            { icon: '🚂', title: 'Train', info: 'Palace on Wheels stops at Jaisalmer — enquire for bookings' },
          ].map(t => (
            <div key={t.title} className="rounded-xl p-4" style={{ background: 'rgba(193,105,58,0.05)', border: '1px solid rgba(193,105,58,0.1)' }}>
              <p className="text-xl mb-2">{t.icon}</p>
              <p className="text-sm font-medium mb-1" style={{ color: '#e0c4a0' }}>{t.title}</p>
              <p className="text-orange-900/40 text-xs">{t.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function WeddingFooter({ bride, groom, hashtag }) {
  return (
    <footer className="py-16 px-6 text-center" style={{ background: '#0f0804', borderTop: '1px solid rgba(193,105,58,0.1)' }}>
      <Dune style={{ margin: '0 auto 24px' }} />
      <p className="font-display text-4xl italic font-light mb-2" style={{ color: '#f0d4b8' }}>{bride} &amp; {groom}</p>
      <p className="text-orange-700 text-sm mb-6 tracking-widest">{hashtag}</p>
      <p className="text-orange-900/30 text-xs">Made with ♥ by <Link to="/" className="text-orange-900/50 hover:text-orange-700 underline">WedSite Studio</Link></p>
    </footer>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DesertDuskPreview() {
  const [revealed, setRevealed] = useState(false)
  const [entered, setEntered] = useState(false)
  const handleReveal = () => { setRevealed(true); setTimeout(() => setEntered(true), 100) }
  return (
    <div className="font-body" style={{ background: '#180f06' }}>
      {!revealed && <EnvelopeReveal onOpen={handleReveal} />}
      {revealed && (
        <>
          <TopBar bride={W.bride} groom={W.groom} />
          <Hero bride={W.bride} groom={W.groom} date={W.date} venue={W.venue} tagline={W.tagline} entered={entered} />
          <Story />
          <Schedule />
          <RSVP />
          <Gallery />
          <HerWords />
          <Venue venue={W.venue} venueAddress={W.venueAddress} />
          <WeddingFooter bride={W.bride} groom={W.groom} hashtag={W.hashtag} />
        </>
      )}
    </div>
  )
}
