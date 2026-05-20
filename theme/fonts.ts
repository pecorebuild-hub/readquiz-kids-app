import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export const BODY_FONT_KEYS = ['inter', 'nunito'] as const;
export type BodyFontKey = (typeof BODY_FONT_KEYS)[number];

export type BodyFontSet = {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
};

export const BODY_FONTS: Record<BodyFontKey, BodyFontSet> = {
  inter: {
    regular: 'Inter',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  nunito: {
    regular: 'Nunito',
    medium: 'Nunito-Medium',
    semibold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
  },
};

export const DEFAULT_BODY_FONT_KEY: BodyFontKey = 'inter';

export function isBodyFontKey(key: string): key is BodyFontKey {
  return (BODY_FONT_KEYS as readonly string[]).includes(key);
}

export function getBodyFonts(key: BodyFontKey): BodyFontSet {
  return BODY_FONTS[key];
}

/** Display / heading fonts from project `fonts/` (switchable in Profile). */
export const KID_FONT_KEYS = [
  'capriola',
  'chewy',
  'cherry',
  'coiny',
  'dynapuff',
  'grandstander',
  'kavoon',
  'linotte',
  'margarine',
  'nerko',
  'ribeye',
] as const;

export type KidFontKey = (typeof KID_FONT_KEYS)[number];

export const KID_FONTS: Record<
  KidFontKey,
  { label: string; file: ReturnType<typeof require> }
> = {
  capriola: { label: 'Capriola', file: require('../assets/fonts/Capriola/Capriola-Regular.ttf') },
  chewy: { label: 'Chewy', file: require('../assets/fonts/Chewy/Chewy-Regular.ttf') },
  cherry: {
    label: 'Cherry Bomb',
    file: require('../assets/fonts/Cherry_Bomb_One/CherryBombOne-Regular.ttf'),
  },
  coiny: { label: 'Coiny', file: require('../assets/fonts/Coiny/Coiny-Regular.ttf') },
  dynapuff: {
    label: 'DynaPuff',
    file: require('../assets/fonts/DynaPuff/DynaPuff-Regular.ttf'),
  },
  grandstander: {
    label: 'Grandstander',
    file: require('../assets/fonts/Grandstander/Grandstander-Regular.ttf'),
  },
  kavoon: { label: 'Kavoon', file: require('../assets/fonts/Kavoon/Kavoon-Regular.ttf') },
  linotte: { label: 'Linotte', file: require('../assets/fonts/Linotte/Linotte-Regular.ttf') },
  margarine: {
    label: 'Margarine',
    file: require('../assets/fonts/Margarine/Margarine-Regular.ttf'),
  },
  nerko: { label: 'Nerko One', file: require('../assets/fonts/Nerko_One/NerkoOne-Regular.ttf') },
  ribeye: { label: 'Ribeye', file: require('../assets/fonts/Ribeye/Ribeye-Regular.ttf') },
};

export const DEFAULT_FONT_KEY: KidFontKey = 'linotte';

export function isKidFontKey(key: string): key is KidFontKey {
  return (KID_FONT_KEYS as readonly string[]).includes(key);
}

/** All fonts registered in root `_layout` via `useFonts`. */
export function getAppFontMap(): Record<string, ReturnType<typeof require>> {
  const kid = Object.fromEntries(
    KID_FONT_KEYS.map((key) => [KID_FONTS[key].label, KID_FONTS[key].file]),
  );
  return {
    [BODY_FONTS.inter.regular]: Inter_400Regular,
    [BODY_FONTS.inter.medium]: Inter_500Medium,
    [BODY_FONTS.inter.semibold]: Inter_600SemiBold,
    [BODY_FONTS.inter.bold]: Inter_700Bold,
    [BODY_FONTS.nunito.regular]: require('../assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    [BODY_FONTS.nunito.medium]: require('../assets/fonts/Nunito/static/Nunito-Medium.ttf'),
    [BODY_FONTS.nunito.semibold]: require('../assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
    [BODY_FONTS.nunito.bold]: require('../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    ...kid,
  };
}
