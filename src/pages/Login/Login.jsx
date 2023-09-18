import React, {useState} from 'react';
import {useForm, Controller} from "react-hook-form"
import styles from './login.module.css'
import {useNavigate} from 'react-router-dom';
import Header from "../../components/Header/Header";
import {login} from "../../services/services";
import Button from "../../components/Buttons/Button";


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
            } else {
                for (let key in token) {
                    setErrors(token[key][0]);
                }
            }
        })
    }

    return (
        <div className={styles.loginPage}>
            <Header value="Назад"></Header>
            <div className={styles.loginForm}>
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
                    <div className={styles.error}>
                        {errors && <p>{errors || "Error!"}</p>}
                    </div>
                    <Button value="Войти"></Button>
                </form>
            </div>
        </div>
    );
};

export default Login;