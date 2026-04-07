import { useEffect, useState } from "react"
import { service } from "../api/service"
import { branchService } from "../api/branchService"
import { branches } from "../api/organization"

type ServiceItem = {
  id: string
  name: string
}

export const useAddBranchService = (branchId: string) => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [branchServices, setBranchServices] = useState<string[]>([]) 
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allServices, branchData] = await Promise.all([
          service.getAll(),
          branches.getById(branchId),
        ])

        setServices(allServices)

        // 👇 список уже добавленных услуг в филиал
        const existing = (branchData?.services ?? []).map(
          (s: any) => s.service_id
        )

        setBranchServices(existing)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [branchId])

  const selectService = (id: string) => {
    setSelectedId(id)
    setError(null) // 👈 сбрасываем ошибку при выборе
  }

  const addServiceToBranch = async () => {
    if (!selectedId) return false

    // ❗ ПРОВЕРКА НА ДУБЛИКАТ
    if (branchServices.includes(selectedId)) {
      setError("Такая услуга уже добавлена. Выберите другую")
      return false
    }

    try {
      await branchService.post({
        branch_id: branchId,
        service_id: selectedId,
      })

      return true
    } catch (e) {
      console.error(e)
      setError("Ошибка при добавлении услуги")
      return false
    }
  }

  return {
    services,
    selectedId,
    loading,
    error,
    selectService,
    addServiceToBranch,
  }
}