import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Yoshita', groom: 'Jinkle',
  date: '2025-11-26T00:00:00',
  venue: 'Aashish Vatika, Udaipur',
  venueAddress: 'Fateh Sagar Lake Road, Udaipur, Rajasthan 313001',
  hashtag: '#JinkleWedYoshita',
  tagline: 'Two souls. One monsoon. A forever begins by the lakes of Mewar.',
}

const SCHEDULE = [
  { day: 'DAY ONE', date: '15 Nov 2025', label: 'Sunday · Ring Ceremony', city: 'KHERWARA', events: [{ time: '11:00 AM', name: 'Ring Ceremony', location: 'Kherwara, Rajasthan' }] },
  { day: 'DAY TWO', date: '23 Nov 2025', label: 'Monday · Mehendi', city: 'KHERWARA', events: [{ time: '5:00 PM', name: 'Mehendi', location: 'Kherwara (Hometown)' }] },
  { day: 'DAY THREE', date: '24 Nov 2025', label: 'Tuesday · Haldi & Sangeet', city: 'UDAIPUR', events: [{ time: '10:00 AM', name: 'Haldi Ceremony', location: 'Aashish Vatika' }, { time: '7:00 PM', name: 'Sangeet Night', location: 'Aashish Vatika Lawns' }] },
  { day: 'DAY FOUR', date: '25 Nov 2025', label: 'Wednesday · Baraat & Nikah', city: 'UDAIPUR', events: [{ time: '4:00 PM', name: 'Baraat Procession', location: 'Fateh Sagar Lakefront' }, { time: '7:00 PM', name: 'Wedding Ceremony', location: 'Aashish Vatika' }] },
  { day: 'DAY FIVE', date: '26 Nov 2025', label: 'Thursday · Reception', city: 'UDAIPUR', events: [{ time: '7:00 PM', name: 'Grand Reception', location: 'Aashish Vatika Ballroom' }] },
]

const GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/lp-g1/800/560', caption: 'The Sangeet' },
  { id: 2, img: 'https://picsum.photos/seed/lp-g2/560/780', caption: 'Mehendi Night' },
  { id: 3, img: 'https://picsum.photos/seed/lp-g3/800/540', caption: 'Haldi at Dawn' },
  { id: 4, img: 'https://picsum.photos/seed/lp-g4/560/800', caption: 'The Baraat' },
  { id: 5, img: 'https://picsum.photos/seed/lp-g5/800/560', caption: 'Wedding Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/lp-g6/560/720', caption: 'First Look' },
  { id: 7, img: 'https://picsum.photos/seed/lp-g7/800/580', caption: 'Reception Night' },
  { id: 8, img: 'https://picsum.photos/seed/lp-g8/560/760', caption: 'The Vows' },
]

const CHAPTERS = [
  { num: '01', title: 'The Beginning', img: 'https://picsum.photos/seed/lp-begin/640/480', text: 'They met the way most good things do — unexpectedly, and at exactly the right time. A shared city, a common friend, and a coffee that stretched into an evening neither planned to give away.' },
  { num: '02', title: 'The Distance', img: 'https://picsum.photos/seed/lp-distance/640/480', text: 'Miles between them. Calls that ran past midnight. The kind of longing that makes you certain about a person — because missing them feels like missing something essential.' },
  { num: '03', title: 'The Question', img: 'https://picsum.photos/seed/lp-proposal/640/480', text: 'He asked on a rooftop strung with lights she didn\'t know he\'d arranged. She said yes before he finished the sentence. Some answers don\'t need to wait.' },
]

