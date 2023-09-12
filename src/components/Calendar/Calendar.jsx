import React, {useState, useRef, useEffect} from 'react';
import './Calendar.css';
import * as calendar from './CalendarFunctions';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Calendar(props) {
    const [date, setDate] = useState(props.date);
    const [currentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

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
        const newDate = new Date(selectedYear.current, selectedMonth.current - 1);
        console.log({newDate});
        setDate(newDate);
    };

    const nextMonthButtonClick = () => {
        const newDate = new Date(selectedYear.current, selectedMonth.current + 1);
        console.log({newDate});
        setDate(newDate);
    };

    const selectChange = () => {
        const newYear = parseInt(yearSelectRef.current.value);
        const newMonthValue = parseInt(monthSelectRef.current.value);

        const newDate = new Date(newYear, newMonthValue);
        console.log({newDate});
        setDate(newDate);

        // Обновляем выбранный год и месяц
        selectedYear.current = newYear;
        selectedMonth.current = newMonthValue;
    };

    const dayClick = (date) => {
        setSelectedDate(date);
        props.onChange(date);
        navigate('/dayPage');
    };


    const getDayInformation = async () => {
        const dayData1 = await axios.get('https://calendar-test.k3s.bind.by/api/records/?year=2023',
            {headers: {Authorization: `Bearer ${document.cookie.match(/token=(.+?)(;|$)/)[1]}`}}).then(function (response) {
            setDayData(response.data);
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        });
    }
    const [dayData, setDayData] = useState(getDayInformation);
    const {years, month, weekDays} = props;
    const monthData = calendar.getMonthData(selectedYear.current, selectedMonth.current);


    return (
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
                <button onClick={getDayInformation}>test</button>
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
                                    <h6>{date.getDate()}</h6>
                                    <div>
                                        {dayData[`${date.getFullYear()}-${date.toLocaleString("default", {month: "2-digit"})}-${date.toLocaleString("default", {day: "2-digit"})}`] != undefined ?
                                            dayData[`${date.getFullYear()}-${date.toLocaleString("default", {month: "2-digit"})}-${date.toLocaleString("default", {day: "2-digit"})}`]
                                                .map((task, index) => (
                                                    <div key={index}>{task.start_time} {task.end_time}</div>)) : ""}
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
    );
}

Calendar.defaultProps = {
    date: new Date(),
    years: [
        2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
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