import { useEffect, useState } from "react"
import { order } from "../api/order"
import type { UserOrder } from "../types/orders"

export const useOrderDetails = () => {
  const [orderData, setOrderData] = useState<UserOrder | null>(null)
  const [loading, setLoading] = useState(true)

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
      } catch (e) {
        console.error("Ошибка загрузки заказа", e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return {
    orderData,
    loading,
  }
}