import { useEffect, useState } from "react"
import { forOrderService } from "../api/order"
import type { Branch } from "../types/branch"

export const useSelectOrganization = () => {
  const [branches, setBranches] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [loading, setLoading] = useState(true)

  const [city, setCity] = useState(
    localStorage.getItem("city") || "Москва"
  )

  useEffect(() => {
    const serviceId = localStorage.getItem("serviceId")

    if (!serviceId) {
      setLoading(false)
      return
    }

    forOrderService.getBranches({ city, serviceId })
      .then(setBranches)
      .finally(() => setLoading(false))
  }, [city])

  const selectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  const saveToStorage = (rememberCity: boolean) => {
    if (!selectedBranch) return

    localStorage.setItem("branchId", selectedBranch.id_branchserv)

    if (rememberCity) {
      const cityFromAddress = selectedBranch.address.split(",")[0]
      localStorage.setItem("city", cityFromAddress)
    }
  }

  return {
    branches,
    selectedBranch,
    selectBranch,
    saveToStorage,
    loading,
    city,
    setCity,
  }
}