// src/utils/image.utils.ts
import { Product } from "../services/product.types";

export function resolveProductImage(product: Product): string {
  // 1️⃣ Prefer thumbnail if valid
  if (product.thumbnail && product.thumbnail.startsWith("http")) {
    return product.thumbnail;
  }

  // 2️⃣ Fallback to first image
  if (product.images && product.images.length > 0) {
    const firstImage = product.images[0];
    if (firstImage.startsWith("http")) {
      return firstImage;
    }
  }

  // 3️⃣ Guaranteed fallback (never broken)
  return "https://picsum.photos/600/400";
}