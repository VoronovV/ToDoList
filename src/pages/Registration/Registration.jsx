import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import './registration.css'
import axios from "axios";
import Header from "../../components/Header/Header";
import {registration} from "../../services/services";

function Registration(props) {

    const navigate = useNavigate();
    const [errors, setErrors] = useState("")

    const {
        handleSubmit,
        control,
    } = useForm({
        mode: "onBlur"
    });


    const onSubmit = (data) => {
        registration(data).then((token) => {
            if (typeof token === 'string') {
                navigate('/calendar')
            } else {
                for (let key in token) {
                    setErrors(token[key][0]);
                }
            }
        })
    }

    return (
        <div className="registrationPage">
            <Header value="Назад"></Header>
            <div className="registrationForm">
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <input placeholder="Логин" type="email" {...field} />
                                )}
                    />
                    <Controller name="password1"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <input placeholder="Пароль" type="password" {...field} />
                                )}
                    />
                    <Controller name="password2"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <input placeholder="Повтор пароля" type="password" {...field} />
                                )}
                    />
                    <div>
                        {errors && <p>{errors || "Error!"}</p>}
                    </div>
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;