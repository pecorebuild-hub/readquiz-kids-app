import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BODY_FONT_KEYS, BODY_FONTS } from '../theme/fonts';
import { useTheme } from '../theme/ThemeContext';

export function BodyFontPicker() {
  const { bodyFontKey, setBodyFontKey, theme } = useTheme();

  return (
    <View style={styles.row}>
      {BODY_FONT_KEYS.map((key) => {
        const active = key === bodyFontKey;
        const label = key === 'inter' ? 'Inter' : 'Nunito';
        return (
          <Pressable
            key={key}
            onPress={() => setBodyFontKey(key)}
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
                fontFamily: BODY_FONTS[key].regular,
                fontSize: 16,
              }}
            >
              {label}
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
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
});
