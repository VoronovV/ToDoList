import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Button from "../../components/Buttons/Button";
import "./dayPage.css"
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
            <div className="dayPage">
                <h2>{`${Calendar.defaultProps.month[parseInt(splitDate[1]) - 1]} ${splitDate[2]} ${splitDate[0]}`}</h2>
                <div className="tasks">
                    {dayData && dayData.map((task, index) => (
                        <div key={index} className="task">
                            <ModalWindowEdit isOpen={isModalOpenEdit} closeModal={closeModal} task={task}/>
                            <div className="description">
                                <h3>{task.name}</h3>
                                <section>{task.description}</section>
                                <p>{task.start_time} - {task.end_time}</p>
                            </div>
                            <div className="buttons">

                                <button onClick={() => handleClickEdit()}>Изменить</button>
                                <button onClick={() => handleClickDelete(task.pk)}>Удалить</button>
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