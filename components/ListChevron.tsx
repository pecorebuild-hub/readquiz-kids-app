import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  size?: number;
  color?: string;
};

export function ListChevron({ size = 18, color }: Props) {
  const { theme } = useTheme();
  return (
    <AppIcon name={ICONS.chevron} size={size} color={color ?? theme.colors.textSecondary} />
  );
}
