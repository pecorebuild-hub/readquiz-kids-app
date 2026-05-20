import Constants from 'expo-constants';
import type { Difficulty } from '../store/useAppStore';

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export type GenerateQuizRequest = {
  bookTitle: string;
  author?: string;
  childAge: number;
  difficulty: Difficulty;
  excludeQuestionTexts?: string[];
};

export type GenerateQuizResponse = {
  questions: QuizQuestion[];
};

function getApiBase(): string {
  const env = process.env.EXPO_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, '');
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:3100`;
  }
  return 'http://localhost:3100';
}

export async function generateQuiz(
  body: GenerateQuizRequest,
): Promise<GenerateQuizResponse> {
  const res = await fetch(`${getApiBase()}/api/quiz/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error ?? `Quiz API failed (${res.status})`,
    );
  }

  return res.json() as Promise<GenerateQuizResponse>;
}
