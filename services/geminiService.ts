import { GoogleGenAI, Type } from "@google/genai";
import { NarrativeFrameId, NarrativeDataPoint } from "../types";

// NOTE: This information is duplicated from `constants.tsx` to avoid importing
// a `.tsx` file (which contains JSX) into this `.ts` module.
// FIX: Corrected typo `NarrarineFrameId` to `NarrativeFrameId`.
const frameInfo: Record<NarrativeFrameId, { name: string; description: string }> = {
  [NarrativeFrameId.UsVsThem]: {
    name: '편 가르기',
    description: "세상을 '우리'와 '적'으로 단순하게 나누어 갈등을 일으키는 유형입니다.",
  },
  // FIX: Removed invalid Python code that was inserted here, causing a syntax error.
  [NarrativeFrameId.FearMongering]: {
    name: '불안감 조성',
    description: "위험을 실제보다 부풀려서 사람들의 두려움과 불안을 자극하는 유형입니다.",
  },
  [NarrativeFrameId.Scapegoating]: {
    name: '특정 대상 탓하기',
    description: "모든 문제를 특정 사람이나 집단의 탓으로 돌려 비난하게 만드는 유형입니다.",
  },
  [NarrativeFrameId.PastGlory]: {
    name: '과거 미화하기',
    description: "'좋았던 옛날'을 계속 이야기하며 현실의 문제를 외면하게 만드는 유형입니다.",
  },
  [NarrativeFrameId.ThreatToValues]: {
    name: '위기감 조성',
    description: "'우리의 가치'가 공격받고 있다며 위기감을 만들어 사람들을 움직이는 유형입니다.",
  },
  [NarrativeFrameId.ExaggeratedPromises]: {
    name: '과장된 약속',
    description: "현실과 동떨어진 이익이나 결과를 보장하며 비판적 사고를 마비시키는 유형입니다.",
  },
  [NarrativeFrameId.UrgencyFomo]: {
    name: '긴급함/소외 불안감 조성',
    description: "제한된 시간이나 기회를 강조하여 성급한 결정을 유도하는 유형입니다.",
  },
};


// FIX: Use Object.entries to access both the frame ID (key) and the frame data (value).
const frameDescriptions = Object.entries(frameInfo).map(([id, frame]) => 
  `- ${frame.name} (${id}): ${frame.description}`
).join('\n');

