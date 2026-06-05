import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import GeneratorPage, { SongFormData } from './pages/GeneratorPage';
import ResultsPage, { MarketingResults } from './pages/ResultsPage';
import PricingPage from './pages/PricingPage';
import TrendsPage from './pages/TrendsPage';
import PaywallModal from './components/PaywallModal';

type Page = 'landing' | 'generator' | 'results' | 'pricing' | 'trends';

const FREE_LIMIT = 3;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MarketingResults | null>(null);
  const [formData, setFormData] = useState<SongFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  async function handleGenerate(data: SongFormData) {
    if (showPaywall) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setFormData(data);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-marketing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || json.error) {
        throw new Error(json.error || 'Failed to generate content');
      }

      setResults(json as MarketingResults);
      const nextCount = usageCount + 1;
      setUsageCount(nextCount);
      if (nextCount >= FREE_LIMIT) {
        setShowPaywall(true);
      }
      setPage('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResults(null);
    setFormData(null);
    setError(null);
    setPage('generator');
  }

  return (
    <div className="font-['Inter',sans-serif]">
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md max-w-sm w-full mx-4 text-center">
          {error}
          <button onClick={() => setError(null)} className="ml-3 text-red-400 hover:text-red-200 font-bold">✕</button>
        </div>
      )}

      {page === 'landing' && (
        <LandingPage onGetStarted={() => setPage('generator')} onPricing={() => setPage('pricing')} onTrends={() => setPage('trends')} />
      )}

      {page === 'generator' && (
        <GeneratorPage
          onBack={() => setPage('landing')}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          usageCount={usageCount}
          freeLimit={FREE_LIMIT}
          onPaywallTrigger={() => setShowPaywall(true)}
        />
      )}

      {page === 'results' && results && formData && (
        <ResultsPage
          results={results}
          formData={formData}
          onBack={() => setPage('generator')}
          onReset={handleReset}
        />
      )}

      {page === 'pricing' && (
        <PricingPage />
      )}

      {page === 'trends' && (
        <TrendsPage onBack={() => setPage('landing')} />
      )}

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
}
