import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CoinBadge } from '../../components/CoinBadge';
import { AppIcon } from '../../components/icons/AppIcon';
import { MascotGuide } from '../../components/MascotGuide';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

export default function ShopScreen() {
  const { theme, bodyFontFamily, bodyFonts } = useTheme();
  const coins = useAppStore((s) => s.coins);
  const rewards = useAppStore((s) => s.parentRewards);
  const requestRedemption = useAppStore((s) => s.requestRedemption);

  const redeem = (id: string, title: string, cost: number) => {
    if (coins < cost) return;
    requestRedemption(id);
    Alert.alert('Demo', `Request sent to parent for "${title}" (prototype)`);
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <MascotGuide pose="cheer" size={mascotSize.medium} speech="Save coins for awesome rewards!" />
          <CoinBadge amount={coins} showLabel />
          <Text style={[styles.sub, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
            Rewards from Mom & Dad
          </Text>
          {rewards.map((r) => {
            const can = coins >= r.cost;
            const almost = coins >= r.cost * 0.6 && !can;
            return (
              <View
                key={r.id}
                style={[
                  styles.reward,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: can ? theme.colors.primary : theme.colors.border,
                    borderWidth: can ? 2 : 1,
                  },
                ]}
              >
                <AppIcon
                  name={r.icon}
                  size={28}
                  color={theme.colors.primary}
                  circleBg={theme.colors.mascotBg}
                  circleSize={52}
                />
                <View style={styles.rewardText}>
                  <Text style={{ color: theme.colors.text, fontFamily: bodyFonts.semibold, fontSize: type.bodyLg }}>
                    {r.title}
                  </Text>
                  <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.caption }}>
                    {almost ? `Almost! ${r.cost - coins} more coins` : 'From your parents'}
                  </Text>
                </View>
                <Pressable
                  onPress={() => redeem(r.id, r.title, r.cost)}
                  style={[
                    styles.redeemBtn,
                    { backgroundColor: can ? theme.colors.primary : theme.colors.surfaceMuted },
                  ]}
                >
                  <View style={styles.redeemInner}>
                    <AppIcon
                      name="cash"
                      size={16}
                      color={can ? theme.colors.textInverse : theme.colors.textSecondary}
                    />
                    <Text
                      style={{
                        color: can ? theme.colors.textInverse : theme.colors.textSecondary,
                        fontFamily: bodyFonts.semibold,
                        fontSize: type.body,
                      }}
                    >
                      {r.cost}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          })}
          <Text style={[styles.hint, { color: theme.colors.textSecondary, fontFamily: bodyFontFamily }]}>
            Redeem together with parents (prototype)
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100, gap: 12, alignItems: 'center', overflow: 'visible' },
  sub: { fontSize: type.label, alignSelf: 'flex-start' },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  rewardText: { flex: 1 },
  redeemBtn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  redeemInner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hint: { fontSize: type.caption, textAlign: 'center', marginTop: 8 },
});
