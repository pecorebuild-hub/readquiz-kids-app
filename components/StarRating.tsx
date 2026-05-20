import { StyleSheet, View } from 'react-native';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  score: number;
  total?: number;
  size?: number;
};

export function StarRating({ score, total = 5, size = 24 }: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <AppIcon
          key={i}
          name={i < score ? ICONS.star : ICONS.starOutline}
          size={size}
          color={i < score ? theme.colors.warningBorder : theme.colors.border}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
});
