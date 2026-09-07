import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  iconFocused: IoniconsName;
}

const TABS: TabConfig[] = [
  { name: 'index',   title: 'Home',    icon: 'home-outline',    iconFocused: 'home'    },
  { name: 'sermons', title: 'Sermons', icon: 'headset-outline', iconFocused: 'headset' },
  { name: 'events',  title: 'Events',  icon: 'calendar-outline',iconFocused: 'calendar'},
  { name: 'live',    title: 'Live',    icon: 'radio-outline',   iconFocused: 'radio'   },
  { name: 'profile', title: 'Profile', icon: 'person-outline',  iconFocused: 'person'  },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          marginTop: 2,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={22}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
