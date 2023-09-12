import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Button from "../../components/Buttons/Button";
import './registration.css'
import axios from "axios";

function Registration(props) {

    const navigate = useNavigate();

    const [errors, setErrors] = useState("")

    const {
        register,
        formState: {isValid},
        handleSubmit,
        control,
        watch
    } = useForm({
        mode: "onBlur"
    });
    let pwd = watch("password");

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword1 = (event) => {
        setPassword1(event.target.value);
    }

    const onChangePassword2 = (event) => {
        setPassword2(event.target.value);
    }

    const onSubmit = async (data) => {
        const userData = {
            email:email,
            password1:password1,
            password2:password2
        }

        console.log(userData);

            const user = await axios.post('https://calendar-test.k3s.bind.by/api/registration/', userData).
            then(function (response){navigate('/calendar')}).
            catch(function (error) {
                if (error.response) {
                    for (let key in error.response.data) {
                        setErrors(error.response.data[key][0]);
                    }
                }
            });


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

                        <input placeholder=" Логин" onChange={onChangeEmail}
                        />
                    </label>
                    <div>
                        {errors && <p>{errors || "Error!"}</p>}
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
                                        } onChange={onChangePassword1}
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
                                        } onChange={onChangePassword2}
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