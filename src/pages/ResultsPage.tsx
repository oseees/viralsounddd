import { useState } from 'react';
import { Music, ArrowLeft, Copy, Check, RefreshCw, TrendingUp, Hash, Zap, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import type { SongFormData } from './GeneratorPage';

export interface MarketingResults {
  tiktokIdeas: string[];
  captions: string[];
  hooks: string[];
  promotionPlan: string;
}

interface ResultsPageProps {
  results: MarketingResults;
  formData: SongFormData;
  onBack: () => void;
  onReset: () => void;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  items?: string[];
  freeform?: string;
  accentColor: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/50 hover:text-white transition-all duration-200"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : 'Copy all'}
    </button>
  );
}

function CopyItemButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-auto flex-shrink-0 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/[0.06] transition-all duration-200 opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function Section({ icon, title, badge, items, freeform, accentColor }: SectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  const copyText = items
    ? items.map((item, i) => `${i + 1}. ${item}`).join('\n')
    : (freeform ?? '');

  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accentColor}`}>
            {icon}
          </div>
          <div>
            <h2 className="font-bold text-base">{title}</h2>
            <span className="text-xs text-white/30">{badge}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={copyText} />
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="p-4">
          {items && (
            <ol className="space-y-2">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all duration-150"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/5 text-white/30 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed flex-1">{item}</p>
                  <CopyItemButton text={item} />
                </li>
              ))}
            </ol>
          )}

          {freeform && (
            <div className="prose prose-invert prose-sm max-w-none">
              {freeform.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-2" />;

                if (/^day\s*\d+/i.test(trimmed) || /^\*\*day/i.test(trimmed)) {
                  const clean = trimmed.replace(/\*\*/g, '');
                  return (
                    <div key={i} className="mt-5 mb-2">
                      <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {clean}
                      </span>
                    </div>
                  );
                }

                if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                  return (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-emerald-500 mt-1.5 flex-shrink-0">•</span>
                      <p className="text-sm text-white/65 leading-relaxed">{trimmed.slice(2)}</p>
                    </div>
                  );
                }

                if (/^\d+\./.test(trimmed)) {
                  const content = trimmed.replace(/^\d+\.\s*/, '');
                  return (
                    <p key={i} className="text-sm text-white/65 leading-relaxed pl-4">{content}</p>
                  );
                }

                const clean = trimmed.replace(/\*\*(.*?)\*\*/g, '$1');
                return (
                  <p key={i} className="text-sm text-white/65 leading-relaxed">{clean}</p>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResultsPage({ results, formData, onBack, onReset }: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif]">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit details
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Music className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">ViralSound AI</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New song
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-emerald-400 text-xs font-medium mb-4">
            Campaign ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-1">
            {formData.songTitle}
            {formData.artistName && <span className="text-white/40 font-normal text-xl"> — {formData.artistName}</span>}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded-full">{formData.genre}</span>
            <span className="text-xs bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded-full">{formData.mood}</span>
          </div>
        </div>

        {/* Sections */}
        <Section
          icon={<TrendingUp className="w-4.5 h-4.5" />}
          title="TikTok Video Ideas"
          badge="20 content ideas"
          items={results.tiktokIdeas}
          accentColor="bg-rose-500/15 text-rose-400"
        />

        <Section
          icon={<Hash className="w-4.5 h-4.5" />}
          title="Social Media Captions"
          badge="20 captions"
          items={results.captions}
          accentColor="bg-sky-500/15 text-sky-400"
        />

        <Section
          icon={<Zap className="w-4.5 h-4.5" />}
          title="Viral Hooks"
          badge="10 hooks"
          items={results.hooks}
          accentColor="bg-amber-500/15 text-amber-400"
        />

        <Section
          icon={<Calendar className="w-4.5 h-4.5" />}
          title="7-Day Promotion Plan"
          badge="Full release strategy"
          freeform={results.promotionPlan}
          accentColor="bg-emerald-500/15 text-emerald-400"
        />

        {/* Bottom CTA */}
        <div className="pt-6 text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/60 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Generate for another song
          </button>
        </div>
      </div>
    </div>
  );
}
