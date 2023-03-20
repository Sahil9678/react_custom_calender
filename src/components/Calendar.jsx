import React, {useState} from "react";
import dateFns from "date-fns";

const Calendar = () => {
  const [date1, setdate1] = useState({currentMonth: new Date(),
    selectedDate: new Date()})

  const renderheader = () => {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(date1.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  const renderdays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(date1.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="row">{days}</div>;
  }
  
  const rendercells = ()=> {
    const { currentMonth, selectedDate } = date1;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const onDateClick = (day) => {
    setdate1(prev => ({
      ...prev ,selectedDate: day
    }));
  };

  const nextMonth = () => {
    setdate1(prev => ({
      ...prev,currentMonth: dateFns.addMonths(date1.currentMonth, 1)
    }));
  };

  const prevMonth = () => {
    setdate1(prev => ({
      ...prev, currentMonth: dateFns.subMonths(date1.currentMonth, 1)
    }));
  };

  return (
    <div className="calendar">
      {renderheader()}
      {renderdays()}
      {rendercells()}
    </div>
  );
}


export default Calendar;
