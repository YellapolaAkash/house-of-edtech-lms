// import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
// import { useEnroll } from "../../src/context/EnrollContext";
// import { useFavorites } from "../../src/context/FavoritesContext";
// import { useRouter } from "expo-router";
// import { useAuthStore } from "../../src/store/auth.store";

// export default function ProfileScreen() {
//   const { enrolled } = useEnroll();
//   const { favorites } = useFavorites();
//   const router = useRouter();

//   const logout = useAuthStore((state) => state.logout);

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>U</Text>
//         </View>
//         <Text style={styles.name}>Welcome Back 👋</Text>
//         <Text style={styles.email}>user@email.com</Text>
//       </View>

//       {/* STATS SECTION */}
//       <View style={styles.statsContainer}>
//         <Pressable
//           style={styles.statCard}
//           onPress={() => router.push("/my-courses")}
//         >
//           <Text style={styles.statNumber}>{enrolled.length}</Text>
//           <Text style={styles.statLabel}>Enrolled</Text>
//         </Pressable>

//         <Pressable
//           style={styles.statCard}
//           onPress={() => router.push("/(tabs)/favorites")}
//         >
//           <Text style={styles.statNumber}>{favorites.length}</Text>
//           <Text style={styles.statLabel}>Favorites</Text>
//         </Pressable>
//       </View>

//       {/* LOGOUT BUTTON */}
//       <Pressable
//         style={styles.logoutButton}
//         // onPress={async () => {
//         //   await logout();
//         //   router.replace("/(auth)/login");
//         // }}
//         onPress={async () => {
//   await logout();
// }}
//       >
//         <Text style={styles.logoutText}>Logout</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f7fb",
//     paddingHorizontal: 20,
//   },

//   header: {
//     alignItems: "center",
//     marginTop: 40,
//   },

//   avatar: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: "#2563eb",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   avatarText: {
//     color: "#fff",
//     fontSize: 36,
//     fontWeight: "bold",
//   },

//   name: {
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   email: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },

//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 40,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     paddingVertical: 30,
//     marginHorizontal: 8,
//     borderRadius: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },

//   statNumber: {
//     fontSize: 30,
//     fontWeight: "800",
//     color: "#2563eb",
//   },

//   statLabel: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#555",
//   },

//   logoutButton: {
//     marginTop: 50,
//     backgroundColor: "#ef4444",
//     paddingVertical: 14,
//     borderRadius: 20,
//     alignItems: "center",
//   },

//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
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
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.name}>Welcome Back 👋</Text>
        <Text style={styles.email}>user@email.com</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <Pressable
          style={styles.statCard}
          onPress={() => router.push("/(tabs)/courses")}
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

      {/* LOGOUT BUTTON */}
      <Pressable
        style={styles.logoutButton}
        onPress={async () => {
          // clear token and reset auth state
          await logout();
          // redirect to login screen – the AuthWrapper in the root layout will
          // also take care of redirects, but forcing navigation prevents the
          // user from seeing the profile screen briefly and avoids going back
          // with hardware back button.
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