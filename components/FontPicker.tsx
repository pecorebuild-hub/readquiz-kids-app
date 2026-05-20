import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { KID_FONT_KEYS, KID_FONTS } from '../theme/fonts';
import { useTheme } from '../theme/ThemeContext';

export function FontPicker() {
  const { fontKey, setFontKey, theme } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {KID_FONT_KEYS.map((key) => {
        const active = key === fontKey;
        return (
          <Pressable
            key={key}
            onPress={() => setFontKey(key)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.colors.primary : theme.colors.surfaceMuted,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: active ? theme.colors.textInverse : theme.colors.text,
                fontFamily: KID_FONTS[key].label,
                fontSize: 16,
              }}
            >
              {KID_FONTS[key].label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexGrow: 0 },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
  },
});
