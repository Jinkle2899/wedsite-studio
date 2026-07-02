import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function useFadeIn(threshold = 0.12) {
  const ref = useRef(null); const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, vis] = useFadeIn()
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(36px)', transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>{children}</div>
}

const signatures = [
  {
    slug: 'lake-palace',
    name: 'Lake Palace',
    tagline: 'Deep gold on midnight — the Udaipur dream.',
    price: '₹12,999',
    palette: ['#1a1209', '#c9a84c', '#8b6914'],
    accent: '#c9a84c',
    bg: 'from-yellow-950 to-stone-900',
    dark: true,
    emoji: '🏰',
    features: ['Envelope reveal', 'Multi-day schedule', 'Her Words', 'Chapter story'],
  },
  {
    slug: 'mughal-garden',
    name: 'Mughal Garden',
    tagline: 'Ivory & emerald — Jaipur heritage in every scroll.',
    price: '₹12,999',
    palette: ['#f5f0e8', '#1a4731', '#c9a84c'],
    accent: '#1a4731',
    bg: 'from-emerald-950 to-stone-900',
    dark: true,
    emoji: '🌿',
    features: ['Envelope reveal', 'Multi-day schedule', 'Her Words', 'Botanical motifs'],
  },
  {
    slug: 'coastal-royale',
    name: 'Coastal Royale',
    tagline: 'Navy & champagne — where the sea meets forever.',
    price: '₹12,999',
    palette: ['#0a1628', '#d4af6e', '#1e3a5f'],
    accent: '#d4af6e',
    bg: 'from-blue-950 to-slate-900',
    dark: true,
    emoji: '🌊',
    features: ['Envelope reveal', 'Multi-day schedule', 'His & Her Words', 'Coastal story'],
  },
  {
    slug: 'desert-dusk',
    name: 'Desert Dusk',
    tagline: 'Terracotta & copper — Rajasthan at golden hour.',
    price: '₹12,999',
    palette: ['#2d1a0e', '#c1693a', '#b87333'],
    accent: '#c1693a',
    bg: 'from-orange-950 to-stone-900',
    dark: true,
    emoji: '🏜️',
    features: ['Envelope reveal', 'Multi-day schedule', 'Her Words', 'Desert story'],
  },
]

export default function SignatureCollection() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-rose-gold/50" />
            <span className="text-rose-gold text-sm tracking-[0.3em] uppercase font-medium">New</span>
            <div className="h-px w-12 bg-rose-gold/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Signature Collection
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Cinematic, fully bespoke wedding websites — with envelope reveal intros, multi-day schedules,
            personal love letters, and storytelling that reads like a film.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {signatures.map((t, idx) => (
            <FadeUp key={t.slug} delay={idx * 0.12}>
            <div
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

              {/* Preview area */}
              <div className={`bg-gradient-to-br ${t.bg} h-56 flex flex-col items-center justify-center relative p-6`}>
                {/* Decorative ring */}
                <div className="absolute w-40 h-40 rounded-full border opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ borderColor: t.accent }} />

                <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{t.emoji}</span>
                <p className="font-display text-2xl font-semibold text-white mb-1">{t.name}</p>
                <p className="text-xs text-gray-400 text-center">{t.tagline}</p>

                {/* Palette */}
                <div className="flex gap-2 mt-4">
                  {t.palette.map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-white/20 shadow"
                      style={{ background: c }} />
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <Link to={`/templates/${t.slug}`}
                    className="px-5 py-2 bg-white text-charcoal text-sm font-semibold rounded-full hover:bg-rose-gold hover:text-white transition-colors">
                    Preview
                  </Link>
                  <Link to={`/templates/${t.slug}/edit`}
                    className="px-5 py-2 border border-white text-white text-sm font-semibold rounded-full hover:bg-white hover:text-charcoal transition-colors">
                    Customise
                  </Link>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white/5 border-t border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {t.features.map((f) => (
                    <span key={f} className="text-xs text-gray-400 border border-white/10 px-2 py-0.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
                <span className="font-display font-bold text-xl shrink-0 ml-4" style={{ color: t.accent }}>
                  {t.price}
                </span>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.5}>
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Each Signature site is handcrafted — delivery in 48 hours.</p>
          <a href="https://wa.me/919588289120" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-rose-gold text-white font-semibold rounded-full hover:bg-rose-gold-light hover:text-charcoal transition-colors text-sm">
            Book a Signature Site →
          </a>
        </div>
        </FadeUp>
      </div>
    </section>
  )
}
