import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  large?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  variant = 'primary',
  loading,
  large,
  disabled,
  style: styleProp,
  ...rest
}: Props) {
  const { theme, headingFontFamily } = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        large && styles.large,
        {
          backgroundColor:
            variant === 'primary' ? theme.colors.primary
            : variant === 'secondary' ? theme.colors.surfaceMuted
            : 'transparent',
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: theme.colors.border,
          opacity: pressed || disabled ? 0.85 : 1,
        },
        styleProp,
      ]}
      {...rest}
    >
      {loading ?
        <ActivityIndicator color={isPrimary ? theme.colors.textInverse : theme.colors.primary} />
      : <Text
          style={[
            styles.text,
            {
              color:
                isPrimary ? theme.colors.textInverse
                : theme.colors.text,
              fontFamily: headingFontFamily,
            },
            large && styles.largeText,
          ]}
        >
          {title}
        </Text>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  large: { minHeight: 60, paddingHorizontal: 32 },
  text: { fontSize: 17, fontWeight: '600' },
  largeText: { fontSize: 20 },
});
