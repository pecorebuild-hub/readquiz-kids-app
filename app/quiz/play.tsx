import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnswerCard } from '../../components/AnswerCard';
import { MascotGuide } from '../../components/MascotGuide';
import { QuizProgressBar } from '../../components/QuizProgressBar';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { MASCOT_LINES } from '../../data/demo';
import { useAppStore } from '../../store/useAppStore';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function QuizPlayScreen() {
  const { theme, headingFontFamily } = useTheme();
  const activeQuiz = useAppStore((s) => s.activeQuiz);
  const answerQuestion = useAppStore((s) => s.answerQuestion);
  const nextQuestion = useAppStore((s) => s.nextQuestion);
  const [revealed, setRevealed] = useState(false);

  const quiz = activeQuiz;
  if (!quiz) {
    router.replace('/quiz/search');
    return null;
  }

  const q = quiz.questions[quiz.currentIndex];
  const total = quiz.questions.length;
  const selected = quiz.answers[quiz.currentIndex];
  const isLast = quiz.currentIndex >= total - 1;

  const mascotLine = useMemo(() => {
    if (!revealed || selected === null) return undefined;
    return selected === q.correctIndex ? MASCOT_LINES.correct : MASCOT_LINES.wrong;
  }, [revealed, selected, q.correctIndex]);

  const handleSelect = (index: number) => {
    if (revealed) return;
    answerQuestion(index);
    setRevealed(true);
  };

  const handleNext = () => {
    setRevealed(false);
    if (isLast) {
      router.replace('/quiz/results');
      return;
    }
    nextQuestion();
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <QuizProgressBar current={quiz.currentIndex + 1} total={total} />
          <Text style={[styles.question, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
            {q.text}
          </Text>
          <View style={styles.answers}>
            {q.options.map((opt, i) => {
              let state: 'default' | 'correct' | 'incorrect' | 'disabled' = 'default';
              if (revealed && selected !== null) {
                if (i === q.correctIndex) state = 'correct';
                else if (i === selected) state = 'incorrect';
                else state = 'disabled';
              }
              return (
                <AnswerCard
                  key={`${q.id}-${i}`}
                  label={opt}
                  state={state}
                  onPress={() => handleSelect(i)}
                  disabled={revealed}
                />
              );
            })}
          </View>
          {mascotLine ?
            <MascotGuide
              pose={selected === q.correctIndex ? 'cheer' : 'thinking'}
              size={selected === q.correctIndex ? mascotSize.hero : mascotSize.large}
              speech={mascotLine}
            />
          : null}
        </ScrollView>
        <View style={styles.footer}>
          <Button title={isLast ? 'See results' : 'Next question'} large onPress={handleNext} disabled={!revealed} />
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, gap: 16, overflow: 'visible' },
  question: {
    fontSize: type.screenTitle,
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 8,
  },
  answers: { gap: 12 },
  footer: { padding: 20, paddingTop: 8 },
});
