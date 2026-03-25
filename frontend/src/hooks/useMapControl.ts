import { useRef } from "react"

export const useMapControl = () => {
  const mapRef = useRef<any>(null)

  const moveMapTo = (coords: number[]) => {
    if (!mapRef.current) return

    mapRef.current.setCenter(coords, 14, {
      duration: 300,
    })
  }

  return {
    mapRef,
    moveMapTo,
  }
}