// ── Hooks ─────────────────────────────────────────────────────────────────────
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
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translate(${fromX}px, 32px)`,
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>{children}</div>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 px-6" style={{ background: '#0a0702' }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-700/50" />
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase">Gallery</p>
            <div className="h-px w-8 bg-amber-700/50" />
          </div>
          <h2 className="font-display text-4xl font-light italic text-amber-100 text-center mb-12">
            Memories in <span className="text-amber-500">gold.</span>
          </h2>
        </FadeUp>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(15,10,4,0.85) 0%, transparent 60%)' }}>
                  <p className="text-amber-200 text-sm font-display italic">{p.caption}</p>
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
            <p className="text-center font-display italic text-amber-300 mt-4 text-base">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
              style={{ background: 'rgba(201,168,76,0.2)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.4)' }}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Envelope Reveal ──────────────────────────────────────────────────────────
function EnvelopeReveal({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const handleOpen = () => { setOpening(true); setTimeout(onOpen, 1200) }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#0f0a04' }}>
      <style>{`
        @keyframes envFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes sealPulse { 0%,100%{box-shadow:0 0 0 0 rgba(139,26,26,0.4)} 50%{box-shadow:0 0 0 12px rgba(139,26,26,0)} }
      `}</style>
      <div style={{ animation: opening ? 'none' : 'envFloat 3s ease-in-out infinite' }}>
        <div className={`relative cursor-pointer transition-all duration-700 ${opening ? 'scale-125 opacity-0' : 'hover:scale-105'}`}
          onClick={handleOpen} style={{ filter: 'drop-shadow(0 20px 60px rgba(201,168,76,0.25))' }}>
          <div className="w-80 h-52 rounded-xl relative shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #e8dcc8 0%, #d4c5a9 100%)' }}>
            <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-xl">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #c9b898 50%, transparent 50%)' }} />
            </div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top right, #c4b48a 50%, transparent 50%)' }} />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(to top left, #c4b48a 50%, transparent 50%)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10"
              style={{ background: 'radial-gradient(circle at 35% 35%, #8b1a1a, #5c1010)', animation: 'sealPulse 2s ease-in-out infinite' }}>
              <span className="font-display text-lg font-bold text-amber-200">{W.groom[0]}&amp;{W.bride[0]}</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500">Udaipur · Rajasthan</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-stone-600 text-sm italic" style={{ animation: 'envFloat 2s ease-in-out infinite' }}>Tap the seal to open</p>
    </div>
  )
}

// ── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ bride, groom }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{ background: 'rgba(15,10,4,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <Link to="/" className="text-xs text-amber-700 hover:text-amber-500 tracking-widest uppercase">← WedSite Studio</Link>
      <p className="font-display text-lg font-semibold tracking-widest text-amber-100">
        {groom[0]} <span className="text-amber-600">&amp;</span> {bride[0]}
        <span className="text-amber-700/60 text-sm ml-3 font-normal">26 · 11 · 2025</span>
      </p>
      <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-stone-500">
        {['Story', 'Schedule', 'RSVP', 'Venue'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-amber-500 transition-colors">{s}</a>
        ))}
        <Link to="/templates/lake-palace/edit"
          className="px-4 py-1.5 border border-amber-700/60 text-amber-600 rounded-full hover:bg-amber-700 hover:text-black transition-colors text-xs">
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
  const anim = (delay) => entered ? { animation: `heroFadeUp 1s ease ${delay}s both` } : { opacity: 0 }
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0a04 0%, #1a1108 60%, #0f0a04 100%)' }}>
      <style>{`
        @keyframes heroFadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
        @keyframes countPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes imgZoom { from{transform:scale(1.08)} to{transform:scale(1)} }
      `}</style>
      {[300, 500, 700].map(size => (
        <div key={size} className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: size, height: size, border: '1px solid rgba(201,168,76,0.08)' }} />
      ))}

      <div style={anim(0.1)}>
        <p className="text-amber-600 text-xs tracking-[0.5em] uppercase mb-6">Save the Date</p>
        <p className="text-stone-400 text-xs tracking-[0.3em] uppercase mb-8">Udaipur · Rajasthan</p>
      </div>
      <div>
        <div style={anim(0.3)}>
          <h1 className="font-display italic text-6xl md:text-8xl font-light text-amber-100 leading-none">{bride}</h1>
        </div>
        <div style={anim(0.5)}>
          <p className="font-display text-amber-600 text-3xl italic my-2">weds</p>
        </div>
        <div style={anim(0.7)}>
          <h1 className="font-display italic text-6xl md:text-8xl font-light text-amber-100 leading-none">{groom}</h1>
        </div>
      </div>

      <div style={anim(0.9)}>
        <p className="text-stone-400 text-sm italic max-w-md mt-6 mb-2 leading-relaxed">{tagline}</p>
        <div className="flex items-center gap-4 my-8">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
          <p className="font-display text-amber-500 tracking-widest">{formatted}</p>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
        </div>
        <p className="text-stone-500 text-xs tracking-widest uppercase mb-10">{venue}</p>
      </div>

      <div style={anim(1.1)} className="flex gap-8">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([l, v]) => (
          <div key={l} className="flex flex-col items-center">
            <p className="font-display text-4xl font-light text-amber-400" style={{ animation: l === 'Secs' ? 'countPulse 1s steps(1) infinite' : 'none' }}>
              {String(v).padStart(2, '0')}
            </p>
            <p className="text-xs text-stone-600 tracking-widest uppercase mt-1">{l}</p>
          </div>
        ))}
      </div>
      <div style={anim(1.3)} className="mt-16 text-amber-800 animate-bounce text-xl">↓</div>
    </section>
  )
}

// ── Our Story ────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ background: '#0a0702' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-700/50" />
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase">Our Story</p>
          </div>
          <h2 className="font-display text-4xl font-light italic text-amber-100 mb-16">
            A chapter written in<br/><span className="text-amber-500">tradition,</span> and discovered in love.
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-16">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.num} delay={0.1} fromX={i % 2 === 0 ? -20 : 20}>
              <div className={`flex gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-64 h-48 shrink-0 rounded-xl overflow-hidden group"
                  style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                  <img src={c.img} alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ animation: 'imgZoom 1.2s ease both' }} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-amber-700/50 text-xs tracking-widest mb-2">CHAPTER {c.num}</p>
                  <h3 className="font-display text-2xl italic text-amber-200 mb-3">{c.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{c.text}</p>
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
    <section id="schedule" className="py-24 px-6" style={{ background: '#0f0a04' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-700/50" />
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase">The Schedule</p>
            <div className="h-px w-8 bg-amber-700/50" />
          </div>
          <h2 className="font-display text-4xl font-light italic text-amber-100 text-center mb-4">
            An order of <span className="text-amber-500">moments.</span>
          </h2>
          <p className="text-stone-500 text-sm text-center mb-16 italic">
            Two towns, five days — from a quiet ring ceremony to a week of celebration on the lakes of Udaipur.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-10">
          {SCHEDULE.map((day, i) => (
            <FadeUp key={day.day} delay={i * 0.08}>
              <div className="border-l-2 pl-8" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-amber-700 tracking-widest">{day.day}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full text-stone-400"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    {day.city}
                  </span>
                </div>
                <p className="font-display text-2xl italic text-amber-200 mb-1">{day.date}</p>
                <p className="text-stone-500 text-xs mb-4">{day.label}</p>
                {day.events.map((e) => (
                  <div key={e.name} className="flex items-center gap-6 py-3"
                    style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                    <p className="text-amber-600 font-display italic text-base w-28 shrink-0">{e.time}</p>
                    <p className="text-amber-100 font-medium flex-1">{e.name}</p>
                    <p className="text-stone-500 text-xs">{e.location}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
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
  const cls = "w-full px-4 py-3 text-sm text-amber-100 focus:outline-none rounded-lg"
  const style = { background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }
  return (
    <section id="rsvp" className="py-24 px-6" style={{ background: '#0a0702' }}>
      <div className="max-w-lg mx-auto text-center">
        <FadeUp>
          <p className="text-amber-600 text-xs tracking-[0.4em] uppercase mb-3">You Are Invited</p>
          <h2 className="font-display text-4xl font-light italic text-amber-100 mb-4">RSVP</h2>
          <p className="text-stone-500 text-sm italic mb-10">Kindly respond by 1st November 2025</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          {submitted ? (
            <div className="rounded-2xl p-12" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="font-display text-3xl italic text-amber-200 mb-2">Thank you, {form.name}</p>
              <p className="text-stone-500 text-sm">We look forward to celebrating with you.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4 text-left">
              <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} style={style} />
              <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} style={style} />
              <div className="grid grid-cols-2 gap-4">
                <select name="attending" value={form.attending} onChange={handle} className={cls} style={style}>
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
                <select name="guests" value={form.guests} onChange={handle} className={cls} style={style}>
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
                </select>
              </div>
              <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A note for the couple" className={`${cls} resize-none`} style={style} />
              <button type="submit" className="py-3 font-semibold text-sm tracking-widest uppercase transition-colors rounded-lg"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
                Confirm Attendance
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

// ── Her Words ────────────────────────────────────────────────────────────────
function HerWords() {
  return (
    <section className="py-24 px-6" style={{ background: '#0f0a04' }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-700/50" />
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase">Her Words</p>
            <div className="h-px w-8 bg-amber-700/50" />
          </div>
          <p className="font-display text-xl italic text-amber-200 leading-relaxed mt-8 mb-6">
            "I didn't know what I was looking for — but I knew it when I found it. You are the home I didn't know I needed and the adventure I never planned for. Thank you for choosing me, again and again."
          </p>
          <p className="text-amber-600 font-display italic text-lg">— Yoshita</p>
        </FadeUp>

        <div className="my-12" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }} />

        <FadeUp delay={0.15}>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-amber-700/50" />
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase">His Words</p>
            <div className="h-px w-8 bg-amber-700/50" />
          </div>
          <p className="font-display text-xl italic text-amber-200 leading-relaxed mt-8 mb-6">
            "You make ordinary moments feel significant. Every plan we've made, every place we've gone — it all means more because you were there. I'm not nervous about forever. I just don't want it to start without you."
          </p>
          <p className="text-amber-600 font-display italic text-lg">— Jinkle</p>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Venue ─────────────────────────────────────────────────────────────────────
function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 px-6" style={{ background: '#0a0702' }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <p className="text-amber-600 text-xs tracking-[0.4em] uppercase mb-3">Find Your Way</p>
          <h2 className="font-display text-4xl font-light italic text-amber-100 mb-4">Venue</h2>
          <p className="text-amber-200 font-medium mb-1">{venue}</p>
          <p className="text-stone-500 text-sm mb-8">{venueAddress}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="h-52 rounded-2xl overflow-hidden mb-6 relative group">
            <img src="https://picsum.photos/seed/udaipur-venue/800/400" alt="Venue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(15,10,4,0.5)' }}>
              <p className="text-amber-200 text-sm font-medium tracking-widest">📍 {venue}</p>
            </div>
          </div>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 text-sm font-medium tracking-wider rounded-full transition-colors"
            style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
            Open in Google Maps →
          </a>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-3 gap-4 mt-10 text-left">
            {[
              { icon: '🏰', title: 'Stay', info: 'Taj Lake Palace, Leela Palace Udaipur (5 min)' },
              { icon: '✈️', title: 'Airport', info: '25 min from Maharana Pratap Airport, Udaipur' },
              { icon: '🚗', title: 'Transfer', info: 'Complimentary shuttle from all recommended hotels' },
            ].map(t => (
              <div key={t.title} className="rounded-xl p-4 hover:scale-105 transition-transform duration-300"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <p className="text-xl mb-2">{t.icon}</p>
                <p className="text-amber-200 text-sm font-medium mb-1">{t.title}</p>
                <p className="text-stone-500 text-xs">{t.info}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function WeddingFooter({ bride, groom, hashtag }) {
  return (
    <footer className="py-16 px-6 text-center" style={{ background: '#0a0702', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <FadeUp>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
          <span className="text-amber-600 text-lg">◆</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
        </div>
        <p className="font-display text-4xl italic font-light text-amber-100 mb-2">{bride} &amp; {groom}</p>
        <p className="text-amber-700 text-sm mb-6 tracking-widest">{hashtag}</p>
        <p className="text-stone-700 text-xs">Made with ♥ by <Link to="/" className="text-amber-800 hover:text-amber-600 underline">WedSite Studio</Link></p>
      </FadeUp>
    </footer>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LakePalacePreview() {
  const [revealed, setRevealed] = useState(false)
  const [entered, setEntered] = useState(false)
  const handleReveal = () => { setRevealed(true); setTimeout(() => setEntered(true), 100) }
  return (
    <div className="font-body" style={{ background: '#0f0a04' }}>
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
