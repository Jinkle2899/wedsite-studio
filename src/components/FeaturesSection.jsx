import { useEffect, useRef, useState } from 'react'

function useFadeIn() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.07 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, vis] = useFadeIn()
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}

const features = [
  { num: '01', icon: '💌', title: 'RSVP Management', desc: 'Guests RSVP in seconds. You see responses instantly — no spreadsheets, no chasing people down.' },
  { num: '02', icon: '⏳', title: 'Live Countdown', desc: 'A beautiful live counter keeps excitement building right up to the moment you say "I do".' },
  { num: '03', icon: '📸', title: 'Photo Gallery', desc: 'Share your engagement photos, and let guests upload their favourite moments after the wedding.' },
  { num: '04', icon: '🗺️', title: 'Venue & Maps', desc: 'Full venue details with Google Maps, parking tips, and hotel recommendations for guests.' },
  { num: '05', icon: '📱', title: 'Mobile Perfect', desc: 'Pixel-perfect on every phone, tablet and screen — guests check in from anywhere in the world.' },
  { num: '06', icon: '🎥', title: 'Live Stream', desc: 'Share a private link so family abroad can watch the ceremony live in real time.' },
  { num: '07', icon: '🎁', title: 'Gift Registry', desc: 'Link your registry from any store — gift-giving made simple and elegant for every guest.' },
  { num: '08', icon: '🔒', title: 'Password Protected', desc: 'Keep your site private. Only your invited guests can access your personal details and plans.' },
]

function FeatureCard({ f, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div
        className="relative bg-white rounded-2xl p-6 overflow-hidden h-full"
        style={{
          boxShadow: hovered
            ? '0 18px 44px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)'
            : '0 2px 12px rgba(0,0,0,0.05)',
          border: `1px solid ${hovered ? 'rgba(201,149,107,0.25)' : 'rgba(0,0,0,0.05)'}`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Watermark number */}
        <span
          className="absolute -top-2 -right-1 font-display font-black select-none pointer-events-none"
          style={{ fontSize: '5.5rem', lineHeight: 1, color: 'rgba(0,0,0,0.035)' }}
        >
          {f.num}
        </span>

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, #FAE8D8, #F5D4B8)'
              : 'linear-gradient(135deg, #FDF0E8, #FAE5D3)',
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
          }}
        >
          {f.icon}
        </div>

        <h3 className="font-display font-semibold text-base text-charcoal mb-2">{f.title}</h3>
        <p className="text-muted text-sm leading-relaxed">{f.desc}</p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
          style={{
            width: hovered ? '100%' : '0%',
            background: 'linear-gradient(90deg, #c9956b, #e8b48a)',
            transition: 'width 0.45s ease',
          }}
        />
      </div>
    </FadeUp>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28" style={{ background: '#FAFAF7' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#c9956b' }}>
            Features
          </p>
          <h2
            className="font-display font-bold text-charcoal mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Everything You Need
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Every website comes packed with the features that make your big day effortless — for you and every single guest.
          </p>
        </FadeUp>

        {/* Feature cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.num} f={f} delay={i * 0.055} />
          ))}
        </div>

        {/* CTA banner */}
        <FadeUp delay={0.12} className="mt-16">
          <div
            className="rounded-3xl overflow-hidden relative text-center py-16 px-8"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%)' }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(201,149,107,0.22) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(201,149,107,0.12) 0%, transparent 70%)',
                transform: 'translate(-30%, 30%)',
              }}
            />
            <div className="relative z-10">
              <h3
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)' }}
              >
                Ready to go live in{' '}
                <span className="italic" style={{ color: '#c9956b' }}>24 hours</span>
              </h3>
              <p className="mb-8 max-w-md mx-auto text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Share your details, pick a template, and we'll hand you a stunning site — same day.
              </p>
              <a
                href="#pricing"
                className="inline-block px-9 py-4 text-sm font-bold text-white rounded-full transition-all hover:opacity-90 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #c9956b, #e8b48a)',
                  boxShadow: '0 10px 28px rgba(201,149,107,0.42)',
                }}
              >
                Get Your Site Today →
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
