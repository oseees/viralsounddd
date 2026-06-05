import {
  Music,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Check,
  X,
  ArrowRight,
  Star,
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-indigo-600/[0.04] blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Viralsound AI
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Home
            </a>
            <button className="text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 1. Header Section */}
      <section className="relative z-10 px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-400 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade to unlock everything
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-6">
            Turn your music ideas into{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              viral songs
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed">
            Generate hooks, TikTok strategies, and full song drop plans in
            seconds
          </p>
        </div>
      </section>

      {/* 2. Pain Point Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-xl mx-auto">
          <h2 className="text-center text-lg font-semibold text-white/70 mb-6">
            Most artists struggle with:
          </h2>

          <div className="space-y-3 mb-8">
            {[
              {
                icon: <X className="w-4 h-4 text-red-400" />,
                text: "Songs not going viral",
              },
              {
                icon: <X className="w-4 h-4 text-red-400" />,
                text: "No TikTok traction",
              },
              {
                icon: <X className="w-4 h-4 text-red-400" />,
                text: "No release strategy",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 bg-red-500/[0.05] border border-red-500/10 rounded-xl px-5 py-3.5"
              >
                {item.icon}
                <span className="text-white/55 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 bg-emerald-500/[0.08] border border-emerald-500/15 rounded-xl px-5 py-3.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm">
              Viralsound AI fixes this instantly.
            </span>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Everything you need to go viral
            </h2>
            <p className="text-white/40 text-base">
              One platform. Every tool. Zero guesswork.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Viral Song Ideas",
                desc: "AI-generated concepts designed to trend on TikTok and streaming platforms",
                gradient: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-500/20",
                iconBg: "bg-purple-500/15 text-purple-400",
              },
              {
                icon: <Target className="w-5 h-5" />,
                title: "Hook Generator",
                desc: "Scroll-stopping hooks engineered for TikTok's algorithm and retention metrics",
                gradient: "from-blue-500/20 to-purple-500/20",
                border: "border-blue-500/20",
                iconBg: "bg-blue-500/15 text-blue-400",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Viral Score",
                desc: "Predict your song's viral potential before you even record it",
                gradient: "from-cyan-500/20 to-blue-500/20",
                border: "border-cyan-500/20",
                iconBg: "bg-cyan-500/15 text-cyan-400",
              },
              {
                icon: <Calendar className="w-5 h-5" />,
                title: "Release Planner",
                desc: "Day-by-day strategy for your drop — from teasers to full launch",
                gradient: "from-indigo-500/20 to-blue-500/20",
                border: "border-indigo-500/20",
                iconBg: "bg-indigo-500/15 text-indigo-400",
              },
            ].map((f) => (
              <div
                key={f.title}
                className={`relative group bg-gradient-to-br ${f.gradient} border ${f.border} rounded-2xl p-6 backdrop-blur-sm hover:scale-[1.03] transition-all duration-300`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Simple pricing. Serious results.
            </h2>
            <p className="text-white/40 text-base">
              Start free. Upgrade when you're ready to blow up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Free</h3>
                <p className="text-white/40 text-sm">
                  Get started with the basics
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black">$0</span>
                <span className="text-white/30 text-sm ml-1">/forever</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  { text: "2 generations per day", included: true },
                  { text: "Basic song ideas", included: true },
                  { text: "Viral hooks", included: false },
                  { text: "TikTok captions", included: false },
                  { text: "Viral score", included: false },
                  { text: "Release strategy planner", included: false },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-sm"
                  >
                    {item.included ? (
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-white/15 flex-shrink-0" />
                    )}
                    <span
                      className={
                        item.included ? "text-white/70" : "text-white/25"
                      }
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-white/70 hover:text-white font-semibold text-sm transition-all duration-200">
                Start Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-gradient-to-br from-purple-500/[0.08] via-blue-500/[0.06] to-cyan-500/[0.08] border-2 border-purple-500/30 rounded-2xl p-8 flex flex-col shadow-[0_0_40px_rgba(147,51,234,0.15)]">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

              {/* Most Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/30">
                  <Star className="w-3 h-3" />
                  Most Popular
                </div>
              </div>

              <div className="relative mb-6">
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-white/40 text-sm">
                  Unlock everything. Go viral.
                </p>
              </div>

              <div className="relative mb-6">
                <span className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ₦5K–₦10K
                </span>
                <span className="text-white/30 text-sm ml-1">/month</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Unlimited song ideas",
                  "Viral hooks",
                  "TikTok captions",
                  "Viral score",
                  "Release strategy planner",
                  "Priority generation speed",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white/75">{text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0">
                Upgrade & Go Viral
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Social Proof Section */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-purple-400 fill-purple-400"
                />
              ))}
            </div>
            <p className="text-white/50 text-sm">
              Used by upcoming artists to plan viral releases
            </p>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-purple-500/[0.1] via-blue-500/[0.08] to-cyan-500/[0.1] border border-purple-500/20 rounded-3xl p-12 sm:p-16 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/[0.05] to-transparent pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-snug">
                If you're serious about growing your music career, this is your
                shortcut.
              </h2>

              <button className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2">
                Start Creating Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm">Viralsound AI</span>
          </div>
          <p className="text-white/20 text-sm">
            Built for artists who move culture.
          </p>
        </div>
      </footer>
    </div>
  );
}
