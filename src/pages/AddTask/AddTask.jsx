import React, {useState} from 'react';
import {addTask} from "../../services/services";
import {useForm, Controller} from 'react-hook-form';
import styles from "./addTask.module.css"
import Header from "../../components/Header/Header";
import {useNavigate} from 'react-router-dom';
import TimePicker from "../../components/DatePicker/DatePicker";
import Button from "../../components/Buttons/Button";

function AddTask(props) {

    const [errors, setErrors] = useState("")
    const navigate = useNavigate();
    const {
        handleSubmit,
        control
    } = useForm();

    const date = localStorage.getItem('day');


    const onSubmit = (data) => {
        data.day = date;
        addTask(data).then((response) => {
            if (!response) {
                navigate('/dayPage')
            } else {
                for (let key in response) {
                    setErrors(response[key]);
                }
            }
        })

    }

    return (
        <div>
            <Header value="Назад" path="dayPage"></Header>
            <div className={styles.addTask}>
                <h1>Добавить задачу</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input placeholder="Название" {...field} />}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({field}) => <textarea placeholder="Описание" {...field} />}
                    />
                    <Controller
                        name="start_time"
                        control={control}
                        defaultValue=""
                        render={({field}) => <TimePicker control={control} name="start_time"
                                                         placeholder="Выберите время начала"/>}
                    />
                    <Controller
                        name="end_time"
                        control={control}
                        defaultValue=""
                        render={({field}) => <TimePicker control={control} name="end_time"
                                                         placeholder="Выберите время окончания"/>}
                    />
                    <div>
                        {errors && <p>{errors || "Error!"}</p>}
                    </div>
                    <Button value="Добавить"></Button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;