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

const WEDDING = {
  bride: 'Aisha',
  groom: 'Arjun',
  date: '2025-03-22T00:00:00',
  venue: 'The Oberoi, New Delhi',
  venueAddress: 'Dr. Zakir Hussain Marg, New Delhi, 110003',
  hashtag: '#AishaWedArjun',
  streamLink: 'https://youtube.com/live/example',
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
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// ── Top bar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-yellow-400/80 hover:text-yellow-400 flex items-center gap-1">
        ← Back to WedSite Studio
      </Link>
      <p className="text-xs text-gray-500 italic">Preview — Noir Elegance Template</p>
      <Link
        to="/templates/noir-elegance/edit"
        className="text-sm font-semibold bg-yellow-600 text-black px-4 py-1.5 rounded-full hover:bg-yellow-500 transition-colors"
      >
        Customise This →
      </Link>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-yellow-700/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-yellow-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <p className="text-yellow-600 text-xs tracking-[0.4em] uppercase mb-6 font-medium">An Intimate Celebration</p>

      <div className="flex items-center gap-5 mb-6">
        <span className="font-display text-5xl md:text-7xl font-bold text-white">{bride}</span>
        <span className="font-display text-3xl md:text-5xl text-yellow-600 italic">&amp;</span>
        <span className="font-display text-5xl md:text-7xl font-bold text-white">{groom}</span>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-yellow-700/50" />
        <span className="text-yellow-600 text-lg">♦</span>
        <div className="h-px w-16 bg-yellow-700/50" />
      </div>

      <p className="text-yellow-500 font-medium mb-1 tracking-wider">{formatted}</p>
      <p className="text-gray-500 text-sm mb-12">{venue}</p>

      {/* Countdown */}
      <div className="flex gap-4 md:gap-8 mb-12">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border border-yellow-700/60 rounded-xl flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-yellow-500 bg-white/5">
              {String(val).padStart(2, '0')}
            </div>
            <p className="text-xs text-gray-600 mt-2 tracking-widest uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Nav pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Live Stream', 'Registry', 'Venue'].map((s) => (
          <a
            key={s}
            href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 border border-yellow-700/60 text-yellow-600 text-sm font-semibold rounded-full hover:bg-yellow-600 hover:text-black transition-colors"
          >
            {s}
          </a>
        ))}
      </div>

      <div className="mt-16 text-yellow-800 text-2xl animate-bounce">↓</div>
    </section>
  )
}

