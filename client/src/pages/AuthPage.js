import React from "react";

export const AuthPage = () => {
    return (
        <div>
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
                                        className="yellow-input"
                                        email='password'

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
                                    />
                                    <label htmlFor="email">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" style={{marginRight: 10}}>Log in</button>
                            <button className="btn grey lighten-1 black-text">Registration</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}