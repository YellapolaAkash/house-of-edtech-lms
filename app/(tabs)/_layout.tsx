import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../src/context/FavoritesContext";

export default function TabsLayout() {
   const { favorites } = useFavorites();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "My Learning",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
     <Tabs.Screen
  name="favorites"
  options={{
    title: "Favorites",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="heart-outline" color={color} size={size} />
    ),
    tabBarBadge:
      favorites.length > 0 ? favorites.length : undefined,
  }}
/>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
     
    </Tabs>
  );
}