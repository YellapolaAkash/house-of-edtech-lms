// // import apiClient from "../lib/apiClient";
// import apiClient from "../api/apiClient";
// import { Product } from "../types/product.types";

// interface RandomProductsResponse {
//   data: Product[];
//   nextPage: boolean;
// }

// export const getRandomProducts = async (
//   page: number,
//   limit: number
// ): Promise<RandomProductsResponse> => {
//   const response = await apiClient.get(
//     `/public/randomproducts?page=${page}&limit=${limit}`
//   );

//   return {
//     data: response.data.data.data,
//     nextPage: response.data.data.nextPage,
//   };
// };
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
// import apiClient from "../api/apiClient";
// import { Product } from "./product.types";

// interface ProductsResponse {
//   data: {
//     data: Product[];
//     page: number;
//     totalPages: number;
//     nextPage: boolean;
//   };
// }

// export const getProducts = async (
//   page: number,
//   limit: number
// ): Promise<{ data: Product[]; nextPage: boolean }> => {
//   const response = await apiClient.get<ProductsResponse>(
//     `/public/products?page=${page}&limit=${limit}`
//   );
//   console.log(response,"response response response response")

//   return {
//     data: response.data.data.data,
//     nextPage: response.data.data.nextPage,
//   };
// };