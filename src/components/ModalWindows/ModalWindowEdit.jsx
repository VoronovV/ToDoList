import React, {useState} from 'react';
import Modal from 'react-modal';
import styles from './modalWindowEdit.module.css'
import {Controller, useForm} from "react-hook-form";
import TimePicker from "../DatePicker/DatePicker";
import {editRecordByPk} from "../../services/services";
import Button from "../Buttons/Button";


const ModalWindowEdit = ({isOpen, closeModal, task}) => {

    const {
        handleSubmit,
        control
    } = useForm();
    const date = localStorage.getItem('day');
    const [errors, setErrors] = useState("");

    const onSubmit = (data) => {
        data.day = date;
        data.pk = task.pk;
        editRecordByPk(data).then((response) => {
            if (response) {
                for (let key in response) {
                    setErrors(response[key]);
                }
            } else {
                closeModal();
            }
        })

    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Редактирование задачи"
            className={styles.customModal}>
            <Button value="x" onClick={closeModal} ></Button>
            <div>
                <h1 className={styles.name}>Редактировать задачу</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={task.name}
                        render={({field}) => <input placeholder="Название" {...field} />}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue={task.description}
                        render={({field}) => <textarea  placeholder="Описание" {...field} />}
                    />
                    <Controller
                        name="start_time"
                        control={control}
                        defaultValue={task.start_time}
                        render={({field}) => <TimePicker defaultValue={task.start_time} control={control}
                                                         name="start_time" placeholder="Выберите время начала"/>}
                    />
                    <Controller
                        name="end_time"
                        control={control}
                        defaultValue={task.end_time}
                        render={({field}) => <TimePicker defaultValue={task.end_time} control={control} name="end_time"
                                                         placeholder="Выберите время окончания"/>}
                    />
                    <div>
                        {errors && <p>{errors || "Error!"}</p>}
                    </div>
                   <Button value="Изменить"></Button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalWindowEdit;