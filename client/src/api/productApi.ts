import axios, { AxiosError } from "axios";

const productApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true
})

export const getAllProducts = async (): Promise<Product[] | undefined> => {
  const controllers = new AbortController();
  try {
    const result = await productApi.get("/products", {
      signal: controllers.signal
    });
    const res = await result.data;
    return res.data;
  } catch (error) {
    controllers.abort();
    if (error instanceof AxiosError) throw error
  }
}

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const controllers = new AbortController();
  try {
    return slug
      ? await productApi.get(`products/${slug}`, {
        signal: controllers.signal
      }).then(result => result.data).then(res => res.data)
      : await Promise.reject(new Error('Invalid slug'));
  } catch (error) {
    controllers.abort();
    if (error instanceof AxiosError) throw error
  }
}