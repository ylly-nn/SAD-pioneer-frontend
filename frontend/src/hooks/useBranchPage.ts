import { useState } from "react"

export const useBranchPage = () => {
  const [openServiceId, setOpenServiceId] = useState<number | null>(null)
  const [editServiceId, setEditServiceId] = useState<number | null>(null)

  // переключение раскрытия деталей
  const toggleDetails = (id: number) => {
    setOpenServiceId((prev) => {
      // если закрываем — сбрасываем edit
      if (prev === id) {
        setEditServiceId(null)
        return null
      }
      return id
    })
  }

  // переключение режима редактирования
  const toggleEdit = (id: number) => {
    setEditServiceId((prev) => (prev === id ? null : id))
  }

  // формат времени
  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    if (h === 0) return `${m} мин`
    if (m === 0) return `${h} ч`

    return `${h} ч ${m} мин`
  }

  // подсчёт времени по деталям
  const getTotalTime = (details: { time: string }[]) => {
    return details.reduce((total, d) => total + Number(d.time), 0)
  }

  return {
    openServiceId,
    editServiceId,
    toggleDetails,
    toggleEdit,
    formatMinutes,
    getTotalTime,
  }
}