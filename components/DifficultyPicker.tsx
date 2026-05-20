import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { AppIcon } from './icons/AppIcon';
import { DIFFICULTY_ICONS } from '../theme/icons';
import { type } from '../theme/typography';
import type { ThemeColors } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import type { Difficulty } from '../store/useAppStore';

const OPTIONS: {
  key: Difficulty;
  label: string;
  power: number;
}[] = [
  { key: 'easy', label: 'Easy', power: 1 },
  { key: 'normal', label: 'Normal', power: 2 },
  { key: 'hard', label: 'Hard', power: 3 },
];

type TilePalette = {
  accent: string;
  bg: string;
  bgMuted: string;
  glow: string;
};

function getPalette(key: Difficulty, colors: ThemeColors, isDark: boolean): TilePalette {
  const map: Record<Difficulty, TilePalette> = {
    easy: {
      accent: colors.success,
      bg: isDark ? '#1F4D32' : colors.successBg,
      bgMuted: isDark ? '#1A3D28' : '#F0FAF4',
      glow: 'rgba(0, 160, 64, 0.35)',
    },
    normal: {
      accent: colors.warning,
      bg: isDark ? '#3D2E14' : colors.warningBg,
      bgMuted: isDark ? '#3D2E14' : colors.surface,
      glow: 'rgba(217, 119, 6, 0.35)',
    },
    hard: {
      accent: isDark ? '#F87171' : '#EF4444',
      bg: isDark ? '#4A2020' : '#FECACA',
      bgMuted: isDark ? '#3D1F1F' : '#FFF1F2',
      glow: 'rgba(239, 68, 68, 0.38)',
    },
  };
  return map[key];
}

function tileShadow(selected: boolean, glow: string): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      boxShadow: selected
        ? `0 16px 32px ${glow}, 0 6px 12px rgba(26, 26, 46, 0.1)`
        : '0 4px 14px rgba(26, 26, 46, 0.07)',
    } as ViewStyle;
  }
  return {
    shadowColor: glow,
    shadowOpacity: selected ? 0.5 : 0.08,
    shadowRadius: selected ? 18 : 8,
    shadowOffset: { width: 0, height: selected ? 10 : 3 },
    elevation: selected ? 8 : 2,
  };
}

function PowerMeter({ power, accent, active }: { power: number; accent: string; active: boolean }) {
  return (
    <View style={styles.powerRow}>
      {[1, 2, 3].map((n) => (
        <View
          key={n}
          style={[
            styles.powerDot,
            {
              backgroundColor: n <= power ? accent : `${accent}28`,
              transform: [{ scale: active && n <= power ? 1.15 : 1 }],
            },
          ]}
        />
      ))}
    </View>
  );
}

type TileProps = {
  difficultyKey: Difficulty;
  label: string;
  power: number;
  selected: boolean;
  onSelect: () => void;
  index: number;
};

function DifficultyTile({ difficultyKey, label, power, selected, onSelect, index }: TileProps) {
  const { theme, bodyFonts, headingFontFamily, isDark } = useTheme();
  const palette = getPalette(difficultyKey, theme.colors, isDark);

  const press = useSharedValue(1);
  const lift = useSharedValue(selected ? 1 : 0);
  const enter = useSharedValue(0);

  useEffect(() => {
    enter.value = withDelay(index * 70, withSpring(1, { damping: 14, stiffness: 180 }));
  }, [enter, index]);

  useEffect(() => {
    lift.value = withSpring(selected ? 1 : 0, { damping: 12, stiffness: 260 });
  }, [selected, lift]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: press.value * (0.9 + enter.value * 0.1) },
      { translateY: lift.value * -10 },
    ],
    opacity: 0.5 + enter.value * 0.5,
  }));

  const iconBounce = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + lift.value * 0.12 }],
  }));

  const usesMutedFill = difficultyKey === 'easy' || difficultyKey === 'hard';

  return (
    <Animated.View style={[styles.tileWrap, animatedStyle]}>
      <Pressable
        onPress={onSelect}
        onPressIn={() => {
          press.value = withSpring(0.92, { damping: 16, stiffness: 450 });
        }}
        onPressOut={() => {
          press.value = withSpring(1, { damping: 11, stiffness: 320 });
        }}
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={`${label}, power ${power} of 3`}
        style={[
          styles.tile,
          selected
            ? {
                backgroundColor: palette.bg,
                borderColor: palette.accent,
                borderWidth: 3,
              }
            : {
                backgroundColor: usesMutedFill ? palette.bgMuted : theme.colors.surface,
                borderColor: `${palette.accent}55`,
                borderWidth: 2,
              },
          tileShadow(selected, palette.glow),
        ]}
      >
        {selected ?
          <View style={[styles.selectedPip, { backgroundColor: palette.accent }]} />
        : null}
        <Animated.View
          style={[
            styles.iconWrap,
            { backgroundColor: `${palette.accent}18` },
            iconBounce,
          ]}
        >
          <AppIcon
            name={DIFFICULTY_ICONS[difficultyKey]}
            size={30}
            color={palette.accent}
          />
        </Animated.View>
        <Text
          style={[
            styles.label,
            {
              color: selected ? palette.accent : theme.colors.text,
              fontFamily: selected ? bodyFonts.bold : headingFontFamily,
            },
          ]}
        >
          {label}
        </Text>
        <PowerMeter power={power} accent={palette.accent} active={selected} />
      </Pressable>
    </Animated.View>
  );
}

type Props = {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
};

export function DifficultyPicker({ value, onChange }: Props) {
  const { bodyFonts, theme } = useTheme();
  const selectedPower = OPTIONS.find((o) => o.key === value)?.power ?? 2;

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        {OPTIONS.map((d, index) => (
          <DifficultyTile
            key={d.key}
            difficultyKey={d.key}
            label={d.label}
            power={d.power}
            selected={value === d.key}
            onSelect={() => onChange(d.key)}
            index={index}
          />
        ))}
      </View>
      <Text style={[styles.caption, { color: theme.colors.textSecondary, fontFamily: bodyFonts.semibold }]}>
        Quiz power: {selectedPower}/3
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { width: '100%', gap: 10, overflow: 'visible' },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    overflow: 'visible',
  },
  tileWrap: {
    flex: 1,
    aspectRatio: 1,
    overflow: 'visible',
  },
  tile: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  selectedPip: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: type.body,
    fontWeight: '700',
    textAlign: 'center',
  },
  powerRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 2,
  },
  powerDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  caption: {
    fontSize: type.caption,
    textAlign: 'center',
  },
});
