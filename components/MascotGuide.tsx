import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { MascotSpeech } from './MascotSpeech';

export type MascotPose = 'wave' | 'thinking' | 'cheer';

export type MascotSpeechLayout = 'below' | 'bubble-top-right';

const POSE_SOURCES: Record<MascotPose, number> = {
  wave: require('../assets/mascot/dragon-wave.png'),
  thinking: require('../assets/mascot/dragon-thinking.png'),
  cheer: require('../assets/mascot/dragon-cheer.png'),
};

type Props = {
  pose?: MascotPose;
  size?: number;
  speech?: string;
  animate?: boolean;
  speechLayout?: MascotSpeechLayout;
};

export function MascotGuide({
  pose = 'wave',
  size = 180,
  speech,
  animate = true,
  speechLayout = 'bubble-top-right',
}: Props) {
  const bob = useSharedValue(0);
  const isBubbleLayout = speechLayout === 'bubble-top-right' && !!speech;

  useEffect(() => {
    if (!animate) return;
    bob.value = withRepeat(
      withSequence(withTiming(-6, { duration: 900 }), withTiming(0, { duration: 900 })),
      -1,
      true,
    );
  }, [animate, bob]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  if (isBubbleLayout) {
    return (
      <View style={[styles.bubbleScene, { minHeight: size + 48 }]}>
        <View style={styles.bubbleAnchor}>
          <MascotSpeech text={speech} variant="bubble" />
        </View>
        <Animated.View style={[animatedStyle, styles.mascotUnderBubble]}>
          <Image
            source={POSE_SOURCES[pose]}
            style={{ width: size, height: size }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Animated.View style={animatedStyle}>
        <Image
          source={POSE_SOURCES[pose]}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </Animated.View>
      {speech ? <MascotSpeech text={speech} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 12 },
  bubbleScene: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 16,
    overflow: 'visible',
  },
  bubbleAnchor: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 48,
    zIndex: 2,
    alignItems: 'flex-end',
    overflow: 'visible',
    paddingTop: 8,
    paddingRight: 4,
  },
  mascotUnderBubble: {
    marginTop: 80,
  },
});
