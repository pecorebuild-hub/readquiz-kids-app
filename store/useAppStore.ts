import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DEMO_BOOKS, DEMO_PARENT_REWARDS, type BookEntry, type ParentReward } from '../data/demo';
import type { BodyFontKey, KidFontKey } from '../theme/fonts';
import type { ThemeMode } from '../theme/tokens';
import type { QuizQuestion } from '../services/quizApi';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type ActiveQuiz = {
  bookId: string;
  bookTitle: string;
  author?: string;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
};

type AppState = {
  childProfile: { name: string; age: number } | null;
  onboardingComplete: boolean;
  hasCompletedFirstQuiz: boolean;
  coins: number;
  goalRewardId: string | null;
  books: BookEntry[];
  activeQuiz: ActiveQuiz | null;
  parentRewards: ParentReward[];
  pendingRedemption: { rewardId: string; rewardTitle: string; cost: number } | null;
  settings: { themeMode: ThemeMode; bodyFontKey: BodyFontKey; fontKey: KidFontKey };
  continueBookId: string | null;

  setChildProfile: (name: string, age: number) => void;
  completeOnboarding: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setBodyFontKey: (key: BodyFontKey) => void;
  setFontKey: (key: KidFontKey) => void;
  addBook: (book: BookEntry) => void;
  setActiveQuiz: (quiz: ActiveQuiz | null) => void;
  answerQuestion: (optionIndex: number) => void;
  nextQuestion: () => void;
  addCoins: (amount: number) => void;
  finishQuiz: (score: number, total: number) => void;
  setContinueBook: (id: string | null) => void;
  requestRedemption: (rewardId: string) => void;
  clearPendingRedemption: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      childProfile: null,
      onboardingComplete: false,
      hasCompletedFirstQuiz: false,
      coins: 120,
      goalRewardId: 'ice-cream',
      books: DEMO_BOOKS,
      activeQuiz: null,
      parentRewards: DEMO_PARENT_REWARDS,
      pendingRedemption: null,
      settings: { themeMode: 'light', bodyFontKey: 'inter', fontKey: 'linotte' },
      continueBookId: 'hp1',

      setChildProfile: (name, age) => set({ childProfile: { name, age } }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      setThemeMode: (themeMode) =>
        set((s) => ({ settings: { ...s.settings, themeMode } })),
      setBodyFontKey: (bodyFontKey) =>
        set((s) => ({ settings: { ...s.settings, bodyFontKey } })),
      setFontKey: (fontKey) => set((s) => ({ settings: { ...s.settings, fontKey } })),

      addBook: (book) =>
        set((s) => ({
          books: [book, ...s.books.filter((b) => b.id !== book.id)],
        })),

      setActiveQuiz: (activeQuiz) => set({ activeQuiz }),
      answerQuestion: (optionIndex) =>
        set((s) => {
          if (!s.activeQuiz) return s;
          const answers = [...s.activeQuiz.answers];
          answers[s.activeQuiz.currentIndex] = optionIndex;
          return { activeQuiz: { ...s.activeQuiz, answers } };
        }),
      nextQuestion: () =>
        set((s) => {
          if (!s.activeQuiz) return s;
          return {
            activeQuiz: {
              ...s.activeQuiz,
              currentIndex: s.activeQuiz.currentIndex + 1,
            },
          };
        }),

      addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),

      finishQuiz: (score, total) => {
        const quiz = get().activeQuiz;
        if (!quiz) return;
        const coinMap: Record<number, number> = { 5: 50, 4: 40, 3: 25, 2: 15, 1: 10, 0: 10 };
        const earned = coinMap[score] ?? 10;
        set((s) => ({
          hasCompletedFirstQuiz: true,
          coins: s.coins + earned,
          continueBookId: null,
          books: s.books.map((b) =>
            b.id === quiz.bookId ?
              { ...b, lastScore: score, totalQuestions: total, quizCount: b.quizCount + 1 }
            : b,
          ),
        }));
      },

      setContinueBook: (continueBookId) => set({ continueBookId }),
      requestRedemption: (rewardId) => {
        const reward = get().parentRewards.find((r) => r.id === rewardId);
        if (!reward) return;
        set({
          pendingRedemption: {
            rewardId,
            rewardTitle: reward.title,
            cost: reward.cost,
          },
        });
      },
      clearPendingRedemption: () => set({ pendingRedemption: null }),
    }),
    {
      name: 'readquest-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        childProfile: s.childProfile,
        onboardingComplete: s.onboardingComplete,
        hasCompletedFirstQuiz: s.hasCompletedFirstQuiz,
        coins: s.coins,
        goalRewardId: s.goalRewardId,
        books: s.books,
        parentRewards: s.parentRewards,
        settings: s.settings,
      }),
    },
  ),
);
