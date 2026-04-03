import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddAdminPage.module.scss";
import api from "../../../api/axios";
import {
  validateEmail,
  validateName,
  validateForm,
  hasErrors,
  isFormValid,
  type FormErrors
} from "../../../utils/validation";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    name: "",
    surname: ""
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value, "Имя") }));
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSurname(value);
    setErrors(prev => ({ ...prev, surname: validateName(value, "Фамилия") }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация всех полей перед отправкой
    const validationErrors = validateForm({ email, name, surname });
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/admin/create-admin', {
        email: email,
        name: name,
        surname: surname
      });

      console.log("Админ успешно добавлен:", response.data);
      
      navigate("/admin/panelka", { 
        state: { message: "Администратор успешно добавлен" } 
      });
    } catch (err: any) {
      console.error("Ошибка при добавлении админа:", err);
      setErrors(prev => ({ 
        ...prev, 
        email: err.response?.data?.message || "Произошла ошибка при добавлении админа" 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const formValid = isFormValid({ email, name, surname }, errors);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добавление админа</h1>
          <button
            className={styles.close}
            onClick={handleBack}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.formContainer}>
          <p className={styles.description}>
            Заполните данные для добавления нового администратора
          </p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="surname">
                Фамилия <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                placeholder="введите фамилию (от 2 до 100 символов)"
                required
                className={`${styles.input} ${errors.surname ? styles.inputError : ''}`}
                autoComplete="family-name"
                value={surname}
                onChange={handleSurnameChange}
                disabled={isSubmitting}
              />
              {errors.surname && <div className={styles.error}>{errors.surname}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Имя <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="введите имя (от 2 до 100 символов)"
                required
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                autoComplete="given-name"
                value={name}
                onChange={handleNameChange}
                disabled={isSubmitting}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@domain.ru"
                required
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting || !formValid}
            >
              {isSubmitting ? "Добавление..." : "Добавить администратора"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;