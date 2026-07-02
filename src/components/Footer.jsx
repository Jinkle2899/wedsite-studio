import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer style={{ background: '#111110' }} className="text-white">

      {/* ── CTA Strip ── */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3
              className="font-display font-bold text-white mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
            >
              Ready to build your{' '}
              <span className="italic" style={{ color: '#c9956b' }}>dream</span> website?
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Live in 24 hours. Trusted by 200+ Indian couples worldwide.
            </p>
          </div>
          <a
            href="https://wa.me/919588289120"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3.5 text-sm font-bold text-white rounded-full hover:opacity-90 transition-all whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #c9956b, #e8b48a)',
              boxShadow: '0 8px 24px rgba(201,149,107,0.38)',
            }}
          >
            Get Started on WhatsApp →
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand + newsletter */}
        <div className="md:col-span-1">
          <p className="font-display text-xl font-semibold mb-3">
            Wed<span className="italic" style={{ color: '#c9956b' }}>Site</span> Studio
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Beautiful wedding websites &amp; digital invitations, crafted with love for Indian couples worldwide.
          </p>

          {/* Newsletter */}
          <p className="text-xs font-semibold mb-2 tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            STAY INSPIRED
          </p>
          {subscribed ? (
            <p className="text-sm font-semibold" style={{ color: '#c9956b' }}>✓ You're on the list!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-3 py-2.5 text-xs rounded-xl outline-none min-w-0"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-bold rounded-xl shrink-0 transition-opacity hover:opacity-85"
                style={{ background: '#c9956b', color: 'white' }}
              >
                →
              </button>
            </form>
          )}
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Wedding inspiration &amp; template updates.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {[
              { label: 'Instagram', href: 'https://instagram.com/WedSiteStudio', icon: '📷' },
              { label: 'WhatsApp', href: 'https://wa.me/919588289120', icon: '💬' },
              { label: 'Email', href: 'mailto:hello@wedsite.studio', icon: '✉️' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all hover:opacity-100"
                style={{ background: 'rgba(255,255,255,0.08)', opacity: 0.65 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,149,107,0.3)'; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.opacity = '0.65' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {[
          { title: 'Product', items: ['Templates', 'Signature Collection', 'Features', 'Pricing'] },
          { title: 'Company', items: ['About Us', 'Portfolio', 'Blog', 'Contact'] },
          { title: 'Support', items: ['WhatsApp Us', 'FAQ', 'Refund Policy', 'Privacy Policy'] },
        ].map((col) => (
          <div key={col.title}>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-all"
                    style={{ color: 'rgba(255,255,255,0.48)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#c9956b' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.48)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t px-6 py-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          © {new Date().getFullYear()} WedSite Studio. Made with ❤️ in India.
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          @WedSiteStudio on Instagram
        </p>
      </div>
    </footer>
  )
}
