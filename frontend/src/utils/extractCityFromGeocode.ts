export const extractCityFromGeocode = (geoObject: any): string | null => {
  try {
    const meta = geoObject.properties.get("metaDataProperty")
    const details = meta?.GeocoderMetaData?.AddressDetails

    let city = null

    const findCity = (obj: any) => {
      if (!obj) return

      if (obj.Locality?.LocalityName) {
        city = obj.Locality.LocalityName
      }

      if (obj.SubAdministrativeArea) {
        findCity(obj.SubAdministrativeArea)
      }

      if (obj.AdministrativeArea) {
        findCity(obj.AdministrativeArea)
      }
    }

    findCity(details?.Country)

    return city
  } catch (e) {
    console.error("CITY PARSE ERROR", e)
    return null
  }
}