// ── Our Story ────────────────────────────────────────────────────────────────
function OurStory() {
  const milestones = [
    { year: '2018', icon: '🎓', event: 'Met at IIM Ahmedabad during orientation week. She was the smartest person in the room.' },
    { year: '2020', icon: '🌃', event: 'First date — a candlelit dinner in Connaught Place, Delhi. Three hours felt like minutes.' },
    { year: '2022', icon: '🏔️', event: 'Travelled to Ladakh together. He knew on day one she was his forever.' },
    { year: '2024', icon: '💍', event: 'He proposed at The Oberoi — their favourite place — with her grandmother\'s ring.' },
  ]

  return (
    <section id="our-story" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">How We Found Each Other</p>
        <h2 className="font-display text-4xl font-bold text-white mb-12">Our Story</h2>
        <div className="flex flex-col gap-8">
          {milestones.map((m, i) => (
            <div key={m.year} className={`flex items-start gap-6 text-left ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-14 h-14 border border-yellow-700/60 rounded-full flex items-center justify-center text-2xl shrink-0 bg-black">
                {m.icon}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex-1">
                <p className="text-yellow-600 text-xs font-semibold mb-1 tracking-widest">{m.year}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Schedule ─────────────────────────────────────────────────────────────────
function Schedule() {
  const events = [
    { time: '03:00 PM', title: 'Nikkah Ceremony', location: 'Grand Ballroom', icon: '🕌' },
    { time: '05:00 PM', title: 'Cocktail Hour', location: 'The Terrace Lounge', icon: '🥂' },
    { time: '07:00 PM', title: 'Reception Dinner', location: 'Crystal Ballroom', icon: '🍽️' },
    { time: '09:00 PM', title: 'First Dance', location: 'Crystal Ballroom', icon: '💃' },
    { time: '10:00 PM', title: 'Cake Cutting', location: 'Crystal Ballroom', icon: '🎂' },
    { time: '12:00 AM', title: 'Send-Off', location: 'Grand Foyer', icon: '✨' },
  ]

  return (
    <section id="schedule" className="py-24 bg-black px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">The Evening Ahead</p>
        <h2 className="font-display text-4xl font-bold text-white mb-12">Schedule</h2>
        <div className="flex flex-col gap-3">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 border border-white/10 rounded-2xl px-6 py-4 text-left hover:border-yellow-700/50 transition-colors bg-white/5">
              <span className="text-2xl">{e.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-white">{e.title}</p>
                <p className="text-xs text-gray-500">{e.location}</p>
              </div>
              <p className="text-sm font-medium text-yellow-600 whitespace-nowrap">{e.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── RSVP ─────────────────────────────────────────────────────────────────────
function RSVP() {
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'yes', meal: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputClass = "w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-700 placeholder-gray-600"

  return (
    <section id="rsvp" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">You Are Invited</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">RSVP</h2>
        <p className="text-gray-500 text-sm mb-10">Kindly respond by 1st March 2025</p>

        {submitted ? (
          <div className="border border-yellow-700/40 rounded-2xl p-10 bg-white/5">
            <p className="text-4xl mb-4">✨</p>
            <h3 className="font-display text-2xl font-bold text-yellow-500 mb-2">Thank you, {form.name}</h3>
            <p className="text-gray-400 text-sm">We look forward to celebrating with you on the 22nd.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={inputClass} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={inputClass}>
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
              <select name="guests" value={form.guests} onChange={handle} className={inputClass}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <select name="meal" value={form.meal} onChange={handle} className={inputClass}>
              <option value="">Meal preference…</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="halal">Halal</option>
            </select>
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A message for the couple (optional)" className={`${inputClass} resize-none`} />
            <button type="submit" className="bg-yellow-600 text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors text-sm tracking-wider uppercase">
              Confirm Attendance
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ── Live Stream ───────────────────────────────────────────────────────────────
function LiveStream({ link }) {
  return (
    <section id="live-stream" className="py-24 bg-black px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">Can't Be Here?</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">Watch Live</h2>
        <p className="text-gray-400 text-sm mb-10">
          We'll be streaming the ceremony live so family and friends around the world can celebrate with us.
        </p>
        <div className="border border-yellow-700/40 rounded-2xl p-12 bg-white/5 mb-8 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center text-3xl">▶</div>
          <p className="text-gray-300 font-medium">Live stream starts at 3:00 PM on 22nd March 2025</p>
          <p className="text-gray-500 text-sm">Link will be activated 30 minutes before the ceremony</p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition-colors tracking-wider uppercase text-sm"
        >
          Join Live Stream →
        </a>
      </div>
    </section>
  )
}

// ── Gallery ───────────────────────────────────────────────────────────────────
const NE_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/ne-g1/800/560', caption: 'The Proposal' },
  { id: 2, img: 'https://picsum.photos/seed/ne-g2/560/780', caption: 'Candlelit Evening' },
  { id: 3, img: 'https://picsum.photos/seed/ne-g3/800/540', caption: 'Ladakh Together' },
  { id: 4, img: 'https://picsum.photos/seed/ne-g4/560/800', caption: 'Getting Ready' },
  { id: 5, img: 'https://picsum.photos/seed/ne-g5/800/560', caption: 'The Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/ne-g6/560/720', caption: 'First Dance' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-bold text-white">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {NE_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(161,120,0,0.75) 0%, transparent 60%)' }}>
                  <p className="text-yellow-200 text-sm font-display italic">{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-yellow-500">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(161,120,0,0.25)', color: '#eab308', border: '1px solid rgba(161,120,0,0.4)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Registry ─────────────────────────────────────────────────────────────────
function Registry() {
  const items = [
    { store: 'Crate & Barrel', icon: '🏡', desc: 'Home essentials & kitchenware', url: '#' },
    { store: 'Tanishq', icon: '💎', desc: 'Fine jewellery & gifts', url: '#' },
    { store: 'Cash Fund', icon: '✈️', desc: 'Honeymoon in Europe', url: '#' },
  ]
  return (
    <section id="registry" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">Gift Registry</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">Registry</h2>
        <p className="text-gray-400 text-sm mb-10">Your presence is the greatest gift. If you wish to give, we'd be grateful for contributions to:</p>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <a
              key={item.store}
              href={item.url}
              className="flex items-center gap-5 border border-white/10 rounded-2xl px-6 py-5 text-left hover:border-yellow-700/50 transition-colors bg-white/5 group"
            >
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-white group-hover:text-yellow-500 transition-colors">{item.store}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <span className="text-yellow-700 group-hover:text-yellow-500 transition-colors">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Venue ─────────────────────────────────────────────────────────────────────
function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 bg-black px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-yellow-600 text-xs tracking-widest uppercase mb-3">Find Us Here</p>
        <h2 className="font-display text-4xl font-bold text-white mb-4">Venue</h2>
        <p className="text-gray-300 font-medium mb-1">{venue}</p>
        <p className="text-gray-500 text-sm mb-8">{venueAddress}</p>
        <div className="border border-white/10 rounded-2xl h-52 flex flex-col items-center justify-center gap-3 mb-6 bg-white/5">
          <span className="text-4xl">🗺️</span>
          <p className="text-gray-500 text-sm">Interactive map appears here</p>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 border border-yellow-700/60 text-yellow-600 font-semibold rounded-full hover:bg-yellow-600 hover:text-black transition-colors text-sm"
        >
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏨', title: 'Stay', info: 'The Oberoi (on-site), The Taj Mahal Hotel (10 min)' },
            { icon: '🚗', title: 'Parking', info: 'Valet and self-parking available on-site' },
            { icon: '✈️', title: 'Airport', info: '20 min from Indira Gandhi International Airport' },
          ].map((t) => (
            <div key={t.title} className="border border-white/10 rounded-2xl p-4 bg-white/5">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-semibold text-white text-sm mb-1">{t.title}</p>
              <p className="text-xs text-gray-500">{t.info}</p>
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
    <footer className="bg-zinc-950 border-t border-white/10 py-16 px-6 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-12 bg-yellow-800/50" />
        <span className="text-yellow-700">♦</span>
        <div className="h-px w-12 bg-yellow-800/50" />
      </div>
      <p className="font-display text-3xl font-bold text-white mb-2">{bride} &amp; {groom}</p>
      <p className="text-yellow-700 text-sm mb-6">{hashtag}</p>
      <p className="text-gray-700 text-xs">
        Made with ♥ by{' '}
        <Link to="/" className="text-yellow-800 hover:text-yellow-600 underline">WedSite Studio</Link>
      </p>
    </footer>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function NoirElegancePreview() {
  return (
    <div className="font-body bg-black">
      <TopBar />
      <Hero bride={WEDDING.bride} groom={WEDDING.groom} date={WEDDING.date} venue={WEDDING.venue} />
      <OurStory />
      <Schedule />
      <RSVP />
      <LiveStream link={WEDDING.streamLink} />
      <Gallery />
      <Registry />
      <Venue venue={WEDDING.venue} venueAddress={WEDDING.venueAddress} />
      <WeddingFooter bride={WEDDING.bride} groom={WEDDING.groom} hashtag={WEDDING.hashtag} />
    </div>
  )
}
