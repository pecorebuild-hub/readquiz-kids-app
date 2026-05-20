import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MascotGuide } from '../../components/MascotGuide';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { mascotSize } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function OnboardingStep3() {
  const { theme } = useTheme();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
          <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.primary }]} />
        </View>
        <MascotGuide
          pose="thinking"
          size={mascotSize.hero}
          speech="What book did you read last? Let's find it!"
        />
        <Button
          title="Find my book"
          large
          onPress={() => {
            completeOnboarding();
            router.replace('/quiz/search');
          }}
        />
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 20, justifyContent: 'space-between', paddingBottom: 32, overflow: 'visible' },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
  dot: { width: 20, height: 4, borderRadius: 2 },
  dotActive: { width: 28 },
});
