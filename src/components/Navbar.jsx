import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navLinks = [
    { label: 'Templates', href: '#templates' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-semibold text-charcoal tracking-tight">
          Wed<span className="italic text-rose-gold">Site</span> Studio
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-muted hover:text-charcoal transition-colors duration-200 group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full" style={{ background: '#c9956b' }} />
            </a>
          ))}
          <a
            href="#pricing"
            className="px-6 py-2.5 text-sm font-bold text-white rounded-full hover:opacity-90 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', boxShadow: '0 4px 14px rgba(26,26,26,0.3)' }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-100 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-charcoal py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="text-center py-3 text-sm font-bold text-white rounded-full"
            style={{ background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' }}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}
