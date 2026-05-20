import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  text: string;
  variant?: 'default' | 'bubble';
  /** Bubble tail points toward mascot (left) or book/content (right). */
  tailAlign?: 'left' | 'right';
  style?: ViewStyle;
};

function bubbleShadowStyle(shadowRgb: string): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0 12px 32px ${shadowRgb}, 0 4px 12px rgba(26, 26, 46, 0.14)`,
    } as ViewStyle;
  }
  return {
    shadowColor: '#704ADD',
    shadowOpacity: 0.38,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  };
}

export function MascotSpeech({ text, variant = 'default', tailAlign = 'left', style }: Props) {
  const { theme, headingFontFamily } = useTheme();
  const isBubble = variant === 'bubble';

  if (isBubble) {
    return (
      <View style={[styles.bubbleOuter, style]}>
        <LinearGradient
          colors={[theme.colors.surface, theme.colors.mascotBg, theme.colors.canvasGradientEnd]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.bubbleGradient,
            bubbleShadowStyle('rgba(112, 74, 221, 0.38)'),
          ]}
        >
          <Text
            style={[
              styles.textBubble,
              { color: theme.colors.text, fontFamily: headingFontFamily },
            ]}
          >
            {text}
          </Text>
        </LinearGradient>
        <View
          style={[
            styles.tail,
            tailAlign === 'right' ? styles.tailRight : styles.tailLeft,
            { borderTopColor: theme.colors.mascotBg },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={[styles.bubble, { backgroundColor: theme.colors.mascotBg }, style]}>
      <Text style={[styles.text, { color: theme.colors.mascotText, fontFamily: headingFontFamily }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 320,
  },
  bubbleOuter: {
    maxWidth: 280,
    overflow: 'visible',
    paddingBottom: 14,
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  bubbleGradient: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    overflow: 'hidden',
  },
  text: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
  textBubble: { fontSize: 19, lineHeight: 27, textAlign: 'left', fontWeight: '600' },
  tail: {
    position: 'absolute',
    bottom: 2,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 13,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  tailLeft: { left: 38 },
  tailRight: { right: 38 },
});
