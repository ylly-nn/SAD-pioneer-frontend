import { useState } from "react";
import styles from "./OrganizationBranchesPage.module.scss";
import { useBranches } from "../../../hooks/useBranches";
import { useNavigation } from "../../../hooks/useNavigation";
import { useSearch } from "../../../hooks/useSearch";
import { useModal } from "../../../hooks/useModal";
import UserMenu from "../../../components/modals/UserMenu";

const OrganizationBranchesPage = () => {
  const { isModalOpen, toggleModal, closeModal } = useModal();

  const {
    goToOrganizationAddBranch,
    goToOrganizationBranch,
    goToOrganization,
  } = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  const { branches, isLoading, error } = useBranches();

  const filteredBranches = useSearch(branches, searchQuery, (branch) => [
    branch.city,
    branch.address,
  ]);

  if (isLoading) {
    return <div className={styles.page}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* шапка */}
        <div className={styles.header}>
          <div>
            <button
              className={styles.toggleModalButton}
              onClick={goToOrganization}
            >
              <span>❮</span>
            </button>

            <h1>Филиалы организации</h1>
          </div>

          <div className={styles.menuContainer}>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
              ☰
            </button>
            <UserMenu
              isOpen={isModalOpen}
              onClose={closeModal}
              variant="mixed"
            />
          </div>
        </div>

        {/* действия */}

        <div className={styles.filtersBar}>
          <div className={styles.filtersLeft}>
            {/* поиск */}
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Поиск по городу или адресу..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* селекты */}
          </div>

          <div className={styles.filtersRight}>
            {/* счетчик */}
            <div className={styles.totalBranches}>
              <span className={styles.totalLabel}>Всего филиалов: </span>
              <span className={styles.totalValue}>{branches.length}</span>
            </div>

            {/* кнопка */}
            <button
              className={styles.primaryButton}
              onClick={goToOrganizationAddBranch}
            >
              <span className={styles.addIcon}>+</span>
              Добавить филиал
            </button>
          </div>
        </div>

        {/* наполнение */}
        <div className={styles.main}>
          {filteredBranches.length > 0 ? (
            <div className={styles.cardsGrid}>
              {filteredBranches.map((branch) => (
                <div
                  key={branch.branch_id}
                  className={styles.card}
                  onClick={() => goToOrganizationBranch(branch.branch_id)}
                >
                  <div className={styles.cardHeader}>
                    <h3>{branch.city}</h3>
                  </div>

                  <div className={styles.cardAddress}>{branch.address}</div>

                  <div className={styles.cardDate}>
                    {branch.open_time} - {branch.close_time}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>Филиалы не найдены</h3>
              <button onClick={goToOrganizationAddBranch}>
                Создать филиал
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationBranchesPage;
