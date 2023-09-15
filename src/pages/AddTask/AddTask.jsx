import React, {useState} from 'react';
import {addTask} from "../../services/services";
import {useForm, Controller} from 'react-hook-form';
import "./addTask.css"
import Header from "../../components/Header/Header";
import {useNavigate} from 'react-router-dom';
import TimePicker from "../../components/DatePicker/DatePicker";

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
            <div className="addTask">
                <h1>Добавить задачу</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input className="input" placeholder="Название" {...field} />}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({field}) => <textarea className="input" placeholder="Описание" {...field} />}
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
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;