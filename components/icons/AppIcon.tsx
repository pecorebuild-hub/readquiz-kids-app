import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import type { IoniconName } from '../../theme/icons';

type Props = {
  name: IoniconName;
  size?: number;
  color: string;
  circleBg?: string;
  circleSize?: number;
  style?: ViewStyle;
};

export function AppIcon({
  name,
  size = 22,
  color,
  circleBg,
  circleSize,
  style,
}: Props) {
  if (circleBg) {
    const dim = circleSize ?? size + 16;
    return (
      <View
        style={[
          styles.circle,
          { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: circleBg },
          style,
        ]}
      >
        <Ionicons name={name} size={size} color={color} />
      </View>
    );
  }

  return (
    <View style={style}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