const systemInstruction = `당신은 사용자가 미디어 콘텐츠를 더 깊이 이해하고 비판적으로 사고할 수 있도록 돕는, 친절하고 지혜로운 'X-Ray AI'입니다. 당신의 임무는 복잡한 글에 숨겨진 의도를 쉽고 명확하게 설명하여, 사용자가 정보의 홍수 속에서 길을 잃지 않도록 안내하는 것입니다.

**분석 프로세스:**

**1. 텍스트 장르 및 목적 분석:**
먼저, 텍스트의 장르(예: '뉴스 기사', '사설/칼럼', '광고/홍보물', 'SNS 게시물')와 표면적 목적(예: '사실 전달', '의견 주장', '상품 판매')을 판단하세요.

**2. 설득 방식 심층 분석:**
이 글이 독자를 **어떤 방식**으로 설득하는지 심층적으로 분석하세요.
- **핵심 질문:** 이 글은 독자에게 **생각할 거리**를 던집니까, 아니면 **생각할 필요 없이** 특정 감정(분노, 불안, 혐오, 탐욕 등)을 느끼게 만듭니까?
- 논리적 근거(데이터, 사실관계) 없이 감정적 표현, 성급한 일반화, 흑백논리 등을 사용하여 주장을 관철시키려 한다면, 아래 '숨은 의도 유형'에 해당할 가능성이 높습니다.
- **텍스트 조작 기법 탐지:** 단어 사이에 의도적으로 특수문자('/', '.')를 삽입하거나, 공백을 추가하여 분석을 회피하려는 시도가 있는지 확인하세요. (예: '억/대/연/봉', '월.천.수.익', '투 잡', '부 업'). 이러한 기법은 **비현실적인 수익을 약속하는 광고나 사기성 정보**에서 자주 발견되는 강력한 위험 신호입니다. 이런 조작된 단어는 정상적인 단어(예: '억대연봉', '월천수익', '투잡', '부업')로 간주하고 분석을 진행해야 합니다.

**3. 숨은 의도 유형 탐지:**
아래 목록의 각 유형이 '조작적 선동'의 도구로 사용되었는지 판단하세요.
- 분석할 숨은 의도 유형 목록:
${frameDescriptions}
- 각 유형의 사용 강도를 0에서 100 사이의 점수(score)로 평가하고, 판단 근거를 간결하게 설명(explanation)해주세요.
- **점수가 30점 미만으로 낮거나, 설득 의도가 명확하지 않은 유형은 결과에 포함하지 마세요.**
- **추가적으로, 판단의 근거가 되는 원본 텍스트의 구체적인 문장이나 구절(evidence_spans)을 정확히 추출하여 배열 형태로 포함해주세요.**

**4. 종합 평가 및 리포트 작성:**
- **핵심 의도 요약(intentionSummary):** 텍스트의 궁극적인 목적을 두세 단어의 명사형 키워드로 요약해주세요. (예: '정치적 압박', '금전적 이득 유도', '불안감 조성')
- **조작 지수(manipulationIndex):** 모든 분석을 종합하여, 텍스트의 전반적인 조작 의도나 설득 강도를 0에서 100 사이의 점수로 평가해주세요.
- **종합 분석 리포트(comprehensiveAnalysis):** 분석 결과를 바탕으로 아래 형식에 맞춰 리포트를 작성해주세요. 만약 분석된 숨은 의도 유형이 없다면, 해당 텍스트가 **논리적 근거를 기반으로 한 비판적 의견이나 주장일 가능성이 높다는 점**을 명확히 밝혀주세요.
    - **매우 중요**: 리포트의 각 항목은 **개조식(bullet points)**으로 작성해주세요. **각 항목은 반드시 줄바꿈(newline)으로 구분하고, '-'로 시작해야 합니다.** 사용자에게 직접 설명하듯, 친절하고 부드러운 '~해요', '~있어요'와 같은 문체를 사용해주세요. 핵심 내용은 '**'로 감싸 굵게 표시하고, 특히 강조하고 싶은 부분은 '__'로 감싸 밑줄을 쳐서 표시해주세요.
    1.  **핵심 의도 분석 (summary)**: 이 글이 궁극적으로 무엇을 말하고 싶은지, 그 핵심 의도와 목적을 친절하고 이해하기 쉽게 한두 문장으로 설명해주세요. (예: '- 이 글은 OOO을 통해 독자의 불안감을 자극하고, 특정 상품 구매를 유도하려는 **의도**를 가지고 있어요.')
    2.  **주요 설득 전략 (tactics)**: 위 의도를 달성하기 위해 어떤 설득 전략을 사용하고 있는지 구체적으로 분석해주세요. 독자의 마음을 움직이기 위해 사용된 기술들을 쉽고 친절한 문장으로 설명해야 합니다. (예: '- **'과장된 약속'** 전략으로 현실과 동떨어진 기대를 심어주고, **'긴급함 조성'** 전략으로 __성급한 결정__을 내리게 만들고 있어요.')
    3.  **해독제: 생각해볼 지점 (criticalQuestions)**: 독자가 콘텐츠를 비판적으로 성찰하도록 돕는, 서로 다른 관점의 통찰력 있는 **핵심 질문 3개**를 제시해주세요. 각 질문은 관련된 **'생각거리' 2개**를 포함해야 합니다. **매우 중요**: 모든 질문과 생각거리는 독자에게 부드럽게 질문을 던지는 듯한 '~요?', '~까요?'와 같은 경어체로 작성해주세요. 결과는 반드시 다음 형식을 따라야 하며, 각 질문 블록은 빈 줄로 구분해야 합니다.
[첫 번째 핵심 질문]
- [첫 번째 생각거리]
- [두 번째 생각거리]

[두 번째 핵심 질문]
- [세 번째 생각거리]
- [네 번째 생각거리]

[세 번째 핵심 질문]
- [다섯 번째 생각거리]
- [여섯 번째 생각거리]
각 항목은 줄바꿈으로 구분하고, 핵심 내용은 '**' 또는 '__'로 강조하세요.

응답은 반드시 JSON 형식이어야 하며, 식별된 장르를 'genre' 필드에 포함하여 다음 스키마를 따라야 합니다.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    genre: {
        type: Type.STRING,
        description: "분석된 텍스트의 장르 (예: '뉴스 기사', '사설/칼럼', 'SNS 게시물/댓글')"
    },
    intentionSummary: {
        type: Type.STRING,
        description: "텍스트의 핵심 의도를 두세 단어의 명사형 키워드로 요약 (예: '정치적 압박', '금전적 이득 유도', '불안감 조성')"
    },
    manipulationIndex: {
        type: Type.NUMBER,
        description: '텍스트의 전반적인 조작 및 설득 의도 강도를 나타내는 종합 점수 (0-100)',
    },
    analysis: {
      type: Type.ARRAY,
      description: '분석된 숨은 의도 유형 목록 (점수가 30점 이상인 것만)',
      items: {
        type: Type.OBJECT,
        properties: {
          frameId: {
            type: Type.STRING,
            description: '숨은 의도 유형의 ID',
            enum: Object.values(NarrativeFrameId),
          },
          score: {
            type: Type.NUMBER,
            description: '해당 유형이 텍스트에 나타나는 강도 (0-100)',
          },
          explanation: {
            type: Type.STRING,
            description: '왜 그렇게 판단했는지에 대한 간단한 설명',
          },
          evidence_spans: {
            type: Type.ARRAY,
            description: '해당 유형의 판단 근거가 되는 원본 텍스트의 문장 또는 구절 배열',
            items: {
                type: Type.STRING
            }
          }
        },
        required: ['frameId', 'score', 'explanation', 'evidence_spans'],
      },
    },
    comprehensiveAnalysis: {
        type: Type.OBJECT,
        description: '텍스트에 담긴 숨은 의도, 목적, 그리고 독자를 위한 비판적 읽기 조언을 포함한 종합 분석 리포트. 각 필드는 친절하고 부드러운 경어체 문장으로 작성되어야 합니다.',
        properties: {
            summary: {
                type: Type.STRING,
                description: "텍스트의 핵심적인 숨은 의도와 전반적인 목적을 친절한 경어체 개조식으로 요약."
            },
            tactics: {
                type: Type.STRING,
                description: "분석된 숨은 의도 유형들이 어떻게 결합되어 독자를 설득하는지, 구체적인 설득 전략과 전술을 친절한 경어체 개조식으로 상세히 분석."
            },
            criticalQuestions: {
                type: Type.STRING,
                description: "독자가 콘텐츠를 비판적으로 수용하기 위해 생각해볼 질문과 제안. '해독제' 역할을 하며, 명시된 특별한 형식(핵심질문 + 2가지 생각거리)을 따릅니다."
            }
        },
        required: ['summary', 'tactics', 'criticalQuestions']
    }
  },
  required: ['genre', 'intentionSummary', 'manipulationIndex', 'analysis', 'comprehensiveAnalysis'],
};


export interface AnalysisResult {
    genre: string;
    intentionSummary: string;
    manipulationIndex: number;
    analysis: {
        frameId: NarrativeFrameId;
        score: number;
        explanation: string;
        evidence_spans: string[];
    }[];
    comprehensiveAnalysis: {
        summary: string;
        tactics: string;
        criticalQuestions: string;
    };
}

// FIX: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: text,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            },
        });

        // FIX: Use response.text to get the generated content as a string, as per guidelines.
        const jsonString = response.text;
        const result: AnalysisResult = JSON.parse(jsonString);

        if (!result || typeof result.genre === 'undefined' || typeof result.intentionSummary === 'undefined' || typeof result.analysis === 'undefined' || typeof result.comprehensiveAnalysis === 'undefined' || typeof result.manipulationIndex === 'undefined') {
            throw new Error("Invalid analysis result format.");
        }
        
        return result;
    } catch (error) {
        console.error("Error analyzing text with Gemini API:", error);
        if (error instanceof Error && (error.message.includes('JSON') || error.message.includes('json'))) {
             throw new Error("AI로부터 유효한 분석 결과를 받지 못했습니다. 입력 내용을 수정하거나 잠시 후 다시 시도해주세요.");
        }
        throw new Error("텍스트 분석 중 오류가 발생했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.");
    }
};

export const generateConsumptionAnalysis = async (data: NarrativeDataPoint[]): Promise<string> => {
    if (!data || data.length === 0) {
        return "분석할 데이터가 없습니다.";
    }

    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const topFrame = sortedData[0];
    const totalConsumption = data.reduce((sum, item) => sum + item.value, 0);
    const topFramePercentage = totalConsumption > 0 ? (topFrame.value / totalConsumption) * 100 : 0;

    const prompt = `
