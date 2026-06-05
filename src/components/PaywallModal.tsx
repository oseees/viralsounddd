import { X, Sparkles, Zap, Hash, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

const benefits = [
  { icon: <Sparkles className="w-4 h-4" />, text: 'Unlimited song ideas' },
  { icon: <Zap className="w-4 h-4" />, text: 'Viral TikTok hooks' },
  { icon: <Hash className="w-4 h-4" />, text: 'TikTok captions' },
  { icon: <TrendingUp className="w-4 h-4" />, text: 'Viral score predictions' },
  { icon: <Calendar className="w-4 h-4" />, text: 'Release strategy generator' },
];

export default function PaywallModal({ open, onClose }: PaywallModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#111]/80 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(147,51,234,0.15)] animate-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black text-center mb-2">
          You've hit your free limit
        </h2>
        <p className="text-sm text-white/40 text-center mb-6">
          Upgrade to continue creating viral songs
        </p>

        {/* Benefits */}
        <div className="space-y-3 mb-8">
          {benefits.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <span className="text-purple-400">{b.icon}</span>
              <span className="text-sm text-white/65">{b.text}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => {
            console.log('upgrade clicked');
            window.open('paystack-checkout-link', '_blank');
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 mb-3"
        >
          Upgrade to Pro – ₦5,000/month
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary */}
        <button
          onClick={onClose}
          className="w-full text-sm text-white/30 hover:text-white/50 transition-colors py-2"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
