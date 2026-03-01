// src/utils/productImage.ts
import { Product } from "../services/product.types";

export function resolveProductImage(product: Product): string {
  if (product.thumbnail?.startsWith("http")) {
    return product.thumbnail;
  }

  if (product.images?.length > 0) {
    return product.images[0];
  }

  return "https://picsum.photos/600/400";
}   