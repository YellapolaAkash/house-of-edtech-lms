
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useEnroll } from "../../src/context/EnrollContext";
import { useFavorites } from "../../src/context/FavoritesContext";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";

export default function ProfileScreen() {
  const { enrolled } = useEnroll();
  const { favorites } = useFavorites();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.name}>Welcome Back 👋</Text>
        <Text style={styles.email}>user@email.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <Pressable
          style={styles.statCard}
          onPress={() => router.push("/(tabs)/enrolled")}
        >
          <Text style={styles.statNumber}>{enrolled.length}</Text>
          <Text style={styles.statLabel}>Enrolled</Text>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() => router.push("/(tabs)/favorites")}
        >
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={async () => {
          await logout();

          router.replace("/auth/login");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    marginHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2563eb",
  },

  statLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },

  logoutButton: {
    marginTop: 50,
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});