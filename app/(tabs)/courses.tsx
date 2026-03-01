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

const PAGE_LIMIT = 10;

export default function CoursesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts(true);
  }, []);

  const loadProducts = async (reset = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const currentPage = reset ? 1 : page;
      const { data, nextPage } = await getRandomProducts(
        currentPage,
        PAGE_LIMIT
      );

      if (reset) {
        setProducts(data);
        setPage(2);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }

      setHasNextPage(nextPage);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts(true);
  };

  const filteredProducts = products.filter((p) =>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Courses</Text>
        <Text style={styles.subTitle}>
          Learn something new today 🚀
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search courses..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onEndReached={() => hasNextPage && loadProducts()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              style={{ margin: 20 }}
            />
          ) : null
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
});