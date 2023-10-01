import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/checkoutApi";

export const useCheckout = () => {
  return useMutation({
    mutationKey: ["checkout"],
    mutationFn: (orderObj: OrderObject) => createOrder(orderObj),
    useErrorBoundary: true,
    // onSuccess: (data) => {
    //   if (data.checkUrl) {
    //     let timer: ReturnType<typeof setTimeout> | null = null;
    //     const googleLoginUrl = data.checkUrl;
    //     const newWindow = window.open(
    //       googleLoginUrl,
    //       "_blank",
    //       "width=500,height=600"
    //     );

    //     if (newWindow) {
    //       timer = setInterval(() => {
    //         if (newWindow.closed) {
    //           console.log("Yay you're authenticated");
    //           if (timer) clearInterval(timer);
    //         }
    //       });
    //     }
    //   }
    // }
  })
}