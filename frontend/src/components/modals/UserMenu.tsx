import { useEffect, useRef } from "react";
import styles from "./UserMenu.module.scss";
import { useNavigation } from "../../hooks/useNavigation";
import { useLogout } from "../../hooks/useLogout";

type Variant = "organization" | "user" | "mixed";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
};

const UserMenu = ({ isOpen, onClose, variant }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { goHome, goToOrganization, goToUser } = useNavigation();
  const { logout } = useLogout();

  const config = {
    organization: [
      { label: "Главная", action: goHome },
      { label: "Владелец ТС", action: goToUser },
    ],
    user: [
      { label: "Главная", action: goHome },
      { label: "Организация", action: goToOrganization },
    ],
    mixed: [
      { label: "Главная", action: goHome },
      { label: "Организация", action: goToOrganization },
      { label: "Владелец ТС", action: goToUser },
    ],
  };

  // закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = config[variant];

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.menu}>
        {items.map((item) => (
          <button
            key={item.label}
            className={styles.item}
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            {item.label}
          </button>
        ))}

        <div className={styles.divider} />

        <button
          className={styles.logout}
          onClick={logout}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default UserMenu;