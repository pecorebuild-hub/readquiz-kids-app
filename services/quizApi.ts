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

function optionCount(age: number): number {
  return age <= 7 ? 2 : 3;
}

/** Offline / static prototype — same templates as readquest-server mock */
function mockQuiz(body: GenerateQuizRequest): GenerateQuizResponse {
  const n = optionCount(body.childAge);
  const opts =
    n === 2 ?
      [['The hero', 'A random object'], ['At home', 'On the moon']]
    : [
        ['The hero', 'The villain', 'A tree'],
        ['At the start', 'In the middle', 'At the end'],
      ];

  const templates = [
    `Who is the main character in "${body.bookTitle}"?`,
    `Where does most of the story in "${body.bookTitle}" happen?`,
    `What problem do the characters face in "${body.bookTitle}"?`,
    `How does the story of "${body.bookTitle}" make you feel?`,
    `What lesson might "${body.bookTitle}" teach readers?`,
  ];

  const questions = templates.map((text, i) => ({
    id: `mock-${i + 1}`,
    text,
    options: opts[i % opts.length].slice(0, n),
    correctIndex: 0,
  }));

  return { questions };
}

function useMockQuiz(): boolean {
  const flag = process.env.EXPO_PUBLIC_USE_MOCK_QUIZ;
  return flag === '1' || flag === 'true';
}

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
  if (useMockQuiz()) {
    return mockQuiz(body);
  }

  try {
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
  } catch {
    return mockQuiz(body);
  }
}
