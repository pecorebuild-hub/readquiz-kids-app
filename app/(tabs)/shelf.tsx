import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCover } from '../../components/BookCover';
import { MascotGuide } from '../../components/MascotGuide';
import { Button } from '../../components/ui/Button';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function ShelfScreen() {
  const { theme, bodyFontFamily, bodyFonts } = useTheme();
  const books = useAppStore((s) => s.books);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <MascotGuide pose="wave" size={mascotSize.medium} speech="All the books you've read!" />
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: '/quiz/confirm', params: { bookId: item.id } })}
              style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            >
              <BookCover coverSource={item.coverSource} coverAccent={item.coverAccent} size="md" />
              <Text
                numberOfLines={2}
                style={{ color: theme.colors.text, fontFamily: bodyFonts.semibold, fontSize: type.body }}
              >
                {item.title}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.caption }}>
                {item.quizCount > 0 ? `Last: ${item.lastScore}/${item.totalQuestions ?? 5}` : 'No quiz yet'}
              </Text>
            </Pressable>
          )}
        />
        <Button title="Add a book" large onPress={() => router.push('/quiz/search')} />
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, paddingBottom: 90, gap: 12 },
  header: { marginBottom: 8, overflow: 'visible' },
  list: { gap: 10, paddingBottom: 8 },
  row: { gap: 10 },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    minHeight: 190,
    alignItems: 'center',
  },
});
