import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = { current: number; total: number };

export function QuizProgressBar({ current, total }: Props) {
  const { theme, bodyFontFamily } = useTheme();
  const pct = (current / total) * 100;

  return (
    <View style={styles.row}>
      <View style={[styles.track, { backgroundColor: theme.colors.successBg }]}>
        <View
          style={[
            styles.fill,
            { width: `${pct}%`, backgroundColor: theme.colors.success },
          ]}
        />
      </View>
      <Text style={[styles.label, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
        {current}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: { flex: 1, height: 10, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
  label: { fontSize: 15, minWidth: 40 },
});
