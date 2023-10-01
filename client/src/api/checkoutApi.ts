import axios, { AxiosError } from "axios";

// const url = `https://cors.iamnd.eu.org/?url=${import.meta.env.VITE_SCALAPAY_API}`;

const checkoutApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_SCALAPAY_SECRET_KEY}`,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTIONS"
  },
  withCredentials: true,
})

export const createOrder = async (orderObj: OrderObject) => {
  const controller = new AbortController();
  try {
    return await checkoutApi.post(`/checkout/order`, JSON.stringify(orderObj), {
      signal: controller.signal,
    }).then(res => res.data);
  } catch (error) {
    controller.abort();
    if (error instanceof AxiosError) throw error;
  }
}