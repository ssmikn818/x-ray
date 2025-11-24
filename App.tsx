
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import OnboardingModal from './components/OnboardingModal';
import TextAnalyzer from './components/TextAnalyzer';
import FrustratingContentShowcase from './components/FrustratingContentShowcase';
import ValueProposition from './components/ValueProposition';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sharedData, setSharedData] = useState<{ score: number; intent: string; text?: string } | null>(null);

  useEffect(() => {
    // Check for shared parameters in URL
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode');
    const scoreParam = params.get('score');
    const intentParam = params.get('intent');
    const textParam = params.get('text');

    // Robust check for score and intent (handling score=0 correctly)
    // We check if mode is 'share' OR if the basic params exist
    if ((modeParam === 'share' || (scoreParam !== null && intentParam))) {
      const parsedScore = scoreParam ? parseInt(scoreParam, 10) : 0;
      
      if (!isNaN(parsedScore)) {
        setSharedData({
          score: parsedScore,
          intent: intentParam || '분석 결과',
          text: textParam || undefined
        });
        
        // If in share mode, we might want to skip onboarding
        return; 
      }
    } 

    // Only show onboarding if not viewing a shared result
    const hasOnboarded = localStorage.getItem('xray-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('xray-onboarded', 'true');
    setShowOnboarding(false);
  };

  const handleClearSharedData = () => {
    setSharedData(null);
    // Remove query params from URL without reloading the page
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl flex-grow">
        <div className="text-center my-12 md:my-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-relaxed mb-4">
            {sharedData ? '공유받은 분석 리포트' : '혹시, 이 글... 진짜일까?'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {sharedData 
              ? 'AI가 분석한 콘텐츠의 숨은 의도와 원문을 확인해보세요.' 
              : 'AI로 숨은 의도를 파헤쳐 보세요. 우리가 매일 보는 콘텐츠, 진짜 무엇을 말하고 싶은 걸까요?'}
          </p>
        </div>

        <div className="mb-12">
          <TextAnalyzer sharedData={sharedData} onClearSharedData={handleClearSharedData} />
        </div>

        <section id="showcase" className="mb-12 scroll-mt-24">
          <FrustratingContentShowcase />
        </section>

        <section id="value-prop" className="mb-24 scroll-mt-24">
            <ValueProposition />
        </section>

        <Dashboard />
      </main>
      <Footer />
      {showOnboarding && <OnboardingModal onClose={handleOnboardingComplete} />}
    </div>
  );
};

export default App;
