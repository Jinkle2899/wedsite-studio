import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const W = {
  bride: 'Kavya', groom: 'Rohan',
  date: '2025-11-08T00:00:00',
  venue: 'Wildflower Hall, Shimla',
  venueAddress: 'Mashobra, Shimla, Himachal Pradesh 171007',
  hashtag: '#KavyaWedRohan',
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-green-100 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-sm text-green-600 hover:text-green-800">← Back to WedSite Studio</Link>
      <p className="text-xs text-gray-400 italic">Preview — Garden Whisper Template</p>
      <Link to="/templates/garden-whisper/edit" className="text-sm font-semibold bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition-colors">Customise This →</Link>
    </div>
  )
}

function Hero({ bride, groom, date, venue }) {
  const { days, hours, minutes, seconds } = useCountdown(date)
  const formatted = new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-lime-50 to-white flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Leaf decorations */}
      <div className="absolute top-24 left-8 text-6xl opacity-20 rotate-12">🌿</div>
      <div className="absolute top-32 right-8 text-5xl opacity-20 -rotate-12">🌸</div>
      <div className="absolute bottom-20 left-12 text-5xl opacity-20 rotate-6">🍃</div>
      <div className="absolute bottom-24 right-12 text-6xl opacity-20 -rotate-6">🌺</div>

      <p className="text-green-500 text-xs tracking-[0.4em] uppercase mb-4 font-medium">A Boho Garden Wedding</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold text-green-900 mb-3">
        {bride} <span className="text-green-400 italic">&amp;</span> {groom}
      </h1>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-12 bg-green-300" />
        <span className="text-green-400">🌿</span>
        <div className="h-px w-12 bg-green-300" />
      </div>
      <p className="text-green-600 font-medium mb-1">{formatted}</p>
      <p className="text-gray-400 text-sm mb-10">{venue}</p>

      <div className="flex gap-4 md:gap-8 mb-12">
        {[['Days', days], ['Hours', hours], ['Mins', minutes], ['Secs', seconds]].map(([label, val]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-md border border-green-100 flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-green-700">
              {String(val).padStart(2, '0')}
            </div>
            <p className="text-xs text-green-500 mt-2 tracking-widest uppercase">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['Our Story', 'Schedule', 'RSVP', 'Gallery', 'Venue'].map((s) => (
          <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
            className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-800 transition-colors">
            {s}
          </a>
        ))}
      </div>
      <div className="mt-16 text-green-300 text-2xl animate-bounce">↓</div>
    </section>
  )
}

