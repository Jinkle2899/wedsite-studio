import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Priya', groom: 'Rohan',
  date: '2026-01-18T00:00:00',
  venue: 'Taj Exotica Resort & Spa, Goa',
  venueAddress: 'Calwaddo, Benaulim, South Goa, Goa 403716',
  hashtag: '#RohanWedsPriya',
  tagline: 'Where the ocean heard our names before we did.',
}

const SCHEDULE = [
  { day: 'DAY ONE', date: '16 Jan 2026', city: 'GOA', events: [{ time: '11:00 AM', name: 'Mehendi Ceremony', location: 'Taj Exotica Beach Lawn' }, { time: '7:00 PM', name: 'Cocktail Evening', location: 'Seaside Pavilion' }] },
  { day: 'DAY TWO', date: '17 Jan 2026', city: 'GOA', events: [{ time: '9:00 AM', name: 'Haldi Ceremony', location: 'Poolside, Taj Exotica' }, { time: '8:00 PM', name: 'Sangeet Night', location: 'Grand Ballroom' }] },
  { day: 'DAY THREE', date: '18 Jan 2026', city: 'GOA', events: [{ time: '5:00 PM', name: 'Wedding Ceremony', location: 'Beachfront, Taj Exotica' }, { time: '8:30 PM', name: 'Reception Dinner', location: 'Ocean Terrace' }] },
]

const GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/cr-g1/800/560', caption: 'Cocktail by the Shore' },
  { id: 2, img: 'https://picsum.photos/seed/cr-g2/560/780', caption: 'Mehendi Morning' },
  { id: 3, img: 'https://picsum.photos/seed/cr-g3/800/540', caption: 'Sangeet Night' },
  { id: 4, img: 'https://picsum.photos/seed/cr-g4/560/800', caption: 'Haldi by the Pool' },
  { id: 5, img: 'https://picsum.photos/seed/cr-g5/800/560', caption: 'Wedding at Sunset' },
  { id: 6, img: 'https://picsum.photos/seed/cr-g6/560/720', caption: 'Beachfront Ceremony' },
  { id: 7, img: 'https://picsum.photos/seed/cr-g7/800/580', caption: 'Ocean Terrace Dinner' },
  { id: 8, img: 'https://picsum.photos/seed/cr-g8/560/760', caption: 'First Dance' },
]

