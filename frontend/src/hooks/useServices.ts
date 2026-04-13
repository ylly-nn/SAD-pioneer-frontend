import { useEffect, useState } from "react"
import { service } from "../api/service"
import type { Service } from "../types/service"

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getAll()
      .then(setServices)
      .finally(() => setLoading(false))
  }, [])

  return { services, loading }
}