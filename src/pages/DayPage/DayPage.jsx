import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Button from "../../components/Buttons/Button";
import "./dayPage.css"
import {useSelector} from "react-redux";
import {getDay} from "../../services/services";
import {Link} from "react-router-dom";




function DayPage() {


    const date = useSelector((state) => state.day.date);


    const splitDate = date ? date.split('-') : "";


    const [dayData,setDayData] = useState([]);
    const fetchData = async () => {
        const data = await getDay(splitDate, date)
        setDayData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addTask = () => {

    }

    return (
        <div >
            <Header>
            </Header>
            <div className="dayPage">

                <h2>{date}</h2>
                <div className="tasks">
                    {dayData && dayData.map((task, index) => (
                        <div key={index} className="task">
                            <div>
                                <h3>{task.name}</h3>
                                <section>{task.description}</section>
                                <p>{task.start_time} - {task.end_time}</p>
                            </div>
                            <div className="buttons">
                                <button>Изменить</button>
                                <button>Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/addTask">
                    <Button value="Добавить задачу" onClick = {addTask} ></Button>
                </Link>

            </div>
        </div>
    );
}

export default DayPage;