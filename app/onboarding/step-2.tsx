import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MascotGuide } from '../../components/MascotGuide';
import { Button } from '../../components/ui/Button';
import { VoiceTextField } from '../../components/ui/VoiceTextField';
import { ScreenBackground } from '../../components/ui/ScreenBackground';
import { useAppStore } from '../../store/useAppStore';
import { useTheme } from '../../theme/ThemeContext';

const AGES = [5, 6, 7, 8, 9, 10];

export default function OnboardingStep2() {
  const { theme, bodyFonts } = useTheme();
  const setChildProfile = useAppStore((s) => s.setChildProfile);
  const [name, setName] = useState('');
  const [age, setAge] = useState(7);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}>
          <View style={styles.dots}>
            <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
            <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.border }]} />
          </View>

            <MascotGuide pose="wave" size={220} speech="What's your name?" />

          <View style={styles.form}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>
              Your name
            </Text>
            <VoiceTextField
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              voiceDemoValue="Alex"
            />
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: bodyFonts.semibold }]}>
              How old are you?
            </Text>
            <View style={styles.ages}>
              {AGES.map((a) => {
                const selected = age === a;
                return (
                  <Pressable
                    key={a}
                    onPress={() => setAge(a)}
                    style={[
                      styles.ageChip,
                      selected ?
                        {
                          backgroundColor: theme.colors.primary,
                          borderColor: theme.colors.primary,
                        }
                      : {
                          backgroundColor: theme.colors.surface,
                          borderColor: theme.colors.primaryMuted,
                        },
                    ]}
                  >
                    <Text
                      style={{
                        color: selected ? theme.colors.textInverse : theme.colors.text,
                        fontFamily: selected ? bodyFonts.bold : bodyFonts.semibold,
                        fontSize: 20,
                      }}
                    >
                      {a}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Let's go!"
            large
            disabled={!name.trim()}
            onPress={() => {
              setChildProfile(name.trim(), age);
              router.push('/onboarding/step-3');
            }}
          />
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 20,
    paddingBottom: 32,
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  top: { flex: 1, gap: 8, overflow: 'visible' },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 4 },
  dot: { width: 20, height: 4, borderRadius: 2 },
  dotActive: { width: 28 },
  form: { gap: 10, marginTop: 4 },
  label: { fontSize: 16 },
  ages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  ageChip: {
    minWidth: 56,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { paddingTop: 16 },
});
