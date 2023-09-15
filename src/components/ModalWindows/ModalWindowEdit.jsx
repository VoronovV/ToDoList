import React, {useState} from 'react';
import Modal from 'react-modal';
import styles from './modalWindowEdit.module.css'
import {Controller, useForm} from "react-hook-form";
import TimePicker from "../DatePicker/DatePicker";
import {editRecordByPk} from "../../services/services";
import {useNavigate} from "react-router-dom";

const ModalWindowEdit = ({isOpen, closeModal, task}) => {

    const {
        handleSubmit,
        control
    } = useForm();
    const date = localStorage.getItem('day');
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");

    const onSubmit = (data) => {
        data.day = date;
        data.pk = task.pk;
        editRecordByPk(data).then((response) => {
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
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Редактирование задачи"
            className={styles.customModal}>
            <button className={styles.buttonModal} onClick={closeModal}>x</button>
            <div>
                <h1 className={styles.name}>Редактировать задачу</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={task.name}
                        render={({field}) => <input className={styles.input} placeholder="Название" {...field} />}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue={task.description}
                        render={({field}) => <textarea className={styles.input} placeholder="Описание" {...field} />}
                    />
                    <Controller
                        name="start_time"
                        className={styles.input}
                        control={control}
                        defaultValue={task.start_time}
                        render={({field}) => <TimePicker defaultValue={task.start_time} control={control}
                                                         name="start_time" placeholder="Выберите время начала"/>}
                    />
                    <Controller
                        name="end_time"
                        className={styles.input}
                        control={control}
                        defaultValue={task.end_time}
                        render={({field}) => <TimePicker defaultValue={task.end_time} control={control} name="end_time"
                                                         placeholder="Выберите время окончания"/>}
                    />
                    <div>
                        {errors && <p>{errors || "Error!"}</p>}
                    </div>
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalWindowEdit;