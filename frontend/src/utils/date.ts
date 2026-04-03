export const formatLocalDate = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  return `${y}-${m}-${d}`
}

export const formatTime = (iso?: string): string => {
  if (!iso) return ""

  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const formatPrettyDate = (iso?: string): string => {
  if (!iso) return ""

  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const getDuration = (start?: string, end?: string): string => {
  if (!start || !end) return ""

  const diffMin = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60
  )

  if (diffMin >= 60) {
    const h = Math.floor(diffMin / 60)
    const m = diffMin % 60
    return `${h} ч ${m > 0 ? `${m} мин` : ""}`
  }

  return `${diffMin} мин`
}