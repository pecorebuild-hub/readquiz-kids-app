import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon } from './icons/AppIcon';
import { ICONS } from '../theme/icons';
import { useTheme } from '../theme/ThemeContext';

export type BookCoverSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZES: Record<BookCoverSize, { w: number; h: number; radius: number }> = {
  sm: { w: 48, h: 64, radius: 8 },
  md: { w: 72, h: 96, radius: 12 },
  lg: { w: 120, h: 160, radius: 14 },
  xl: { w: 168, h: 224, radius: 16 },
};

type Props = {
  coverSource?: ImageSourcePropType;
  coverAccent?: string;
  size?: BookCoverSize;
};

export function BookCover({ coverSource, coverAccent, size = 'md' }: Props) {
  const { theme } = useTheme();
  const dim = SIZES[size];
  const accent = coverAccent ?? theme.colors.primaryMuted;

  return (
    <View
      style={[
        styles.frame,
        {
          width: dim.w + 6,
          height: dim.h + 6,
          borderRadius: dim.radius + 2,
          shadowColor: theme.colors.cardShadow,
        },
      ]}
    >
      <LinearGradient
        colors={[accent, `${accent}CC`]}
        style={[styles.gradient, { borderRadius: dim.radius + 2 }]}
      >
        <View
          style={[
            styles.inner,
            {
              width: dim.w,
              height: dim.h,
              borderRadius: dim.radius,
              backgroundColor: theme.colors.surfaceMuted,
            },
          ]}
        >
          {coverSource ?
            <Image
              source={coverSource}
              style={{ width: dim.w, height: dim.h, borderRadius: dim.radius }}
              resizeMode="cover"
            />
          : <View style={[styles.fallback, { borderRadius: dim.radius }]}>
              <AppIcon
                name={ICONS.book}
                size={size === 'xl' ? 40 : size === 'lg' ? 32 : 22}
                color={accent}
              />
            </View>
          }
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  gradient: {
    flex: 1,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: { overflow: 'hidden' },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