const CHAPTERS = [
  { num: '01', title: 'Same Wave', img: 'https://picsum.photos/seed/cr-wave/640/480', text: 'They were introduced by a mutual friend who said, with alarming confidence, "trust me, you\'re the same person." She rolled her eyes. He laughed. Both of them are still not sure who proved it right.' },
  { num: '02', title: 'Parallel Worlds', img: 'https://picsum.photos/seed/cr-worlds/640/480', text: 'Delhi and Goa. Him and her. Long calls, bad connections, three time-zones between trips. But they kept showing up for each other — first as friends, then as something better.' },
  { num: '03', title: 'The Tide', img: 'https://picsum.photos/seed/cr-tide/640/480', text: 'He asked her on the beach at sunset — low tide, ankle-deep, phone flashlight rings hidden in a shell. She found three before he said anything. Both of them were crying before she said yes.' },
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
    <section id="gallery" className="py-24 px-6" style={{ background: '#040810' }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-800/50" />
            <p className="text-amber-700 text-xs tracking-[0.4em] uppercase">Gallery</p>
            <div className="h-px w-8 bg-amber-800/50" />
          </div>
          <h2 className="font-display text-4xl font-light italic text-slate-200 text-center mb-12">
            Where every tide <span className="text-amber-500">tells a story.</span>
          </h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(4,8,16,0.85) 0%, transparent 60%)' }}>
                  <p className="text-amber-300 font-display italic text-sm">{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-base text-amber-400">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'rgba(212,175,110,0.15)', color: '#d4af6e', border: '1px solid rgba(212,175,110,0.3)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Wave ornament ─────────────────────────────────────────────────────────────
const Wave = ({ style }) => (
  <svg viewBox="0 0 200 20" fill="none" style={{ width: 200, height: 20, ...style }}>
    <path d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10" stroke="rgba(212,175,110,0.3)" strokeWidth="1" fill="none" />
  </svg>
)

// ── Envelope Reveal ──────────────────────────────────────────────────────────
function EnvelopeReveal({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const handleOpen = () => { setOpening(true); setTimeout(onOpen, 1200) }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#060d1a' }}>
      <div className={`relative cursor-pointer transition-all duration-700 ${opening ? 'scale-110 opacity-0' : 'hover:scale-105'}`}
        onClick={handleOpen}>
        <div className="w-80 h-52 rounded-lg relative shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #d4e4f4 0%, #c0d4ec 100%)' }}>
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #a8c4e4 50%, transparent 50%)' }} />
          </div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top right, #9ab4d4 50%, transparent 50%)' }} />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top left, #9ab4d4 50%, transparent 50%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-10"
            style={{ background: 'radial-gradient(circle at 35% 35%, #0a2a5c, #061840)' }}>
            <span className="font-display text-lg font-bold text-blue-200">
              {W.groom[0]}&amp;{W.bride[0]}
            </span>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-slate-400">Goa · India</p>
          </div>
        </div>
      </div>
      <p className="mt-8 text-slate-600 text-sm italic animate-pulse">Tap the seal to open</p>
    </div>
  )
}

// ── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ bride, groom }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{ background: 'rgba(6,13,26,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(212,175,110,0.15)' }}>
      <Link to="/" className="text-xs text-amber-800 hover:text-amber-600 tracking-widest uppercase">← WedSite Studio</Link>
      <p className="font-display text-lg font-semibold tracking-widest text-slate-200">
        {groom[0]} <span className="text-amber-500">&amp;</span> {bride[0]}
        <span className="text-slate-600 text-sm ml-3 font-normal">18 · 01 · 2026</span>
      </p>
      <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-slate-600">
        {['Story', 'Schedule', 'RSVP', 'Venue'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-amber-500 transition-colors">{s}</a>
        ))}
        <Link to="/templates/coastal-royale/edit"
          className="px-4 py-1.5 border border-amber-700/50 text-amber-600 rounded-full hover:bg-amber-700 hover:text-white transition-colors text-xs">
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
  const anim = (delay) => entered ? { animation: `crFadeUp 1s ease ${delay}s both` } : { opacity: 0 }
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060d1a 0%, #0a1a2e 60%, #060d1a 100%)' }}>
      <style>{`@keyframes crFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}`}</style>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, background: 'rgba(212,175,110,0.5)', top: `${Math.random() * 80}%`, left: `${Math.random() * 100}%` }} />
      ))}

      <div style={anim(0.1)}><p className="text-amber-600 text-xs tracking-[0.5em] uppercase mb-6">Save the Date</p><Wave style={{ marginBottom: 24 }} /></div>
      <div>
        <div style={anim(0.3)}><h1 className="font-display italic text-6xl md:text-8xl font-light text-slate-100 leading-none">{bride}</h1></div>
        <div style={anim(0.5)}><p className="font-display text-3xl italic my-2 text-amber-500">weds</p></div>
        <div style={anim(0.7)}><h1 className="font-display italic text-6xl md:text-8xl font-light text-slate-100 leading-none">{groom}</h1></div>
      </div>
      <div style={anim(0.9)}>
        <p className="text-slate-500 text-sm italic max-w-md mt-6 mb-2 leading-relaxed">{tagline}</p>
        <Wave style={{ marginTop: 24, marginBottom: 16, transform: 'scaleX(-1)' }} />
        <div className="flex items-center gap-4 my-6">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,110,0.5))' }} />
          <p className="font-display text-amber-500 tracking-widest">{formatted}</p>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,110,0.5))' }} />
        </div>
        <p className="text-slate-600 text-xs tracking-widest uppercase mb-10">{venue}</p>
      </div>
      <div style={anim(1.1)} className="flex gap-8">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([l, v]) => (
          <div key={l} className="flex flex-col items-center">
            <p className="font-display text-4xl font-light text-amber-400">{String(v).padStart(2, '0')}</p>
            <p className="text-xs text-slate-600 tracking-widest uppercase mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div style={anim(1.3)} className="mt-16 text-slate-700 animate-bounce text-xl">↓</div>
    </section>
  )
}

// ── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: '#040810' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8 bg-amber-800/50" />
          <p className="text-amber-700 text-xs tracking-[0.4em] uppercase">Our Story</p>
        </div>
        <h2 className="font-display text-4xl font-light italic text-slate-200 mb-16">
          Two shores that <span className="text-amber-500">finally met.</span>
        </h2>
        <div className="flex flex-col gap-16">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.num} delay={0.1} fromX={i % 2 === 0 ? -20 : 20}>
            <div className={`flex gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-64 h-48 shrink-0 rounded-xl overflow-hidden group"
                style={{ border: '1px solid rgba(212,175,110,0.1)' }}>
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-amber-800/60 text-xs tracking-widest mb-2">CHAPTER {c.num}</p>
                <h3 className="font-display text-2xl italic text-slate-300 mb-3">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.text}</p>
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
    <section id="schedule" className="py-24 px-6" style={{ background: '#060d1a' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8 bg-amber-800/50" />
          <p className="text-amber-700 text-xs tracking-[0.4em] uppercase">The Schedule</p>
          <div className="h-px w-8 bg-amber-800/50" />
        </div>
        <h2 className="font-display text-4xl font-light italic text-slate-200 text-center mb-4">
          Three days <span className="text-amber-500">by the sea.</span>
        </h2>
        <p className="text-slate-600 text-sm text-center mb-16 italic">Goa — from golden lawns to the beachfront at sunset.</p>
        <div className="flex flex-col gap-10">
          {SCHEDULE.map((day) => (
            <div key={day.day} className="border-l-2 pl-8" style={{ borderColor: 'rgba(212,175,110,0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-amber-700 tracking-widest">{day.day}</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-slate-400"
                  style={{ background: 'rgba(212,175,110,0.08)', border: '1px solid rgba(212,175,110,0.15)' }}>{day.city}</span>
              </div>
              <p className="font-display text-2xl italic text-slate-300 mb-1">{day.date}</p>
              {day.events.map((e) => (
                <div key={e.name} className="flex items-center gap-6 py-3" style={{ borderBottom: '1px solid rgba(212,175,110,0.06)' }}>
                  <p className="font-display italic text-base text-amber-500 w-28 shrink-0">{e.time}</p>
                  <p className="text-slate-300 font-medium flex-1">{e.name}</p>
                  <p className="text-slate-600 text-xs">{e.location}</p>
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
  const cls = "w-full px-4 py-3 text-sm focus:outline-none rounded-lg text-slate-200"
  const st = { background: 'rgba(212,175,110,0.05)', border: '1px solid rgba(212,175,110,0.15)' }
  return (
    <section id="rsvp" className="py-24 px-6" style={{ background: '#040810' }}>
      <div className="max-w-lg mx-auto text-center">
        <p className="text-amber-700 text-xs tracking-[0.4em] uppercase mb-3">You Are Invited</p>
        <h2 className="font-display text-4xl font-light italic text-slate-200 mb-4">RSVP</h2>
        <p className="text-slate-600 text-sm italic mb-10">Kindly respond by 5th January 2026</p>
        {submitted ? (
          <div className="rounded-2xl p-12" style={{ background: 'rgba(212,175,110,0.04)', border: '1px solid rgba(212,175,110,0.1)' }}>
            <p className="font-display text-3xl italic text-slate-200 mb-2">Thank you, {form.name}</p>
            <p className="text-slate-600 text-sm">We look forward to celebrating with you in Goa.</p>
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
              style={{ background: 'rgba(212,175,110,0.1)', border: '1px solid rgba(212,175,110,0.3)', color: '#d4af6e' }}>
              Confirm Attendance
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ── His & Her Words ───────────────────────────────────────────────────────────
function TheirWords() {
  return (
    <section className="py-24 px-6" style={{ background: '#060d1a' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-8 bg-amber-800/50" />
          <p className="text-amber-700 text-xs tracking-[0.4em] uppercase">Their Words</p>
          <div className="h-px w-8 bg-amber-800/50" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <p className="font-display text-xl italic text-slate-300 leading-relaxed mb-4">
              "You are the reason I believe in people who show up. You showed up — even when it was inconvenient. Especially then."
            </p>
            <Wave style={{ margin: '0 auto', opacity: 0.5 }} />
            <p className="text-amber-500 font-display italic text-base mt-4">— Priya</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl italic text-slate-300 leading-relaxed mb-4">
              "I didn't know what I wanted until you made it impossible to want anything else. No more confusion — just you and whatever comes next."
            </p>
            <Wave style={{ margin: '0 auto', opacity: 0.5 }} />
            <p className="text-amber-500 font-display italic text-base mt-4">— Rohan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Venue ─────────────────────────────────────────────────────────────────────
function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 px-6" style={{ background: '#040810' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-amber-700 text-xs tracking-[0.4em] uppercase mb-3">Find Your Way</p>
        <h2 className="font-display text-4xl font-light italic text-slate-200 mb-4">Venue</h2>
        <p className="text-slate-300 font-medium mb-1">{venue}</p>
        <p className="text-slate-600 text-sm mb-8">{venueAddress}</p>
        <div className="h-52 rounded-2xl flex flex-col items-center justify-center gap-3 mb-6"
          style={{ background: 'rgba(212,175,110,0.04)', border: '1px solid rgba(212,175,110,0.1)' }}>
          <span className="text-4xl">🗺️</span>
          <p className="text-slate-700 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 text-sm font-medium tracking-wider rounded-full"
          style={{ border: '1px solid rgba(212,175,110,0.3)', color: '#d4af6e' }}>
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏝️', title: 'Stay', info: 'Taj Exotica & W Goa recommended (on-site & 10 min)' },
            { icon: '✈️', title: 'Airport', info: '45 min from Dabolim Airport, Goa' },
            { icon: '⛵', title: 'Transfer', info: 'Resort boat transfers arranged for all guests' },
          ].map(t => (
            <div key={t.title} className="rounded-xl p-4" style={{ background: 'rgba(212,175,110,0.04)', border: '1px solid rgba(212,175,110,0.08)' }}>
              <p className="text-xl mb-2">{t.icon}</p>
              <p className="text-slate-300 text-sm font-medium mb-1">{t.title}</p>
              <p className="text-slate-600 text-xs">{t.info}</p>
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
    <footer className="py-16 px-6 text-center" style={{ background: '#040810', borderTop: '1px solid rgba(212,175,110,0.1)' }}>
      <Wave style={{ margin: '0 auto 24px' }} />
      <p className="font-display text-4xl italic font-light text-slate-200 mb-2">{bride} &amp; {groom}</p>
      <p className="text-amber-700 text-sm mb-6 tracking-widest">{hashtag}</p>
      <p className="text-slate-700 text-xs">Made with ♥ by <Link to="/" className="text-amber-800 hover:text-amber-600 underline">WedSite Studio</Link></p>
    </footer>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CoastalRoyalePreview() {
  const [revealed, setRevealed] = useState(false)
  const [entered, setEntered] = useState(false)
  const handleReveal = () => { setRevealed(true); setTimeout(() => setEntered(true), 100) }
  return (
    <div className="font-body" style={{ background: '#060d1a' }}>
      {!revealed && <EnvelopeReveal onOpen={handleReveal} />}
      {revealed && (
        <>
          <TopBar bride={W.bride} groom={W.groom} />
          <Hero bride={W.bride} groom={W.groom} date={W.date} venue={W.venue} tagline={W.tagline} entered={entered} />
          <Story />
          <Schedule />
          <RSVP />
          <Gallery />
          <TheirWords />
          <Venue venue={W.venue} venueAddress={W.venueAddress} />
          <WeddingFooter bride={W.bride} groom={W.groom} hashtag={W.hashtag} />
        </>
      )}
    </div>
  )
}
