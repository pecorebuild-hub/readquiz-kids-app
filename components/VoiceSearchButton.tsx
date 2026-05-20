import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type Props = { onResult: (text: string) => void };

/** Prototype: fake voice — no microphone */
export function VoiceSearchButton({ onResult }: Props) {
  const { theme, bodyFontFamily, headingFontFamily } = useTheme();
  const [listening, setListening] = useState(false);

  const handlePress = () => {
    if (listening) return;
    setListening(true);
    setTimeout(() => {
      setListening(false);
      onResult('Harry Potter');
    }, 1500);
  };

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.btn,
          {
            backgroundColor: theme.colors.mascotBg,
            borderColor: theme.colors.primaryMuted,
          },
        ]}
      >
        {listening ?
          <ActivityIndicator color={theme.colors.primary} />
        : <>
            <AppIcon name={ICONS.mic} size={28} color={theme.colors.primary} />
            <Text style={[styles.label, { color: theme.colors.mascotText, fontFamily: headingFontFamily }]}>
              Tap and say the book title
            </Text>
          </>
        }
      </Pressable>
      <Text style={[styles.demo, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
        Demo voice (prototype)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  btn: {
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  label: { fontSize: 17, textAlign: 'center' },
  demo: { fontSize: 13, textAlign: 'center' },
});
