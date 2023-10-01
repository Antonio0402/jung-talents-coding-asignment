import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductBySlug } from "../api/productApi";

const filterProductsPrice = (data: Product[] | undefined) => {
  if (data?.length && data[0].product_id) {
    return data.map(product => ({
      ...product,
      price: product.price.slice(1)
    }))
  } return data
}

const filterProductPrice = (data: Product | undefined) => {
  if (data && data.product_id) {
    return ({
      ...data,
      price: data.price.slice(1)
    })
  } return data
}

export const useProducts = () => useQuery({
  queryKey: ["products"],
  queryFn: getAllProducts,
  staleTime: 30 * 1000,
  select: filterProductsPrice,
  keepPreviousData: true,
  suspense: true
})

export const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: () => getProductBySlug(slug),
  select: filterProductPrice,
  keepPreviousData: true,
  enabled: Boolean(slug),
  suspense: true,
})