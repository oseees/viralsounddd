import { Music, Zap, Hash, Calendar, ArrowRight, Sparkles, TrendingUp, Mic2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onPricing: () => void;
  onTrends: () => void;
}

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'TikTok Video Ideas',
    description: 'Get 20 scroll-stopping TikTok concepts tailored to your genre, mood, and lyrics — ready to shoot today.',
  },
  {
    icon: <Hash className="w-6 h-6" />,
    title: 'Social Media Captions',
    description: '20 platform-optimized captions with hashtags for Instagram, Twitter, and Facebook that drive real engagement.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Viral Hooks',
    description: '10 magnetic opening lines that stop thumbs mid-scroll and make listeners hit replay instantly.',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: '7-Day Release Plan',
    description: 'A structured daily promo strategy that builds anticipation before drop day and keeps momentum after.',
  },
];

export default function LandingPage({ onGetStarted, onPricing, onTrends }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif]">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ViralSound AI</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={onTrends}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Trends
            </button>
            <button
              onClick={onPricing}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={onGetStarted}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Try it free →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered music marketing
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Turn your song into a{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              viral marketing
            </span>{' '}
            campaign in 5 seconds
          </h1>

          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get TikTok ideas, captions, hooks, and a full promo plan instantly — built for Afrobeats, Amapiano, Drill, and every genre breaking the internet.
          </p>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-sm text-white/30">No credit card. No signup required.</p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-white/5 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm font-medium">
          <span className="flex items-center gap-1.5"><Mic2 className="w-4 h-4" /> Works for all genres</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Results in under 10 seconds</span>
          <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> 50+ content pieces per song</span>
          <span className="flex items-center gap-1.5"><Hash className="w-4 h-4" /> Multi-platform ready</span>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything your release needs</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">One AI prompt generates your entire marketing toolkit — no agency needed.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">3 steps. 5 seconds.</h2>
          <p className="text-white/40 mb-12">No marketing degree required.</p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Enter your song details', desc: 'Title, genre, mood, and an optional lyrics snippet.' },
              { step: '02', title: 'Click Generate', desc: 'Our AI analyses your song and current trends instantly.' },
              { step: '03', title: 'Copy & post', desc: 'Use ready-made content across all your social platforms.' },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-black text-white/[0.04] mb-3 font-['Inter',sans-serif]">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-12">
            <h2 className="text-4xl font-black mb-4">Ready to go viral?</h2>
            <p className="text-white/40 mb-8">Your next campaign is 5 seconds away.</p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm">ViralSound AI</span>
          </div>
          <p className="text-white/20 text-sm">Built for artists who move culture.</p>
        </div>
      </footer>
    </div>
  );
}
