export type ThemeColors = {
  canvas: string;
  canvasGradientEnd: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  primary: string;
  primaryMuted: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  warningBorder: string;
  info: string;
  infoBg: string;
  mascotBg: string;
  mascotText: string;
  border: string;
  cardShadow: string;
  incorrect: string;
  correct: string;
  correctBg: string;
};

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const lightTheme: Theme = {
  colors: {
    canvas: '#FDF6EE',
    canvasGradientEnd: '#F5F0FF',
    surface: '#FFFFFF',
    surfaceMuted: '#F7F4EF',
    text: '#1A1A2E',
    textSecondary: '#7A8094',
    textInverse: '#FFFFFF',
    primary: '#704ADD',
    primaryMuted: '#916AFF',
    success: '#00A040',
    successBg: '#E6F6EC',
    warning: '#D97706',
    warningBg: '#FFF4E6',
    warningBorder: '#FBBF24',
    info: '#01649C',
    infoBg: '#E6F2F9',
    mascotBg: '#EEEDFE',
    mascotText: '#3C3489',
    border: 'rgba(26, 26, 46, 0.08)',
    cardShadow: 'rgba(26, 26, 46, 0.08)',
    incorrect: '#B24A5F',
    correct: '#00A040',
    correctBg: '#E6F6EC',
  },
  spacing,
  radius,
};

export const darkTheme: Theme = {
  colors: {
    canvas: '#1A1025',
    canvasGradientEnd: '#2D1F4E',
    surface: '#2A2340',
    surfaceMuted: '#352D52',
    text: '#EFF0F2',
    textSecondary: '#A8ADB8',
    textInverse: '#1A1A2E',
    primary: '#916AFF',
    primaryMuted: '#BDA6FF',
    success: '#66C68C',
    successBg: '#1A3D28',
    warning: '#FBBF24',
    warningBg: '#3D2E14',
    warningBorder: '#D97706',
    info: '#66AED7',
    infoBg: '#1A2F45',
    mascotBg: '#3C3489',
    mascotText: '#E9E1FF',
    border: 'rgba(255, 255, 255, 0.1)',
    cardShadow: 'rgba(0, 0, 0, 0.35)',
    incorrect: '#DFA1AE',
    correct: '#66C68C',
    correctBg: '#1A3D28',
  },
  spacing,
  radius,
};

export type ThemeMode = 'light' | 'dark' | 'system';
