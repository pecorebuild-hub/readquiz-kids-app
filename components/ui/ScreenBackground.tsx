import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export function ScreenBackground({ children, style, ...rest }: ViewProps) {
  const { theme } = useTheme();
  return (
    <View style={[styles.flex, style]} {...rest}>
      <LinearGradient
        colors={[theme.colors.canvas, theme.colors.canvasGradientEnd]}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
