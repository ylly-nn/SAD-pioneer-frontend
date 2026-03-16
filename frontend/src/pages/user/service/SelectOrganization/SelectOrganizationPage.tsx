import { useEffect, useRef, useState } from "react"
import styles from "./SelectOrganizationPage.module.scss"

import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps"

import { organizations, type Organization } from "../../../../mocks/otganizations"
import { useHandlesLogic } from "../../../../hooks/handlesLogic"

const mapDefaultState = {
  center: [55.751574, 37.573856],
  zoom: 10,
}

const SelectOrganizationPage = () => {
  const { handleSelectDetails, handleSelectService } = useHandlesLogic()

  const mapRef = useRef<any>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState("")
  const [rememberCity, setRememberCity] = useState(false)

  const [suggestions, setSuggestions] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const [isProgrammaticChange, setIsProgrammaticChange] = useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 250)

    return () => clearTimeout(timer)
  }, [search])


  useEffect(() => {
  if (isProgrammaticChange) {
    setIsProgrammaticChange(false)
    return
  }

  if (!debouncedSearch) {
    setSuggestions([])
    return
  }

  const filtered = organizations.filter(
    (org) =>
      org.address.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      org.city.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      org.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  setSuggestions(filtered)
}, [debouncedSearch])


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSuggestions([])
      }
    }

    document.addEventListener("keydown", handleEsc)

    return () => document.removeEventListener("keydown", handleEsc)
  }, [])


  const moveMapTo = (coords: number[]) => {
    if (!mapRef.current) return

    mapRef.current.setCenter(coords, 14, {
      duration: 300,
    })
  }


  const selectOrganization = (org: Organization) => {
  setIsProgrammaticChange(true)
  setSelectedOrg(org)
  setSearch(org.address)

  moveMapTo(org.coordinates)
  setSuggestions([])
}


  const handleMarkerClick = (org: Organization) => {
  setIsProgrammaticChange(true)
  setSelectedOrg(org)
  setSearch(org.address)

  moveMapTo(org.coordinates)
  setSuggestions([])
}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedOrg) return

    handleSelectDetails({
      organizationId: selectedOrg.id,
      address: selectedOrg.address,
      rememberCity,
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          {/* левая сторона */}

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
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setSelectedOrg(null)
                    }}
                    placeholder="Введите адрес"
                    className={styles.input}
                  />

                  {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                      {suggestions.map((org) => (
                        <div
                          key={org.id}
                          className={styles.suggestionItem}
                          onClick={() => selectOrganization(org)}
                        >
                          <div className={styles.orgName}>
                            {org.name}
                          </div>

                          <div className={styles.orgAddress}>
                            {org.address}
                          </div>
                        </div>
                      ))}
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

                {selectedOrg && (
                  <div className={styles.selectedCard}>
                    <div className={styles.selectedTitle}>
                      {selectedOrg.name}
                    </div>

                    <div className={styles.selectedAddress}>
                      {selectedOrg.address}
                    </div>
                  </div>
                )}

                <button
                  disabled={!selectedOrg}
                  className={styles.submit}
                >
                  Далее
                </button>
              </form>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.backButton}
                onClick={handleSelectService}
              >
                Назад
              </button>

              <p className={styles.step}>2 / 5</p>
            </div>
          </div>

          {/* правая сторона */}

          <div className={styles.rightSection}>
            <YMaps query={{ load: "package.full" }}>
              <Map
                defaultState={mapDefaultState}
                instanceRef={mapRef}
                className={styles.map}
              >
                <Clusterer
                  options={{
                    preset: "islands#invertedBlueClusterIcons",
                  }}
                >
                  {organizations.map((org) => (
                    <Placemark
                      key={org.id}
                      geometry={org.coordinates}
                      properties={{
                        balloonContentHeader: org.name,
                        balloonContentBody: org.address,
                      }}
                      options={{
                        preset:
                          selectedOrg?.id === org.id
                            ? "islands#redIcon"
                            : "islands#blueIcon",
                      }}
                      onClick={() =>
                        handleMarkerClick(org)
                      }
                    />
                  ))}
                </Clusterer>
              </Map>
            </YMaps>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SelectOrganizationPage