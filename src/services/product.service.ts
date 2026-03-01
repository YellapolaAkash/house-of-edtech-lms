
import apiClient from "../api/apiClient";
import { Product } from "../types/product.types";

interface RandomProductsResponse {
  data: {
    data: Product[];
    nextPage: boolean;
  };
}

export const getRandomProducts = async (
  page: number,
  limit: number
): Promise<{ data: Product[]; nextPage: boolean }> => {
  const response = await apiClient.get<RandomProductsResponse>(
    `/public/randomproducts?page=${page}&limit=${limit}`
  );

  return {
    data: response.data.data.data,
    nextPage: response.data.data.nextPage,
  };
};
