import { useEffect, useMemo, useState } from "react"
import { forOrderService } from "../api/order"
import type { BranchServiceDetail } from "../types/branch"
import type { BookingState } from "./useBooking"

export const useBranchDetails = (
  serviceByBranchId?: string,
  booking?: BookingState
) => {
  const [details, setDetails] = useState<BranchServiceDetail[]>([])
  const [selected, setSelected] = useState<BranchServiceDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!serviceByBranchId) return

    setLoading(true)
    setError(null)

    forOrderService
      .getBranchServiceDetails(serviceByBranchId)
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          a.detail.localeCompare(b.detail)
        )

        setDetails(sorted)

        if (booking?.details?.items) {
          const restored = sorted.filter((d) =>
            booking.details!.items.some((i) => i.name === d.detail)
          )
          setSelected(restored)
        }
      })
      .catch(() => setError("Ошибка загрузки услуг"))
      .finally(() => setLoading(false))
  }, [serviceByBranchId, booking])

  const toggle = (item: BranchServiceDetail) => {
    setSelected((prev) =>
      prev.some((i) => i.detail === item.detail)
        ? prev.filter((i) => i.detail !== item.detail)
        : [...prev, item]
    )
  }

  const isSelected = (item: BranchServiceDetail) => {
    return selected.some((i) => i.detail === item.detail)
  }

  const totalDuration = useMemo(() => {
    return selected.reduce((sum, i) => sum + i.duration_min, 0)
  }, [selected])

  const totalPrice = useMemo(() => {
    return selected.reduce((sum, i) => sum + i.price, 0)
  }, [selected])

  return {
    details,
    selected,
    toggle,
    isSelected,
    totalDuration,
    totalPrice,
    loading,
    error,
  }
}