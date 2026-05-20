import { useEffect, useRef } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

type Props = { fire: boolean };

export function ConfettiCelebration({ fire }: Props) {
  const ref = useRef<ConfettiCannon>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!fire || fired.current) return;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (!reduce) {
        ref.current?.start();
        fired.current = true;
      }
    });
  }, [fire]);

  if (!fire) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <ConfettiCannon
        ref={ref}
        count={120}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
});
