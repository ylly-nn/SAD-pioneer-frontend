import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SelectDetailsPage.module.scss";
import { useHandlesLogic } from "../../../../hooks/handlesLogic";
import washImg from "../../../../assets/wash.jpg";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; 
}

interface Organization {
  name: string;
  address: string;
}

const SelectDetailsPage = () => {
  const navigate = useNavigate();
  const { handleSelectOrganization } = useHandlesLogic();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [organization, setOrganization] = useState<Organization>({
    name: "Мойка, Авангард",
    address: "ул. Авангардная, 15"
  });

  const generateServices = (): Service[] => {
    const services: Service[] = [];
    
    for (let i = 1; i <= 30; i++) {
      services.push({
        id: `${i}`,
        name: `Услуга ${i}`,
        price: Math.floor(Math.random() * 1000) + 300,
        duration: Math.floor(Math.random() * 90) + 15,
      });
    }
    
    return services.sort((a, b) => a.price - b.price);
  };

  const [availableServices] = useState<Service[]>(generateServices);

  useEffect(() => {
    const draft = localStorage.getItem("bookingDraft");
    if (draft) {
      const parsed = JSON.parse(draft);
      if (parsed.organization) {
        setOrganization(parsed.organization);
      }
      if (parsed.selectedServices) {
        setSelectedServices(parsed.selectedServices);
      }
    }
  }, []);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const calculateTotal = () => {
    const selected = availableServices.filter(s => selectedServices.includes(s.id));
    const totalPrice = selected.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = selected.reduce((sum, s) => sum + s.duration, 0);
    return { totalPrice, totalDuration };
  };

  const { totalPrice, totalDuration } = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Выберите хотя бы одну услугу");
      return;
    }

    // Сохраняем в localStorage
    const currentDraft = JSON.parse(localStorage.getItem("bookingDraft") || "{}");
    const selectedServicesData = availableServices.filter(s => selectedServices.includes(s.id));
    const {
    handleHome

    const updatedDraft = {
      ...currentDraft,
      selectedServices: selectedServices,
      selectedServicesData: selectedServicesData,
      totalPrice,
      totalDuration,
    };

    localStorage.setItem("bookingDraft", JSON.stringify(updatedDraft));

    navigate("/user/service/select-time");
  };

  const handleBack = () => {
    navigate("/user/service/select-organization");
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} ч ${mins > 0 ? `${mins} мин` : ''}`;
    }
    return `${mins} мин`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Запись на услугу</h1>
            </div>

            <div className={styles.formContent}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.sectionTitle}>Уточните детали услуги</h2>

                <div className={styles.organizationInfo}>
                  <div className={styles.orgName}>{organization.name}</div>
                  <div className={styles.orgAddress}>
                    📍 {organization.address}
                  </div>
                  <div className={styles.orgTotal}>
                    Итог: {totalPrice} RUB
                  </div>
                </div>

                <div className={styles.totalSection}>
                  <div className={styles.totalRow}>
                    <span>Сумма:</span>
                    <span className={styles.totalPrice}>{totalPrice} RUB</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Общее время:</span>
                    <span className={styles.totalDuration}>
                      ⏱️ {formatDuration(totalDuration)}
                    </span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Итого к оплате:</span>
                    <span className={styles.totalPrice}>{totalPrice} RUB</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submit}
                  disabled={selectedServices.length === 0}
                >
                  Далее
                </button>
              </form>
            </div>

            <div className={styles.footer}>
              <button className={styles.backButton} onClick={handleBack}>
                Назад
              </button>
              <p className={styles.step}>3 / 5</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>
              Выберите услуги
              {selectedServices.length > 0 && (
                <span style={{ fontSize: '14px', color: '#549293', marginLeft: '8px' }}>
                  (выбрано: {selectedServices.length})
                </span>
              )}
            </h2>
            
            <div className={styles.servicesContainer}>
              <div className={styles.servicesList}>
                {availableServices.map((service) => (
                  <div
                    key={service.id}
                    className={`${styles.serviceItem} ${
                      selectedServices.includes(service.id) ? styles.selected : ''
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className={styles.serviceInfo}>
                      <div className={`${styles.checkbox} ${
                        selectedServices.includes(service.id) ? styles.checked : ''
                      }`}>
                        {selectedServices.includes(service.id) && "✓"}
                      </div>
                      <div className={styles.serviceDetails}>
                        <div className={styles.serviceName}>{service.name}</div>
                        <div className={styles.serviceMeta}>
                          <span className={styles.servicePrice}>
                            {service.price} RUB
                          </span>
                          <span className={styles.serviceDuration}>
                            ⏱️ {formatDuration(service.duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.imageSection}>
              <img src={washImg} alt="Автомойка" className={styles.image} />
              <div className={styles.imageOverlay} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectDetailsPage;