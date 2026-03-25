import { useEffect, useState } from "react"
import { forOrderService } from "../api/order"
import type { Branch } from "../types/branch"

// для страницы с картой

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const serviceId = localStorage.getItem("serviceId")
    const city = localStorage.getItem("city") || "Москва"

    if (!serviceId) {
      setLoading(false)
      return
    }

    forOrderService.getBranches({ city, serviceId })
      .then(setBranches)
      .finally(() => setLoading(false))
  }, [])

  return { branches, loading }
}