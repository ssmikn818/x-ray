import React, { useEffect } from 'react';

interface KakaoShareButtonProps {
  score: number;
  intentionSummary: string;
  originalText: string;
}

const KAKAO_API_KEY = "d73cca4966ffe45f74e00f7a32be1755";

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ score, intentionSummary, originalText }) => {
  useEffect(() => {
    // Initialize Kakao SDK on mount if available
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(KAKAO_API_KEY);
          // console.log("Kakao SDK Initialized. Current Domain:", window.location.origin);
        } catch (error) {
          console.error("Failed to initialize Kakao SDK:", error);
        }
      }
    }
  }, []);

  const handleShare = () => {
    // 1. Check if SDK exists
    if (typeof window === 'undefined' || !window.Kakao) {
      alert("카카오톡 SDK가 로드되지 않았습니다. 브라우저의 광고 차단 기능을 확인하거나 페이지를 새로고침해주세요.");
      return;
    }

    // 2. Ensure SDK is initialized
    if (!window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(KAKAO_API_KEY);
      } catch (error) {
        console.error("Failed to initialize Kakao SDK during click:", error);
        alert("카카오톡 공유 기능을 초기화하는 중 오류가 발생했습니다.");
        return;
      }
    }

    // 3. Generate Share URL with Query Params
    // Use origin + pathname to start with a clean URL, then append params
    const shareUrl = new URL(window.location.origin + window.location.pathname);
    shareUrl.searchParams.set('score', score.toString());
    shareUrl.searchParams.set('intent', intentionSummary);
    
    // FIX: Reduced safe limit from 1500 to 300 to prevent 'Failed request' errors.
    // Explanation: Korean characters (3 bytes) encode to ~9 characters in URL (e.g. %E1%88%B4).
    // 1500 chars * 9 = ~13,500 characters, which exceeds browser/API URL length limits.
    // 300 chars * 9 = ~2,700 characters, which is within safe limits for most sharing APIs.
    const MAX_TEXT_LENGTH = 300; 
    const truncatedText = originalText.length > MAX_TEXT_LENGTH 
        ? originalText.slice(0, MAX_TEXT_LENGTH) + '...' 
        : originalText;
    shareUrl.searchParams.set('text', truncatedText);

    const finalUrl = shareUrl.toString();

    // 4. Send Share Request
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `[X-Ray 분석] 조작 지수 ${score}점`,
          description: `핵심 의도: ${intentionSummary}\n\nAI가 분석한 콘텐츠의 숨은 의도를 확인해보세요.`,
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png', // Generic Analysis Icon
          link: {
            mobileWebUrl: finalUrl,
            webUrl: finalUrl,
          },
        },
        buttons: [
          {
            title: '결과 자세히 보기',
            link: {
              mobileWebUrl: finalUrl,
              webUrl: finalUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error sending Kakao share request:", error);
      alert("카카오톡 공유 요청 중 오류가 발생했습니다. 카카오 개발자 센터에 현재 도메인이 등록되어 있는지 확인해주세요.");
    }
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

declare global {
  interface Window {
    Kakao: any;
  }
}

export default KakaoShareButton;