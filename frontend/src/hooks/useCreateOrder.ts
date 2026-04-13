import { useState } from "react"
import { order } from "../api/order"
import { useBooking } from "./useBooking"
import { clearFreeTimeCache } from "./useFreeTime"
import { useNavigation } from "./useNavigation"

export const useCreateOrder = () => {
  const { booking, updateBooking, clearBooking } = useBooking()
  const { goToConfirmBooking } = useNavigation()

  const [loading, setLoading] = useState(false)

  const createOrder = async (selectedSlot: string) => {
    if (!booking.details || !booking.serviceByBranchId) {
      throw new Error("Нет данных для заказа")
    }

    try {
      setLoading(true)

      const res = await order.post({
        service_by_branch: booking.serviceByBranchId,
        start_moment: selectedSlot,
        order_details: booking.details.items.map((i) => ({
          detail: i.name,
        })),
      })

      localStorage.setItem("orderId", res.id)

      clearFreeTimeCache()

      updateBooking({
        dateTime: selectedSlot,
      })

      clearBooking()
      localStorage.setItem("orderId", res.id)
      goToConfirmBooking()

    } finally {
      setLoading(false)
    }
  }

  return {
    createOrder,
    loading,
  }
}