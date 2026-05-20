import type { ImageSourcePropType } from 'react-native';
import type { IoniconName } from '../theme/icons';
import { DIFFICULTY_ICONS, ICONS, REWARD_ICONS } from '../theme/icons';

export type BookEntry = {
  id: string;
  title: string;
  author?: string;
  coverSource?: ImageSourcePropType;
  coverAccent: string;
  lastScore?: number;
  totalQuestions?: number;
  quizCount: number;
};

export type ParentReward = {
  id: string;
  title: string;
  icon: IoniconName;
  cost: number;
};

export const BOOK_COVERS: Record<string, ImageSourcePropType> = {
  hp1: require('../assets/covers/hp1.png'),
  bur: require('../assets/covers/bur.png'),
  winnie: require('../assets/covers/winnie.png'),
  charlotte: require('../assets/covers/charlotte.png'),
  matilda: require('../assets/covers/matilda.png'),
  gruffalo: require('../assets/covers/gruffalo.png'),
};

export const BOOK_ACCENTS: Record<string, string> = {
  hp1: '#704ADD',
  bur: '#2E7D32',
  winnie: '#3B82F6',
  charlotte: '#EA580C',
  matilda: '#DC2626',
  gruffalo: '#78350F',
};

function makeBook(
  id: string,
  title: string,
  author: string,
  quizCount = 0,
  extra?: Partial<BookEntry>,
): BookEntry {
  return {
    id,
    title,
    author,
    coverSource: BOOK_COVERS[id],
    coverAccent: BOOK_ACCENTS[id] ?? '#704ADD',
    quizCount,
    ...extra,
  };
}

export const BOOK_SEEDS: BookEntry[] = [
  makeBook('hp1', "Harry Potter and the Philosopher's Stone", 'J.K. Rowling'),
  makeBook('bur', 'The Adventures of Pinocchio', 'Carlo Collodi'),
  makeBook('winnie', 'Winnie-the-Pooh', 'A.A. Milne'),
  makeBook('charlotte', "Charlotte's Web", 'E.B. White'),
  makeBook('matilda', 'Matilda', 'Roald Dahl'),
  makeBook('gruffalo', 'The Gruffalo', 'Julia Donaldson'),
];

export const DEMO_BOOKS: BookEntry[] = [
  makeBook('hp1', "Harry Potter and the Philosopher's Stone", 'J.K. Rowling', 1, {
    lastScore: 4,
    totalQuestions: 5,
  }),
  makeBook('bur', 'The Adventures of Pinocchio', 'Carlo Collodi'),
];

export const DEMO_PARENT_REWARDS: ParentReward[] = [
  { id: 'ice-cream', title: 'Ice cream trip', icon: REWARD_ICONS['ice-cream'], cost: 300 },
  { id: 'movie', title: 'Movie night with Mom', icon: REWARD_ICONS.movie, cost: 500 },
  { id: 'park', title: 'Theme park day', icon: REWARD_ICONS.park, cost: 1000 },
];

export { DIFFICULTY_ICONS, ICONS };

export const MASCOT_LINES = {
  onboarding: "Hi! I'm Sparky! I'll help you remember every book you read!",
  search: 'What book did you read? Tap a popular title or type your own!',
  confirm: (title: string) => `Great choice! Ready to see what you remembered from "${title}"?`,
  correct: 'Yes! You got it!',
  wrong: "Nice try! The right answer is highlighted — you'll get the next one!",
  resultsHigh: 'Amazing! You are a reading champion!',
  resultsMid: 'Good job! Want to try again? The questions will be brand new!',
  resultsLow: 'Keep going! Every try makes your brain stronger!',
} as const;

export function createCustomBook(title: string): BookEntry {
  return {
    id: `custom-${Date.now()}`,
    title,
    coverAccent: '#704ADD',
    quizCount: 0,
  };
}
