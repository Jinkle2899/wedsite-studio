import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ─── Colour tokens for Blush Romance ───────────────────────────────────────
// Primary: #f48fb1 (rose pink)  Accent: #880e4f (deep pink)  Bg: #fce4ec (blush)

const WEDDING = {
  bride: 'Priya',
  groom: 'Rahul',
  date: '2025-02-14T00:00:00',
  venue: 'The Grand Leela Palace, Mumbai',
  venueAddress: 'Sahar Airport Rd, Andheri East, Mumbai, Maharashtra 400059',
  hashtag: '#PriyaWedRahul',
}

// ─── Scroll reveal ──────────────────────────────────────────────────────────
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

// ─── Countdown hook ─────────────────────────────────────────────────────────
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

// ─── Sub-components ─────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-pink-400 hover:text-pink-600 flex items-center gap-1">
        ← Back to WedSite Studio
      </Link>
      <p className="text-xs text-gray-400 italic">Preview — Blush Romance Template</p>
      <Link
        to="/templates/blush-romance/edit"
        className="text-sm font-semibold bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-600 transition-colors"
      >
        Customise This →
      </Link>
    </div>
  )
}

function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white flex flex-col items-center justify-center text-center px-6 pt-20">
      <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
        Together Forever
      </p>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-display text-5xl md:text-7xl font-bold text-pink-800">{bride}</span>
        <span className="font-display text-4xl md:text-5xl text-pink-400 italic">&amp;</span>
        <span className="font-display text-5xl md:text-7xl font-bold text-pink-800">{groom}</span>
      </div>
      <p className="text-pink-500 font-medium mb-1">{formatted}</p>
      <p className="text-gray-400 text-sm mb-10">{venue}</p>

      {/* Countdown */}
      <div className="flex gap-4 md:gap-8 mb-10">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-md border border-pink-100 flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-pink-700">
              {String(val).padStart(2, '0')}
            </div>
            <p className="text-xs text-pink-400 mt-2 tracking-widest uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Nav pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Gallery', 'Venue'].map((s) => (
          <a
            key={s}
            href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-700 transition-colors"
          >
            {s}
          </a>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="mt-16 animate-bounce text-pink-300 text-2xl">↓</div>
    </section>
  )
}

