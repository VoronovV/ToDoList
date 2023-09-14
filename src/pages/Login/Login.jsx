import React, {useState} from 'react';
import {useForm, Controller} from "react-hook-form"
import './login.css'
import {useNavigate} from 'react-router-dom';
import Header from "../../components/Header/Header";
import {login} from "../../services/services";


function Login() {

    const navigate = useNavigate();

    const [errors, setErrors] = useState("")

    const {
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });


    const onSubmit = (data) => {
        login(data).then((token) => {
            if (typeof token === 'string') {
                navigate('/calendar')
            }else{
                setErrors(token['non_field_errors'][0])
            }
        })
    }

    return (
        <div className="loginPage">
            <Header value="Назад"></Header>
            <div className="loginForm">
                <h1>Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <input placeholder="Логин" type="email" {...field} />
                                )}
                    />
                    <Controller name="password"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <input placeholder=" Пароль" type="password" {...field} />
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
};

export default Login;