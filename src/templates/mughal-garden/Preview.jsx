import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Ananya', groom: 'Arjun',
  date: '2025-12-07T00:00:00',
  venue: 'Dera Amer, Jaipur',
  venueAddress: 'Dera Amer, Opposite Hathroyi Fort, Jaipur, Rajasthan 302028',
  hashtag: '#ArjunWedAnanya',
  tagline: 'Where jasmine meets the courtyard, and old roses spell forever.',
}

const SCHEDULE = [
  { day: 'DAY ONE', date: '4 Dec 2025', city: 'DELHI', events: [{ time: '6:00 PM', name: 'Engagement Ceremony', location: 'The Leela Palace, New Delhi' }] },
  { day: 'DAY TWO', date: '5 Dec 2025', city: 'JAIPUR', events: [{ time: '11:00 AM', name: 'Mehendi', location: 'Dera Amer, Jaipur' }, { time: '8:00 PM', name: 'Sangeet Night', location: 'Dera Amer Lawns' }] },
  { day: 'DAY THREE', date: '6 Dec 2025', city: 'JAIPUR', events: [{ time: '9:00 AM', name: 'Haldi Ceremony', location: 'Dera Amer' }, { time: '7:30 PM', name: 'Wedding Ceremony', location: 'Dera Amer Heritage Courtyard' }] },
  { day: 'DAY FOUR', date: '7 Dec 2025', city: 'JAIPUR', events: [{ time: '7:00 PM', name: 'Grand Reception', location: 'Dera Amer Gardens' }] },
]

const GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/mg-g1/800/560', caption: 'Welcome Evening' },
  { id: 2, img: 'https://picsum.photos/seed/mg-g2/560/780', caption: 'Mehendi Ceremony' },
  { id: 3, img: 'https://picsum.photos/seed/mg-g3/800/540', caption: 'Sangeet at Dera Amer' },
  { id: 4, img: 'https://picsum.photos/seed/mg-g4/560/800', caption: 'Haldi Morning' },
  { id: 5, img: 'https://picsum.photos/seed/mg-g5/800/560', caption: 'The Pheras' },
  { id: 6, img: 'https://picsum.photos/seed/mg-g6/560/720', caption: 'Heritage Courtyard' },
  { id: 7, img: 'https://picsum.photos/seed/mg-g7/800/580', caption: 'Grand Reception' },
  { id: 8, img: 'https://picsum.photos/seed/mg-g8/560/760', caption: 'First Dance' },
]

const CHAPTERS = [
  { num: '01', title: 'First Glance', img: 'https://picsum.photos/seed/mg-glance/640/480', text: 'A rooftop party in South Delhi. The kind of crowd where everyone knows everyone, except these two. He noticed she was the only one reading the bookshelves.' },
  { num: '02', title: 'Slow Certainty', img: 'https://picsum.photos/seed/mg-garden/640/480', text: 'Not instant. Gradual. Like a garden in winter — bare branches, then the first green shoot, then colour everywhere. By spring, they stopped pretending it wasn\'t love.' },
  { num: '03', title: 'The Promise', img: 'https://picsum.photos/seed/mg-promise/640/480', text: 'He chose a sunset at the Amer Fort. She said yes to the city, the view, and most of all — to him.' },
]

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function FadeUp({ children, delay = 0, fromX = 0, className = '' }) {
  const [ref, vis] = useFadeIn()
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translate(${fromX}px, 32px)`, transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` }}>
      {children}
    </div>
  )
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

