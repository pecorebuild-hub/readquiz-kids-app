import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCover } from '../../components/BookCover';
import { CoinBadge } from '../../components/CoinBadge';
import { AppIcon } from '../../components/icons/AppIcon';
import { ListChevron } from '../../components/ListChevron';
import { MascotGuide } from '../../components/MascotGuide';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { ICONS } from '../../theme/icons';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

function ProgressDots({ filled, total }: { filled: number; total: number }) {
  const { theme } = useTheme();
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i < filled ? theme.colors.success : theme.colors.primaryMuted,
              opacity: i < filled ? 1 : 0.35,
            },
          ]}
        />
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const { theme, bodyFontFamily, bodyFonts } = useTheme();
  const childProfile = useAppStore((s) => s.childProfile);
  const coins = useAppStore((s) => s.coins);
  const books = useAppStore((s) => s.books);
  const goalRewardId = useAppStore((s) => s.goalRewardId);
  const parentRewards = useAppStore((s) => s.parentRewards);
  const continueBookId = useAppStore((s) => s.continueBookId);

  const goal = parentRewards.find((r) => r.id === goalRewardId);
  const progress = goal ? Math.min(coins / goal.cost, 1) : 0;
  const continueBook = books.find((b) => b.id === continueBookId);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }} />
            <CoinBadge amount={coins} showLabel />
          </View>

          <MascotGuide
            pose="wave"
            size={mascotSize.large}
            speech={`Hi, ${childProfile?.name ?? 'reader'}! Ready for a quiz?`}
          />

          {continueBook ?
            <Pressable
              onPress={() =>
                router.push({ pathname: '/quiz/confirm', params: { bookId: continueBook.id } })
              }
              style={[styles.heroCard, { backgroundColor: theme.colors.infoBg, borderColor: theme.colors.info }]}
            >
              <Text style={[styles.heroLabel, { color: theme.colors.info, fontFamily: bodyFonts.semibold }]}>
                Today
              </Text>
              <ProgressDots filled={continueBook.lastScore ?? 0} total={5} />
              <View style={styles.heroRow}>
                <View style={styles.heroText}>
                  <Text
                    numberOfLines={2}
                    style={{ color: theme.colors.info, fontFamily: bodyFonts.bold, fontSize: type.bodyLg }}
                  >
                    Continue: {continueBook.title}
                  </Text>
                  <View style={styles.heroAction}>
                    <Text style={{ color: theme.colors.info, fontFamily: bodyFontFamily, fontSize: type.caption }}>
                      Take quiz
                    </Text>
                    <ListChevron size={16} color={theme.colors.info} />
                  </View>
                </View>
                <BookCover
                  coverSource={continueBook.coverSource}
                  coverAccent={continueBook.coverAccent}
                  size="sm"
                />
              </View>
            </Pressable>
          : null}

          {goal ?
            <View
              style={[
                styles.coinCard,
                { backgroundColor: theme.colors.warningBg, borderColor: theme.colors.warningBorder },
              ]}
            >
              <Text style={[styles.coinAmt, { color: theme.colors.warning, fontFamily: bodyFonts.bold }]}>
                {goal.cost - coins > 0 ?
                  `${goal.cost - coins} coins until ${goal.title}`
                : `Ready for ${goal.title}!`}
              </Text>
              <View style={[styles.bar, { backgroundColor: theme.colors.warningBorder, opacity: 0.35 }]}>
                <View
                  style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: theme.colors.warning }]}
                />
              </View>
            </View>
          : null}

          <Text style={[styles.section, { color: theme.colors.textSecondary, fontFamily: bodyFonts.semibold }]}>
            Recent books
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shelf}>
            {books.slice(0, 4).map((b) => (
              <Pressable
                key={b.id}
                onPress={() => router.push({ pathname: '/quiz/confirm', params: { bookId: b.id } })}
                style={[styles.book, { backgroundColor: theme.colors.surface }]}
              >
                <BookCover coverSource={b.coverSource} coverAccent={b.coverAccent} size="md" />
                <Text
                  numberOfLines={2}
                  style={{
                    color: theme.colors.text,
                    fontFamily: bodyFontFamily,
                    fontSize: type.caption,
                    textAlign: 'center',
                  }}
                >
                  {b.title}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => router.push('/quiz/search')}
              style={[styles.book, styles.add, { backgroundColor: theme.colors.successBg }]}
            >
              <AppIcon name={ICONS.add} size={32} color={theme.colors.success} />
              <Text style={{ color: theme.colors.success, fontFamily: bodyFontFamily, fontSize: type.caption }}>
                Add book
              </Text>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100, gap: 16, overflow: 'visible' },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  heroCard: { padding: 18, borderRadius: 16, borderWidth: 1, gap: 10 },
  heroLabel: { fontSize: type.section, textTransform: 'uppercase', letterSpacing: 0.5 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroText: { flex: 1, gap: 6 },
  heroAction: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  coinCard: { padding: 16, borderRadius: 14, borderWidth: 1, gap: 10 },
  coinAmt: { fontSize: type.body },
  bar: { width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%' },
  section: { fontSize: type.label },
  shelf: { flexGrow: 0 },
  book: {
    width: 108,
    padding: 10,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
    gap: 8,
  },
  add: { justifyContent: 'center', minHeight: 148 },
});
