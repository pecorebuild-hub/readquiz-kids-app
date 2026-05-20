import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MascotGuide } from '../../components/MascotGuide';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { MASCOT_LINES } from '../../data/demo';
import { useTheme } from '../../theme/ThemeContext';

export default function OnboardingStep1() {
  const { theme } = useTheme();

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
        </View>
        <MascotGuide
          pose="wave"
          size={280}
          speech={MASCOT_LINES.onboarding}
          speechLayout="bubble-top-right"
        />
        <Button title="Hi, Sparky!" large onPress={() => router.push('/onboarding/step-2')} />
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
