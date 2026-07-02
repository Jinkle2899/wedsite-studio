import { useState, useEffect } from 'react'

const MARQUEE_ITEMS = [
  'Lake Palace', '✦', 'Blush Romance', '✦', 'Mughal Garden', '✦',
  'Noir Elegance', '✦', 'Coastal Royale', '✦', 'Garden Whisper', '✦',
  'Desert Dusk', '✦', 'Ivory Classic', '✦', 'Royal Sapphire', '✦', 'Rosy Dawn', '✦',
]

export default function HeroSection() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  const anim = (delay) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  })

  return (
    <>
      <style>{`
        @keyframes marqueeScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes floatCard { 0%,100% { transform: translateY(0px) rotate(0deg) } 50% { transform: translateY(-14px) rotate(0.4deg) } }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.5; transform:scale(0.8) } }
        @keyframes badgeSlidein { from { opacity:0; transform:translateX(-20px) } to { opacity:1; transform:translateX(0) } }
        @keyframes badgeSlideRight { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }
        @keyframes badgeFadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      <section
        className="relative min-h-screen overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(155deg, #FAFAF7 0%, #FDF8F4 45%, #FAF4EE 100%)' }}
      >
        {/* Decorative background radials */}
        <div className="absolute -top-40 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 60% 40%, rgba(201,149,107,0.11) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(253,245,240,0.9) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,149,107,0.04) 0%, transparent 60%)' }} />

        {/* Main content */}
        <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-20 flex-1 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* ── Left column ── */}
          <div>
            {/* Pill badge */}
            <div style={anim(0.05)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
                style={{ color: '#c9956b', border: '1px solid rgba(201,149,107,0.3)', background: 'rgba(201,149,107,0.07)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: '#c9956b', animation: 'pulseDot 2s ease-in-out infinite' }}
                />
                Wedding Websites &amp; Digital Invites
              </span>
            </div>

            {/* Heading */}
            <div style={anim(0.15)}>
              <h1
                className="font-display leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', color: '#1a1a1a' }}
              >
                Your Love Story,
                <span className="block font-light italic" style={{ color: '#c9956b' }}>Beautifully</span>
                <span className="block font-bold">Online.</span>
              </h1>
            </div>

            {/* Subheading */}
            <p
              className="text-lg leading-relaxed mt-6 mb-10 max-w-md"
              style={{ ...anim(0.28), color: '#6b6b6b' }}
            >
              From first save-the-date to final RSVP — stunning wedding websites crafted for Indian couples worldwide. Ready in 24 hours.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12" style={anim(0.38)}>
              <a
                href="#templates"
                className="px-8 py-3.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                  boxShadow: '0 8px 24px rgba(26,26,26,0.3)',
                }}
              >
                Browse Templates
              </a>
              <a
                href="#pricing"
                className="px-8 py-3.5 text-sm font-bold rounded-full border-2 transition-all bg-white"
                style={{ color: '#1a1a1a', borderColor: '#E5E0DA' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9956b'; e.currentTarget.style.color = '#c9956b' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E0DA'; e.currentTarget.style.color = '#1a1a1a' }}
              >
                View Pricing →
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4" style={anim(0.48)}>
              <div className="flex -space-x-2">
                {['couple11','couple22','couple33','couple44'].map(seed => (
                  <img
                    key={seed}
                    src={`https://picsum.photos/seed/${seed}/40/40`}
                    alt="couple"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>200+ couples trusted us</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} style={{ color: '#F59E0B', fontSize: '13px' }}>{s}</span>
                  ))}
                  <span className="text-xs ml-1" style={{ color: '#9B9189' }}>5.0 · Loved by NRI couples</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: browser mockup ── */}
          <div
            className="relative hidden lg:block"
            style={{ opacity: entered ? 1 : 0, transition: 'opacity 0.9s ease 0.25s' }}
          >
            {/* Floating card */}
            <div style={{ animation: 'floatCard 7s ease-in-out infinite' }} className="relative">

              {/* Browser window */}
              <div
                className="rounded-3xl overflow-hidden bg-white"
                style={{
                  boxShadow: '0 40px 90px rgba(0,0,0,0.14), 0 10px 28px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                {/* Chrome bar */}
                <div
                  className="flex items-center gap-2 px-5 py-3 border-b"
                  style={{ background: '#F5F4F2', borderColor: '#ECEAE7' }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FF6158' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28CA41' }} />
                  </div>
                  <div
                    className="flex-1 mx-3 py-1.5 px-4 rounded-full text-xs font-mono"
                    style={{ background: 'white', color: '#9CA3AF', border: '1px solid #E5E7EB' }}
                  >
                    rahul-and-priya.wedsite.studio
                  </div>
                </div>

                {/* Template preview content */}
                <div
                  className="text-center"
                  style={{
                    background: 'linear-gradient(180deg, #FEF0F5 0%, #FAFAFA 100%)',
                    padding: '2rem 2rem 1.5rem',
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase font-semibold mb-2"
                    style={{ color: '#c9956b' }}
                  >
                    Together Forever
                  </p>
                  <h2 className="font-display text-3xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                    Rahul &amp; Priya
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-8" style={{ background: 'rgba(201,149,107,0.4)' }} />
                    <span style={{ color: '#c9956b', fontSize: '10px' }}>♦</span>
                    <div className="h-px w-8" style={{ background: 'rgba(201,149,107,0.4)' }} />
                  </div>
                  <p className="text-sm mb-5" style={{ color: '#9CA3AF' }}>
                    February 14, 2025 · The Leela Palace, Mumbai
                  </p>
                  <div className="flex justify-center gap-2 mb-5">
                    {['💌 RSVP', '📍 Venue', '🗓 Schedule'].map((b) => (
                      <span
                        key={b}
                        className="text-xs font-semibold text-white px-3 py-1.5 rounded-full"
                        style={{ background: '#c9956b' }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  {/* Photo grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((n) => (
                      <img
                        key={n}
                        src={`https://picsum.photos/seed/hero-prev-${n}/200/140`}
                        className="w-full h-16 object-cover rounded-xl"
                        alt=""
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge: countdown */}
              <div
                className="absolute -left-8 top-1/3 rounded-2xl px-4 py-3 bg-white"
                style={{
                  animation: 'badgeSlidein 0.55s ease 1s both',
                  boxShadow: '0 10px 36px rgba(0,0,0,0.13)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <p className="text-xs mb-0.5" style={{ color: '#9B9189' }}>Countdown</p>
                <p className="font-display font-bold text-charcoal text-lg leading-none">42 Days 🎉</p>
              </div>

              {/* Floating badge: RSVPs */}
              <div
                className="absolute -right-8 top-10 rounded-2xl px-4 py-3 bg-white"
                style={{
                  animation: 'badgeSlideRight 0.55s ease 1.25s both',
                  boxShadow: '0 10px 36px rgba(0,0,0,0.13)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <p className="text-xs mb-0.5" style={{ color: '#9B9189' }}>RSVPs Received</p>
                <div className="flex items-center gap-1.5">
                  <p className="font-display font-bold text-2xl text-charcoal leading-none">128</p>
                  <span className="font-bold text-sm" style={{ color: '#22C55E' }}>✓</span>
                </div>
              </div>

              {/* Floating badge: template */}
              <div
                className="absolute -bottom-5 right-10 rounded-2xl px-4 py-3 text-white"
                style={{
                  animation: 'badgeFadeUp 0.55s ease 1.5s both',
                  background: 'linear-gradient(135deg, #c9956b, #e8b48a)',
                  boxShadow: '0 10px 28px rgba(201,149,107,0.45)',
                }}
              >
                <p className="text-xs font-medium" style={{ opacity: 0.8 }}>Active Template</p>
                <p className="font-display font-bold text-sm">Blush Romance ✨</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Template names marquee ── */}
        <div
          className="border-t overflow-hidden py-4"
          style={{ borderColor: '#EDE9E4', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="flex"
            style={{ animation: 'marqueeScroll 30s linear infinite', width: 'max-content' }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-sm font-medium whitespace-nowrap px-4"
                style={{ color: item === '✦' ? '#c9956b' : '#9B9189' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
