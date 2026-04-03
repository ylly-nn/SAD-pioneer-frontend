import { useEffect, useState } from "react"
import { branches } from "../api/organization"
import { branchService } from "../api/branchService"
import type { BranchWithServices } from "../types/organization"

type ServiceDetail = {
  id: string
  name: string
  time: number
  price: number
}

type Service = {
  id: string
  name: string
  details: ServiceDetail[]
}

export const useBranchPage = (branchId: string) => {
  const [branch, setBranch] = useState<BranchWithServices | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const [openServiceId, setOpenServiceId] = useState<string | null>(null)
  const [editServiceId, setEditServiceId] = useState<string | null>(null)

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const data = await branches.getById(branchId)

        if (!data) return

        setBranch(data)

        const servicesWithDetails = await Promise.all(
          (data.services ?? []).map(async (s) => {
            const res = await branchService.getDetails(s.branch_serv_id)

            const detailsArray = Array.isArray(res) ? res : res ? [res] : []

            return {
              id: s.branch_serv_id,
              name: s.service_name,
              details: detailsArray.map((d) => ({
                id: crypto.randomUUID(),
                name: d.detail,
                time: Number(d.duration_min) || 0,
                price: d.price,
              })),
            }
          })
        )

        setServices(servicesWithDetails)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchBranch()
  }, [branchId])

  const toggleDetails = (id: string) => {
    if (openServiceId === id) {
      setOpenServiceId(null)
      setEditServiceId(null)
      return
    }

    setOpenServiceId(id)
  }

  const toggleEdit = (id: string) => {
    setEditServiceId((prev) => (prev === id ? null : id))
  }

  const deleteDetail = async (serviceId: string, detailName: string) => {
    try {
      const res = await branchService.deleteDetail(serviceId, detailName)

      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId
            ? {
                ...s,
                details: res.map((d) => ({
                  id: crypto.randomUUID(),
                  name: d.detail,
                  time: Number(d.duration_min) || 0,
                  price: d.price,
                })),
              }
            : s
        )
      )
    } catch (e) {
      console.error(e)
    }
  }

  const formatMinutes = (minutes: number) => {
    if (!minutes) return "0 мин"

    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    if (h === 0) return `${m} мин`
    if (m === 0) return `${h} ч`

    return `${h} ч ${m} мин`
  }

  const getTotalTime = (details: ServiceDetail[]) => {
    return details.reduce((acc, d) => acc + (d.time || 0), 0)
  }

  return {
    branch,
    services,
    loading,

    openServiceId,
    editServiceId,

    toggleDetails,
    toggleEdit,
    deleteDetail,

    formatMinutes,
    getTotalTime,
  }
}