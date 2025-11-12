import { GoogleGenAI, Type } from "@google/genai";
import { NarrativeFrameId, NarrativeDataPoint } from "../types";

// NOTE: This information is duplicated from `constants.tsx` to avoid importing
// a `.tsx` file (which contains JSX) into this `.ts` module.
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
};


// FIX: Use Object.entries to access both the frame ID (key) and the frame data (value).
const frameDescriptions = Object.entries(frameInfo).map(([id, frame]) => 
  `- ${frame.name} (${id}): ${frame.description}`
).join('\n');

const systemInstruction = `당신은 통찰력 있는 미디어 리터러시 전문가입니다. 당신의 임무는 주어진 텍스트를 분석하여, 사람들을 설득하거나 여론을 조작하기 위해 사용될 수 있는 '숨은 의도 유형(persuasive tactics)'이 사용되었는지 파악하는 것입니다.

**분석 프로세스:**

**1. 텍스트 장르 및 논증 구조 파악 (가장 중요):**
먼저, 텍스트의 성격을 규명하세요. 이 글은 객관적 보도를 지향하는 '뉴스 기사'입니까, 필자의 주관적 견해를 논리적으로 펼치는 '사설/칼럼'입니까, 혹은 감정적 반응이 주가 되는 'SNS 게시물/댓글'입니까?
- **사설/칼럼의 경우:** 강한 어조와 명확한 주장은 당연합니다. 이 경우, 주장을 뒷받침하는 **논리적 근거가 제시되는지**를 핵심적으로 평가해야 합니다. 근거가 합리적이라면, 단순히 어조가 강하다는 이유만으로 높은 조작 지수를 부여해서는 안됩니다.
- **뉴스 기사의 경우:** 사실 전달이 목적이므로, 감정적 단어 선택이나 특정 관점의 부각이 두드러진다면 조작 의도를 의심해야 합니다.
- 분석의 핵심은 **'논리적 비판'과 '감정적 선동'을 구분**하는 것입니다.

**2. 숨은 의도 유형 분석:**
위의 맥락 분석을 바탕으로, 아래 목록의 각 유형이 '독자를 **비논리적이거나 감정적인 방식으로** 특정 방향으로 이끌려는 **의도적인** 설득 전략'으로 사용되었는지 판단하세요.
- 분석할 숨은 의도 유형 목록:
${frameDescriptions}
- 각 유형의 사용 강도를 0에서 100 사이의 점수(score)로 평가하고, 판단 근거를 간결하게 설명(explanation)해주세요.
- **점수가 30점 미만으로 낮거나, 설득 의도가 명확하지 않은 유형은 결과에 포함하지 마세요.** 논리적 근거를 갖춘 비판적 주장은 숨은 의도 유형으로 분류하지 않습니다.

**3. 종합 평가 및 리포트 작성:**
- **조작 지수(manipulationIndex):** 모든 분석을 종합하여, 텍스트의 전반적인 조작 의도나 설득 강도를 0에서 100 사이의 점수로 평가해주세요. 이 점수는 **논증 구조의 부재, 감정적 호소의 강도**에 비례해야 합니다.
- **종합 분석 리포트(comprehensiveAnalysis):** 분석 결과를 바탕으로 아래 형식에 맞춰 리포트를 작성해주세요. 만약 분석된 숨은 의도 유형이 없다면, 해당 텍스트가 **논리적 근거를 기반으로 한 비판적 의견이나 주장일 가능성이 높다는 점**을 명확히 밝혀주세요.
    - **매우 중요**: 리포트의 각 항목은 **분류된 개조식(bullet points)**으로 작성해주세요. **각 항목은 반드시 줄바꿈(newline)으로 구분하고, '-'로 시작해야 합니다.** 모든 문장은 **명사형으로 간결하게 종결**해야 합니다(예: '불안감 조성', '특정 집단에 대한 부정적 이미지 형성함'). 핵심 내용은 '**'로 감싸 굵게 표시하고, 특히 강조하고 싶은 부분은 '__'로 감싸 밑줄을 쳐서 표시해주세요.
    1.  **핵심 의도 분석 (summary)**: 텍스트에 내재된 핵심 의도와 목적을 분석하여 명사형으로 요약.
    2.  **주요 설득 전략 (tactics)**: 사용된 주요 설득 전략과 그 효과를 구체적으로 분류하여 명사형으로 기술.
    3.  **비판적 사고를 위한 제언 (advice)**: 독자가 콘텐츠를 비판적으로 수용하기 위해 고려해야 할 사항들을 명사형으로 제안.

응답은 반드시 JSON 형식이어야 하며, 다음 스키마를 따라야 합니다.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
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
        },
        required: ['frameId', 'score', 'explanation'],
      },
    },
    comprehensiveAnalysis: {
        type: Type.OBJECT,
        description: '텍스트에 담긴 숨은 의도, 목적, 그리고 독자를 위한 비판적 읽기 조언을 포함한 종합 분석 리포트. 각 필드는 명사형으로 종결되는 개조식(bullet points) 형식이어야 합니다.',
        properties: {
            summary: {
                type: Type.STRING,
                description: "텍스트의 핵심적인 숨은 의도와 전반적인 목적을 명사형 개조식으로 요약."
            },
            tactics: {
                type: Type.STRING,
                description: "분석된 숨은 의도 유형들이 어떻게 결합되어 독자를 설득하는지, 구체적인 설득 전략과 전술을 명사형 개조식으로 상세히 분석."
            },
            advice: {
                type: Type.STRING,
                description: "독자가 이 글의 영향을 분별하고 비판적으로 수용하기 위해 취해야 할 구체적인 행동이나 생각해볼 점을 명사형 개조식으로 제안."
            }
        },
        required: ['summary', 'tactics', 'advice']
    }
  },
  required: ['manipulationIndex', 'analysis', 'comprehensiveAnalysis'],
};


export interface AnalysisResult {
    manipulationIndex: number;
    analysis: {
        frameId: NarrativeFrameId;
        score: number;
        explanation: string;
    }[];
    comprehensiveAnalysis: {
        summary: string;
        tactics: string;
        advice: string;
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

        if (!result || typeof result.analysis === 'undefined' || typeof result.comprehensiveAnalysis === 'undefined' || typeof result.manipulationIndex === 'undefined') {
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