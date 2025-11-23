import React, { useEffect } from 'react';

interface KakaoShareButtonProps {
  score: number;
  intentionSummary: string;
}

// Updated with the provided production key
const KAKAO_API_KEY = "d73cca4966ffe45f74e00f7a32be1755"; 
const DOMAIN_URL = "https://x-ray-38585635934.us-west1.run.app";

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ score, intentionSummary }) => {
  useEffect(() => {
    // Initialize Kakao SDK
    if (window.Kakao && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(KAKAO_API_KEY);
      } catch (error) {
        console.error("Failed to initialize Kakao SDK:", error);
      }
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오톡 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `[X-Ray 분석] 이 글의 조작 지수는 ${score}점 입니다.`,
        description: `핵심 의도: ${intentionSummary}. 지금 바로 원본을 확인해보세요.`,
        imageUrl: 'https://via.placeholder.com/600x400?text=X-Ray+Analysis', // Replace with actual OG image if available
        link: {
          mobileWebUrl: DOMAIN_URL,
          webUrl: DOMAIN_URL,
        },
      },
      buttons: [
        {
          title: '결과 자세히 보기',
          link: {
            mobileWebUrl: DOMAIN_URL,
            webUrl: DOMAIN_URL,
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center space-x-2 bg-kakao-yellow text-kakao-brown font-bold px-4 py-3 rounded-lg hover:bg-yellow-300 transition-colors shadow-sm w-full md:w-auto"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 3C5.373 3 0 6.908 0 11.725c0 3.12 2.27 5.857 5.71 7.265-.183.673-.667 2.443-.763 2.793-.12.434.16.427.333.312.138-.092 2.21-1.503 3.1-2.112.528.076 1.07.116 1.62.116 6.627 0 12-3.908 12-8.725S18.627 3 12 3z"/>
      </svg>
      <span>카카오톡으로 결과 공유</span>
    </button>
  );
};

// Add type definition for global window object
declare global {
  interface Window {
    Kakao: any;
  }
}

export default KakaoShareButton;