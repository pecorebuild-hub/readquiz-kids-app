import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCover } from '../../components/BookCover';
import { DifficultyPicker } from '../../components/DifficultyPicker';
import { MascotSpeech } from '../../components/MascotSpeech';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { MASCOT_LINES } from '../../data/demo';
import { generateQuiz } from '../../services/quizApi';
import { useAppStore, type Difficulty } from '../../store/useAppStore';
import { type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

const MASCOT_CHEER = require('../../assets/mascot/dragon-cheer.png');

const MASCOT_SIZE = 204;
const STAGE_W = 300;
const STAGE_H = 262;

type ConfirmHeroProps = {
  speech: string;
  coverSource?: ImageSourcePropType;
  coverAccent?: string;
};

function ConfirmHero({ speech, coverSource, coverAccent }: ConfirmHeroProps) {
  const bob = useSharedValue(0);

  useEffect(() => {
    bob.value = withRepeat(
      withSequence(withTiming(-6, { duration: 900 }), withTiming(0, { duration: 900 })),
      -1,
      true,
    );
  }, [bob]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  return (
    <View style={styles.heroBlock}>
      <MascotSpeech text={speech} variant="bubble" tailAlign="left" style={styles.heroBubble} />
      <View style={styles.heroStage}>
        <View style={styles.coverWrap}>
          <BookCover coverSource={coverSource} coverAccent={coverAccent} size="xl" />
        </View>
        <Animated.View style={[styles.mascotOverlap, animatedStyle]}>
          <Image
            source={MASCOT_CHEER}
            style={{ width: MASCOT_SIZE, height: MASCOT_SIZE }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </View>
  );
}

export default function BookConfirmScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { theme, bodyFontFamily, bodyFonts, headingFontFamily } = useTheme();
  const books = useAppStore((s) => s.books);
  const childProfile = useAppStore((s) => s.childProfile);
  const setActiveQuiz = useAppStore((s) => s.setActiveQuiz);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [loading, setLoading] = useState(false);

  const book = books.find((b) => b.id === bookId) ?? books[0];

  const startQuiz = async () => {
    if (!book || !childProfile) return;
    setLoading(true);
    try {
      const { questions } = await generateQuiz({
        bookTitle: book.title,
        author: book.author,
        childAge: childProfile.age,
        difficulty,
      });
      setActiveQuiz({
        bookId: book.id,
        bookTitle: book.title,
        author: book.author,
        difficulty,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
      });
      router.push('/quiz/play');
    } catch (e) {
      Alert.alert('Oops', e instanceof Error ? e.message : 'Could not start quiz');
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <ScreenBackground>
        <SafeAreaView style={styles.safe}>
          <Text style={{ color: theme.colors.text, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
            Book not found
          </Text>
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  const speech = MASCOT_LINES.confirm(book.title);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <ConfirmHero speech={speech} coverSource={book.coverSource} coverAccent={book.coverAccent} />
          <Text style={[styles.bookTitle, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
            {book.title}
          </Text>
          {book.author ?
            <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
              {book.author}
            </Text>
          : null}
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>
            Pick difficulty
          </Text>
          <DifficultyPicker value={difficulty} onChange={setDifficulty} />
          {loading ?
            <ActivityIndicator size="large" color={theme.colors.primary} />
          : <Button title="Start quiz!" large onPress={startQuiz} />}
          <Text style={[styles.meta, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
            5 questions · ~3 minutes
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, alignItems: 'center', gap: 14, paddingBottom: 32, overflow: 'visible' },
  heroBlock: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: 10,
    overflow: 'visible',
    paddingLeft: 36,
  },
  heroBubble: { maxWidth: 340, alignSelf: 'center' },
  heroStage: {
    width: STAGE_W,
    height: STAGE_H,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
  coverWrap: {
    zIndex: 1,
    alignSelf: 'center',
  },
  mascotOverlap: {
    position: 'absolute',
    left: -54,
    bottom: 0,
    zIndex: 2,
  },
  bookTitle: { fontSize: type.hero, fontWeight: '700', textAlign: 'center' },
  section: { fontSize: type.label, alignSelf: 'flex-start', width: '100%' },
  meta: { fontSize: type.caption },
});