당신은 사용자의 미디어 소비 습관을 분석하고 조언해주는 친절한 미디어 리터러시 코치입니다.

다음은 사용자의 주간 콘텐츠 소비 데이터입니다:
- 가장 많이 소비한 유형: '${topFrame.name}'
- 이 유형이 전체 소비에서 차지하는 비중: ${topFramePercentage.toFixed(0)}%
- 전체 소비 데이터: ${JSON.stringify(sortedData)}

이 데이터를 바탕으로, 사용자에게 개인화된 해석과 실행 가능한 조언을 제공해주세요.
- 먼저, 가장 많이 소비한 유형이 무엇인지, 그리고 이것이 무엇을 의미하는지 쉽고 친절하게 설명해주세요.
- 그 다음, 이러한 소비 습관이 가질 수 있는 긍정적 및 부정적 영향을 균형있게 짚어주세요.
- 마지막으로, 더 건강하고 균형 잡힌 미디어 소비를 위한 구체적인 팁이나 생각해볼 만한 질문을 1~2가지 제시해주세요.

**매우 중요**: 응답은 반드시 친근하고 격려하는 말투여야 합니다. 사용자가 방어적으로 느끼지 않도록 주의해주세요. 핵심 내용은 **'**'로 감싸 굵게 표시하고, 특히 강조하고 싶은 부분은 '__'로 감싸 밑줄을 쳐서 표시해주세요. 문단 나누기를 적극적으로 사용하여 가독성을 높여주세요.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating consumption analysis:", error);
        return "소비 성향 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
};