function OurStory() {
  const milestones = [
    { year: '2019', icon: '☕', event: 'First met at a college fest in Pune — he spilled chai on her notes.' },
    { year: '2021', icon: '🌧️', event: 'First date — a rainy evening walk in Marine Drive, Mumbai.' },
    { year: '2023', icon: '✈️', event: 'Travelled to Goa together. She knew he was the one.' },
    { year: '2024', icon: '💍', event: 'He proposed on a rooftop under fairy lights. She said yes — obviously.' },
  ]
  return (
    <section id="our-story" className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-pink-400 text-xs tracking-widest uppercase mb-3">How It All Began</p>
        <h2 className="font-display text-4xl font-bold text-pink-800 mb-12">Our Story</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink-100 -translate-x-1/2" />
          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex-1 text-right">
                  {i % 2 === 0 && (
                    <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 text-left">
                      <p className="text-pink-400 text-xs font-semibold mb-1">{m.year}</p>
                      <p className="text-gray-600 text-sm">{m.event}</p>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-xl shrink-0 shadow-md z-10">
                  {m.icon}
                </div>
                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4">
                      <p className="text-pink-400 text-xs font-semibold mb-1">{m.year}</p>
                      <p className="text-gray-600 text-sm">{m.event}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Schedule() {
  const events = [
    { time: '10:00 AM', title: 'Haldi Ceremony', location: 'Garden Pavilion', icon: '🌼' },
    { time: '12:30 PM', title: 'Mehendi & Lunch', location: 'Banquet Hall A', icon: '🌿' },
    { time: '04:00 PM', title: 'Baraat Arrival', location: 'Main Entrance', icon: '🐎' },
    { time: '06:00 PM', title: 'Wedding Ceremony', location: 'Grand Mandap', icon: '💍' },
    { time: '08:00 PM', title: 'Reception & Dinner', location: 'Crystal Ballroom', icon: '🥂' },
    { time: '11:00 PM', title: 'Farewell & Cake', location: 'Terrace', icon: '🎂' },
  ]
  return (
    <section id="schedule" className="py-24 bg-pink-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-pink-400 text-xs tracking-widest uppercase mb-3">Plan Your Day</p>
        <h2 className="font-display text-4xl font-bold text-pink-800 mb-12">Wedding Day Schedule</h2>
        <div className="flex flex-col gap-4">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-pink-100 shadow-sm text-left">
              <span className="text-2xl">{e.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-pink-800">{e.title}</p>
                <p className="text-xs text-gray-400">{e.location}</p>
              </div>
              <p className="text-sm font-medium text-pink-500 whitespace-nowrap">{e.time}</p>
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
  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="py-24 bg-white px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-pink-400 text-xs tracking-widest uppercase mb-3">You're Invited</p>
        <h2 className="font-display text-4xl font-bold text-pink-800 mb-4">RSVP</h2>
        <p className="text-gray-400 text-sm mb-10">Please respond by 31st January 2025</p>

        {submitted ? (
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-10">
            <p className="text-4xl mb-4">🎉</p>
            <h3 className="font-display text-2xl font-bold text-pink-700 mb-2">Thank you, {form.name}!</h3>
            <p className="text-gray-500 text-sm">We can't wait to celebrate with you. See you on the 14th!</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input
              name="name" value={form.name} onChange={handle} required
              placeholder="Your full name"
              className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
            />
            <input
              name="email" type="email" value={form.email} onChange={handle} required
              placeholder="Email address"
              className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                name="attending" value={form.attending} onChange={handle}
                className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              >
                <option value="yes">Joyfully Accept 🎊</option>
                <option value="no">Regretfully Decline</option>
              </select>
              <select
                name="guests" value={form.guests} onChange={handle}
                className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              >
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <select
              name="meal" value={form.meal} onChange={handle}
              className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
            >
              <option value="">Meal preference…</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="jain">Jain</option>
            </select>
            <textarea
              name="note" value={form.note} onChange={handle} rows={3}
              placeholder="A message for the couple (optional)"
              className="border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 resize-none"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-700 transition-colors text-sm"
            >
              Send My RSVP 💌
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const BR_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/br-g1/800/560', caption: 'The Proposal' },
  { id: 2, img: 'https://picsum.photos/seed/br-g2/560/780', caption: 'Engagement Evening' },
  { id: 3, img: 'https://picsum.photos/seed/br-g3/800/540', caption: 'Mehendi Day' },
  { id: 4, img: 'https://picsum.photos/seed/br-g4/560/800', caption: 'Getting Ready' },
  { id: 5, img: 'https://picsum.photos/seed/br-g5/800/560', caption: 'The Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/br-g6/560/720', caption: 'First Dance' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-pink-50 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-pink-400 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-bold text-pink-800">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {BR_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(136,14,79,0.75) 0%, transparent 60%)' }}>
                  <p className="text-white text-sm font-display italic">{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-pink-300">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-pink-900/50 text-pink-200 border border-pink-700/50 flex items-center justify-center text-lg">✕</button>
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
        <p className="text-pink-400 text-xs tracking-widest uppercase mb-3">Where to Find Us</p>
        <h2 className="font-display text-4xl font-bold text-pink-800 mb-4">Venue</h2>
        <p className="text-gray-600 font-medium mb-1">{venue}</p>
        <p className="text-gray-400 text-sm mb-8">{venueAddress}</p>
        {/* Mock map */}
        <div className="bg-pink-50 border border-pink-100 rounded-2xl h-56 flex flex-col items-center justify-center gap-3 mb-6">
          <span className="text-4xl">🗺️</span>
          <p className="text-pink-400 text-sm">Interactive map will appear here</p>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors text-sm"
        >
          Open in Google Maps →
        </a>
        {/* Info tiles */}
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏨', title: 'Stay', info: 'The Leela Palace (on-site), JW Marriott (5 min away)' },
            { icon: '🚗', title: 'Parking', info: 'Complimentary valet parking available for all guests' },
            { icon: '✈️', title: 'Airport', info: '10 min from Chhatrapati Shivaji Maharaj International' },
          ].map((t) => (
            <div key={t.title} className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-semibold text-pink-800 text-sm mb-1">{t.title}</p>
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
    <footer className="bg-pink-800 text-white py-16 px-6 text-center">
      <p className="font-display text-3xl font-bold mb-2">{bride} &amp; {groom}</p>
      <p className="text-pink-300 text-sm mb-6">{hashtag}</p>
      <p className="text-pink-400 text-xs">
        Made with ❤️ by{' '}
        <Link to="/" className="underline hover:text-white">WedSite Studio</Link>
      </p>
    </footer>
  )
}

// ─── Main preview ────────────────────────────────────────────────────────────
export default function BlushRomancePreview() {
  return (
    <div className="font-body">
      <TopBar />
      <Hero bride={WEDDING.bride} groom={WEDDING.groom} date={WEDDING.date} venue={WEDDING.venue} />
      <OurStory />
      <Schedule />
      <RSVP />
      <Gallery />
      <Venue venue={WEDDING.venue} venueAddress={WEDDING.venueAddress} />
      <WeddingFooter bride={WEDDING.bride} groom={WEDDING.groom} hashtag={WEDDING.hashtag} />
    </div>
  )
}
