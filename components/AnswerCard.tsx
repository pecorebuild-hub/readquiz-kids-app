import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type State = 'default' | 'correct' | 'incorrect' | 'disabled';

type Props = {
  label: string;
  state: State;
  onPress: () => void;
  disabled?: boolean;
};

export function AnswerCard({ label, state, onPress, disabled }: Props) {
  const { theme, bodyFontFamily } = useTheme();

  const bg =
    state === 'correct' ? theme.colors.correctBg
    : state === 'incorrect' ? `${theme.colors.incorrect}1A`
    : theme.colors.surfaceMuted;

  const borderColor =
    state === 'correct' ? theme.colors.correct
    : state === 'incorrect' ? theme.colors.incorrect
    : theme.colors.border;

  const textColor =
    state === 'incorrect' ? theme.colors.incorrect
    : theme.colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || state !== 'default'}
      style={[
        styles.card,
        {
          backgroundColor: bg,
          borderColor,
          borderWidth: state === 'default' ? 1 : 2,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.text, { color: textColor, fontFamily: bodyFontFamily, flex: 1 }]}>
          {label}
        </Text>
        {state === 'correct' ?
          <AppIcon name={ICONS.check} size={22} color={theme.colors.correct} />
        : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 60,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: 18, lineHeight: 26 },
});
