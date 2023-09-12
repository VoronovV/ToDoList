import React, {useState} from 'react';
import {useForm, Controller} from "react-hook-form"
import './login.css'
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../components/Buttons/Button";
import axios from "axios";


const Login = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState("")

    const {
        register,
        formState: {isValid},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = async (data) => {

        const userData = {
            email:email,
            password:password
        }

        console.log(userData);

        const user = await axios.post('https://calendar-test.k3s.bind.by/api/login/', userData).
        then(function (response){navigate('/calendar');}).
        catch(function (error) {
            if (error.response) {
                for(let key in error.response.data){
                    setErrors(error.response.data[key][0]);
                }
                console.log(error.response.data);
                }});


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
                                        <input placeholder=" Пароль" type="password" onChange={onChangePassword}
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