import { useEffect, useState } from "react"
import { service } from "../api/service"
import { branchService } from "../api/branchService"

type ServiceItem = {
  id: string
  name: string
}

export const useAddBranchService = (branchId: string) => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await service.getAll()

        setServices(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const selectService = (id: string) => {
    setSelectedId(id)
  }

  const addServiceToBranch = async () => {
    if (!selectedId) return

    try {
      await branchService.post({
        branch_id: branchId,
        service_id: selectedId,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    services,
    selectedId,
    loading,
    selectService,
    addServiceToBranch,
  }
}