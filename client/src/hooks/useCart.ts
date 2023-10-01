import { create } from "zustand";

const useCart = create<{
  cart: Cart[],
  totalQuantities: number,
  totalPrice: number,
  actions: {
    setCartData: (product: Product, quantity: number) => void;
    removeCartData: (product: Partial<Product>) => void;
  }
}>((set, get) => ({
  cart: [],
  totalPrice: 0,
  totalQuantities: 0,
  actions: {
    setCartData(product: Product, quantity: number) {
      const newCart = [...get().cart];
      const existCart = newCart.find(item => item.product.slug === product.slug);
      if (existCart) {
        set({
          cart: newCart.map(item => item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
          ),
          totalQuantities: get().totalQuantities + quantity,
          totalPrice: get().totalPrice + (Number(product.price.slice(1)) ?? 0) * quantity,
        })
      } else {
        set({
          cart: [...newCart, { product, quantity }],
          totalQuantities: get().totalQuantities + quantity,
          totalPrice: get().totalPrice + (Number(product.price.slice(1)) ?? 0) * quantity,
        })
      }
    },
    removeCartData(product: Partial<Product>) {
      const newCart = [...get().cart];
      const existCart = newCart.find(item => item.product.slug === product.slug);
      if (existCart && existCart?.quantity === 1) {
        set({
          cart: newCart.filter(item => item.product.slug !== product.slug),
          totalQuantities: get().totalQuantities - 1,
          totalPrice: get().totalPrice - (Number(product.price?.slice(1)) ?? 0)
        })
      } else if (existCart) {
        set({
          cart: newCart.map(item => item.product.slug === product.slug ? { ...existCart, quantity: existCart.quantity - 1 }
            : item
          ),
          totalQuantities: get().totalQuantities - 1,
          totalPrice: get().totalPrice - (Number(product.price?.slice(1)) ?? 0)
        })
      }
    }
  }
}));

export const useCartData = () => useCart((state) => state.cart);
export const useTotalQuantities = () => useCart((state) => state.totalQuantities);
export const useTotalPrice = () => useCart((state) => state.totalPrice);
export const useCartAction = () => useCart((state) => state.actions);