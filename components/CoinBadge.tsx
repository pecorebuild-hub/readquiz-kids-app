import { StyleSheet, Text, View } from 'react-native';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  amount: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
};

export function CoinBadge({ amount, size = 'md', showLabel = false }: Props) {
  const { theme, bodyFonts } = useTheme();
  const iconSize = size === 'sm' ? 14 : 18;
  const fontSize = size === 'sm' ? 13 : 16;

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: theme.colors.warningBg,
          borderColor: theme.colors.warningBorder,
        },
      ]}
    >
      <AppIcon
        name={ICONS.coin}
        size={iconSize}
        color={theme.colors.warning}
        circleBg={theme.colors.warningBg}
        circleSize={iconSize + 12}
      />
      <Text style={{ color: theme.colors.warning, fontFamily: bodyFonts.bold, fontSize }}>
        {amount}
        {showLabel ? ' coins' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
});
