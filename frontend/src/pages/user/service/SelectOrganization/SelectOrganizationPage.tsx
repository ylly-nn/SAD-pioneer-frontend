import { useRef, useState } from "react"
import styles from "./SelectOrganizationPage.module.scss"

import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps"

import { useOrganizationSearch } from "../../../../hooks/useOrganizationSearch"
import { useMapControl } from "../../../../hooks/useMapControl"
import { useHandlesLogic } from "../../../../hooks/handlesLogic"
//import { useNavigation } from "../../../../hooks/useNavigation"
import { useSelectOrganization } from "../../../../hooks/useSelectOrganization"

const mapDefaultState = {
  center: [55.751574, 37.573856],
  zoom: 10,
}

const SelectOrganizationPage = () => {
  const { handleSelectDetails, handleSelectService } = useHandlesLogic()

  //const { goToSelectDetails, goToSelectService } = useNavigation()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [rememberCity, setRememberCity] = useState(false)

  // 🔥 главный хук
  const {
    branches,
    selectedBranch,
    selectBranch,
    saveToStorage,
  } = useSelectOrganization()

  // 🔍 поиск
  const {
    search,
    setSearch,
    suggestions,
    setSelectedBranch,
    selectBranch: selectFromSearch,
  } = useOrganizationSearch(branches)

  // 🗺 карта
  const { mapRef } = useMapControl()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedBranch) return

    saveToStorage(rememberCity)

    handleSelectDetails({
      organizationId: selectedBranch.id_branchserv,
      address: selectedBranch.address,
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
              <h2 className={styles.sectionTitle}>Выберите организацию</h2>

              <div ref={wrapperRef} className={styles.searchWrapper}>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setSelectedBranch(null)
                  }}
                  placeholder="Введите адрес"
                  className={styles.input}
                />

                {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                      {suggestions.map((b) => (
                        <div
                          key={b.id_branchserv}
                          className={styles.suggestionItem}
                          onClick={() => {
                      selectFromSearch(b)
                      selectBranch(b)
                    }}
                        >
                          <div className={styles.orgName}>
                            {b.org_short_name}
                          </div>

                          <div className={styles.orgAddress}>
                            {b.address}
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
                  onChange={(e) => setRememberCity(e.target.checked)}
                />
                Запомнить город
              </label>

              {selectedBranch && (
                <div>
                  {selectedBranch.org_short_name}
                  <br />
                  {selectedBranch.address}
                </div>
              )}

              <button className={styles.submit}>
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

          <div className={styles.rightSection}>
            <YMaps query={{ load: "package.full" }}>
              <Map
                defaultState={mapDefaultState}
                instanceRef={mapRef}
                className={styles.map}
              >
                <Clusterer>
                  {branches.map((b) => (
                    <Placemark
                      key={b.id_branchserv}
                      geometry={[55.75, 37.57]}
                      onClick={() => selectBranch(b)}
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