function OurStory() {
  const milestones = [
    { year: '2019', icon: '🏕️', event: 'Met at a trek to Triund. She got lost on the trail; he found her.' },
    { year: '2021', icon: '🌻', event: 'Their first date — a picnic in Cubbon Park, Bengaluru.' },
    { year: '2023', icon: '🌊', event: 'A Goa trip cemented it. They danced barefoot on Palolem beach.' },
    { year: '2025', icon: '💍', event: 'He proposed in a flower garden in Coorg with a ring hidden inside a bouquet.' },
  ]
  return (
    <section id="our-story" className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-green-500 text-xs tracking-widest uppercase mb-3">Written in the Wildflowers</p>
        <h2 className="font-display text-4xl font-bold text-green-900 mb-12">Our Story</h2>
        <div className="flex flex-col gap-8">
          {milestones.map((m, i) => (
            <div key={m.year} className={`flex items-start gap-6 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-14 h-14 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center text-2xl shrink-0">{m.icon}</div>
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex-1 text-left">
                <p className="text-green-500 text-xs font-semibold mb-1 tracking-widest">{m.year}</p>
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
    { time: '09:00 AM', title: 'Morning Haldi', location: 'Lawn Garden', icon: '🌼' },
    { time: '11:00 AM', title: 'Mehendi Circle', location: 'Orchard Terrace', icon: '🌿' },
    { time: '03:00 PM', title: 'Ceremony Begins', location: 'Wildflower Meadow', icon: '💐' },
    { time: '05:00 PM', title: 'Vows & Ring Exchange', location: 'Wildflower Meadow', icon: '💍' },
    { time: '06:30 PM', title: 'Cocktails & Canapés', location: 'Garden Pavilion', icon: '🍹' },
    { time: '08:00 PM', title: 'Dinner Under the Stars', location: 'Forest Clearing', icon: '🌙' },
  ]
  return (
    <section id="schedule" className="py-24 bg-green-50 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-green-500 text-xs tracking-widest uppercase mb-3">The Day Unfolds</p>
        <h2 className="font-display text-4xl font-bold text-green-900 mb-12">Schedule</h2>
        <div className="flex flex-col gap-3">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-green-100 shadow-sm text-left">
              <span className="text-2xl">{e.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-green-900">{e.title}</p>
                <p className="text-xs text-gray-400">{e.location}</p>
              </div>
              <p className="text-sm font-medium text-green-600 whitespace-nowrap">{e.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RSVP() {
  const [form, setForm] = useState({ name: '', email: '', guests: '1', attending: 'yes', dietary: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }
  const cls = "w-full border border-green-200 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 text-gray-700"
  return (
    <section id="rsvp" className="py-24 bg-white px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-green-500 text-xs tracking-widest uppercase mb-3">Join the Garden</p>
        <h2 className="font-display text-4xl font-bold text-green-900 mb-4">RSVP</h2>
        <p className="text-gray-400 text-sm mb-10">Please respond by 15th October 2025</p>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-10">
            <p className="text-4xl mb-4">🌿</p>
            <h3 className="font-display text-2xl font-bold text-green-700 mb-2">See you in the garden, {form.name}!</h3>
            <p className="text-gray-400 text-sm">We can't wait to celebrate surrounded by nature with you.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4 text-left">
            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={cls} />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email address" className={cls} />
            <div className="grid grid-cols-2 gap-4">
              <select name="attending" value={form.attending} onChange={handle} className={cls}>
                <option value="yes">Blooming with joy! 🌸</option>
                <option value="no">Regretfully can't make it</option>
              </select>
              <select name="guests" value={form.guests} onChange={handle} className={cls}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <input name="dietary" value={form.dietary} onChange={handle} placeholder="Dietary requirements (optional)" className={cls} />
            <textarea name="note" value={form.note} onChange={handle} rows={3} placeholder="A note for the couple" className={`${cls} resize-none`} />
            <button type="submit" className="bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors text-sm">
              Send RSVP 🌿
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const GW_GALLERY = [
  { id: 1, img: 'https://picsum.photos/seed/gw-g1/800/560', caption: 'Engagement Morning' },
  { id: 2, img: 'https://picsum.photos/seed/gw-g2/560/780', caption: 'Garden Mehendi' },
  { id: 3, img: 'https://picsum.photos/seed/gw-g3/800/540', caption: 'The Proposal' },
  { id: 4, img: 'https://picsum.photos/seed/gw-g4/560/800', caption: 'Haldi Ceremony' },
  { id: 5, img: 'https://picsum.photos/seed/gw-g5/800/560', caption: 'Outdoor Ceremony' },
  { id: 6, img: 'https://picsum.photos/seed/gw-g6/560/720', caption: 'Reception Night' },
]
function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="gallery" className="py-24 bg-green-50 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-12">
          <p className="text-green-500 text-xs tracking-widest uppercase mb-3">Our Moments</p>
          <h2 className="font-display text-4xl font-bold text-green-900">Gallery</h2>
        </FadeUp>
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GW_GALLERY.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(p)}>
                <img src={p.img} alt={p.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(21,128,61,0.75) 0%, transparent 60%)' }}>
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
            <p className="text-center font-display italic mt-4 text-green-400">{lightbox.caption}</p>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: 'rgba(21,128,61,0.3)', color: '#86efac', border: '1px solid rgba(21,128,61,0.5)' }}>✕</button>
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
        <p className="text-green-500 text-xs tracking-widest uppercase mb-3">In Nature's Embrace</p>
        <h2 className="font-display text-4xl font-bold text-green-900 mb-4">Venue</h2>
        <p className="text-gray-700 font-medium mb-1">{venue}</p>
        <p className="text-gray-400 text-sm mb-8">{venueAddress}</p>
        <div className="bg-green-50 border border-green-100 rounded-2xl h-52 flex flex-col items-center justify-center gap-3 mb-6">
          <span className="text-4xl">🗺️</span>
          <p className="text-green-400 text-sm">Interactive map appears here</p>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`} target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-800 transition-colors text-sm">
          Open in Google Maps →
        </a>
        <div className="grid grid-cols-3 gap-4 mt-10 text-left">
          {[
            { icon: '🏡', title: 'Stay', info: 'Wildflower Hall (on-site luxury resort)' },
            { icon: '🚌', title: 'Transport', info: 'Shuttle from Shimla station every 2 hrs' },
            { icon: '✈️', title: 'Nearest City', info: '90 min drive from Chandigarh Airport' },
          ].map(t => (
            <div key={t.title} className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-semibold text-green-900 text-sm mb-1">{t.title}</p>
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
    <footer className="bg-green-800 text-white py-16 px-6 text-center">
      <p className="text-3xl mb-4">🌿</p>
      <p className="font-display text-3xl font-bold mb-2">{bride} &amp; {groom}</p>
      <p className="text-green-300 text-sm mb-6">{hashtag}</p>
      <p className="text-green-500 text-xs">Made with ❤️ by <Link to="/" className="underline hover:text-white">WedSite Studio</Link></p>
    </footer>
  )
}

export default function GardenWhisperPreview() {
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
