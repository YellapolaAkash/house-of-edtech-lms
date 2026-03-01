
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import apiClient from "../src/api/apiClient";
import { useEnroll } from "../src/context/EnrollContext";
import { Product } from "../src/services/product.types";

export default function MyCoursesScreen() {
  const { enrolled } = useEnroll();
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading your courses...</Text>
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No Courses Enrolled 😔</Text>
        <Text style={styles.emptyText}>
          You haven't enrolled in any courses yet. Explore and start learning today!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 20 }}
      data={courses}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description || "No description available."}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.price}>₹ {item.price}</Text>
            <Text style={styles.enrolledLabel}>Enrolled</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },
  enrolledLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
    backgroundColor: "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});