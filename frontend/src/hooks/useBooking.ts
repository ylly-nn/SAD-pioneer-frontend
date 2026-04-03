import { useState, useEffect } from "react"

export interface BookingState {
  serviceId?: string

  branchId?: string
  serviceByBranchId?: string

  organization?: {
    name: string
    address: string
  }

  details?: {
    items: {
      name: string
      duration: number
      price: number
    }[]
    totalDuration: number
    totalPrice: number
  }

  date?: string
  time?: string
  dateTime?: string
}

const STORAGE_KEY = "bookingDraft"

export const useBooking = () => {
  const [booking, setBooking] = useState<BookingState>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)

    if (data) {
      setBooking(JSON.parse(data))
    }

    setIsLoaded(true)
  }, [])

  const updateBooking = (data: Partial<BookingState>) => {
    const current = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    )

    const updated = { ...current, ...data }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    setBooking(updated)
  }

  const clearBooking = () => {
    localStorage.removeItem(STORAGE_KEY)
    setBooking({})
  }

  return {
    booking,
    updateBooking,
    clearBooking,
    isLoaded,
  }
}