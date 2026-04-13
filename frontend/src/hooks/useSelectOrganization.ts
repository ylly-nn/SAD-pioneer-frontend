import { useEffect, useState } from "react"
import { forOrderService } from "../api/order"
import { user } from "../api/user"
import type { Branch } from "../types/branch"
import { useBooking } from "./useBooking"

export const useSelectOrganization = () => {
  const { booking, isLoaded } = useBooking()

  const [branches, setBranches] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)

  const [city, setCity] = useState<string>("")
  const [isCityLoaded, setIsCityLoaded] = useState(false)

  useEffect(() => {
    const initCity = async () => {

      // 1. попытка взять город из localStorage
      if (booking.city) {
      setCity(booking.city)
      setIsCityLoaded(true)
      return
    }

      // 2. попытка взять город с бека
      try {
        const res = await user.getCity()
        if (res?.city) {

          localStorage.setItem("city", res.city)
          setCity(res.city)
          setIsCityLoaded(true)
          return
        }
      } catch (e) {
      }

      // 3. базовый город
      localStorage.setItem("city", "Москва")
      setCity("Москва")
      setIsCityLoaded(true)
    }

    initCity()
  }, [])

  useEffect(() => {
    if (!isLoaded || !isCityLoaded) return
    if (!booking.serviceId) return

    const load = async () => {
      try {

        const data = await forOrderService.getBranches(
          city,
          booking.serviceId!
        )

        setBranches(data || [])
      } catch (e) {
        console.error("Ошибка поиска подходящих филиалов", e)
      }
    }

    load()
  }, [city, booking.serviceId, isLoaded, isCityLoaded])

  const selectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  return {
    branches,
    selectedBranch,
    selectBranch,
    city,
    setCity,
  }
}