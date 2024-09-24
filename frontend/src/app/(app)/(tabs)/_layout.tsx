// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Example icon library
import { Icon } from "react-native-elements/dist/icons/Icon";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "transparent",
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "GT-America-Standard-Regular",
          fontSize: 12,
        },
        tabBarActiveTintColor: "#FF462D",
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <Icon type="material" name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => <Icon type="material-community" name="compass-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => <Icon type="material" name="bookmark" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Icon type="material-community" name="account" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
