import { GoogleGenAI, Type } from "@google/genai";
import { NarrativeFrameId, NarrativeDataPoint } from "../types";

// NOTE: This information is duplicated from `constants.tsx` to avoid importing
// a `.tsx` file (which contains JSX) into this `.ts` module.
const frameInfo: Record<NarrativeFrameId, { name: string; description: string }> = {
  [NarrativeFrameId.UsVsThem]: {
    name: '편 가르기',
    description: "세상을 '우리'와 '적'으로 단순하게 나누어 갈등을 일으키는 유형입니다.",
  },
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

const systemInstruction = `당신은 미디어 리터러시 전문가입니다. 주어진 텍스트를 분석하여, 다음과 같은 '숨은 의도 유형(persuasive tactics)'이 얼마나 강하게 나타나는지 평가하고 숨겨진 의도를 파악하는 임무를 맡고 있습니다.

분석할 숨은 의도 유형 목록:
${frameDescriptions}

먼저, 사용자가 제공한 텍스트를 분석하여 각 유형의 존재 여부와 강도를 0에서 100 사이의 점수(score)로 평가해주세요. 점수가 0이면 해당 유형이 전혀 나타나지 않음을 의미하고, 100이면 매우 강하게 나타남을 의미합니다. 각 유형에 대한 판단 근거를 간결하게 설명(explanation)해주세요. 점수가 10점 미만으로 낮은 유형은 결과에 포함하지 마세요.

그 다음, 위의 분석 결과를 종합하여 **'종합 분석 리포트(comprehensiveAnalysis)'**를 다음 세 부분으로 나누어 작성해주세요. 각 부분은 상세하고 구체적인 내용을 담아 여러 문단으로 작성하고, 가독성을 위해 줄바꿈을 사용해주세요. 핵심 내용은 '**'로 감싸 굵게 표시하고, 특히 강조하고 싶은 부분은 '__'로 감싸 밑줄을 쳐서 표시해주세요.
1.  **핵심 의도 요약 (summary)**: 텍스트의 핵심적인 숨은 의도와 전반적인 목적을 1-2문장으로 요약합니다.
2.  **주요 설득 전략 (tactics)**: 분석된 숨은 의도 유형들이 어떻게 결합되어 독자를 설득하는지, 구체적인 설득 전략과 전술을 상세히 분석합니다.
3.  **독자를 위한 조언 (advice)**: 독자가 이 글의 영향을 분별하고 비판적으로 수용하기 위해 취해야 할 구체적인 행동이나 생각해볼 점을 조언합니다.

응답은 반드시 JSON 형식이어야 하며, 다음 스키마를 따라야 합니다.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.ARRAY,
      description: '분석된 숨은 의도 유형 목록 (점수가 10점 이상인 것만)',
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
        description: '텍스트에 담긴 숨은 의도, 목적, 그리고 독자를 위한 비판적 읽기 조언을 포함한 종합 분석 리포트. 각 필드는 상세하고 구체적인 내용을 담아야 합니다.',
        properties: {
            summary: {
                type: Type.STRING,
                description: '텍스트의 핵심적인 숨은 의도와 전반적인 목적을 1-2문장으로 요약합니다.'
            },
            tactics: {
                type: Type.STRING,
                description: '분석된 숨은 의도 유형들이 어떻게 결합되어 독자를 설득하는지, 구체적인 설득 전략과 전술을 상세히 분석합니다. 여러 문단으로 작성될 수 있습니다.'
            },
            advice: {
                type: Type.STRING,
                description: '독자가 이 글의 영향을 분별하고 비판적으로 수용하기 위해 취해야 할 구체적인 행동이나 생각해볼 점을 조언합니다. 여러 문단으로 작성될 수 있습니다.'
            }
        },
        required: ['summary', 'tactics', 'advice']
    }
  },
  required: ['analysis', 'comprehensiveAnalysis'],
};


export interface AnalysisResult {
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

        if (!result || typeof result.analysis === 'undefined' || typeof result.comprehensiveAnalysis === 'undefined') {
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