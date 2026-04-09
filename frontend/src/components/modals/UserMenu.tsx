import { useEffect, useRef } from "react";
import styles from "./UserMenu.module.scss";
import { useNavigation } from "../../hooks/useNavigation";
import { useLogout } from "../../hooks/useLogout";

type Variant = "organization" | "user" | "mixed" | "home";
type Theme = "light" | "glass";

type MenuItem =
  | { label: string; action: () => void; type?: "button" }
  | { label: string; type: "label" };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
  theme?: Theme;
};

const UserMenu = ({
  isOpen,
  onClose,
  variant,
  theme = "light",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { goHome, goToOrganization, goToUser } = useNavigation();
  const { logout } = useLogout();

  const config: Record<Variant, MenuItem[]> = {
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
    home: [
      { label: "Вы авторизованы", type: "label" },
    ],
  };

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
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div ref={ref} className={`${styles.menu} ${styles[theme]}`}>
        {items.map((item, index) => {
          if (item.type === "label") {
            return (
              <div key={index} className={styles.label}>
                {item.label}
              </div>
            );
          }

          return (
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
          );
        })}

        <div className={styles.divider} />

        <button className={styles.logout} onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default UserMenu;