import { useEffect, useMemo, useState } from "react";
import styles from "./SelectTimePage.module.scss";

import { useNavigation } from "../../../../hooks/useNavigation";
import { useBooking } from "../../../../hooks/useBooking";
import { useFreeTimeCached } from "../../../../hooks/useFreeTime";
import { useCreateOrder } from "../../../../hooks/useCreateOrder";
import { useCalendar } from "../../../../hooks/useCalendar";
import { formatLocalDate } from "../../../../utils/date";

const getUserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const SelectTimePage = () => {
  const { goToSelectDetails } = useNavigation();
  const { booking, isLoaded } = useBooking();
  const { createOrder, loading } = useCreateOrder();

  const {
    selectedDate,
    setSelectedDate,
    currentMonth,
    nextMonth,
    prevMonth,
    getDaysInMonth,
    isPastDate,
  } = useCalendar();

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timezone = getUserTimezone();

  const { slots } = useFreeTimeCached(
    booking.branchId,
    selectedDate,
    booking.details?.totalDuration,
    timezone,
  );

  const daySlots = useMemo(() => {
    const day = formatLocalDate(selectedDate);

    return slots.filter((s) => s.date === day);
  }, [slots, selectedDate]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!booking.branchId || !booking.details) {
      goToSelectDetails();
    }
  }, [isLoaded, booking]);

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <section className={styles.columns}>
          {/* LEFT */}
          <div className={styles.leftSection}>
            <div className={styles.header}>
              <h1 className={styles.title}>Запись на услугу</h1>
            </div>

            <div className={styles.formContent}>
              <h2 className={styles.sectionTitle}>Выбранные услуги</h2>
              {booking.organization && (
                <div className={styles.organizationInfo}>
                  <div className={styles.orgName}>
                    {booking.organization.name}
                  </div>
                  <div className={styles.orgAddress}>
                    {booking.organization.address}
                  </div>
                </div>
              )}

              <button
                className={styles.submit}
                disabled={!selectedSlot || loading}
                onClick={() => selectedSlot && createOrder(selectedSlot)}
              >
                {loading ? "Создание..." : "Далее"}
              </button>
            </div>

            <div className={styles.footer}>
              <button className={styles.backButton} onClick={goToSelectDetails}>
                Назад
              </button>

              <p className={styles.step}>1 / 5</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.rightSection}>
            <h2 className={styles.rightTitle}>Выберите дату и время</h2>

            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <span>
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </span>

                <div>
                  <button onClick={prevMonth}>←</button>
                  <button onClick={nextMonth}>→</button>
                </div>
              </div>

              <div className={styles.weekdays}>
                {weekdays.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className={styles.days}>
                {days.map((date, i) => {
                  if (!date) {
                    return <div key={i} className={styles.dayEmpty}></div>;
                  }

                  const isPast = isPastDate(date);
                  const isSelected =
                    selectedDate.toDateString() === date.toDateString();

                  return (
                    <div key={i}>
                      <button
                        className={`${styles.day} 
          ${isSelected ? styles.selected : ""}
          ${isPast ? styles.disabled : ""}
        `}
                        disabled={isPast}
                        onClick={() => {
                          if (!isPast) {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                          }
                        }}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.timeSlots}>
              {daySlots.map((slot) => {
                const isPast = new Date(slot.iso) < new Date();

                return (
                  <button
                    key={slot.iso}
                    disabled={isPast}
                    className={`${styles.timeSlot} 
        ${selectedSlot === slot.iso ? styles.selected : ""}
        ${isPast ? styles.disabled : ""}
      `}
                    onClick={() => !isPast && setSelectedSlot(slot.iso)}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectTimePage;
