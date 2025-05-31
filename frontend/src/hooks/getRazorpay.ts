// hooks/useRazorpay.ts
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useRazorpay = () => {
  const loadRazorpay = async (userId: string, productId: string) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/transactions/create-order`,
        {
          userId,
          productId,
        },
        { withCredentials: true }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await axios.post(
              `${baseUrl}/transactions/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            alert(verifyRes.data.message || "Payment successful");
          } catch (err: any) {
            alert(err.response?.data?.error || "Verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error(
        "Create Order Failed: ",
        error?.response?.data || error.message
      );
      alert("Something went wrong while creating order");
    }
  };

  return { loadRazorpay };
};
