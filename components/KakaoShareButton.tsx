
import React, { useEffect } from 'react';

interface KakaoShareButtonProps {
  score: number;
  intentionSummary: string;
  originalText: string;
}

const KAKAO_API_KEY = "d73cca4966ffe45f74e00f7a32be1755";

// Intent Categorization Logic
const detectIntentType = (intent: string) => {
  if (!intent) return 'DEFAULT';
  
  const financialKeywords = ['금전', '이득', '수익', '투자', '보장', '계좌', '돈', '입금'];
  const fearKeywords = ['공포', '불안', '선동', '혐오', '음모', '희생양', '위기', '파멸'];
  const marketingKeywords = ['과장', '긴급', '한정', '매진', '마감', '기회', '혜택'];

  if (financialKeywords.some(k => intent.includes(k))) return 'FINANCIAL';
  if (fearKeywords.some(k => intent.includes(k))) return 'FEAR';
  if (marketingKeywords.some(k => intent.includes(k))) return 'MARKETING';
  
  return 'DEFAULT';
};

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ score, intentionSummary, originalText }) => {
  useEffect(() => {
    // Initialize Kakao SDK on mount if available
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(KAKAO_API_KEY);
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

    // 3. Generate Smart Title based on Category & Score
    const category = detectIntentType(intentionSummary);
    let title = "🔍 X-Ray AI 분석 결과 도착";

    if (score >= 70) {
      switch (category) {
        case 'FINANCIAL':
          title = "🚨 [긴급] 금융 사기 위험 감지!";
          break;
        case 'FEAR':
          title = "⚠️ [주의] 가짜 뉴스/선동 위험!";
          break;
        case 'MARKETING':
          title = "💸 [경고] 과장 광고에 속지 마세요.";
          break;
        default:
          title = "🚫 [위험] 조작된 의도가 감지되었습니다.";
      }
    }

    // 4. Determine Dynamic Thumbnail based on Score
    // High Risk (Red Siren)
    const IMG_HIGH_RISK = 'https://cdn-icons-png.flaticon.com/512/179/179386.png';
    // Medium Risk (Yellow Caution)
    const IMG_MEDIUM_RISK = 'https://cdn-icons-png.flaticon.com/512/595/595067.png';
    // Low Risk / Default (Blue Trustworthy)
    const IMG_LOW_RISK = 'https://cdn-icons-png.flaticon.com/512/1066/1066371.png';

    let imageUrl = IMG_LOW_RISK;
    if (score >= 80) {
        imageUrl = IMG_HIGH_RISK;
    } else if (score >= 50) {
        imageUrl = IMG_MEDIUM_RISK;
    }

    // 5. Generate Share URL with Query Params
    // Use window.location.href.split('?')[0] to get the clean base URL safely in all environments
    const baseUrl = window.location.href.split('?')[0];
    const shareUrl = new URL(baseUrl);
    
    // Explicitly add parameters
    shareUrl.searchParams.set('mode', 'share'); // Identify this as a shared link visit
    shareUrl.searchParams.set('score', String(score));
    shareUrl.searchParams.set('intent', intentionSummary);
    
    // Reduced limit from 1000 to 200 to prevent URL length errors
    const MAX_TEXT_LENGTH = 200; 
    const truncatedText = originalText 
        ? (originalText.length > MAX_TEXT_LENGTH ? originalText.slice(0, MAX_TEXT_LENGTH) + '...' : originalText)
        : '';
    shareUrl.searchParams.set('text', truncatedText);

    const finalUrl = shareUrl.toString();

    // 6. Send Share Request
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: `핵심 의도: ${intentionSummary} (조작 지수 ${score}점)\n👇 아래 버튼을 눌러 원문과 상세 분석을 확인하세요.`,
          imageUrl: imageUrl,
          imageWidth: 800,
          imageHeight: 400,
          link: {
            mobileWebUrl: finalUrl,
            webUrl: finalUrl,
          },
        },
        buttons: [
          {
            title: '결과 및 원문 전체 보기',
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
