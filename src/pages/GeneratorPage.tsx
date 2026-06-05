import { useState } from 'react';
import { Music, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

export interface SongFormData {
  songTitle: string;
  artistName: string;
  genre: string;
  mood: string;
  lyrics: string;
}

interface GeneratorPageProps {
  onBack: () => void;
  onGenerate: (data: SongFormData) => void;
  isLoading: boolean;
  usageCount: number;
  freeLimit: number;
  onPaywallTrigger: () => void;
}

const genres = ['Afrobeats', 'Amapiano', 'Trap', 'Drill', 'Pop', 'RnB'];
const moods = ['Love', 'Hype', 'Emotional', 'Party', 'Sad', 'Inspirational'];

export default function GeneratorPage({ onBack, onGenerate, isLoading, usageCount, freeLimit, onPaywallTrigger }: GeneratorPageProps) {
  const [form, setForm] = useState<SongFormData>({
    songTitle: '',
    artistName: '',
    genre: '',
    mood: '',
    lyrics: '',
  });

  const [errors, setErrors] = useState<Partial<SongFormData>>({});

  function validate() {
    const e: Partial<SongFormData> = {};
    if (!form.songTitle.trim()) e.songTitle = 'Song title is required';
    if (!form.genre) e.genre = 'Please select a genre';
    if (!form.mood) e.mood = 'Please select a mood';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const isAtLimit = usageCount >= freeLimit;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isAtLimit) {
      onPaywallTrigger();
      return;
    }
    if (validate()) onGenerate(form);
  }

  function set(field: keyof SongFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  const inputBase =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all duration-200 text-sm';
  const labelBase = 'block text-sm font-medium text-white/60 mb-2';
  const errorBase = 'text-xs text-red-400 mt-1';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Inter',sans-serif]">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Music className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">ViralSound AI</span>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-emerald-400 text-xs font-medium mb-5">
            <Sparkles className="w-3 h-3" />
            AI Marketing Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Tell us about your song</h1>
          <p className="text-white/40 text-base">We'll generate 50+ pieces of viral content in seconds.</p>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {Array.from({ length: freeLimit }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < usageCount
                    ? 'bg-purple-400'
                    : 'bg-white/10'
                }`}
              />
            ))}
            <span className="text-xs text-white/30 ml-2">
              {Math.max(0, freeLimit - usageCount)} of {freeLimit} free generations left
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Song Title */}
          <div>
            <label className={labelBase}>
              Song Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.songTitle}
              onChange={set('songTitle')}
              placeholder="e.g. On My Mind"
              className={`${inputBase} ${errors.songTitle ? 'border-red-500/50' : ''}`}
            />
            {errors.songTitle && <p className={errorBase}>{errors.songTitle}</p>}
          </div>

          {/* Artist Name */}
          <div>
            <label className={labelBase}>Artist Name <span className="text-white/20 text-xs font-normal">(optional)</span></label>
            <input
              type="text"
              value={form.artistName}
              onChange={set('artistName')}
              placeholder="e.g. Burna Boy"
              className={inputBase}
            />
          </div>

          {/* Genre & Mood row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>
                Genre <span className="text-red-400">*</span>
              </label>
              <select
                value={form.genre}
                onChange={set('genre')}
                className={`${inputBase} appearance-none cursor-pointer ${errors.genre ? 'border-red-500/50' : ''}`}
              >
                <option value="" disabled>Select genre</option>
                {genres.map((g) => (
                  <option key={g} value={g} className="bg-[#111] text-white">{g}</option>
                ))}
              </select>
              {errors.genre && <p className={errorBase}>{errors.genre}</p>}
            </div>

            <div>
              <label className={labelBase}>
                Mood <span className="text-red-400">*</span>
              </label>
              <select
                value={form.mood}
                onChange={set('mood')}
                className={`${inputBase} appearance-none cursor-pointer ${errors.mood ? 'border-red-500/50' : ''}`}
              >
                <option value="" disabled>Select mood</option>
                {moods.map((m) => (
                  <option key={m} value={m} className="bg-[#111] text-white">{m}</option>
                ))}
              </select>
              {errors.mood && <p className={errorBase}>{errors.mood}</p>}
            </div>
          </div>

          {/* Mood pills */}
          <div>
            <p className="text-xs text-white/30 mb-2">Quick mood select</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, mood: m }));
                    setErrors((p) => ({ ...p, mood: undefined }));
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                    form.mood === m
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Lyrics */}
          <div>
            <label className={labelBase}>
              Lyrics Snippet <span className="text-white/20 text-xs font-normal">(optional — helps with relevance)</span>
            </label>
            <textarea
              value={form.lyrics}
              onChange={set('lyrics')}
              placeholder="Paste a hook or verse here..."
              rows={4}
              className={`${inputBase} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 font-semibold text-base px-6 py-4 rounded-2xl transition-all duration-200 mt-2 ${
              isAtLimit
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating your campaign...
              </>
            ) : isAtLimit ? (
              <>
                <Sparkles className="w-5 h-5" />
                Upgrade to Generate More
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Marketing Plan
              </>
            )}
          </button>

          {isLoading && (
            <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/10 p-4 text-center">
              <p className="text-sm text-emerald-400/70">Analysing your song and current trends...</p>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
