import styles from "./FormViewPage.module.scss";
import { useEditFormAdmin } from "../../../hooks/useEditFormAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import { usePageToast } from "../../../hooks/usePageToast";

const formatDate = (date: string | null) => {
  usePageToast();
  if (!date) return "Не указано";

  return new Date(date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FormViewPage = () => {
  const { getStatusStyle, getStatusLabel } = useOrderStatus();
  const { formData, loading, status, reviewedAt, handleAction } =
    useEditFormAdmin();
  const navigate = useNavigate();

  const [modalAction, setModalAction] = useState<
    "pending" | "approved" | "rejected" | null
  >(null);

  const getModalText = (action: "pending" | "approved" | "rejected") => {
    switch (action) {
      case "pending":
        return "Взять заявку в работу?";
      case "approved":
        return "Одобрить заявку?";
      case "rejected":
        return "Отклонить заявку?";
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            Загрузка...
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            Заявка не найдена
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>Подключение организации</h1>
            <div className={styles.statusBadge} style={getStatusStyle(status)}>
              {getStatusLabel(status)}
            </div>
          </div>

          <button onClick={() => navigate("/admin/requests")}>✕</button>
        </div>

        <div className={styles.form}>
          {/* даты */}
          <div className={styles.statusInfo}>
            <div className={styles.field}>
              <label className={styles.label}>Дата подачи</label>
              <p className={styles.fieldValue}>
                {formatDate(formData.created_at)}
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Дата рассмотрения</label>
              <p className={styles.fieldValue}>
                {reviewedAt ? formatDate(reviewedAt) : "—"}
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.columns}>
            {/* организация */}
            <div className={styles.section}>
              <h3>Организация</h3>

              <div className={styles.field}>
                <label className={styles.label}>
                  Полное название организации
                </label>
                <p className={styles.fieldValue}>
                  {formData.org_name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Короткое название организации
                </label>
                <p className={styles.fieldValue}>
                  {formData.org_short_name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>ИНН</label>
                <p className={styles.fieldValue}>
                  {formData.inn || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>КПП</label>
                <p className={styles.fieldValue}>
                  {formData.kpp || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>ОГРН</label>
                <p className={styles.fieldValue}>
                  {formData.ogrn || "Не указано"}
                </p>
              </div>
            </div>

            {/* контакт */}
            <div className={styles.section}>
              <h3>Контактное лицо</h3>

              <div className={styles.field}>
                <label className={styles.label}>Фамилия</label>
                <p className={styles.fieldValue}>
                  {formData.surname || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Имя</label>
                <p className={styles.fieldValue}>
                  {formData.name || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Отчество</label>
                <p className={styles.fieldValue}>
                  {formData.patronymic || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Почта</label>
                <p className={styles.fieldValue}>
                  {formData.email || "Не указано"}
                </p>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <p className={styles.fieldValue}>
                  {formData.phone || "Не указано"}
                </p>
              </div>
            </div>
          </div>

          {/* дополнительная информация */}
          <div className={styles.infoBlock}>
            <h3>Дополнительная информация</h3>
            <div className={styles.textAreaValue}>
              {formData.info || "Не указано"}
            </div>
          </div>

          {/* кнопки */}

          <div
            className={`${styles.actions} ${
              status === "pending" ? styles.double : styles.single
            }`}
          >
            {status === "new" && (
              <button
                className={styles.takeButton}
                onClick={() => setModalAction("pending")}
              >
                В работу
              </button>
            )}

            {status === "pending" && (
              <>
                <button
                  className={styles.approveButton}
                  onClick={() => setModalAction("approved")}
                >
                  Одобрить
                </button>

                <button
                  className={styles.rejectButton}
                  onClick={() => setModalAction("rejected")}
                >
                  Отклонить
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!modalAction}
        text={modalAction ? getModalText(modalAction) : ""}
        onCancel={() => setModalAction(null)}
        onConfirm={async () => {
          if (!modalAction) return;

          await handleAction(modalAction);
          setModalAction(null);
        }}
      />
    </div>
  );
};

export default FormViewPage;
