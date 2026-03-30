import { useState, useEffect } from 'react';
import { useAdminRequests } from '../../../hooks/adminHooks/useAdminRequests';
import styles from './AdminRequestsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { getPartnerRequestsByStatus } from '../../../api/admin';

const AdminRequestsPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Передаем activeFilter в хук
  const { requests, loading, error, changeRequestStatus} = useAdminRequests(activeFilter);
  
  const safeRequests = requests || [];

  const [allRequests, setAllRequests] = useState<any[]>([]);

  useEffect(() => {
    const loadAllRequests = async () => {
      try {
        const allData = await getPartnerRequestsByStatus('all');
        setAllRequests(allData || []);
      } catch (err) {
        console.error('Failed to load all requests:', err);
      }
    };
    
    loadAllRequests();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all' && requests) {
      setAllRequests(requests);
    }
  }, [requests, activeFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await changeRequestStatus(id, newStatus);
      if (activeFilter === 'all') {
        const updatedAllRequests = await getPartnerRequestsByStatus('all');
        setAllRequests(updatedAllRequests || []);
      }
    } catch (err) {
      console.error('Failed to change status:', err);
      alert('Ошибка при изменении статуса');
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'pending': return 'В работе';
      case 'approved': return 'Одобрена';
      case 'rejected': return 'Отклонена';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new': return styles.statusNew;
      case 'pending': return styles.statusPending;
      case 'approved': return styles.statusApproved;
      case 'rejected': return styles.statusRejected;
      default: return '';
    }
  };

  const getCountByStatus = (status: string) => {
    if (status === 'all') {
      return allRequests.length;
    }
    return allRequests.filter(r => r.status === status).length;
  };

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Заявки партнеров</h1>
      </div>

      <div className={styles.filters}>
        <button 
          className={activeFilter === 'all' ? styles.active : ''}
          onClick={() => setActiveFilter('all')}
        >
          Все ({getCountByStatus('all')})
        </button>
        <button 
          className={activeFilter === 'new' ? styles.active : ''}
          onClick={() => setActiveFilter('new')}
        >
          Новые ({getCountByStatus('new')})
        </button>
        <button 
          className={activeFilter === 'pending' ? styles.active : ''}
          onClick={() => setActiveFilter('pending')}
        >
          В работе ({getCountByStatus('pending')})
        </button>
        <button 
          className={activeFilter === 'approved' ? styles.active : ''}
          onClick={() => setActiveFilter('approved')}
        >
          Одобренные ({getCountByStatus('approved')})
        </button>
        <button 
          className={activeFilter === 'rejected' ? styles.active : ''}
          onClick={() => setActiveFilter('rejected')}
        >
          Отклоненные ({getCountByStatus('rejected')})
        </button>
      </div>

      {safeRequests.length === 0 ? (
        <div className={styles.emptyState}>Нет заявок</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Организация</th>
                <th>ИНН</th>
                <th>Контактное лицо</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {safeRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div>{request.org_name}</div>
                    <div className={styles.orgShortName}>{request.org_short_name}</div>
                  </td>
                  <td>{request.inn}</td>
                  <td>{`${request.surname} ${request.name} ${request.patronymic}`}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {request.status === 'new' && (
                        <button
                          className={styles.takeButton}
                          onClick={() => handleStatusChange(request.id, 'pending')}
                        >
                          Взять в работу
                        </button>
                      )}
                      {request.status === 'pending' && (
                        <>
                          <button
                            className={styles.approveButton}
                            onClick={() => handleStatusChange(request.id, 'approved')}
                          >
                            Одобрить
                          </button>
                          <button
                            className={styles.rejectButton}
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                          >
                            Отклонить
                          </button>
                        </>
                      )}
                      <button
                        className={styles.viewButton}
                        onClick={() => navigate(`/admin/requests/${request.id}`)}
                      >
                        Просмотр
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;