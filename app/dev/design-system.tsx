import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnswerCard } from '../../components/AnswerCard';
import { CoinFlyOverlay } from '../../components/CoinFlyOverlay';
import { BookCover } from '../../components/BookCover';
import { CoinBadge } from '../../components/CoinBadge';
import { AppIcon } from '../../components/icons/AppIcon';
import { StarRating } from '../../components/StarRating';
import { ConfettiCelebration } from '../../components/ConfettiCelebration';
import { BodyFontPicker } from '../../components/BodyFontPicker';
import { FontPicker } from '../../components/FontPicker';
import { MascotGuide } from '../../components/MascotGuide';
import { QuizProgressBar } from '../../components/QuizProgressBar';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { ICONS } from '../../theme/icons';
import { DEMO_BOOKS } from '../../data/demo';
import { useTheme } from '../../theme/ThemeContext';

function DsSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme, headingFontFamily } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Swatch({ name, color }: { name: string; color: string }) {
  const { bodyFontFamily } = useTheme();
  return (
    <View style={styles.swatch}>
      <View style={[styles.swatchBox, { backgroundColor: color }]} />
      <Text style={{ fontSize: 10, fontFamily: bodyFontFamily }}>{name}</Text>
    </View>
  );
}

export default function DesignSystemScreen() {
  if (!__DEV__) {
    router.replace('/');
    return null;
  }

  const { theme, bodyFontFamily, headingFontFamily } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const swatches = Object.entries(theme.colors).slice(0, 12);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={[styles.h1, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
            ReadQuest Design System
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily }}>__DEV__ only</Text>

          <DsSection title="Theme">
            <ThemeToggle />
          </DsSection>

          <DsSection title="Semantic colors">
            <View style={styles.swatchRow}>
              <Swatch name="success" color={theme.colors.success} />
              <Swatch name="successBg" color={theme.colors.successBg} />
              <Swatch name="warning" color={theme.colors.warning} />
              <Swatch name="warningBg" color={theme.colors.warningBg} />
              <Swatch name="warningBorder" color={theme.colors.warningBorder} />
              <Swatch name="textSecondary" color={theme.colors.textSecondary} />
              <Swatch name="info" color={theme.colors.info} />
              <Swatch name="infoBg" color={theme.colors.infoBg} />
            </View>
          </DsSection>

          <DsSection title="Icons & covers">
            <View style={styles.iconRow}>
              <AppIcon name={ICONS.coin} size={24} color={theme.colors.warning} circleBg={theme.colors.warningBg} />
              <AppIcon name={ICONS.home} size={24} color={theme.colors.primary} />
              <AppIcon name={ICONS.book} size={24} color={theme.colors.primary} />
              <AppIcon name={ICONS.check} size={24} color={theme.colors.success} />
            </View>
            <CoinBadge amount={120} showLabel />
            <StarRating score={4} />
            <BookCover
              coverSource={DEMO_BOOKS[0]?.coverSource}
              coverAccent={DEMO_BOOKS[0]?.coverAccent}
              size="md"
            />
          </DsSection>

          <DsSection title="Color tokens">
            <View style={styles.swatchRow}>
              {swatches.map(([k, v]) => (
                <Swatch key={k} name={k} color={v as string} />
              ))}
            </View>
          </DsSection>

          <DsSection title="Typography & fonts">
            <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: 12 }}>
              Body
            </Text>
            <BodyFontPicker />
            <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: 12, marginTop: 8 }}>
              Heading
            </Text>
            <FontPicker />
            <Text style={[styles.previewHeading, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
              The quick dragon reads books!
            </Text>
            <Text style={[styles.previewBody, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
              Body copy — Inter or Nunito from Profile.
            </Text>
          </DsSection>

          <DsSection title="Buttons">
            <Button title="Primary" />
            <Button title="Secondary" variant="secondary" />
            <Button title="Ghost" variant="ghost" />
            <Button title="Large primary" large />
          </DsSection>

          <DsSection title="Quiz">
            <QuizProgressBar current={2} total={5} />
            <AnswerCard label="Answer A" state="default" onPress={() => {}} />
            <AnswerCard label="Correct" state="correct" onPress={() => {}} />
          </DsSection>

          <DsSection title="Mascot">
            <MascotGuide pose="wave" size={120} speech="Hello from the design system!" />
          </DsSection>

          <DsSection title="Motion">
            <Button title="Fire confetti" onPress={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000); }} />
            <Button title="Coin fly" variant="secondary" onPress={() => setShowCoins(true)} />
            {showConfetti ? <ConfettiCelebration fire /> : null}
            {showCoins ? <CoinFlyOverlay amount={40} onComplete={() => setShowCoins(false)} /> : null}
          </DsSection>

          <Button title="Back" variant="ghost" onPress={() => router.back()} />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, gap: 8, paddingBottom: 40 },
  h1: { fontSize: 24, fontWeight: '700' },
  section: { gap: 10, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  previewHeading: { fontSize: 20, textAlign: 'center' },
  previewBody: { fontSize: 14, textAlign: 'center', marginTop: 6 },
  swatchRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch: { alignItems: 'center', width: 72 },
  swatchBox: { width: 48, height: 48, borderRadius: 8, marginBottom: 4 },
  iconRow: { flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
});
