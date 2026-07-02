import { useEffect, useRef, useState } from 'react'

function useFadeIn() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
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

const testimonials = [
  {
    quote: 'WedSite Studio made our wedding feel like a Bollywood film — every guest fell in love with the website. Our family in London could follow every ceremony live. Absolutely worth every rupee.',
    name: 'Priya & Rahul Mehta',
    location: 'Mumbai → London',
    photo: 'face-priya-1',
    rating: 5,
    template: 'Blush Romance',
  },
  {
    quote: 'The Lake Palace template was exactly what we dreamed of for our Udaipur wedding. The team set everything up in one day and even helped us write our "Her Words" section. Truly magical.',
    name: 'Ananya & Arjun Sharma',
    location: 'Delhi → Dubai',
    photo: 'face-ananya-2',
    rating: 5,
    template: 'Lake Palace',
  },
  {
    quote: 'So professional, so elegant. Our 250+ guests all said the website was the most beautiful wedding site they had ever seen. The photo gallery had people crying happy tears. Highly recommend!',
    name: 'Meera & Vikram Nair',
    location: 'Hyderabad → Singapore',
    photo: 'face-meera-3',
    rating: 5,
    template: 'Royal Sapphire',
  },
]

const stats = [
  { num: '200+', label: 'Couples served' },
  { num: '15+', label: 'Premium templates' },
  { num: '24hr', label: 'Delivery time' },
  { num: '5.0', label: 'Average rating' },
]

function TestimonialCard({ t, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div
        className="rounded-3xl p-8 flex flex-col relative overflow-hidden h-full"
        style={{
          background: hovered ? '#FFFFFF' : '#FAFAF7',
          border: `1px solid ${hovered ? 'rgba(201,149,107,0.22)' : 'rgba(0,0,0,0.05)'}`,
          boxShadow: hovered
            ? '0 20px 50px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.05)'
            : '0 2px 12px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.35s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Large decorative quote mark */}
        <span
          className="absolute top-5 right-6 font-display font-black select-none pointer-events-none"
          style={{ fontSize: '7rem', lineHeight: 1, color: 'rgba(201,149,107,0.1)', fontStyle: 'italic' }}
        >
          "
        </span>

        {/* Template badge */}
        <span
          className="inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-5"
          style={{ background: 'rgba(201,149,107,0.1)', color: '#c9956b' }}
        >
          {t.template}
        </span>

        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array(t.rating).fill(null).map((_, i) => (
            <span key={i} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm leading-relaxed flex-1 mb-7" style={{ color: '#4A4A4A' }}>
          "{t.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={`https://picsum.photos/seed/${t.photo}/48/48`}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
            alt={t.name}
            loading="lazy"
          />
          <div>
            <p className="font-semibold text-sm text-charcoal">{t.name}</p>
            <p className="text-xs font-medium" style={{ color: '#c9956b' }}>{t.location}</p>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#c9956b' }}>
            Testimonials
          </p>
          <h2
            className="font-display font-bold text-charcoal mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Loved by Couples Everywhere
          </h2>
          <p className="text-muted max-w-lg mx-auto text-base leading-relaxed">
            From Mumbai to Melbourne — here's what couples say about their WedSite Studio experience.
          </p>
        </FadeUp>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} delay={i * 0.1} />
          ))}
        </div>

        {/* Stats bar */}
        <FadeUp delay={0.15} className="mt-14">
          <div
            className="rounded-2xl py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            style={{
              background: 'linear-gradient(135deg, #FAFAF7 0%, #FDF5EF 100%)',
              border: '1px solid rgba(201,149,107,0.15)',
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="font-display font-bold text-charcoal mb-1"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
                >
                  {s.num}
                </p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
