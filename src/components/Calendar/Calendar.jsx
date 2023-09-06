import React, {Component} from "react";
import './Calendar.css';


class Calendar extends Component {

    static defaultProps = {
        years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    };
    render() {
        
        const {years, month, weekDays} = this.props;


        return (
            <div className="calendar">
                <header>
                    <button>{'<'}</button>

                    <select>
                        {month.map((name, index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>
                    <select>
                        {years.map((name, index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>

                    <button>{'>'}</button>
                </header>

                <table>
                    <thead>
                    <tr>
                        {weekDays.map(day =>
                            <th key={day}>{day}</th>
                        )}
                    </tr>
                    </thead>

                    <tbody>

                    </tbody>
                </table>
            </div>
        );
    }


}

export default Calendar;