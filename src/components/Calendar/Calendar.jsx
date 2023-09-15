import React, {useState, useRef, useEffect} from 'react';
import './Calendar.css';
import * as calendar from './CalendarFunctions';
import {useNavigate} from 'react-router-dom';
import {getDayInformation} from "../../services/services"
import Header from "../Header/Header";


function Calendar(props) {
    const [date, setDate] = useState(props.date);
    const navigate = useNavigate();

    const year = date.getFullYear();
    const monthValue = date.getMonth();

    const yearSelectRef = useRef(null);
    const monthSelectRef = useRef(null);

    const selectedYear = useRef(year);
    const selectedMonth = useRef(monthValue);

    useEffect(() => {
        selectedYear.current = year;
        selectedMonth.current = monthValue;
    }, [year, monthValue]);

    const prevMonthButtonClick = () => {
        const newYear = selectedYear.current;
        const newMonth = selectedMonth.current - 1;

        selectedMonth.current = newMonth;
        selectedYear.current = newYear;

        const newDate = new Date(newYear, newMonth);
        setDate(newDate);
    };

    const nextMonthButtonClick = () => {
        const newYear = selectedYear.current;
        const newMonth = selectedMonth.current + 1;

        selectedMonth.current = newMonth;
        selectedYear.current = newYear;

        const newDate = new Date(newYear, newMonth);
        setDate(newDate);
    };

    const selectChange = () => {
        const newYear = parseInt(yearSelectRef.current.value);
        const newMonthValue = parseInt(monthSelectRef.current.value);

        const newDate = new Date(newYear, newMonthValue);
        setDate(newDate);

        // Обновляем выбранный год и месяц
        selectedYear.current = newYear;
        selectedMonth.current = newMonthValue;
    };

    const dayClick = (date) => {
        localStorage.setItem('day', getCorrectDay(date));
        navigate('/dayPage');
    };

    const [dayData, setDayData] = useState({});
    const fetchData = async () => {
        const data = await getDayInformation(year, monthValue)
        setDayData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const getCorrectDay = (date) => {
        return `${date.getFullYear()}-${date.toLocaleString("default", {month: "2-digit"})}-${date.toLocaleString("default", {day: "2-digit"})}`;
    }

    const {years, month, weekDays} = props;
    const monthData = calendar.getMonthData(selectedYear.current, selectedMonth.current);

    useEffect(() => {
        // Обновляем значения в select
        monthSelectRef.current.value = selectedMonth.current;
        yearSelectRef.current.value = selectedYear.current;
    }, [selectedMonth.current, selectedYear.current]);


    return (
        <div>
            <Header value="Выход"></Header>
            <div className="calendar">

                <header>
                    <button onClick={prevMonthButtonClick}>{'<'}</button>
                    <select value={selectedMonth.current} ref={monthSelectRef} onChange={selectChange}>
                        {month.map((name, index) => (
                            <option key={name} value={index}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedYear.current} ref={yearSelectRef} onChange={selectChange}>
                        {years.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <button onClick={nextMonthButtonClick}>{'>'}</button>

                </header>
                <table className="table">
                    <thead>
                    <tr>
                        {weekDays.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {monthData.map((week, index) => (
                        <tr key={index}>
                            {week.map((date, index) =>
                                date ? (
                                    <td
                                        onClick={() => {
                                            dayClick(date);
                                        }}
                                        key={index}
                                        className="cell"
                                    >
                                        <h4 className="numberOfDay">{date.getDate()}</h4>
                                        <div>
                                            {dayData[getCorrectDay(date)] ? (
                                                dayData[getCorrectDay(date)]
                                                    .slice(0, 3) // Ограничение до первых трех элементов
                                                    .map((task, index) => (
                                                        <div className="taskPreview" key={index}>{task.name}</div>
                                                    ))
                                            ) : ""}
                                        </div>
                                    </td>
                                ) : (
                                    <td key={index} className="empty-cell"></td>
                                )
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

Calendar.defaultProps = {
    date: new Date(),
    years: [
        2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
    ],
    month: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    weekDays: [
        'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
    ],
    onChange: Function.prototype
};

export default Calendar;