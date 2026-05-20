import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CoinFlyOverlay } from '../../components/CoinFlyOverlay';
import { ConfettiCelebration } from '../../components/ConfettiCelebration';
import { AppIcon } from '../../components/icons/AppIcon';
import { MascotGuide } from '../../components/MascotGuide';
import { StarRating } from '../../components/StarRating';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { generateQuiz } from '../../services/quizApi';
import { useAppStore } from '../../store/useAppStore';
import { ICONS } from '../../theme/icons';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

function scoreToCoins(score: number): number {
  const map: Record<number, number> = { 5: 50, 4: 40, 3: 25, 2: 15, 1: 10, 0: 10 };
  return map[score] ?? 10;
}

export default function QuizResultsScreen() {
  const { theme, bodyFontFamily, headingFontFamily } = useTheme();
  const activeQuiz = useAppStore((s) => s.activeQuiz);
  const childProfile = useAppStore((s) => s.childProfile);
  const finishQuiz = useAppStore((s) => s.finishQuiz);
  const setActiveQuiz = useAppStore((s) => s.setActiveQuiz);
  const [retryLoading, setRetryLoading] = useState(false);
  const [coinsShown, setCoinsShown] = useState(false);

  const score = useMemo(() => {
    if (!activeQuiz) return 0;
    return activeQuiz.answers.reduce<number>((acc, ans, i) => {
      if (ans === activeQuiz.questions[i].correctIndex) return acc + 1;
      return acc;
    }, 0);
  }, [activeQuiz]);

  const earned = scoreToCoins(score);

  useEffect(() => {
    if (!activeQuiz) return;
    finishQuiz(score, activeQuiz.questions.length);
  }, []);

  const tryAgain = async () => {
    if (!activeQuiz || !childProfile) return;
    setRetryLoading(true);
    try {
      const { questions } = await generateQuiz({
        bookTitle: activeQuiz.bookTitle,
        author: activeQuiz.author,
        childAge: childProfile.age,
        difficulty: activeQuiz.difficulty,
        excludeQuestionTexts: activeQuiz.questions.map((q) => q.text),
      });
      setActiveQuiz({
        ...activeQuiz,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
      });
      router.replace('/quiz/play');
    } catch (e) {
      Alert.alert('Oops', e instanceof Error ? e.message : 'Could not load new questions');
    } finally {
      setRetryLoading(false);
    }
  };

  if (!activeQuiz) {
    return (
      <ScreenBackground>
        <SafeAreaView style={styles.safe}>
          <Button title="Home" large onPress={() => router.replace('/(tabs)/home')} />
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ConfettiCelebration fire />
      {!coinsShown ?
        <CoinFlyOverlay amount={earned} onComplete={() => setCoinsShown(true)} />
      : null}
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <AppIcon name={ICONS.trophy} size={56} color={theme.colors.warningBorder} />
          <Text style={[styles.heading, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
            Quiz complete!
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body, textAlign: 'center' }}>
            {activeQuiz.bookTitle}
          </Text>
          <View style={[styles.summaryWrap]}>
            <View style={[styles.summaryCard, { backgroundColor: theme.colors.warningBg, borderColor: theme.colors.warningBorder }]}>
              <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
                Quiz result
              </Text>
              <Text style={[styles.scoreNum, { color: theme.colors.warning, fontFamily: headingFontFamily }]}>
                {score}/{activeQuiz.questions.length}
              </Text>
              <Text style={{ color: theme.colors.warning, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
                {Math.round((score / activeQuiz.questions.length) * 100)}% correct
              </Text>
              <View style={styles.coinRow}>
                <AppIcon name={ICONS.coin} size={24} color={theme.colors.success} />
                <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
                  Coins earned
                </Text>
                <Text style={[styles.coinAmtInline, { color: theme.colors.success, fontFamily: headingFontFamily }]}>
                  +{earned}
                </Text>
              </View>
            </View>
            <View style={styles.summaryMascot}>
              <MascotGuide pose="cheer" size={mascotSize.large} animate />
            </View>
          </View>
          <StarRating score={score} size={28} />
        </ScrollView>
        <View style={styles.footer}>
          <Button title="Try again — new questions!" large loading={retryLoading} onPress={tryAgain} />
          <Button title="Home" variant="secondary" large onPress={() => router.replace('/(tabs)/home')} />
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, alignItems: 'center', gap: 14, overflow: 'visible' },
  footer: { padding: 20, paddingTop: 8, gap: 10 },
  heading: { fontSize: type.screenTitle, fontWeight: '700' },
  summaryWrap: {
    width: '100%',
    overflow: 'visible',
  },
  summaryCard: {
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
    gap: 8,
  },
  scoreNum: { fontSize: 40, fontWeight: '700' },
  coinRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  coinAmtInline: { fontSize: 24, fontWeight: '700' },
  summaryMascot: {
    position: 'absolute',
    left: -34,
    top: -54,
  },
});
