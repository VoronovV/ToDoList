import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Button from "../../components/Buttons/Button";
import './registration.css'

function Registration(props) {

    const navigate = useNavigate();



    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        watch
    } = useForm({
        mode: "onBlur"
    });
    let pwd = watch("password");

    const onSubmit = (data) => {
        console.log(data);

        navigate('/calendar');
    }

    return (
        <div className="registrationPage">
            <header>
                <Link to="/">
                    <Button value="Назад"/>
                </Link>

            </header>
            <div className="registrationForm">
                <h1>Регистрация</h1>
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
                    <label >
                        <Controller name="repeatPassword"
                                    control={control}
                                    rules={{validate: value => value === pwd || "Пароли не совпадают"}}
                                    render={() => (
                                        <input placeholder=" Повтор пароля" type="password" {
                                            ...register("repeatPassword", {
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
                        {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || "Error!"}</p>}
                    </div>
                    <button type="submit" disabled={!isValid}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;