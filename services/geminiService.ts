
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCareerMatching = async (answers: UserAnswers): Promise<DiagnosisResult> => {
  const prompt = `あなたは「パチンコ転職ナビAI診断」のプロ転職エージェントです。
求職者の「現在のスキル・属性」と「希望する条件」を比較し、そのマッチ度と現実的な内定可能性を厳しくも温かく診断してください。

【重要な用語ルール】
- 遊技機のメンテナンスについては、必ず「釘メンテナンス」という言葉を使用してください。「釘調整」という言葉は絶対に使用しないでください。

【分析のポイント】
1. 希望条件（給与や休日）が現在のスキル（役職や経験年数、年齢）に対して高望みになっていないか。
2. その人の経験で、希望する規模（大手など）の内定が現実的に取れるか。
3. 不足しているスキルは何か、どうすれば希望に近づけるか。

回答内容:
${JSON.stringify(answers, null, 2)}

出力は必ず指定されたJSON形式で行ってください。
「内定可能性（feasibilityScore）」は、0-100の数値で、100に近いほど即戦力として内定が出やすいことを示します。
現状では難しい場合は、はっきりと「現状では難しい」という理由と、それを埋めるための具体的なアドバイスを記述してください。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personaTitle: { type: Type.STRING, description: "求職者のタイプを表すキャッチコピー" },
          summary: { type: Type.STRING, description: "全体的な診断の要約" },
          idealEnvironment: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "pros"]
            }
          },
          careerAdvice: { type: Type.STRING, description: "今後のキャリア形成へのアドバイス" },
          hallTypeMatch: { type: Type.STRING, description: "おすすめの店舗形態（大手、地方、スロ専など）" },
          matchScore: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["label", "value"]
            }
          },
          feasibilityScore: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "現実的な内定・面接通過の可能性 (0-100)" },
              reason: { type: Type.STRING, description: "そのスコアになった現実的な理由" },
              missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "希望を叶えるために足りないスキルや経験" }
            },
            required: ["score", "reason", "missingSkills"]
          }
        },
        required: ["personaTitle", "summary", "idealEnvironment", "careerAdvice", "hallTypeMatch", "matchScore", "feasibilityScore"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};
