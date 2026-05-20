import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../components/icons/AppIcon';
import { MascotGuide } from '../../components/MascotGuide';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { ICONS } from '../../theme/icons';
import { mascotSize, type } from '../../theme/typography';
import { useTheme } from '../../theme/ThemeContext';

const DEMO_PIN = '1234';

export default function ParentScreen() {
  const { theme, bodyFontFamily, bodyFonts } = useTheme();
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const childProfile = useAppStore((s) => s.childProfile);
  const coins = useAppStore((s) => s.coins);
  const books = useAppStore((s) => s.books);
  const rewards = useAppStore((s) => s.parentRewards);
  const pending = useAppStore((s) => s.pendingRedemption);
  const clearPending = useAppStore((s) => s.clearPendingRedemption);

  if (!unlocked) {
    return (
      <ScreenBackground>
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.lockScroll}>
            <Pressable onPress={() => router.back()} style={styles.back}>
              <View style={styles.backRow}>
                <AppIcon name={ICONS.chevronBack} size={20} color={theme.colors.primary} />
                <Text style={{ color: theme.colors.primary, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>
                  Back
                </Text>
              </View>
            </Pressable>
            <MascotGuide pose="thinking" size={mascotSize.medium} speech="Parents only! Enter your PIN." />
            <Text style={[styles.title, { color: theme.colors.text, fontFamily: bodyFonts.bold }]}>
              Parent section
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
              Enter PIN (demo: 1234)
            </Text>
            <TextField
              value={pin}
              onChangeText={setPin}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
              style={styles.pinInput}
            />
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title="Unlock"
              large
              onPress={() => {
                if (pin === DEMO_PIN) setUnlocked(true);
                else Alert.alert('Wrong PIN', 'Try 1234 for this prototype');
              }}
            />
          </View>
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text, fontFamily: bodyFonts.bold }]}>
            Parent dashboard
          </Text>
          <Pressable onPress={() => router.back()}>
            <Text style={{ color: theme.colors.primary, fontFamily: bodyFontFamily, fontSize: type.bodyLg }}>Exit</Text>
          </Pressable>
        </View>
        <View style={[styles.summary, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontFamily: bodyFonts.semibold, fontSize: type.bodyLg }}>
            {childProfile?.name ?? 'Child'} · {childProfile?.age ?? '?'} years
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
            {coins} coins · {books.length} books
          </Text>
        </View>
        {pending ?
          <View style={[styles.pending, { backgroundColor: theme.colors.warningBg }]}>
            <Text style={{ color: theme.colors.warning, fontFamily: bodyFontFamily, fontSize: type.body }}>
              {childProfile?.name} wants: {pending.rewardTitle} ({pending.cost} coins)
            </Text>
            <View style={styles.pendingActions}>
              <Button
                title="Approve"
                onPress={() => {
                  clearPending();
                  Alert.alert('Approved', 'Demo only — coins not deducted');
                }}
              />
              <Button title="Decline" variant="secondary" onPress={clearPending} />
            </View>
          </View>
        : null}
        <Text style={[styles.section, { color: theme.colors.textSecondary, fontFamily: bodyFonts.semibold }]}>
          Rewards (prototype)
        </Text>
        {rewards.map((r) => (
          <View key={r.id} style={[styles.rewardRow, { borderColor: theme.colors.border }]}>
            <AppIcon
              name={r.icon}
              size={22}
              color={theme.colors.primary}
              circleBg={theme.colors.mascotBg}
              circleSize={44}
            />
            <Text style={{ color: theme.colors.text, fontFamily: bodyFontFamily, fontSize: type.bodyLg, flex: 1 }}>
              {r.title}
            </Text>
            <View style={styles.costRow}>
              <AppIcon name={ICONS.coin} size={16} color={theme.colors.textSecondary} />
              <Text style={{ color: theme.colors.textSecondary, fontFamily: bodyFontFamily, fontSize: type.body }}>
                {r.cost}
              </Text>
            </View>
          </View>
        ))}
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 16, gap: 12 },
  lockScroll: { gap: 14, overflow: 'visible', paddingBottom: 16 },
  footer: { paddingTop: 8 },
  back: { marginBottom: 4 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  title: { fontSize: type.screenTitle },
  pinInput: {
    fontSize: 36,
    textAlign: 'center',
    letterSpacing: 12,
    paddingVertical: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summary: { padding: 18, borderRadius: 14, borderWidth: 1, gap: 6 },
  pending: { padding: 16, borderRadius: 14, gap: 12 },
  pendingActions: { flexDirection: 'row', gap: 8 },
  section: { fontSize: type.label, marginTop: 8 },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  costRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
