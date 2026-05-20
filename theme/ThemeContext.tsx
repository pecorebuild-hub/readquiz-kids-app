import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { darkTheme, lightTheme, type Theme, type ThemeMode } from './tokens';
import {
  DEFAULT_BODY_FONT_KEY,
  DEFAULT_FONT_KEY,
  KID_FONTS,
  getBodyFonts,
  isBodyFontKey,
  isKidFontKey,
  type BodyFontKey,
  type BodyFontSet,
  type KidFontKey,
} from './fonts';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  bodyFontKey: BodyFontKey;
  setBodyFontKey: (key: BodyFontKey) => void;
  bodyFonts: BodyFontSet;
  fontKey: KidFontKey;
  setFontKey: (key: KidFontKey) => void;
  bodyFontFamily: string;
  headingFontFamily: string;
  /** @deprecated Use `bodyFontFamily` or `headingFontFamily`. */
  fontFamily: string;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useAppStore((s) => s.settings.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const bodyFontKey = useAppStore((s) => s.settings.bodyFontKey);
  const setBodyFontKey = useAppStore((s) => s.setBodyFontKey);
  const fontKey = useAppStore((s) => s.settings.fontKey);
  const setFontKey = useAppStore((s) => s.setFontKey);
  const systemScheme = useColorScheme();

  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const theme = isDark ? darkTheme : lightTheme;
  const resolvedBodyKey = isBodyFontKey(bodyFontKey) ? bodyFontKey : DEFAULT_BODY_FONT_KEY;
  const bodyFonts = getBodyFonts(resolvedBodyKey);
  const bodyFontFamily = bodyFonts.regular;
  const resolvedHeadingKey = isKidFontKey(fontKey) ? fontKey : DEFAULT_FONT_KEY;
  const headingFontFamily = KID_FONTS[resolvedHeadingKey].label;

  const value = useMemo(
    () => ({
      theme,
      isDark,
      themeMode,
      setThemeMode,
      bodyFontKey: resolvedBodyKey,
      setBodyFontKey,
      bodyFonts,
      fontKey: resolvedHeadingKey,
      setFontKey,
      bodyFontFamily,
      headingFontFamily,
      fontFamily: bodyFontFamily,
    }),
    [
      theme,
      isDark,
      themeMode,
      setThemeMode,
      resolvedBodyKey,
      setBodyFontKey,
      bodyFonts,
      resolvedHeadingKey,
      setFontKey,
      bodyFontFamily,
      headingFontFamily,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
