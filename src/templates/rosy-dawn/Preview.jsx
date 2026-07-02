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
  bride: 'Zara', groom: 'Aarav',
  date: '2025-09-14T00:00:00',
  venue: 'Aamby Valley City Resort, Pune',
  venueAddress: 'Aamby Valley City, Shahapur, Maharashtra 412212',
  hashtag: '#ZaraWedAarav',
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
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id) }, [])
  return time
}

function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-orange-100 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-orange-600 hover:text-orange-800">← Back to WedSite Studio</Link>
      <p className="text-xs text-gray-400 italic">Preview — Rosy Dawn Template</p>
      <Link to="/templates/rosy-dawn/edit" className="text-sm font-semibold bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-700 transition-colors">Customise This →</Link>
    </div>
  )
}

function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Sunrise arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-t-full border-2 border-orange-200/40 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-t-full border border-amber-200/40 opacity-40 pointer-events-none" />

      <p className="text-orange-500 text-xs tracking-[0.4em] uppercase mb-4 font-medium">As the Sun Rises on a New Chapter</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold text-orange-900 mb-2">
        {bride} <span className="text-amber-500 italic">&amp;</span> {groom}
      </h1>
      <p className="text-orange-500 font-medium mb-1 tracking-wider">{formatted}</p>
      <p className="text-gray-400 text-sm mb-10">{venue}</p>

      {/* Sunrise countdown */}
      <div className="bg-white/60 backdrop-blur rounded-2xl px-8 py-6 border border-orange-100 shadow-sm mb-10">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4">Until We Say I Do</p>
        <div className="flex gap-6 md:gap-10">
          {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
            <div key={label} className="flex flex-col items-center">
              <p className="font-display text-4xl font-bold text-orange-800">{String(val).padStart(2, '0')}</p>
              <p className="text-xs text-orange-400 mt-1 tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Live Stream', 'Gallery', 'Venue'].map((s) => (
          <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-700 transition-colors">
            {s}
          </a>
        ))}
      </div>
      <div className="mt-16 text-orange-300 text-2xl animate-bounce">↓</div>
    </section>
  )
}

