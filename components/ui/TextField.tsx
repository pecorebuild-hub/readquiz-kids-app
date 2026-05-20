import {
  Platform,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useState } from 'react';
import { type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

type Props = TextInputProps & {
  containerStyle?: ViewStyle;
};

const webInputReset: TextStyle =
  Platform.OS === 'web' ?
    ({ outlineStyle: 'none', outlineWidth: 0 } as unknown as TextStyle)
  : {};

export function TextField({ style, onFocus, onBlur, ...rest }: Props) {
  const { theme, bodyFontFamily } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={theme.colors.textSecondary}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[
        styles.input,
        webInputReset,
        {
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          fontFamily: bodyFontFamily,
          borderColor: focused ? theme.colors.primary : theme.colors.primaryMuted,
        },
        style as TextStyle,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: type.bodyLg,
    borderWidth: 2,
  },
});
