import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useFadeIn() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.08 }
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

const templates = [
  {
    id: 1, name: 'Blush Romance', style: 'Romantic',
    palette: ['#fce4ec', '#f48fb1', '#880e4f'],
    price: '₹1,499', tags: ['RSVP', 'Gallery', 'Countdown'],
    slug: 'blush-romance', photo: 'blush-tmpl',
    overlay: 'linear-gradient(to top, rgba(136,14,79,0.85) 0%, rgba(244,143,177,0.25) 55%, transparent 100%)',
  },
  {
    id: 2, name: 'Noir Elegance', style: 'Luxury',
    palette: ['#1a1a1a', '#c9956b', '#fff'],
    price: '₹2,999', tags: ['RSVP', 'Live Stream', 'Registry'],
    slug: 'noir-elegance', photo: 'noir-tmpl',
    overlay: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(30,30,30,0.5) 55%, transparent 100%)',
  },
  {
    id: 3, name: 'Garden Whisper', style: 'Boho',
    palette: ['#f1f8e9', '#aed581', '#558b2f'],
    price: '₹1,499', tags: ['RSVP', 'Gallery', 'Venue Map'],
    slug: 'garden-whisper', photo: 'garden-tmpl',
    overlay: 'linear-gradient(to top, rgba(27,94,32,0.88) 0%, rgba(85,139,47,0.3) 55%, transparent 100%)',
  },
  {
    id: 4, name: 'Royal Sapphire', style: 'Classic',
    palette: ['#e8eaf6', '#5c6bc0', '#1a237e'],
    price: '₹2,999', tags: ['RSVP', 'Schedule', 'Registry'],
    slug: 'royal-sapphire', photo: 'royal-tmpl',
    overlay: 'linear-gradient(to top, rgba(26,35,126,0.88) 0%, rgba(92,107,192,0.3) 55%, transparent 100%)',
  },
  {
    id: 5, name: 'Ivory Classic', style: 'Minimal',
    palette: ['#fffff0', '#d4af37', '#5d4037'],
    price: '₹1,499', tags: ['RSVP', 'Gallery', 'Countdown'],
    slug: 'ivory-classic', photo: 'ivory-tmpl',
    overlay: 'linear-gradient(to top, rgba(93,64,55,0.88) 0%, rgba(212,175,55,0.28) 55%, transparent 100%)',
  },
  {
    id: 6, name: 'Rosy Dawn', style: 'Romantic',
    palette: ['#fff3e0', '#ffb74d', '#e65100'],
    price: '₹2,999', tags: ['RSVP', 'Live Stream', 'Gallery'],
    slug: 'rosy-dawn', photo: 'rosy-tmpl',
    overlay: 'linear-gradient(to top, rgba(230,81,0,0.88) 0%, rgba(255,183,77,0.3) 55%, transparent 100%)',
  },
]

const STYLE_FILTERS = ['All', 'Romantic', 'Luxury', 'Boho', 'Classic', 'Minimal']

export default function TemplateGrid() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? templates : templates.filter((t) => t.style === active)

  return (
    <section id="templates" className="py-28" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#c9956b' }}>
            Our Templates
          </p>
          <h2
            className="font-display font-bold text-charcoal mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Find Your Perfect Style
          </h2>
          <p className="text-muted max-w-lg mx-auto text-base leading-relaxed">
            Every template is fully customisable — your colours, your fonts, your love story.
          </p>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.08} className="flex flex-wrap justify-center gap-2.5 mb-14">
          {STYLE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250"
              style={{
                background: active === f ? '#1a1a1a' : '#F5F3F0',
                color: active === f ? '#fff' : '#6b6b6b',
                boxShadow: active === f ? '0 4px 16px rgba(0,0,0,0.22)' : 'none',
                transform: active === f ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {f}
            </button>
          ))}
        </FadeUp>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
            <FadeUp key={t.id} delay={i * 0.07}>
              <TemplateCard t={t} />
            </FadeUp>
          ))}
        </div>

        {/* Signature Collection teaser */}
        <FadeUp delay={0.1} className="mt-20">
          <div
            className="rounded-3xl overflow-hidden relative text-center py-14 px-8"
            style={{
              background: 'linear-gradient(135deg, #1a1209 0%, #2a1f08 50%, #1a1209 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)', transform: 'translate(-50%, -40%)' }}
            />
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#c9a84c' }}>Signature Collection</p>
            <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Premium. Handcrafted. Unforgettable.
            </h3>
            <p className="mb-7 max-w-lg mx-auto text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Lake Palace, Mughal Garden, Coastal Royale, Desert Dusk — our bespoke Signature templates are a cut above.
            </p>
            <a
              href="#signature"
              className="inline-block px-8 py-3.5 text-sm font-bold text-charcoal rounded-full hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', boxShadow: '0 8px 24px rgba(201,168,76,0.35)' }}
            >
              Explore Signature →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function TemplateCard({ t }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group rounded-3xl overflow-hidden flex flex-col bg-white"
      style={{
        boxShadow: hovered
          ? '0 28px 64px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)'
          : '0 2px 14px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${t.photo}/600/400`}
          alt={t.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: t.overlay }} />

        {/* Template name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {t.style}
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-0.5">{t.name}</h3>
            </div>
            {/* Colour swatches */}
            <div className="flex gap-1">
              {t.palette.map((c, pi) => (
                <div
                  key={pi}
                  className="w-4 h-4 rounded-full border-2 shadow-sm"
                  style={{ background: c, borderColor: 'rgba(255,255,255,0.5)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hover CTA */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'rgba(20,20,20,0.55)',
            backdropFilter: 'blur(2px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {t.slug ? (
            <Link
              to={`/templates/${t.slug}`}
              className="px-7 py-2.5 text-sm font-bold text-charcoal rounded-full transition-all hover:scale-105 shadow-xl"
              style={{ background: 'white' }}
            >
              Preview Template →
            </Link>
          ) : (
            <span
              className="px-7 py-2.5 text-sm font-semibold rounded-full"
              style={{ background: 'rgba(255,255,255,0.8)', color: '#6b6b6b' }}
            >
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 mb-4">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: '#F5F3F0', color: '#6b6b6b' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-xl text-charcoal">{t.price}</span>
          {t.slug ? (
            <Link
              to={`/templates/${t.slug}/edit`}
              className="text-sm font-bold transition-opacity hover:opacity-70"
              style={{ color: '#c9956b' }}
            >
              Customise →
            </Link>
          ) : (
            <span className="text-sm text-muted italic">Soon</span>
          )}
        </div>
      </div>
    </div>
  )
}
