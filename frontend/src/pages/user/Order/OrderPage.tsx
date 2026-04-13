import styles from "./OrderPage.module.scss";
import { useNavigation } from "../../../hooks/useNavigation";
import { useUserOrderDetails } from "../../../hooks/useUserOrderDetails";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import { usePageToast } from "../../../hooks/usePageToast";


const OrderPage = () => {
  usePageToast();
  const { getStatusLabel } = useOrderStatus();

  const { goBack } = useNavigation();

  const {
    order,
    isLoading,
    formatDate,
    getTimeRange,
    details,
    totalDuration,
    totalPrice
  } = useUserOrderDetails();

  if (isLoading) return <div className={styles.page}>Загрузка...</div>;

  if (!order)
    return <div className={styles.page}>Заказ не найден</div>;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          <div className={styles.leftSection}>
            <div className={styles.formContent}>
              <div className={styles.confirmationCard}>
                <h2 className={styles.title}>
                  {order.service}
                </h2>

                <p className={styles.subtitle}>
                  {order.name_company}
                </p>

                <div className={styles.details}>
                  
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Статус</span>
                    <span className={styles.detailValue}>
                      <div
                      className={styles.statusBadge}>
                        {getStatusLabel(order.status)}
                      </div>
                    </span>
                  </div>


                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Город</span>
                    <span className={styles.detailValue}>
                      {order.city}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Адрес</span>
                    <span className={styles.detailValue}>
                      {order.address}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Дата</span>
                    <span className={styles.detailValue}>
                      {formatDate(order.start_moment)}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Время</span>
                    <span className={styles.detailValue}>
                      {getTimeRange()}
                    </span>
                  </div>
                </div>

                <button
                  className={styles.submit}
                  onClick={goBack}
                >
                  Назад
                </button>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.rightCard}>
              <h3 className={styles.sectionTitle}>
                Состав услуги
              </h3>

              <div className={styles.details1}>
                {details.map((item, index) => (
                  <div
                    key={index}
                    className={styles.detailItem}
                  >
                    <span className={styles.detailLabel}>
                      {item.name}
                    </span>
                    <span className={styles.detailValue}>
                      {item.time} мин • {item.price} ₽
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Общее время
                  </span>
                  <span className={styles.detailValue}>
                    {totalDuration} мин
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Общая цена
                  </span>
                  <span className={styles.detailValue}>
                    {totalPrice} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderPage;