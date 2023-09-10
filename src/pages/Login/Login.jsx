import React from 'react';
import {useForm, Controller} from "react-hook-form"
import './login.css'
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../components/Buttons/Button";

const Login = () => {

    const navigate = useNavigate();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        console.log(data);

        navigate('/calendar');
    }

    return (
        <div className="loginPage">
            <header>
                <Link to="/">
                    <Button value="Назад"/>
                </Link>

            </header>
            <div className="loginForm">
                <h1>Вход</h1>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label>

                        <input placeholder=" Логин" {
                                   ...register("login", {
                                       required: "Поле обязательно к заполнению",
                                       minLength: {
                                           value:5,
                                           message: "Минимум 5 символов"
                                       }
                                   })
                               }
                        />
                    </label>
                    <div>
                        {errors?.login && <p>{errors?.login?.message || "Error!"}</p>}
                    </div>
                    <label >
                        <Controller name="password"
                                    control={control}
                                    render={() => (
                                        <input placeholder=" Пароль" type="password" {
                                            ...register("password", {
                                                required: "Поле обязательно к заполнению",
                                                minLength: {
                                                    value:5,
                                                    message: "Минимум 5 символов"
                                                }
                                            })
                                        }
                                        />
                                        )}
                                        />

                    </label>
                    <div>
                        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
                    </div>
                    <button type="submit" disabled={!isValid}>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;