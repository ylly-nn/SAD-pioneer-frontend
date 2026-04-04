import { useRef } from "react"

export const useMapControl = (ymaps: any) => {
  const mapRef = useRef<any>(null)

  const moveMapTo = (coords: number[]) => {
    if (!mapRef.current) return
    mapRef.current.setCenter(coords, 14, { duration: 300 })
  }

  const geocodeAddress = async (address: string) => {
  if (!ymaps) return null

  try {
    const res = await ymaps.geocode(address)
    const first = res.geoObjects.get(0)
    if (!first) return null

    const meta = first.properties.get("metaDataProperty")
    const geo = meta?.GeocoderMetaData
    const components = geo?.Address?.Components || []

    const countryObj = components.find((c: any) => c.kind === "country")
    if (countryObj?.name !== "Россия") return null

    /*
    const getCity = () => {
      const locality = components.find((c: any) => c.kind === "locality")
      if (locality) return locality.name

      const province = components.find((c: any) => c.kind === "province")
      if (!province) return null

      const allowed = ["москва", "санкт-петербург", "севастополь", "тула", "ярославль"]

      if (allowed.includes(province.name.toLowerCase())) {
        return province.name
      }

      return null
    }*/

      const getCity = () => {
  const locality = components.find((c: any) => c.kind === "locality")
  if (locality) return locality.name

  const area = components.find((c: any) => c.kind === "area")
  if (area) return area.name

  const province = components.find((c: any) => c.kind === "province")
  if (province) return province.name

  return null
}

    const city = getCity()

    const streetObj = components.find((c: any) => c.kind === "street")
    const houseObj = components.find((c: any) => c.kind === "house")

    return {
      coords: first.geometry.getCoordinates(),
      fullAddress: first.getAddressLine(),
      city,
      street: streetObj?.name || null,
      house: houseObj?.name || null,
      precision: geo?.precision,
    }
  } catch (e) {
    console.error("Ошибка геокода", e)
    return null
  }
}

   

  return {
    mapRef,
    moveMapTo,
    geocodeAddress,
  }
}