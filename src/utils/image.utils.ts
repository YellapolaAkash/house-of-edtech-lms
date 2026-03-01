// src/utils/image.utils.ts
import { Product } from "../services/product.types";

export function resolveProductImage(product: Product): string {

  if (product.thumbnail && product.thumbnail.startsWith("http")) {
    return product.thumbnail;
  }


  if (product.images && product.images.length > 0) {
    const firstImage = product.images[0];
    if (firstImage.startsWith("http")) {
      return firstImage;
    }
  }


  return "https://picsum.photos/600/400";
}