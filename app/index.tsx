import { Redirect } from 'expo-router';
import { useAppStore } from '../store/useAppStore';

export default function Index() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);
  if (!onboardingComplete) {
    return <Redirect href="/onboarding/step-1" />;
  }
  return <Redirect href="/(tabs)/home" />;
}
