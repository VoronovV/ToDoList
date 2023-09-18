import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Button from "../../components/Buttons/Button";
import styles from "./dayPage.module.css"
import {deleteRecordByPk, getDay} from "../../services/services";
import {Link} from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import ModalWindowDelete from "../../components/ModalWindows/ModalWindowDelete";
import ModalWindowEdit from "../../components/ModalWindows/ModalWindowEdit";


function DayPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const date = localStorage.getItem('day');
    const splitDate = date ? date.split('-') : "";
    const [dayData, setDayData] = useState([]);


    const fetchData = async () => {
        const data = await getDay(splitDate, date)
        setDayData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClickDelete = (pk) => {
        deleteRecordByPk(pk);
        setIsModalOpen(true);
    }

    const handleClickEdit = () => {
        setIsModalOpenEdit(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalOpenEdit(false);
        window.location.reload();
    };

    return (
        <div>
            <ModalWindowDelete isOpen={isModalOpen} closeModal={closeModal}/>
            <Header path="calendar" value="Назад">
            </Header>
            <div className={styles.dayPage}>
                <h2>{`${Calendar.defaultProps.month[parseInt(splitDate[1]) - 1]} ${splitDate[2]} ${splitDate[0]}`}</h2>
                <div className={styles.tasks}>
                    {dayData && dayData.map((task, index) => (
                        <div key={index} className={styles.task}>
                            <ModalWindowEdit isOpen={isModalOpenEdit} closeModal={closeModal} task={task}/>
                            <div className={styles.description}>
                                <h3>{task.name}</h3>
                                <section>{task.description}</section>
                                <p>{task.start_time} - {task.end_time}</p>
                            </div>
                            <div className={styles.buttons}>
                                <Button value="Изменить" onClick = {() => handleClickEdit()}></Button>
                                <Button value="Удалить" onClick = {() => handleClickDelete(task.pk)}></Button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/addTask">
                    <Button value="Добавить задачу"></Button>
                </Link>
            </div>
        </div>
    );
}

export default DayPage;