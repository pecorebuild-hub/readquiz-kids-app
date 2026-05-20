import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppIcon } from '../../components/icons/AppIcon';
import type { IoniconName } from '../../theme/icons';
import { TAB_ICONS } from '../../theme/icons';
import { useTheme } from '../../theme/ThemeContext';

function TabIcon({ name, focused }: { name: IoniconName; focused: boolean }) {
  const { theme } = useTheme();
  const color = focused ? theme.colors.textInverse : theme.colors.textSecondary;

  if (focused) {
    return (
      <View style={[styles.activePill, { backgroundColor: theme.colors.primary }]}>
        <AppIcon name={name} size={22} color={color} />
      </View>
    );
  }

  return <AppIcon name={name} size={22} color={color} />;
}

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 16,
          marginBottom: 12,
          borderRadius: 24,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          height: 64,
          shadowColor: theme.colors.cardShadow,
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name={TAB_ICONS.home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shelf"
        options={{
          title: 'Shelf',
          tabBarIcon: ({ focused }) => <TabIcon name={TAB_ICONS.shelf} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon name={TAB_ICONS.shop} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name={TAB_ICONS.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activePill: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
