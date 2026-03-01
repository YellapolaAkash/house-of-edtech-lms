import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Product } from "../../src/services/product.types";
import apiClient from "../../src/api/apiClient";
import { useFavorites } from "../../src/context/FavoritesContext";
import { useEnroll } from "../../src/context/EnrollContext";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { favorites, toggleFavorite } = useFavorites();
  const { enrollCourse, isEnrolled } = useEnroll();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const numericId = Number(id);
  const isFav = favorites.includes(numericId);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(
        `/public/randomproducts/${id}`
      );
      setProduct(response.data.data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // ✅ Enroll status (MUST be after product check)
  const enrolled = isEnrolled(product.id);

  const imageUrl = `https://picsum.photos/seed/product-${product.id}/800/600`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
          />

          {/* Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={{ fontSize: 18 }}>←</Text>
          </Pressable>

          {/* Favorite Button */}
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(product.id)}
          >
            <Text style={{ fontSize: 20 }}>
              {isFav ? "❤️" : "🤍"}
            </Text>
          </Pressable>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.rating}>⭐ 4.5 • 120 Reviews</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.category || "General"}
            </Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.price}>₹ {product.price}</Text>
            <Text style={styles.originalPrice}>
              ₹ {product.price + 999}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.description}>
            {product.description}
          </Text>

          {/* ✅ ENROLL BUTTON */}
          <Pressable
            style={[
              styles.ctaButton,
              enrolled && { backgroundColor: "#9ca3af" },
            ]}
            disabled={enrolled}
            onPress={() => {
              enrollCourse(product.id);
              Alert.alert(
                "Enrollment Successful 🎉",
                "You are now enrolled in this course."
              );
            }}
          >
            <Text style={styles.ctaText}>
              {enrolled ? "Enrolled ✅" : "Enroll Now"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 350,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 22,
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },

  rating: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  badgeText: {
    color: "#3f51b5",
    fontSize: 12,
    textTransform: "capitalize",
  },

  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e88e5",
  },

  originalPrice: {
    marginLeft: 12,
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },

  ctaButton: {
    marginTop: 30,
    backgroundColor: "#1e88e5",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});