// ── Envelope Reveal ──────────────────────────────────────────────────────────
function EnvelopeReveal({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const handleOpen = () => { setOpening(true); setTimeout(onOpen, 1200) }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#0a1a0f' }}>
      <style>{`@keyframes envFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}} @keyframes sealGlow{0%,100%{box-shadow:0 0 0 0 rgba(26,71,49,0.4)}50%{box-shadow:0 0 0 12px rgba(26,71,49,0)}}`}</style>
      <div style={{ animation: opening ? 'none' : 'envFloat 3s ease-in-out infinite', filter: 'drop-shadow(0 20px 50px rgba(26,71,49,0.3))' }}>
      <div className={`relative cursor-pointer transition-all duration-700 ${opening ? 'scale-125 opacity-0' : 'hover:scale-105'}`}
        onClick={handleOpen}>
        <div className="w-80 h-52 rounded-lg relative shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #e8f0e8 0%, #d4e4d4 100%)' }}>
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #c4d4c4 50%, transparent 50%)' }} />
          </div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top right, #b8c8b4 50%, transparent 50%)' }} />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top left, #b8c8b4 50%, transparent 50%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-10"
            style={{ background: 'radial-gradient(circle at 35% 35%, #1a5c3a, #0d3d25)' }}>
            <span className="font-display text-lg font-bold text-emerald-200">
              {W.groom[0]}&amp;{W.bride[0]}
            </span>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500">Jaipur · Rajasthan</p>
          </div>
        </div>
      </div>
      </div>
      <p className="mt-8 text-emerald-900/60 text-sm italic" style={{ animation: 'envFloat 2s ease-in-out infinite' }}>Tap the seal to open</p>
    </div>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 px-6" style={{ background: '#0a1a0f' }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
            <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase">Gallery</p>
            <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
          </div>
          <h2 className="font-display text-4xl font-light italic text-center mb-12" style={{ color: '#e8f0e8' }}>
            A garden of <span className="text-emerald-500">memories.</span>
          </h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(7,15,9,0.85) 0%, transparent 60%)' }}>
                  <p className="font-display italic text-sm" style={{ color: '#c8e0c8' }}>{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-base text-emerald-400">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: 'rgba(26,71,49,0.3)', color: '#5db87a', border: '1px solid rgba(26,71,49,0.5)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Botanical ornament ────────────────────────────────────────────────────────
const Leaf = ({ style }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none" style={style} className="pointer-events-none">
    <path d="M30 5 Q50 25 30 75 Q10 25 30 5Z" fill="rgba(26,71,49,0.15)" />
    <line x1="30" y1="5" x2="30" y2="75" stroke="rgba(26,71,49,0.2)" strokeWidth="1" />
  </svg>
)

// ── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ bride, groom }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{ background: 'rgba(10,26,15,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(26,71,49,0.3)' }}>
      <Link to="/" className="text-xs text-emerald-800 hover:text-emerald-600 tracking-widest uppercase">← WedSite Studio</Link>
      <p className="font-display text-lg font-semibold tracking-widest" style={{ color: '#e8f0e8' }}>
        {groom[0]} <span className="text-emerald-600">&amp;</span> {bride[0]}
        <span className="text-emerald-900/60 text-sm ml-3 font-normal">07 · 12 · 2025</span>
      </p>
      <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-emerald-900/60">
        {['Story', 'Schedule', 'RSVP', 'Venue'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-emerald-500 transition-colors">{s}</a>
        ))}
        <Link to="/templates/mughal-garden/edit"
          className="px-4 py-1.5 border border-emerald-800/60 text-emerald-600 rounded-full hover:bg-emerald-800 hover:text-white transition-colors text-xs">
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
  const anim = (delay) => entered ? { animation: `mgFadeUp 1s ease ${delay}s both` } : { opacity: 0 }
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1a0f 0%, #0f2318 60%, #0a1a0f 100%)' }}>
      <style>{`@keyframes mgFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}`}</style>
      <Leaf style={{ position: 'absolute', top: 40, left: 40, transform: 'rotate(-30deg)' }} />
      <Leaf style={{ position: 'absolute', top: 40, right: 40, transform: 'rotate(30deg) scaleX(-1)' }} />
      <Leaf style={{ position: 'absolute', bottom: 60, left: 40, transform: 'rotate(30deg)' }} />
      <Leaf style={{ position: 'absolute', bottom: 60, right: 40, transform: 'rotate(-30deg) scaleX(-1)' }} />
      <div className="absolute w-96 h-96 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ border: '1px solid rgba(26,71,49,0.15)' }} />

      <div style={anim(0.1)}>
        <p className="text-emerald-700 text-xs tracking-[0.5em] uppercase mb-6">Save the Date</p>
        <p className="text-emerald-900/60 text-xs tracking-[0.3em] uppercase mb-8">Jaipur · Rajasthan</p>
      </div>
      <div>
        <div style={anim(0.3)}><h1 className="font-display italic text-6xl md:text-8xl font-light leading-none" style={{ color: '#e8f0e8' }}>{bride}</h1></div>
        <div style={anim(0.5)}><p className="font-display text-3xl italic my-2 text-emerald-600">weds</p></div>
        <div style={anim(0.7)}><h1 className="font-display italic text-6xl md:text-8xl font-light leading-none" style={{ color: '#e8f0e8' }}>{groom}</h1></div>
      </div>
      <div style={anim(0.9)}>
        <p className="text-emerald-800/60 text-sm italic max-w-md mt-6 mb-2 leading-relaxed">{tagline}</p>
        <div className="flex items-center gap-4 my-8">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(26,71,49,0.6))' }} />
          <p className="font-display text-emerald-600 tracking-widest">{formatted}</p>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(26,71,49,0.6))' }} />
        </div>
        <p className="text-emerald-900/50 text-xs tracking-widest uppercase mb-10">{venue}</p>
      </div>
      <div style={anim(1.1)} className="flex gap-8">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([l, v]) => (
          <div key={l} className="flex flex-col items-center">
            <p className="font-display text-4xl font-light text-emerald-500">{String(v).padStart(2, '0')}</p>
            <p className="text-xs text-emerald-900/50 tracking-widest uppercase mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div style={anim(1.3)} className="mt-16 text-emerald-900/50 animate-bounce text-xl">↓</div>
    </section>
  )
}

// ── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: '#070f09' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
            <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase">Our Story</p>
          </div>
          <h2 className="font-display text-4xl font-light italic mb-16" style={{ color: '#e8f0e8' }}>
            A garden grows slowly.<br /><span className="text-emerald-500">So did this.</span>
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-16">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.num} delay={0.1} fromX={i % 2 === 0 ? -20 : 20}>
              <div className={`flex gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-64 h-48 shrink-0 rounded-xl overflow-hidden group relative"
                  style={{ border: '1px solid rgba(26,71,49,0.3)' }}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(10,26,15,0.25)' }} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-emerald-900/50 text-xs tracking-widest mb-2">CHAPTER {c.num}</p>
                  <h3 className="font-display text-2xl italic mb-3" style={{ color: '#c8e0c8' }}>{c.title}</h3>
                  <p className="text-emerald-900/70 text-sm leading-relaxed">{c.text}</p>
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
    <section id="schedule" className="py-24 px-6" style={{ background: '#0a1a0f' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
          <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase">The Schedule</p>
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
        </div>
        <h2 className="font-display text-4xl font-light italic text-center mb-4" style={{ color: '#e8f0e8' }}>
          Four days of <span className="text-emerald-500">celebration.</span>
        </h2>
        <p className="text-emerald-900/60 text-sm text-center mb-16 italic">Delhi to Jaipur — across gardens and heritage courtyards.</p>
        <div className="flex flex-col gap-10">
          {SCHEDULE.map((day) => (
            <div key={day.day} className="border-l-2 pl-8" style={{ borderColor: 'rgba(26,71,49,0.4)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-emerald-700 tracking-widest">{day.day}</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-emerald-800"
                  style={{ background: 'rgba(26,71,49,0.15)', border: '1px solid rgba(26,71,49,0.3)' }}>{day.city}</span>
              </div>
              <p className="font-display text-2xl italic mb-1" style={{ color: '#c8e0c8' }}>{day.date}</p>
              {day.events.map((e) => (
                <div key={e.name} className="flex items-center gap-6 py-3" style={{ borderBottom: '1px solid rgba(26,71,49,0.1)' }}>
                  <p className="font-display italic text-base text-emerald-600 w-28 shrink-0">{e.time}</p>
                  <p className="font-medium flex-1" style={{ color: '#c8e0c8' }}>{e.name}</p>
                  <p className="text-emerald-900/50 text-xs">{e.location}</p>
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
  const st = { background: 'rgba(26,71,49,0.1)', border: '1px solid rgba(26,71,49,0.25)', color: '#c8e0c8' }
  return (
    <section id="rsvp" className="py-24 px-6" style={{ background: '#070f09' }}>
      <div className="max-w-lg mx-auto text-center">
        <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase mb-3">You Are Invited</p>
        <h2 className="font-display text-4xl font-light italic mb-4" style={{ color: '#e8f0e8' }}>RSVP</h2>
        <p className="text-emerald-900/60 text-sm italic mb-10">Kindly respond by 20th November 2025</p>
        {submitted ? (
          <div className="rounded-2xl p-12" style={{ background: 'rgba(26,71,49,0.1)', border: '1px solid rgba(26,71,49,0.2)' }}>
            <p className="font-display text-3xl italic mb-2" style={{ color: '#c8e0c8' }}>Thank you, {form.name}</p>
            <p className="text-emerald-900/60 text-sm">We look forward to celebrating with you in Jaipur.</p>
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
            <button type="submit" className="py-3 font-semibold text-sm tracking-widest uppercase rounded-lg transition-colors"
              style={{ background: 'rgba(26,71,49,0.2)', border: '1px solid rgba(26,71,49,0.5)', color: '#5db87a' }}>
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
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a1a0f' }}>
      <Leaf style={{ position: 'absolute', left: 40, top: '20%', opacity: 0.2 }} />
      <Leaf style={{ position: 'absolute', right: 40, top: '20%', opacity: 0.2, transform: 'scaleX(-1)' }} />
      <div className="max-w-2xl mx-auto text-center relative">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
          <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase">Her Words</p>
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
        </div>
        <p className="font-display text-xl italic leading-relaxed mt-8 mb-6" style={{ color: '#c8e0c8' }}>
          "I never expected to find you in the middle of someone else's party. But here we are — choosing the same future, with a few gardens, a lot of laughter, and one very long list of places to see together."
        </p>
        <p className="text-emerald-600 font-display italic text-lg">— Ananya</p>
        <div className="my-12" style={{ borderTop: '1px solid rgba(26,71,49,0.2)' }} />
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
          <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase">His Words</p>
          <div className="h-px w-8" style={{ background: 'rgba(26,71,49,0.5)' }} />
        </div>
        <p className="font-display text-xl italic leading-relaxed mt-8 mb-6" style={{ color: '#c8e0c8' }}>
          "I watched you read book spines at a party where no one reads. I knew then that I wanted to spend the rest of my life with someone who finds the best thing in any room."
        </p>
        <p className="text-emerald-600 font-display italic text-lg">— Arjun</p>
      </div>
    </section>
  )
}

// ── Venue ─────────────────────────────────────────────────────────────────────
function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 px-6" style={{ background: '#070f09' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-emerald-700 text-xs tracking-[0.4em] uppercase mb-3">Find Your Way</p>
        <h2 className="font-display text-4xl font-light italic mb-4" style={{ color: '#e8f0e8' }}>Venue</h2>
        <p className="font-medium mb-1" style={{ color: '#c8e0c8' }}>{venue}</p>
        <p className="text-emerald-900/60 text-sm mb-8">{venueAddress}</p>
        <div className="h-52 rounded-2xl flex flex-col items-center justify-center gap-3 mb-6"
          style={{ background: 'rgba(26,71,49,0.08)', border: '1px solid rgba(26,71,49,0.2)' }}>
          <span className="text-4xl">🗺️</span>
          <p className="text-emerald-900/40 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 text-sm font-medium tracking-wider rounded-full transition-colors"
          style={{ border: '1px solid rgba(26,71,49,0.5)', color: '#5db87a' }}>
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏯', title: 'Stay', info: 'Samode Haveli, Alsisar Haveli (15 min)' },
            { icon: '✈️', title: 'Airport', info: '30 min from Jaipur International Airport' },
            { icon: '🚌', title: 'Transfer', info: 'Shuttle arranged from partner hotels' },
          ].map(t => (
            <div key={t.title} className="rounded-xl p-4" style={{ background: 'rgba(26,71,49,0.08)', border: '1px solid rgba(26,71,49,0.15)' }}>
              <p className="text-xl mb-2">{t.icon}</p>
              <p className="text-sm font-medium mb-1" style={{ color: '#c8e0c8' }}>{t.title}</p>
              <p className="text-emerald-900/50 text-xs">{t.info}</p>
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
    <footer className="py-16 px-6 text-center" style={{ background: '#070f09', borderTop: '1px solid rgba(26,71,49,0.15)' }}>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(26,71,49,0.5))' }} />
        <span className="text-emerald-800 text-lg">✦</span>
        <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(26,71,49,0.5))' }} />
      </div>
      <p className="font-display text-4xl italic font-light mb-2" style={{ color: '#e8f0e8' }}>{bride} &amp; {groom}</p>
      <p className="text-emerald-700 text-sm mb-6 tracking-widest">{hashtag}</p>
      <p className="text-emerald-900/40 text-xs">Made with ♥ by <Link to="/" className="text-emerald-800 hover:text-emerald-600 underline">WedSite Studio</Link></p>
    </footer>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MughalGardenPreview() {
  const [revealed, setRevealed] = useState(false)
  const [entered, setEntered] = useState(false)
  const handleReveal = () => { setRevealed(true); setTimeout(() => setEntered(true), 100) }
  return (
    <div className="font-body" style={{ background: '#0a1a0f' }}>
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
