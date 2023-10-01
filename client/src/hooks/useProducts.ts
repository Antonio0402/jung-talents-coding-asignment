import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductBySlug } from "../api/productApi";

export const useProducts = () => useQuery({
  queryKey: ["products"],
  queryFn: getAllProducts,
  staleTime: 30 * 1000,
  keepPreviousData: true,
  suspense: true
})

export const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: () => getProductBySlug(slug),
  keepPreviousData: true,
  enabled: Boolean(slug),
  suspense: true,
})