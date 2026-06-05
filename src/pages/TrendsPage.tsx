import { useState } from "react";
import {
  Music,
  ArrowLeft,
  Search,
  TrendingUp,
  Zap,
  Target,
  Lightbulb,
  Loader2,
  Flame,
  BarChart3,
  Mic2,
  Clapperboard,
} from "lucide-react";

export interface TrendResult {
  trend_summary: string;
  viral_patterns: string[];
  why_it_works: string[];
  song_adaptation: {
    hook: string;
    sound_direction: string;
    structure: string;
  };
  tiktok_strategy: {
    caption_style: string;
    posting_idea: string;
    hook_seconds: string;
  };
  virality_score: number;
}

interface TrendsPageProps {
  onBack: () => void;
}

const genrePills = [
  "Afrobeats",
  "Amapiano",
  "Drill",
  "Trap",
  "Pop",
  "RnB",
  "Rema-style",
  "Afro-fusion",
];

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 85
      ? "text-emerald-400"
      : score >= 70
        ? "text-amber-400"
        : "text-orange-400";
  const strokeColor =
    score >= 85
      ? "stroke-emerald-400"
      : score >= 70
        ? "stroke-amber-400"
        : "stroke-orange-400";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className="stroke-white/[0.06]"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black ${color}`}>{score}</span>
        <span className="text-[10px] text-white/30 uppercase tracking-wider">
          Viral
        </span>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function TrendsPage({ onBack }: TrendsPageProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrendResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/trend-intelligence`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInput: input }),
        }
      );

      const json = await response.json();
      if (!response.ok || json.error) {
        throw new Error(json.error || "Failed to analyze trends");
      }

      setResult(json as TrendResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif]">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/[0.06] blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Music className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">
              Viralsound AI
            </span>
          </div>
          <div className="w-12" />
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-400 text-xs font-medium mb-5">
            <TrendingUp className="w-3 h-3" />
            Trend Intelligence Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            What's working{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              right now
            </span>
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Enter your genre, style, or song idea. Get pattern-based viral
            insights, hook suggestions, and a TikTok strategy built for your
            sound.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='e.g. "Afrobeats love song" or "Amapiano log drum drop"'
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all duration-200 text-sm"
            />
          </div>

          {/* Quick genre pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {genrePills.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setInput(g)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-white/[0.03] border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              >
                {g}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full mt-5 flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing trends...
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                Analyze Trends
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-5 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="rounded-2xl bg-purple-500/[0.05] border border-purple-500/10 p-6 text-center mb-6">
            <p className="text-sm text-purple-300/70">
              Scanning viral patterns and platform behavior...
            </p>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-4">
            {/* Summary + Score */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.virality_score} />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-bold mb-2">Trend Summary</h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {result.trend_summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Viral Patterns */}
            <Card
              icon={<Zap className="w-4 h-4" />}
              title="Viral Patterns"
              accent="bg-purple-500/15 text-purple-400"
            >
              <ul className="space-y-2.5">
                {result.viral_patterns.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/60 leading-relaxed">{p}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Why It Works */}
            <Card
              icon={<Lightbulb className="w-4 h-4" />}
              title="Why It Works"
              accent="bg-amber-500/15 text-amber-400"
            >
              <ul className="space-y-2.5">
                {result.why_it_works.map((w, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <p className="text-sm text-white/60 leading-relaxed">{w}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Song Adaptation */}
            <Card
              icon={<Mic2 className="w-4 h-4" />}
              title="Song Adaptation"
              accent="bg-cyan-500/15 text-cyan-400"
            >
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Hook
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed bg-cyan-500/[0.04] border border-cyan-500/10 rounded-lg px-4 py-3 italic">
                    {result.song_adaptation.hook}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Sound Direction
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {result.song_adaptation.sound_direction}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      TikTok-Optimized Structure
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {result.song_adaptation.structure}
                  </p>
                </div>
              </div>
            </Card>

            {/* TikTok Strategy */}
            <Card
              icon={<Clapperboard className="w-4 h-4" />}
              title="TikTok Strategy"
              accent="bg-rose-500/15 text-rose-400"
            >
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    Caption Style
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed mt-2 bg-rose-500/[0.04] border border-rose-500/10 rounded-lg px-4 py-3">
                    {result.tiktok_strategy.caption_style}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    Posting Idea
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed mt-2">
                    {result.tiktok_strategy.posting_idea}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    First 3 Seconds Strategy
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed mt-2">
                    {result.tiktok_strategy.hook_seconds}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
