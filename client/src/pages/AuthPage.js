import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hook/http.hook";
import {useMessage} from "../hook/message.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            navigate('/create');
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth Page</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Write your Email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    email='password'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Write your Password"
                                    id="password"
                                    type="password"
                                    className="yellow-input"
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                        >
                            Log in
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}