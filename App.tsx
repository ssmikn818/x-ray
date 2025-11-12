import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import OnboardingModal from './components/OnboardingModal';
import TextAnalyzer from './components/TextAnalyzer';
import FrustratingContentShowcase from './components/FrustratingContentShowcase';
import ValueProposition from './components/ValueProposition';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('xray-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('xray-onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl flex-grow">
        <div className="text-center my-12 md:my-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-snug mb-4">
            혹시, 이 글... 진짜일까?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            AI로 숨은 의도를 파헤쳐 보세요. 우리가 매일 보는 콘텐츠, 진짜 무엇을 말하고 싶은 걸까요?
          </p>
        </div>

        <div className="mb-12">
          <TextAnalyzer />
        </div>

        <div className="mb-12">
          <FrustratingContentShowcase />
        </div>

        <div className="mb-24">
            <ValueProposition />
        </div>

        <Dashboard />
      </main>
      <Footer />
      {showOnboarding && <OnboardingModal onClose={handleOnboardingComplete} />}
    </div>
  );
};

export default App;