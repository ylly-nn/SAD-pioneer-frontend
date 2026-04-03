import { useState } from "react";
import styles from "./OrganizationBranchesPage.module.scss";
import { useBranches } from "../../../hooks/useBranches";
import { useNavigation } from "../../../hooks/useNavigation";
import { useModal } from "../../../hooks/useModal";
import UserMenu from "../../../components/modals/UserMenu";

const OrganizationBranchesPage = () => {
    const { isModalOpen, toggleModal, closeModal } = useModal();

  const { goToOrganizationAddBranch, goToOrganizationBranch } = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");

  const { branches, isLoading, error } = useBranches();

  const filteredBranches = branches.filter((branch) =>
    branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className={styles.page}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.page}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Список филиалов организации</h1>
            <button className={styles.toggleModalButton} onClick={toggleModal}>
            ☰
          </button>

            <div className={styles.headerActions}>
              <div className={styles.totalBranches}>
                <span className={styles.totalLabel}>Всего филиалов:</span>
                <span className={styles.totalValue}>
                  {branches.length}
                </span>
              </div>

              <button
                className={styles.addButton}
                onClick={goToOrganizationAddBranch}
              >
                <span className={styles.addIcon}>+</span>
                Добавить филиал
              </button>
            </div>
          </div>

          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Поиск по городу или адресу..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.branchesList}>
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <div
                key={branch.branch_id}
                className={styles.branchCard}
                onClick={() => goToOrganizationBranch(branch.branch_id)}
              >
                <h3 className={styles.branchName}>
                  {branch.city}
                </h3>

                <div className={styles.branchAddress}>
                  {branch.address}
                </div>

                <div className={styles.branchSchedule}>
                  {branch.open_time} - {branch.close_time}
                </div>
              </div>
            ))
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
      <UserMenu isOpen={isModalOpen} onClose={closeModal} variant="mixed" />
    </div>
  );
};

export default OrganizationBranchesPage;