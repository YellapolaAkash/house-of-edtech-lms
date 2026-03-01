import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
  Pressable,
  TextInput,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Product } from "../../src/services/product.types";
import { getRandomProducts } from "../../src/services/product.service";
import { useFavorites } from "../../src/context/FavoritesContext";
import { useEnroll } from "../../src/context/EnrollContext";

const PAGE_LIMIT = 50;

export default function EnrolledScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const { enrolled } = useEnroll();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async (reset = false) => {
    setLoading(true);
    try {
      const { data } = await getRandomProducts(1, PAGE_LIMIT);
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAllProducts(true);
  };


  const enrolledProducts = allProducts.filter((p) =>
    enrolled.includes(p.id)
  );
  
  const filteredProducts = enrolledProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => {
      const thumbnail = `https://picsum.photos/seed/product-${item.id}/500/300`;
      const isFav = favorites.includes(item.id);

      return (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/product/${item.id}`)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: thumbnail }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />

            <Pressable
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={{ fontSize: 20 }}>
                {isFav ? "❤️" : "🤍"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>

            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>

            <View style={styles.footer}>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>
                  ₹ {item.price}
                </Text>
              </View>

              <Text style={styles.category}>
                {item.category || "General"}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [router, favorites]
  );

  if (loading && allProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Enrolled Courses</Text>
        <Text style={styles.subTitle}>
          {enrolledProducts.length} course{enrolledProducts.length !== 1 ? "s" : ""} enrolled 📚
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search enrolled courses..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {enrolledProducts.length === 0
              ? "No enrolled courses yet"
              : "No results found"}
          </Text>
          {enrolledProducts.length === 0 && (
            <Pressable
              style={styles.exploreButton}
              onPress={() => router.push("/(tabs)/courses")}
            >
              <Text style={styles.exploreButtonText}>
                Explore Courses
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },

  subTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    fontSize: 14,
    elevation: 2,
  },

  list: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginBottom: 24,
    overflow: "hidden",
    elevation: 6,
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 200,
  },

  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  description: {
    fontSize: 13,
    color: "#777",
    marginTop: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  priceTag: {
    backgroundColor: "#1e88e5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  priceText: {
    color: "#fff",
    fontWeight: "700",
  },

  category: {
    fontSize: 12,
    color: "#555",
    textTransform: "capitalize",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  exploreButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },

  exploreButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
