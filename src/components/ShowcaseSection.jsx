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

const highlights = [
  'Animated wax-seal envelope opening',
  'Live countdown to the wedding day',
  'Love story & journey timeline',
  'Full events & ceremony schedule',
  'Gift registry & Google Maps venue',
  'Custom domain — yourname.in',
]

export default function ShowcaseSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#0f0d0a' }}>

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 68%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,149,107,0.05) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: '#4ade80',
                    boxShadow: '0 0 0 3px rgba(74,222,128,0.2), 0 0 10px rgba(74,222,128,0.5)',
                  }}
                />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Real Website · Live Right Now
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.07}>
              <h2
                className="font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
              >
                This is what we{' '}
                <span className="italic" style={{ color: '#c9a84c' }}>actually</span>{' '}
                build
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Yoshita & Jinkle's wedding website — built by us, live on a custom domain.
                Not a template demo. A fully personalised wedding website for a real Udaipur wedding.
              </p>
            </FadeUp>

            <FadeUp delay={0.17}>
              <ul className="space-y-3.5 mb-10">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    <span style={{ color: '#c9a84c', flexShrink: 0 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://yoshitawedsjinkle.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-center transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                    color: '#1a1209',
                    boxShadow: '0 8px 24px rgba(201,168,76,0.35)',
                  }}
                >
                  See Live Website →
                </a>
                <a
                  href="https://wa.me/919588289120?text=Hi! I saw the Yoshita %26 Jinkle website and I want something similar for my wedding."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full text-sm font-bold text-center transition-all hover:bg-white/10"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  I want one like this →
                </a>
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Browser mockup ── */}
          <FadeUp delay={0.14} className="relative">
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                boxShadow: '0 50px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <div
                  className="flex-1 mx-3 py-1.5 px-3 rounded-md text-xs text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
                >
                  yoshitawedsjinkle.in
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative bg-black" style={{ paddingTop: '64%' }}>
                {!imgError ? (
                  <img
                    src="https://api.microlink.io/?url=https%3A%2F%2Fyoshitawedsjinkle.in&screenshot=true&meta=false&embed=screenshot.url"
                    alt="Yoshita & Jinkle live wedding website"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback: beautiful dark placeholder */
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(160deg, #1a1209, #2a1f08)' }}
                  >
                    <p className="font-display text-4xl font-bold mb-2" style={{ color: '#c9a84c' }}>
                      Yoshita <span className="italic">weds</span> Jinkle
                    </p>
                    <p className="text-sm tracking-widest" style={{ color: 'rgba(201,168,76,0.5)' }}>
                      26 · NOVEMBER · 2026 · UDAIPUR
                    </p>
                  </div>
                )}

                {/* Live overlay link */}
                <a
                  href="https://yoshitawedsjinkle.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(10,8,5,0.55)', backdropFilter: 'blur(3px)' }}
                >
                  <span
                    className="px-6 py-2.5 rounded-full text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#1a1209' }}
                  >
                    Open Live Site →
                  </span>
                </a>
              </div>
            </div>

            {/* Floating info badge */}
            <div
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-3.5 hidden sm:block"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}
            >
              <p className="text-xs mb-0.5" style={{ color: '#9B9189' }}>Built by WedSite Studio</p>
              <p className="font-display font-bold text-sm text-charcoal">Yoshita & Jinkle</p>
              <p className="text-xs font-medium" style={{ color: '#c9956b' }}>26 Nov 2026 · Udaipur, Rajasthan</p>
            </div>

            {/* Decorative glow under mockup */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }}
            />
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
