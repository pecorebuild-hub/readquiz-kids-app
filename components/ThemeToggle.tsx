import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ThemeMode } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

const MODES: ThemeMode[] = ['light', 'dark', 'system'];

export function ThemeToggle() {
  const { themeMode, setThemeMode, theme, bodyFontFamily } = useTheme();

  return (
    <View style={styles.row}>
      {MODES.map((mode) => {
        const active = themeMode === mode;
        return (
          <Pressable
            key={mode}
            onPress={() => setThemeMode(mode)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.colors.primary : theme.colors.surfaceMuted,
              },
            ]}
          >
            <Text
              style={{
                color: active ? theme.colors.textInverse : theme.colors.text,
                fontFamily: bodyFontFamily,
                fontSize: 13,
                textTransform: 'capitalize',
              }}
            >
              {mode}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
