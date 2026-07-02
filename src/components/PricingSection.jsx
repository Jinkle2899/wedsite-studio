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

const plans = [
  {
    name: 'Invite',
    price: '₹199',
    tagline: 'A beautiful digital save-the-date',
    features: [
      'Shareable digital invite page',
      'Couple names, date & venue',
      'Live countdown timer',
      'WhatsApp & link sharing',
      'Mobile optimised',
      '1 month active',
    ],
    cta: 'Get Invite',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '₹499',
    tagline: 'Your full wedding website',
    features: [
      'Everything in Invite',
      '1 premium template',
      'RSVP form (up to 75 guests)',
      'Photo gallery (15 photos)',
      'Venue map & travel info',
      'Schedule of events',
      '3 months hosting',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Classic',
    price: '₹999',
    tagline: 'Most popular — full experience',
    features: [
      'Everything in Starter',
      'Unlimited RSVP guests',
      'Photo gallery (50 photos)',
      'Live stream link',
      'Gift registry link',
      'WhatsApp RSVP notifications',
      'Password protection',
      '6 months hosting',
      'Subdomain included (yourname.wedsite.in)',
    ],
    cta: 'Choose Classic',
    highlight: true,
  },
  {
    name: 'Luxury',
    price: '₹1,999',
    tagline: 'For a truly unforgettable day',
    features: [
      'Everything in Classic',
      'Custom design — your colours & fonts',
      'Unlimited photos',
      'Guest message wall',
      'Signature Collection templates',
      'Custom domain connection (bring your own)',
      'Dedicated WhatsApp support',
      '12 months hosting',
      'Post-wedding guest gallery',
    ],
    cta: 'Go Luxury',
    highlight: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28" style={{ background: '#FAFAF7' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#c9956b' }}>
            Pricing
          </p>
          <h2
            className="font-display font-bold text-charcoal mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Simple, Honest Pricing
          </h2>
          <p className="text-muted max-w-lg mx-auto text-base leading-relaxed">
            No hidden fees. No subscriptions. One payment — your site stays live through the whole journey.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.07}>
              <PricingCard plan={plan} />
            </FadeUp>
          ))}
        </div>

        {/* Domain Add-ons */}
        <FadeUp delay={0.18} className="mt-10">
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FAFAF7 0%, #FDF5EF 100%)',
              border: '1px solid rgba(201,149,107,0.18)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201,149,107,0.12) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#c9956b' }}>
                    Domain Add-ons
                  </p>
                  <h3 className="font-display font-bold text-charcoal text-xl">
                    Want your own domain name?
                  </h3>
                </div>
                <span
                  className="self-start sm:self-center text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{ background: 'rgba(201,149,107,0.12)', color: '#c9956b' }}
                >
                  Available as add-on
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Option A */}
                <div
                  className="bg-white rounded-2xl p-6"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🔗</span>
                    <div>
                      <p className="font-semibold text-charcoal text-sm mb-1">Bring Your Own Domain</p>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: '#9B9189' }}>
                        You buy the domain (e.g. from GoDaddy, Namecheap) and we connect it to your wedding website.
                      </p>
                      <p className="font-display font-bold text-charcoal text-lg">₹299 <span className="text-xs font-body font-normal" style={{ color: '#9B9189' }}>setup fee</span></p>
                    </div>
                  </div>
                </div>
                {/* Option B */}
                <div
                  className="bg-white rounded-2xl p-6"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🛒</span>
                    <div>
                      <p className="font-semibold text-charcoal text-sm mb-1">Domain via Us</p>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: '#9B9189' }}>
                        We purchase the domain for you from GoDaddy and handle the full setup — zero hassle.
                      </p>
                      <p className="font-display font-bold text-charcoal text-lg">
                        GoDaddy price + ₹299{' '}
                        <span className="text-xs font-body font-normal" style={{ color: '#9B9189' }}>setup</span>
                      </p>
                      <a
                        href="https://wa.me/919588289120"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs font-bold hover:opacity-70 transition-opacity"
                        style={{ color: '#c9956b' }}
                      >
                        Ask us for a quote →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Trust note */}
        <FadeUp delay={0.2} className="text-center mt-10">
          <p className="text-sm" style={{ color: '#9B9189' }}>
            Not sure which plan?{' '}
            <a
              href="https://wa.me/919588289120"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:opacity-70 transition-opacity"
              style={{ color: '#c9956b' }}
            >
              Chat with us on WhatsApp →
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function PricingCard({ plan }) {
  const [hovered, setHovered] = useState(false)

  if (plan.highlight) {
    return (
      <div
        className="rounded-3xl p-7 flex flex-col relative overflow-hidden lg:scale-105 lg:-translate-y-2"
        style={{
          background: 'linear-gradient(160deg, #1a1a1a 0%, #252525 60%, #1a1a1a 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 10px 28px rgba(0,0,0,0.16)',
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,149,107,0.28) 0%, transparent 70%)' }}
        />

        {/* Most Popular badge */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <span
            className="inline-block px-5 py-1.5 text-xs font-bold text-white rounded-b-2xl"
            style={{ background: 'linear-gradient(135deg, #c9956b, #e8b48a)' }}
          >
            ✨ Most Popular
          </span>
        </div>

        <p className="text-xs font-bold tracking-widest uppercase mb-2 mt-3" style={{ color: '#c9956b' }}>
          {plan.name}
        </p>
        <p
          className="font-display font-bold text-white leading-none mb-1"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          {plan.price}
        </p>
        <p className="text-sm mb-7" style={{ color: 'rgba(255,255,255,0.45)' }}>{plan.tagline}</p>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <span style={{ color: '#c9956b', marginTop: '1px', flexShrink: 0 }}>✓</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/919588289120"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center py-3.5 px-6 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02] block"
          style={{
            background: 'linear-gradient(135deg, #c9956b, #e8b48a)',
            boxShadow: '0 8px 22px rgba(201,149,107,0.45)',
          }}
        >
          {plan.cta} →
        </a>
      </div>
    )
  }

  return (
    <div
      className="rounded-3xl p-7 flex flex-col relative overflow-hidden"
      style={{
        background: 'white',
        border: `1px solid ${hovered ? 'rgba(201,149,107,0.2)' : 'rgba(0,0,0,0.06)'}`,
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.05)'
          : '0 2px 12px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#c9956b' }}>
        {plan.name}
      </p>
      <p
        className="font-display font-bold text-charcoal leading-none mb-1"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
      >
        {plan.price}
      </p>
      <p className="text-sm mb-7" style={{ color: '#9B9189' }}>{plan.tagline}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span style={{ color: '#c9956b', marginTop: '1px', flexShrink: 0 }}>✓</span>
            <span style={{ color: '#6b6b6b' }}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="https://wa.me/919588289120"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center py-3.5 px-6 rounded-full font-bold text-sm transition-all hover:opacity-80 block"
        style={{
          background: '#F5F3F0',
          color: '#1a1a1a',
        }}
      >
        {plan.cta} →
      </a>
    </div>
  )
}

