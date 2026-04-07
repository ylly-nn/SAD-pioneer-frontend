import { useEffect, useMemo, useState } from "react"
import { forOrderService } from "../api/order"
import type { FreeTime } from "../types/branch"
import { formatLocalDate, formatTime } from "../utils/date"

interface TimeSlot {
  iso: string
  time: string
  date: string
}

const CACHE_KEY = "freeTimeCache"
const TTL = 2 * 60 * 1000

const cleanInterval = (raw: string): string => {
  return raw.replace(/[\[\]\s]/g, "")
}

const getWeekStart = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

const getRequestDate = (selectedDate: Date) => {
  const today = new Date();
  const monday = getWeekStart(selectedDate);

  today.setHours(0, 0, 0, 0);
  monday.setHours(0, 0, 0, 0);

  if (monday >= today) {
    return formatLocalDate(monday);
  }

  return formatLocalDate(today);
};

export const useFreeTimeCached = (
  branchId?: string,
  selectedDate?: Date,
  duration?: number,
  timezone?: string
) => {
  const [data, setData] = useState<FreeTime[]>([])
  const [loading, setLoading] = useState(false)

  const requestDate = useMemo(() => {
    if (!selectedDate) return undefined
    return getRequestDate(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (!branchId || !requestDate || !duration || !timezone) return

    const cacheRaw = localStorage.getItem(CACHE_KEY)
    const cache = cacheRaw ? JSON.parse(cacheRaw) : {}

    const key = `${branchId}_${requestDate}_${duration}`
    const cached = cache[key]

    if (cached && Date.now() - cached.timestamp < TTL) {
      setData(cached.data)
      return
    }

    setLoading(true)

    forOrderService
      .getFreeTime({
        branch_id: branchId,
        date: requestDate,
        duration: String(duration),
        timezone,
      })
      .then((res) => {
        setData(res)

        const updatedCache = {
          ...cache,
          [key]: {
            data: res,
            timestamp: Date.now(),
          },
        }

        const keys = Object.keys(updatedCache)
        if (keys.length > 5) delete updatedCache[keys[0]]

        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache))
      })
      .finally(() => setLoading(false))
  }, [branchId, requestDate, duration, timezone])

  const slots: TimeSlot[] = useMemo(() => {
    const result: TimeSlot[] = []

    data.forEach((day) => {
      if (!day.intervals) return

      day.intervals.forEach((raw) => {
        const iso = cleanInterval(raw)
        const dateObj = new Date(iso)

        result.push({
          iso,
          date: formatLocalDate(dateObj),
          time: formatTime(iso),
        })
      })
    })

    return result
  }, [data])

  return { slots, loading }
}

export const clearFreeTimeCache = () => {
  localStorage.removeItem(CACHE_KEY)
}