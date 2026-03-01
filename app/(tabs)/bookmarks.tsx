// import { View, Text } from "react-native";

// export default function BookmarksScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Bookmarks</Text>
//     </View>
//   );
// }
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import apiClient from "../../src/api/apiClient";
import { useEnroll } from "../../src/context/EnrollContext";
import { Product } from "../../src/services/product.types";
import { useRouter } from "expo-router";

export default function MyLearningScreen() {
  const { enrolled } = useEnroll();
  const router = useRouter();

  const [courses, setCourses] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [enrolled]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const responses = await Promise.all(
        enrolled.map((id) =>
          apiClient.get(`/public/randomproducts/${id}`)
        )
      );

      const data = responses.map((res) => res.data.data);
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
    } finally {
      setLoading(false);
    }
  };

  if (enrolled.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyTitle}>📚 No courses yet</Text>
        <Text style={styles.emptySub}>
          Enroll in a course to start learning.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const imageUrl = `https://picsum.photos/seed/product-${item.id}/600/400`;
          const progress = Math.floor(Math.random() * 80) + 10; // fake progress

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                contentFit="cover"
              />

              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>

                {/* Progress Bar */}
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress}%` },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {progress}% completed
                </Text>

                <Pressable
                  style={styles.button}
                  onPress={() =>
                    router.push(`/product/${item.id}`)
                  }
                >
                  <Text style={styles.buttonText}>
                    Continue Learning
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  emptySub: {
    marginTop: 8,
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 24,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginTop: 12,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },

  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: "#555",
  },

  button: {
    marginTop: 14,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});