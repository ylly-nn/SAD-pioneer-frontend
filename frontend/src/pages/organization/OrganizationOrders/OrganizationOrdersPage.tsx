import { useState } from "react";
import styles from "./OrganizationOrdersPage.module.scss";

interface Order {
  id: string;
  order_id: string;
  branch_id: string;
  branch_name: string;
  branch_city: string;
  branch_address: string;
  service: string;
  details: string;
  start_time: string;
  end_time: string;
  status: "new" | "confirmed" | "rejected";
  total_amount?: number;
  created_at: string;
}

interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
}

const OrganizationOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      order_id: "550e8400-e29b-41d4-a716-446655440000",
      branch_id: "1",
      branch_name: "Филиал 1",
      branch_city: "Москва",
      branch_address: "ул. Ленина, 15",
      service: "Шиномонтаж",
      details: "Сезонная смена шин, балансировка",
      start_time: "2024-01-20T10:00:00",
      end_time: "2024-01-20T11:30:00",
      status: "new",
      total_amount: 3500,
      created_at: "2024-01-19T15:30:00",
    },
    {
      id: "2",
      order_id: "660e8400-e29b-41d4-a716-446655440001",
      branch_id: "1",
      branch_name: "Филиал 1",
      branch_city: "Москва",
      branch_address: "ул. Ленина, 15",
      service: "Автомойка",
      details: "Комплексная мойка кузова, химчистка салона",
      start_time: "2024-01-20T14:00:00",
      end_time: "2024-01-20T16:00:00",
      status: "new",
      total_amount: 4500,
      created_at: "2024-01-19T12:15:00",
    },
    {
      id: "3",
      order_id: "770e8400-e29b-41d4-a716-446655440002",
      branch_id: "2",
      branch_name: "Филиал 2",
      branch_city: "Санкт-Петербург",
      branch_address: "Невский пр., 45",
      service: "Диагностика двигателя",
      details: "Компьютерная диагностика, проверка ошибок",
      start_time: "2024-01-20T11:30:00",
      end_time: "2024-01-20T12:30:00",
      status: "confirmed",
      total_amount: 2000,
      created_at: "2024-01-19T10:45:00",
    },
  ]);

  const branches: Branch[] = [
    { id: "1", name: "Филиал 1", city: "Москва", address: "ул. Ленина, 15" },
    { id: "2", name: "Филиал 2", city: "Санкт-Петербург", address: "Невский пр., 45" },
    { id: "3", name: "Филиал 3", city: "Казань", address: "ул. Баумана, 30" },
    { id: "4", name: "Филиал 4", city: "Новосибирск", address: "Красный пр., 120" },
  ];

  const statusConfig = {
    new: { label: "Новая", color: "#f59e0b", bg: "#fef3c7" },
    confirmed: { label: "Подтверждён", color: "#10b981", bg: "#d1fae5" },
    rejected: { label: "Отклонён", color: "#ef4444", bg: "#fee2e2" },
  };

  const getStatusStyle = (status: Order["status"]) => {
    const config = statusConfig[status];
    return {
      color: config?.color,
      backgroundColor: config?.bg,
    };
  };

  const updateOrderStatus = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
    return true;
  };

  const handleStatusChange = (order: Order) => {
    if (order.status === "rejected") {
      setError("Нельзя изменить статус отклонённой заявки");
      return;
    }
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedOrder || !newStatus) return;
    
    if (newStatus !== selectedOrder.status) {
      const success = await updateOrderStatus();
      
      if (success) {
        setOrders(orders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: newStatus as Order["status"] }
            : order
        ));
        setShowStatusModal(false);
        setSelectedOrder(null);
        setNewStatus("");
        setError(null);
      }
    } else {
      setShowStatusModal(false);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch_address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBranch = selectedBranch === "all" || order.branch_id === selectedBranch;
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === "new").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    rejected: orders.filter(o => o.status === "rejected").length,
  };

  const isStatusChanged = selectedOrder && newStatus && newStatus !== selectedOrder.status;
  const canSave = !loading && isStatusChanged;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Заказы</h1>
            <div className={styles.totalOrders}>
              <span className={styles.totalLabel}>Всего заказов:</span>
              <span className={styles.totalValue}>{stats.total}</span>
            </div>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск по услуге или филиалу..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select className={styles.filterSelect} value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
            <option value="all">Все филиалы</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}, {branch.city}</option>
            ))}
          </select>

          <select className={styles.filterSelect} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">Все статусы</option>
            <option value="new">Новая</option>
            <option value="confirmed">Подтверждён</option>
            <option value="rejected">Отклонён</option>
          </select>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.ordersList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderTitle}>
                    <span className={styles.branchInfo}>
                      {order.branch_name}, {order.branch_city}, {order.branch_address}
                    </span>
                  </div>
                  <div className={styles.orderActions}>
                    <select
                      className={styles.statusSelect}
                      style={getStatusStyle(order.status)}
                      value={order.status}
                      onChange={(e) => {
                        const newOrder = { ...order, status: e.target.value as Order["status"] };
                        handleStatusChange(newOrder);
                      }}
                      disabled={order.status === "rejected"}
                    >
                      <option value="new">Новая</option>
                      <option value="confirmed">Подтверждён</option>
                      <option value="rejected">Отклонён</option>
                    </select>
                  </div>
                </div>

                <div className={styles.orderService}>
                  <h3 className={styles.serviceName}>{order.service}</h3>
                  <p className={styles.serviceDetails}>{order.details}</p>
                </div>

                <div className={styles.orderInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Время:</span>
                    <span className={styles.infoValue}>
                      {formatDateTime(order.start_time)} - {formatDateTime(order.end_time).split(' ')[1]}
                    </span>
                  </div>
                  {order.total_amount && (
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Сумма:</span>
                      <span className={styles.infoValue}>{order.total_amount.toLocaleString()} ₽</span>
                    </div>
                  )}
                </div>

                <div className={styles.orderFooter}>
                  <span className={styles.orderDate}>Создан: {formatDate(order.created_at)}</span>
                  <span className={styles.orderPrice}>{order.total_amount?.toLocaleString()} ₽</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3>Заказы не найдены</h3>
              <p>Попробуйте изменить параметры фильтрации</p>
            </div>
          )}
        </div>
      </div>

      {showStatusModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Изменение статуса заказа</h3>
              <button className={styles.modalClose} onClick={() => setShowStatusModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalOrderInfo}>
                <p><strong>Услуга:</strong> {selectedOrder.service}</p>
                <p><strong>Филиал:</strong> {selectedOrder.branch_name}, {selectedOrder.branch_city}, {selectedOrder.branch_address}</p>
                <p><strong>Текущий статус:</strong> {statusConfig[selectedOrder.status].label}</p>
              </div>
              <div className={styles.modalField}>
                <label>Новый статус</label>
                <select 
                  className={styles.modalSelect}
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  disabled={loading}
                >
                  <option value="new">Новая</option>
                  <option value="confirmed">Подтверждён</option>
                  <option value="rejected">Отклонён</option>
                </select>
              </div>
              {error && <div className={styles.modalError}>{error}</div>}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalCancel} onClick={() => setShowStatusModal(false)} disabled={loading}>Отмена</button>
              <button 
                className={styles.modalConfirm} 
                onClick={handleConfirmStatusChange} 
                disabled={!canSave}
              >
                {loading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationOrdersPage;