import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { useFavorites } from "../../src/context/FavoritesContext";
import { useFavorites } from "../../src/context/FavoritesContext";
import apiClient from "../../src/api/apiClient";
import { Product } from "../../src/services/product.types";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const responses = await Promise.all(
        favorites.map((id) =>
          apiClient.get(`/public/randomproducts/${id}`)
        )
      );

      const data = responses.map((res) => res.data.data);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={70} color="#cbd5e1" />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on courses to add favorites
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const imageUrl = `https://picsum.photos/seed/product-${item.id}/600/400`;

        return (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              contentFit="cover"
            />

            <View style={styles.content}>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <Pressable
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons
                    name="heart"
                    size={22}
                    color="#ef4444"
                  />
                </Pressable>
              </View>

              <Text numberOfLines={2} style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.price}>₹ {item.price}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    backgroundColor: "#f8fafc",
  },

  card: {
    marginTop:20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 190,
  },

  content: {
    padding: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
    color: "#0f172a",
  },

  description: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    lineHeight: 20,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
    marginTop: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#f8fafc",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    color: "#0f172a",
  },

  emptySubtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748b",
  },
});