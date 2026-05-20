import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCover } from '../../components/BookCover';
import { MascotGuide } from '../../components/MascotGuide';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { VoiceTextField, webScrollStyle } from '../../components/ui/VoiceTextField';
import { BOOK_SEEDS, createCustomBook, MASCOT_LINES } from '../../data/demo';
import { useAppStore } from '../../store/useAppStore';
import type { BookEntry } from '../../data/demo';
import { ICONS } from '../../theme/icons';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function BookSearchScreen() {
  const { theme, bodyFontFamily, bodyFonts } = useTheme();
  const addBook = useAppStore((s) => s.addBook);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BOOK_SEEDS;
    return BOOK_SEEDS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q),
    );
  }, [query]);

  const openBook = (book: BookEntry) => {
    addBook(book);
    router.push({ pathname: '/quiz/confirm', params: { bookId: book.id } });
  };

  const addCustom = () => {
    const title = query.trim();
    if (!title) return;
    const book = createCustomBook(title);
    addBook(book);
    router.push({ pathname: '/quiz/confirm', params: { bookId: book.id } });
  };

  const scrollStyle = webScrollStyle(theme.colors.primaryMuted, theme.colors.surfaceMuted);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
          style={[styles.list, scrollStyle]}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <MascotGuide pose="thinking" size={mascotSize.medium} speech={MASCOT_LINES.search} />
              <Text style={[styles.title, { color: theme.colors.text, fontFamily: bodyFonts.bold }]}>
                Find your book
              </Text>
              <VoiceTextField
                value={query}
                onChangeText={setQuery}
                placeholder="Title or author..."
                leadingIcon={ICONS.search}
                voiceDemoValue="Harry Potter"
                autoFocus
              />
              {Platform.OS === 'web' ?
                <Text style={[styles.voiceHint, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
                  Tap the mic to try demo voice search
                </Text>
              : null}
              <Text style={[styles.section, { color: theme.colors.textSecondary, fontFamily: bodyFonts.semibold }]}>
                Popular picks
              </Text>
              <View style={styles.chips}>
                {BOOK_SEEDS.slice(0, 4).map((b) => (
                  <Pressable
                    key={b.id}
                    onPress={() => openBook(b)}
                    style={[styles.chip, { backgroundColor: theme.colors.mascotBg }]}
                  >
                    <Text style={{ color: theme.colors.mascotText, fontFamily: bodyFontFamily, fontSize: type.body }}>
                      {b.title.split(' ').slice(0, 2).join(' ')}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={[styles.section, { color: theme.colors.textSecondary, fontFamily: bodyFonts.semibold }]}>
                All books
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => openBook(item)}
              style={[styles.row, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            >
              <BookCover coverSource={item.coverSource} coverAccent={item.coverAccent} size="sm" />
              <View style={styles.rowText}>
                <Text style={{ color: theme.colors.text, fontFamily: bodyFonts.semibold, fontSize: type.bodyLg }}>
                  {item.title}
                </Text>
                {item.author ?
                  <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.caption }}>
                    {item.author}
                  </Text>
                : null}
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            query.trim() && results.length === 0 ?
              <Pressable onPress={addCustom} style={[styles.custom, { borderColor: theme.colors.primary }]}>
                <Text style={{ color: theme.colors.primary, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
                  Use "{query.trim()}" anyway
                </Text>
              </Pressable>
            : null
          }
        />
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  header: { gap: 12, overflow: 'visible', paddingTop: 8, paddingBottom: 8 },
  title: { fontSize: type.screenTitle, textAlign: 'center' },
  voiceHint: { fontSize: type.caption, textAlign: 'center', marginTop: -4 },
  section: { fontSize: type.label, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  rowText: { flex: 1, gap: 4 },
  custom: {
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
