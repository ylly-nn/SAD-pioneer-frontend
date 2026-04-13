import { useEffect, useState } from "react"
import { service } from "../api/service"
import { type Service } from "../types/service"

export const useSelectService = () => {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchServices = async () => {
  try {
    setLoading(true)
    const services = await service.getAll()
    setServices(services)
  } catch (e) {
    console.error("Ошибка загрузки услуг", e)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    selectedService,
    setSelectedService,
    loading,
  }
}