import { useMemo } from "react"
import { useOrderDetails } from "./useOrderDetails"
import {
  formatPrettyDate,
  formatTime,
  getDuration,
} from "../utils/date"

export const useConfirmOrder = () => {
  const { orderData, loading } = useOrderDetails()

  const view = useMemo(() => {
    if (!orderData) return null

    return {
      date: formatPrettyDate(orderData.start_moment),
      time: formatTime(orderData.start_moment),
      service: orderData.service,
      address: orderData.address,
      organization: orderData.name_company,
      duration: getDuration(
        orderData.start_moment,
        orderData.end_moment
      ),
    }
  }, [orderData])

  return {
    loading,
    orderData,
    view,
  }
}