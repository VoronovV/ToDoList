import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Controller} from 'react-hook-form';
import {format} from 'date-fns';
import styles from "../ModalWindows/modalWindowEdit.module.css"

function TimePicker({control, name, placeholder, defaultValue}) {
    let currentDate = new Date(); // Получаем текущую дату и время
    if (defaultValue) {
        const timeParts = defaultValue.split(":"); // Разбиваем строку времени на часы, минуты и секунды
        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            const seconds = parseInt(timeParts[2], 10);

            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                currentDate.setHours(hours, minutes, seconds);
            }
        }
    } else {
        currentDate = null;
    }


    const [selectedTime, setSelectedTime] = useState(currentDate);

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <DatePicker
                        selected={selectedTime}
                        className={styles.input}
                        onChange={(date) => {
                            handleTimeChange(date);
                            const formattedTime = format(date, 'HH:mm:ss');
                            field.onChange(formattedTime);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={10}
                        dateFormat="HH:mm:ss"
                        placeholderText={placeholder}
                    />
                )}
            />
        </div>
    );
}

export default TimePicker;