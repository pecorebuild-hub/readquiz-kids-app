import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BodyFontPicker } from '../../components/BodyFontPicker';
import { FontPicker } from '../../components/FontPicker';
import { ListChevron } from '../../components/ListChevron';
import { MascotGuide } from '../../components/MascotGuide';
import { ThemeToggle } from '../../components/ThemeToggle';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function ProfileScreen() {
  const { theme, bodyFontFamily, bodyFontKey, headingFontFamily, bodyFonts } = useTheme();
  const childProfile = useAppStore((s) => s.childProfile);
  const coins = useAppStore((s) => s.coins);
  const books = useAppStore((s) => s.books);
  const bodyLabel = bodyFontKey === 'inter' ? 'Inter' : 'Nunito';
  const name = childProfile?.name ?? 'Reader';

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <MascotGuide
            pose="wave"
            size={mascotSize.medium}
            speech={`You're doing great, ${name}!`}
          />
          <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.name, { color: theme.colors.text, fontFamily: headingFontFamily }]}>{name}</Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
              Age {childProfile?.age ?? '—'} · {books.length} books · {coins} coins
            </Text>
          </View>
          <Text style={[styles.label, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>Theme</Text>
          <ThemeToggle />
          <Text style={[styles.label, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>Body font</Text>
          <BodyFontPicker />
          <Text style={[styles.label, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>Heading font</Text>
          <FontPicker />
          <Text style={[styles.previewHeading, { color: theme.colors.text, fontFamily: headingFontFamily }]}>
            Sparky loves reading!
          </Text>
          <Text style={[styles.previewBody, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
            Body text uses {bodyLabel} — switch above to compare.
          </Text>
          <Pressable
            onPress={() => router.push('/parent')}
            style={[styles.row, { borderColor: theme.colors.border }]}
          >
            <Text style={{ color: theme.colors.text, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
              Parent section
            </Text>
            <ListChevron />
          </Pressable>
          {__DEV__ ?
            <Pressable
              onPress={() => router.push('/dev/design-system')}
              style={[styles.row, { borderColor: theme.colors.primary }]}
            >
              <Text style={{ color: theme.colors.primary, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
                Design System (dev)
              </Text>
              <ListChevron color={theme.colors.primary} />
            </Pressable>
          : null}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100, gap: 14, overflow: 'visible' },
  card: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  name: { fontSize: type.hero, fontWeight: '700' },
  label: { fontSize: type.label },
  previewHeading: { fontSize: type.hero, textAlign: 'center' },
  previewBody: { fontSize: type.body, textAlign: 'center', lineHeight: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
  },
});
