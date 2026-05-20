import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  amount: number;
  onComplete?: () => void;
};

export function CoinFlyOverlay({ amount, onComplete }: Props) {
  const { theme, headingFontFamily } = useTheme();
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 200 });
    y.value = withDelay(200, withTiming(-180, { duration: 800 }, (finished) => {
      if (finished && onComplete) runOnJS(onComplete)();
    }));
    opacity.value = withDelay(700, withTiming(0, { duration: 300 }));
  }, [amount, onComplete, opacity, scale, y]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.coin, style]} pointerEvents="none">
      <AppIcon name={ICONS.coin} size={40} color={theme.colors.warningBorder} />
      <Text
        style={[
          styles.amount,
          { color: theme.colors.success, fontFamily: headingFontFamily },
        ]}
      >
        +{amount}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    bottom: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  amount: { fontSize: 24, fontWeight: '700' },
});
