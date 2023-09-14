import React from 'react';
import {addTask} from "../../services/services";
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from "react-redux";
import "./addTask.css"
import Header from "../../components/Header/Header";

function AddTask(props) {

    const {handleSubmit,
        control} = useForm();

    const date = useSelector((state) => state.day.date);


    const onSubmit = (data) => {
        data.day = date;
        addTask(data);
    }

    return (
        <div>
            <Header value = "Назад"></Header>
            <div className="addTask">
                <h1>Добавить задачу</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                        render={({field}) => <input placeholder="Описание" {...field} />}
                    />
                    <Controller
                        name="start_time"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input placeholder="Время начала" {...field} />}
                    />
                    <Controller
                        name="end_time"
                        control={control}
                        defaultValue=""
                        render={({field}) => <input placeholder="Время окончания" {...field} />}
                    />

                    <button type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;