import { useState } from "react"
import styles from "./ServiceDetailPage.module.scss"
import { useParams } from "react-router-dom"
import { branchService } from "../../../../api/branchService"
import { useNavigation } from "../../../../hooks/useNavigation"

const ServiceDetailPage = () => {
  const { goBack } = useNavigation();
  const { serviceId } = useParams<{ serviceId: string }>()

  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!serviceId) return

    await branchService.postDetail({
      branchserv_id: serviceId,
      detail: form.name,
      duration: Number(form.duration),
      price: Number(form.price),
    })

    goBack()
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавить опцию</h1>
          <button className={styles.close} onClick={goBack} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Название</label>
            <input name="name" onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Длительность (мин)</label>
            <input name="duration" type="number" onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Цена</label>
            <input name="price" type="number" onChange={handleChange} />
          </div>

          <button className={styles.submit}>Добавить</button>
        </form>
      </div>
    </div>
  )
}

export default ServiceDetailPage