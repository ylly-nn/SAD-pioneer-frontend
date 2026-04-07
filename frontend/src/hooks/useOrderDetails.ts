import { useEffect, useState } from "react"
import { order } from "../api/order"
import type { UserOrder } from "../types/orders"
import { getErrorMessage } from "../utils/getErrorMessage";

export const useOrderDetails = () => {
  const [orderData, setOrderData] = useState<UserOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId")

    if (!orderId) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const orders = await order.getUserOrders()

        const found = orders.find(
          (o) => o.order_id === orderId
        )

        if (found) {
          setOrderData(found)
        }
      } catch (err) {
        console.error("Ошибка загрузки заказа", err)
        const message = getErrorMessage(err);
        setError(message);
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return {
    orderData,
    loading,
    error
  }
}