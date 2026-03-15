import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SelectTimePage.module.scss";
import { useHandlesLogic } from "../../../../hooks/handlesLogic";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Organization {
  id: string;
  name: string;
  address: string;
}

interface BookingDraft {
  organization?: Organization;
  selectedServices?: string[];
  selectedServicesData?: Service[];
  totalPrice?: number;
  totalDuration?: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const SelectTimePage = () => {
  const navigate = useNavigate();
  const { handleSelectDetails } = useHandlesLogic();

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Загрузка данных из localStorage
  useEffect(() => {
    const draftData = localStorage.getItem("bookingDraft");
    if (draftData) {
      const parsed = JSON.parse(draftData);
      setDraft(parsed);
      
      // Если нет выбранных услуг, возвращаем на предыдущий шаг
      if (!parsed.selectedServices || parsed.selectedServices.length === 0) {
        navigate("/user/service/select-details");
      }
    } else {
      navigate("/user/service/select-service");
    }
  }, [navigate]);

  // Генерация временных слотов для выбранной даты, при интеграции уберется
  useEffect(() => {
    //десь будет запрос к API
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const startHour = 9;
      const endHour = 20;
      
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          const isBooked = Math.random() < 0.3;
          
          slots.push({
            time: timeString,
            available: !isBooked,
          });
        }
      }
      
      setTimeSlots(slots);
    };
    
    generateTimeSlots();
  }, [selectedDate]);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} ч ${mins > 0 ? `${mins} мин` : ''}`;
    }
    return `${mins} мин`;
  };

  // Получение дней месяца
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 - воскресенье, 1 - понедельник
    
    const startOffset = startingDay === 0 ? 6 : startingDay - 1;
    
    const days = [];
    
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Переключение месяца
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
      setSelectedTime(null); 
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Выберите дату и время");
      return;
    }

    // Сохраняем в localStorage
    const currentDraft = JSON.parse(localStorage.getItem("bookingDraft") || "{}");
    
    const dateTimeString = `${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00`;
    
    const updatedDraft = {
      ...currentDraft,
      selectedDate: selectedDate.toISOString(),
      selectedTime: selectedTime,
      dateTime: dateTimeString,
    };

    localStorage.setItem("bookingDraft", JSON.stringify(updatedDraft));

    navigate("/user/service/confirm");
  };

  const handleBack = () => {
    navigate("/user/service/details");
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const days = getDaysInMonth(currentMonth);

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
                <h2 className={styles.sectionTitle}>Выбранные услуги</h2>

                {draft?.organization && (
                  <div className={styles.organizationInfo}>
                    <div className={styles.orgName}>{draft.organization.name}</div>
                    <div className={styles.orgAddress}>
                      📍 {draft.organization.address}
                    </div>
                    <div className={styles.orgTotal}>
                      Итог: {draft?.totalPrice} ₽
                    </div>
                  </div>
                )}

                <div className={styles.servicesSummary}>
                  <div className={styles.totalRow}>
                    <span>Сумма:</span>
                    <span className={styles.totalPrice}>{draft?.totalPrice} ₽</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Общее время:</span>
                    <span className={styles.totalDuration}>
                      ⏱️ {formatDuration(draft?.totalDuration || 0)}
                    </span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Итого к оплате:</span>
                    <span className={styles.totalPrice}>{draft?.totalPrice} ₽</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submit}
                  disabled={!selectedDate || !selectedTime}
                >
                  Далее
                </button>
              </form>
            </div>

            <div className={styles.footer}>
              <button className={styles.backButton} onClick={handleBack}>
                ← Назад
              </button>
              <p className={styles.step}>4 / 5</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Выберите дату и время</h2>
            
            <div className={styles.selectionSection}>
              <div className={styles.dateTitle}>Дата</div>
              
              <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                  <span className={styles.calendarMonth}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <div className={styles.calendarNav}>
                    <button 
                      type="button"
                      className={styles.calendarNavButton}
                      onClick={prevMonth}
                    >
                      ←
                    </button>
                    <button 
                      type="button"
                      className={styles.calendarNavButton}
                      onClick={nextMonth}
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className={styles.weekdays}>
                  {weekdays.map(day => (
                    <div key={day} className={styles.weekday}>{day}</div>
                  ))}
                </div>

                <div className={styles.days}>
                  {days.map((date, index) => (
                    <div key={index}>
                      {date ? (
                        <button
                          type="button"
                          className={`${styles.day} ${
                            selectedDate && date.toDateString() === selectedDate.toDateString() 
                              ? styles.selected 
                              : ''
                          } ${isPastDate(date) ? styles.disabled : ''}`}
                          onClick={() => handleDateSelect(date)}
                          disabled={isPastDate(date)}
                        >
                          {date.getDate()}
                        </button>
                      ) : (
                        <div className={styles.dayEmpty}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.timeTitle}>Доступное время</div>
              
              <div className={styles.timeSlots}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`${styles.timeSlot} ${
                      selectedTime === slot.time ? styles.selected : ''
                    } ${!slot.available ? styles.booked : ''}`}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectTimePage;