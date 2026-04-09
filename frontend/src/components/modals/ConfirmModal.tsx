import styles from "./ConfirmModal.module.scss";

type ConfirmModalProps = {
  isOpen: boolean;
  text: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

const ConfirmModal = ({
  isOpen,
  text,
  confirmText = "Да",
  cancelText = "Отмена",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.text}>{text}</p>

        <div className={styles.modalActions}>
          <button
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

          <button
            className={styles.confirmButton}
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;