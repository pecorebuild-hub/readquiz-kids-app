import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { AppIcon } from '../icons/AppIcon';
import type { IoniconName } from '../../theme/icons';
import { ICONS } from '../../theme/icons';
import { type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

type Props = TextInputProps & {
  voiceDemoValue?: string;
  leadingIcon?: IoniconName;
  shape?: 'rounded' | 'pill';
  showVoice?: boolean;
};

const webInputReset: TextStyle =
  Platform.OS === 'web' ?
    ({ outlineStyle: 'none', outlineWidth: 0 } as unknown as TextStyle)
  : {};

/** Text field with optional leading icon + trailing mic (demo voice) */
export function VoiceTextField({
  style,
  voiceDemoValue = 'Alex',
  leadingIcon,
  shape = 'rounded',
  showVoice = true,
  onChangeText,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const { theme, bodyFontFamily } = useTheme();
  const [listening, setListening] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleVoice = () => {
    if (listening) return;
    setListening(true);
    setTimeout(() => {
      setListening(false);
      onChangeText?.(voiceDemoValue);
    }, 1200);
  };

  return (
    <View
      style={[
        styles.wrap,
        shape === 'pill' ? styles.pill : styles.rounded,
        {
          backgroundColor: theme.colors.surface,
          borderColor: focused ? theme.colors.primary : theme.colors.primaryMuted,
        },
      ]}
    >
      {leadingIcon ?
        <AppIcon name={leadingIcon} size={22} color={theme.colors.textSecondary} />
      : null}
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        onChangeText={onChangeText}
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
            color: theme.colors.text,
            fontFamily: bodyFontFamily,
          },
          style as TextStyle,
        ]}
        {...rest}
      />
      {showVoice ?
        <Pressable
          onPress={handleVoice}
          accessibilityLabel="Voice input"
          style={({ pressed }) => [
            styles.micBtn,
            {
              backgroundColor: listening ? theme.colors.mascotBg : theme.colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          {listening ?
            <ActivityIndicator color={theme.colors.primary} size="small" />
          : <AppIcon name={ICONS.mic} size={22} color={theme.colors.textInverse} />
          }
        </Pressable>
      : null}
    </View>
  );
}

export function webScrollStyle(scrollThumb: string, track: string): ViewStyle {
  if (Platform.OS !== 'web') return {};
  return {
    scrollbarWidth: 'thin',
    scrollbarColor: `${scrollThumb} ${track}`,
  } as ViewStyle;
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  rounded: { borderRadius: 14 },
  pill: { borderRadius: 999 },
  input: {
    flex: 1,
    fontSize: type.bodyLg,
    paddingVertical: 10,
    paddingRight: 4,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
