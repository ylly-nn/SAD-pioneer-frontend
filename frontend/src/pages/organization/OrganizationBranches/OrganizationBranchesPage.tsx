import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrganizationBranchesPage.module.scss";

interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  openingTime: string;
  closingTime: string;
  phone?: string;
}

const OrganizationBranchesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  

  const [branches] = useState<Branch[]>([
    {
      id: "1",
      name: "Филиал 1",
      city: "Москва",
      address: "ул. Ленина, 15",
      openingTime: "09:00",
      closingTime: "21:00",
      phone: "+7 (495) 123-45-67",
    },
    {
      id: "2",
      name: "Филиал 2",
      city: "Санкт-Петербург",
      address: "Невский пр., 45",
      openingTime: "10:00",
      closingTime: "22:00",
      phone: "+7 (812) 234-56-78",
    },
    {
      id: "3",
      name: "Филиал 3",
      city: "Казань",
      address: "ул. Баумана, 30",
      openingTime: "09:30",
      closingTime: "20:30",
      phone: "+7 (843) 345-67-89",
    },
    {
      id: "4",
      name: "Филиал 4",
      city: "Новосибирск",
      address: "Красный пр., 120",
      openingTime: "08:00",
      closingTime: "20:00",
      phone: "+7 (383) 456-78-90",
    },
  ]);

  const handleAddBranch = () => {
    navigate("/organization/add-branch");
  };

  const handleEditBranch = (id: string) => {
    navigate(`/organization/edit-branch/${id}`);
  };

  const handleViewBranch = (id: string) => {
    navigate(`/organization/branch/${id}`);
  };

  const handleToggleStatus = (id: string) => {
    console.log("status for branch:", id);
  };

  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Список филиалов организации</h1>
            <div className={styles.headerActions}>
              <div className={styles.totalBranches}>
                <span className={styles.totalLabel}>Всего филиалов:</span>
                <span className={styles.totalValue}>{branches.length}</span>
              </div>
              <button 
                className={styles.addButton}
                onClick={handleAddBranch}
              >
                <span className={styles.addIcon}>+</span>
                Добавить филиал
              </button>
            </div>
          </div>
          
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <svg 
                className={styles.searchIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Поиск по названию или адресу..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.branchesList}>
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <div 
                key={branch.id} 
                className={`${styles.branchCard}`}
                onClick={() => handleViewBranch(branch.id)}
              >
                <div className={styles.branchHeader}>
                  <div className={styles.branchTitle}>
                    <h3 className={styles.branchName}>{branch.name}</h3>
                  </div>
                  <div className={styles.branchActions}>
                    <button 
                      className={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditBranch(branch.id);
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M16.4745 5.40825L18.5917 7.52547M17.8359 3.54299L11.713 9.66591C11.3805 9.99842 11.1971 10.4516 11.2038 10.9221L11.2285 12.7715L13.0779 12.7962C13.5484 12.8029 14.0016 12.6195 14.3341 12.287L20.457 6.16409C20.9476 5.67349 21.2218 5.0081 21.2144 4.3135C21.207 3.6189 20.9186 2.96007 20.4175 2.48101C19.9164 2.00194 19.2454 1.74359 18.5509 1.76719C17.8564 1.7908 17.2054 2.09418 16.7387 2.60584L16.7103 2.63588C16.6338 2.71458 16.5651 2.80048 16.5049 2.89232L16.4745 2.92415L16.446 2.9568C16.3592 3.05929 16.2843 3.17132 16.2227 3.29093L16.2004 3.3352L16.1804 3.38073C16.0586 3.65768 15.9942 3.9567 15.9915 4.25946C15.9889 4.56222 16.048 4.86229 16.1649 5.14129C16.2819 5.4203 16.454 5.67224 16.6703 5.88209C16.8866 6.09195 17.1426 6.25566 17.4237 6.36324C17.7049 6.47082 18.005 6.51954 18.3058 6.50627C18.6065 6.49301 18.901 6.41807 19.1717 6.286C19.4423 6.15392 19.6832 5.96772 19.8812 5.73939L20.0206 5.57718" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                        <path d="M4 20H20M9 16H5C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V17C10 16.4477 9.55228 16 9 16Z" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button 
                      className={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(branch.id);
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.3639C14.8493 21.8786 9.1508 21.8786 5.63609 18.3639M18.364 5.63604C14.8493 2.12132 9.1508 2.12132 5.63609 5.63604C2.12137 9.15076 2.12137 14.8492 5.63609 18.3639M18.364 5.63604L5.63609 18.3639" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={styles.branchAddress}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21C12 21 20 15 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15 12 21 12 21Z" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{branch.city}, {branch.address}</span>
                </div>

                <div className={styles.branchSchedule}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>
                    {branch.openingTime} - {branch.closingTime}
                  </span>
                </div>

                {branch.phone && (
                  <div className={styles.branchPhone}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19C22.001 19.7911 21.7658 20.5644 21.3329 21.2135C20.8999 21.8626 20.2932 22.3528 19.5865 22.6094C18.8798 22.866 18.1142 22.8736 17.4032 22.631C16.6921 22.3885 16.0768 21.9101 15.632 21.269C13.5834 18.5225 12.0366 15.4239 11.07 12.1C10.7317 11.0162 10.5615 9.88097 10.567 8.74C10.5665 7.67263 10.7572 6.6133 11.13 5.62C11.4188 4.93647 11.8606 4.33334 12.4166 3.86318C12.9727 3.39302 13.6253 3.07035 14.327 2.922C15.0287 2.77366 15.7551 2.80439 16.4434 3.01153C17.1317 3.21866 17.7593 3.5963 18.27 4.11C18.7807 4.6237 19.1572 5.25628 19.3671 5.9518C19.5771 6.64732 19.6142 7.3829 19.475 8.0945C19.3358 8.8061 19.0246 9.4671 18.57 10.02C18.1154 10.5729 17.533 11 16.87 11.26C16.5924 11.3642 16.3401 11.5251 16.13 11.73" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{branch.phone}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M3 9H21M12 15H12.01M7 15H7.01M17 15H17.01M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <h3>Филиалы не найдены</h3>
              <p>Попробуйте изменить параметры поиска или создайте новый филиал</p>
              <button className={styles.createFirstButton} onClick={handleAddBranch}>
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