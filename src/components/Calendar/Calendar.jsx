import React, {Component} from "react";
import './Calendar.css';


class Calendar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     };
    // }
    static defaultProps = {
        date: new Date(),
        years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype //empty function
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    get day() {
        return this.state.date.getDate();
    }

    prevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1);
        console.log({date});
        this.setState({date});
    };

    nextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1);
        console.log({date});
        this.setState({date});
    };

    selectChange = () => {
         const year = this.yearSelect.value;
         const month = this.monthSelect.value;

        const date = new Date(year, month);
        console.log({date});
        this.setState({date});
    };

    dayClick = date => {
        this.setState({selectedDate: date});

        this.props.onChange(date);
    };

    render() {

        const {years, month, weekDays} = this.props;

        const monthData = [
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()]
        ];

        return (
            <div className="calendar">
                <header>
                    <button onClick={this.prevMonthButtonClick}>{'<'}</button>

                    <select value={this.month} ref={element => this.monthSelect = element} onChange={this.selectChange}>
                        {month.map((name, index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>
                    <select value={this.year} ref={element => this.yearSelect = element} onChange={this.selectChange}>
                        {years.map((name, index) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </select>

                    <button onClick={this.nextMonthButtonClick}>{'>'}</button>
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
                    {monthData.map((week, index) =>
                        <tr key={index}>
                            {week.map((date, index) =>
                                date ?
                                    <td onClick={()=>this.dayClick(date)} key={index}>{date.getDate()}</td>
                                    :
                                    <td key={index}></td>
                            )}
                        </tr>

                    )}
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Calendar;