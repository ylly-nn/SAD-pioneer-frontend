import { useEffect, useRef, useState } from "react"
import styles from "./SelectOrganizationPage.module.scss"

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"

import { useOrganizationSearch } from "../../../../hooks/useOrganizationSearch"
import { useMapControl } from "../../../../hooks/useMapControl"
import { useSelectOrganization } from "../../../../hooks/useSelectOrganization"
import { useNavigation } from "../../../../hooks/useNavigation"
import { useBooking } from "../../../../hooks/useBooking"
import { user } from "../../../../api/user"
import { usePageToast } from "../../../../hooks/usePageToast";


const mapDefaultState = {
  center: [55.751574, 37.573856],
  zoom: 10,
}

const SelectOrganizationPage = () => {
  usePageToast();

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [ymapsInstance, setYmapsInstance] = useState<any>(null)
  const [ymapsReady, setYmapsReady] = useState(false)
  const [rememberCity, setRememberCity] = useState(false)
  const [skipGeocode, setSkipGeocode] = useState(false)
  const [isManualSelection, setIsManualSelection] = useState(false)

  const { goToSelectService, goToSelectDetails } = useNavigation()
  const { isLoaded, booking, updateBooking } = useBooking()

useEffect(() => {
  if (!isLoaded) return

  if (!booking.serviceId) {
    goToSelectService()
  }
}, [booking.serviceId, isLoaded])

  const {
    branches,
    selectedBranch,
    selectBranch,
    city,
    setCity,
  } = useSelectOrganization()

  const { mapRef, moveMapTo, geocodeAddress } =
    useMapControl(ymapsInstance)

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[-–—]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

  const cityNorm = normalize(city)

  const isAddress = (input: string) => {
    const value = input.toLowerCase()

    return (
      /\d/.test(value) ||
      value.includes(",") ||
      /(ул|улица|дом|д|проспект|пр|шоссе|ш|переулок|пер|бульвар)/.test(value) ||
      value.split(" ").length >= 2
    )
  }

  const cityAliases: Record<string, string> = {
    "москва": "Москва",
    "санкт петербург": "Санкт-Петербург",
    "спб": "Санкт-Петербург",
    "питер": "Санкт-Петербург",
    "Тула": "Тула",
  }

  const [search, setSearch] = useState("")

  const cleanSearch = (() => {
    const value = normalize(search)

    if (value.startsWith(cityNorm)) {
      return value.slice(cityNorm.length).trim()
    }

    return value
  })()

  const suggestions = useOrganizationSearch(branches, cleanSearch)

  const [coordsMap, setCoordsMap] = useState<Record<string, number[]>>({})

  useEffect(() => {
    if (!search || search.length < 2) return
    if (skipGeocode) return

    const t = setTimeout(async () => {
      const input = search.trim()
      const inputNorm = normalize(input)

      if (inputNorm.startsWith(cityNorm)) return
      if (isAddress(input)) return

      if (cityAliases[inputNorm]) {
        const newCity = cityAliases[inputNorm]

        if (newCity !== city) {
          localStorage.setItem("city", newCity)
          setCity(newCity)
        }
        return
      }

      const res = await geocodeAddress(input)
      if (!res?.city) return

      if (res.street || res.house) return

      const bad = ["посёлок", "деревня", "область", "округ"]

      if (bad.some((b) => res.city.toLowerCase().includes(b))) return

      if (res.city !== city) {
        localStorage.setItem("city", res.city)
        setCity(res.city)
      }
    }, 400)

    return () => clearTimeout(t)
  }, [search, city, skipGeocode])


  useEffect(() => {
    if (!ymapsReady || !city) return

    const load = async () => {
      const map: Record<string, number[]> = {}

      for (const b of branches) {
        const res = await geocodeAddress(`${city}, ${b.address}`)
        if (res?.coords) map[b.id_branchserv] = res.coords
      }

      setCoordsMap(map)

      const first = Object.values(map)[0]
      if (first) moveMapTo(first)
    }

    load()
  }, [branches, ymapsReady, city])


  const handleSelectSuggestion = async (branch: any) => {
    setSkipGeocode(true)

    setSearch(branch.address)
    selectBranch(branch)
    setIsManualSelection(true)

    const res = await geocodeAddress(`${city}, ${branch.address}`)
    if (res) moveMapTo(res.coords)

    setTimeout(() => setSkipGeocode(false), 300)
  }

  const handleSelectFromMap = (branch: any) => {
    setSkipGeocode(true)

    selectBranch(branch)
    setSearch(branch.address)
    setIsManualSelection(true)

    setTimeout(() => setSkipGeocode(false), 300)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBranch) return

    updateBooking({
      branchId: selectedBranch.id_branch,
      serviceByBranchId: selectedBranch.id_branchserv, 
      city: city,
      organization: {
        name: selectedBranch.org_short_name,
        address: selectedBranch.address,
      },
    })

    if (rememberCity) {
      try {
        await user.putCity({ city })
      } catch {}
    }

    goToSelectDetails()
  }


  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>

          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Запись на услугу</h1>
            </div>

            <div className={styles.formContent}>
              <form className={styles.form} onSubmit={handleSubmit}>

                <h2 className={styles.sectionTitle}>
                  Выберите организацию
                </h2>

                <div ref={wrapperRef} className={styles.searchWrapper}>
                  <div style={{ marginBottom: 8, fontSize: 14, color: "#6b7280" }}>
                    Город: <b>{city}</b>
                  </div>

                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setIsManualSelection(false)
                    }}
                    placeholder="Введите адрес"
                    className={styles.input}
                  />

                  {!isManualSelection && suggestions?.length > 0 && (
                    <div className={styles.suggestions}>
                      {suggestions.map((addr, index) => {
                        const branch = branches.find(
                          (b) => b.address === addr
                        )
                        if (!branch) return null

                        return (
                          <div
                            key={`${branch.id_branchserv}-${branch.address}-${index}`}
                            className={styles.suggestionItem}
                            onClick={() =>
                              handleSelectSuggestion(branch)
                            }
                          >
                            <div className={styles.orgName}>
                              {branch.org_short_name}
                            </div>

                            <div className={styles.orgAddress}>
                              {branch.address}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={rememberCity}
                    onChange={(e) =>
                      setRememberCity(e.target.checked)
                    }
                  />
                  Запомнить город
                </label>

                {selectedBranch && (
                  <div className={styles.selectedCard}>
                    <div className={styles.selectedTitle}>
                      {selectedBranch.org_short_name}
                    </div>
                    <div className={styles.selectedAddress}>
                      {selectedBranch.address}
                    </div>
                  </div>
                )}

                <button
                  className={styles.submit}
                  disabled={!selectedBranch}
                >
                  Далее
                </button>

              </form>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.backButton}
                onClick={() => goToSelectService()}
              >
                Назад
              </button>

              <p className={styles.step}>2 / 5</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <YMaps
              query={{
                apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
                load: "package.full",
              }}
            >
              <Map
                defaultState={mapDefaultState}
                instanceRef={mapRef}
                className={styles.map}
                onLoad={(ymaps) => {
                  setYmapsReady(true)
                  setYmapsInstance(ymaps)
                }}
              >
                {branches?.map((b) => {
                  const coords = coordsMap[b.id_branchserv]
                  if (!coords) return null

                  const isSelected =
                    selectedBranch?.id_branchserv ===
                    b.id_branchserv

                  return (
                    <Placemark
                      key={b.id_branchserv}
                      geometry={coords}
                      onClick={() => handleSelectFromMap(b)}
                      options={{
                        preset: isSelected
                          ? "islands#redIcon"
                          : "islands#blueIcon",
                      }}
                    />
                  )
                })}
              </Map>
            </YMaps>
          </div>

        </section>
      </div>
    </div>
  )
}

export default SelectOrganizationPage