function OurStory() {
  const milestones = [
    { year: '2019', icon: '🎵', event: 'Met at a Sunburn music festival in Pune. They danced to the same song before they even knew each other\'s names.' },
    { year: '2021', icon: '🌅', event: 'First date — watched the sunrise from Sinhagad Fort. Neither wanted it to end.' },
    { year: '2023', icon: '🏄', event: 'A surf trip to Varkala, Kerala — Zara got up on the board; Aarav cheered loudest.' },
    { year: '2025', icon: '🌄', event: 'He proposed at their favourite sunrise spot in Lavasa — a moment as golden as the sky.' },
  ]
  return (
    <section id="our-story" className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">A Golden Beginning</p>
        <h2 className="font-display text-4xl font-bold text-orange-900 mb-12">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{m.icon}</span>
                <span className="text-orange-500 text-sm font-bold">{m.year}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Schedule() {
  const events = [
    { time: '06:00 AM', title: 'Sunrise Ceremony', location: 'Valley Viewpoint', icon: '🌅' },
    { time: '08:00 AM', title: 'Breakfast Reception', location: 'The Terrace', icon: '🥞' },
    { time: '11:00 AM', title: 'Pool Party & Cocktails', location: 'Infinity Pool', icon: '🏊' },
    { time: '02:00 PM', title: 'Gala Lunch', location: 'Grand Pavilion', icon: '🍽️' },
    { time: '06:00 PM', title: 'Sundowner Drinks', location: 'Hilltop Lounge', icon: '🥂' },
    { time: '08:00 PM', title: 'Reception & Dinner', location: 'Amphitheatre', icon: '🎶' },
  ]
  return (
    <section id="schedule" className="py-24 bg-orange-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">From Sunrise to Starlight</p>
        <h2 className="font-display text-4xl font-bold text-orange-900 mb-12">Schedule</h2>
        <div className="flex flex-col gap-3">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-orange-100 shadow-sm text-left">
              <span className="text-2xl">{e.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-orange-900">{e.title}</p>
                <p className="text-xs text-gray-400">{e.location}</p>
              </div>
              <p className="text-sm font-bold text-orange-500 whitespace-nowrap">{e.time}</p>
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
  const cls = "w-full border border-orange-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 bg-orange-50"
  return (
    <section id="rsvp" className="py-24 bg-white px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">Join the Celebration</p>
        <h2 className="font-display text-4xl font-bold text-orange-900 mb-4">RSVP</h2>
        <p className="text-gray-400 text-sm mb-10">Please respond by 20th August 2025</p>
        {submitted ? (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-10">
            <p className="text-4xl mb-4">🌅</p>
            <h3 className="font-display text-2xl font-bold text-orange-700 mb-2">Can't wait to see you, {form.name}!</h3>
            <p className="text-gray-400 text-sm">We'll watch the sunrise together on September 14th.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={cls}>
                <option value="yes">Sunrise, here I come! 🌅</option>
                <option value="no">Sadly can't make it</option>
              </select>
              <select name="guests" value={form.guests} onChange={handle} className={cls}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <select name="meal" value={form.meal} onChange={handle} className={cls}>
              <option value="">Meal preference…</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A message for Zara & Aarav" className={`${cls} resize-none`} />
            <button type="submit" className="bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-700 transition-colors text-sm">
              Send RSVP 🌅
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function LiveStream({ link }) {
  return (
    <section id="live-stream" className="py-24 bg-orange-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">Watch From Anywhere</p>
        <h2 className="font-display text-4xl font-bold text-orange-900 mb-4">Live Stream</h2>
        <p className="text-gray-400 text-sm mb-8">Join us virtually — wherever you are in the world, you can watch the sunrise ceremony live.</p>
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-12 border border-orange-200 mb-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">▶</div>
          <p className="text-orange-800 font-medium">Sunrise Ceremony — 6:00 AM, 14th September 2025</p>
          <p className="text-gray-400 text-sm">Stream goes live 15 minutes before sunrise</p>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-700 transition-colors text-sm">
          Join the Live Stream →
        </a>
      </div>
    </section>
  )
}

const RD_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/rd-g1/800/560', caption: 'Sunrise Date' },
  { id: 2, img: 'https://picsum.photos/seed/rd-g2/560/780', caption: 'Music Festival' },
  { id: 3, img: 'https://picsum.photos/seed/rd-g3/800/540', caption: 'Varkala Surf' },
  { id: 4, img: 'https://picsum.photos/seed/rd-g4/560/800', caption: 'Lavasa Views' },
  { id: 5, img: 'https://picsum.photos/seed/rd-g5/800/560', caption: 'The Proposal' },
  { id: 6, img: 'https://picsum.photos/seed/rd-g6/560/720', caption: 'Golden Together' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-bold text-orange-900">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {RD_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(154,52,18,0.75) 0%, transparent 60%)' }}>
                  <p className="text-orange-100 text-sm font-display italic">{p.caption}</p>
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
            <p className="text-center font-display italic mt-4 text-orange-300">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(154,52,18,0.25)', color: '#fb923c', border: '1px solid rgba(154,52,18,0.4)' }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

function Venue({ venue, venueAddress }) {
  return (
    <section id="venue" className="py-24 bg-orange-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-orange-400 text-xs tracking-widest uppercase mb-3">Find Your Way</p>
        <h2 className="font-display text-4xl font-bold text-orange-900 mb-4">Venue</h2>
        <p className="text-gray-700 font-medium mb-1">{venue}</p>
        <p className="text-gray-400 text-sm mb-8">{venueAddress}</p>
        <div className="bg-white border border-orange-100 rounded-2xl h-52 flex flex-col items-center justify-center gap-3 mb-6 shadow-sm">
          <span className="text-4xl">🗺️</span>
          <p className="text-orange-300 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-700 transition-colors text-sm">
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏡', title: 'Stay', info: 'Aamby Valley Resort — on-site premium villas & suites' },
            { icon: '🚁', title: 'Helicopter', info: 'Chopper transfers from Pune city (30 min, book in advance)' },
            { icon: '🚗', title: 'Drive', info: '90 min from Pune city, 3.5 hrs from Mumbai' },
          ].map(t => (
            <div key={t.title} className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-semibold text-orange-900 text-sm mb-1">{t.title}</p>
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
    <footer className="bg-orange-900 text-white py-16 px-6 text-center">
      <p className="text-5xl mb-4">🌅</p>
      <p className="font-display text-3xl font-bold mb-2">{bride} &amp; {groom}</p>
      <p className="text-orange-400 text-sm mb-6">{hashtag}</p>
      <p className="text-orange-700 text-xs">Made with ❤️ by <Link to="/" className="underline hover:text-white">WedSite Studio</Link></p>
    </footer>
  )
}

export default function RosyDawnPreview() {
  return (
    <div className="font-body">
      <TopBar />
      <Hero bride={W.bride} groom={W.groom} date={W.date} venue={W.venue} />
      <OurStory />
      <Schedule />
      <RSVP />
      <LiveStream link={W.streamLink} />
      <Gallery />
      <Venue venue={W.venue} venueAddress={W.venueAddress} />
      <WeddingFooter bride={W.bride} groom={W.groom} hashtag={W.hashtag} />
    </div>
  )
}
