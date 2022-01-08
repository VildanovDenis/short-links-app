import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useToasterMessage } from '../hooks/toaster.hook'

export const AuthPage = () => {
    const { isLoading, request, error, clearError } = useHttp()
    const auth = useContext(AuthContext)
    const showMessage = useToasterMessage()
    const [values, setValues] = useState({ email: '', password: '' })

    const onInputChange = (e) => {
        const { name, value } = e.target

        setValues({ ...values, [name]: value })
    }

    const onRegisterClick = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...values })
            showMessage(data.message)
        } catch (e) {}
    }

    const onLoginClick = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...values })
            showMessage('Welcome back')
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    useEffect(() => {
        if (error) {
            showMessage(error)
            clearError()
        }
    }, [error, showMessage, clearError])

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Make your link shorter</h1>
                <div className='card blue-grey darken-1'>
                    <div className='card-content white-text'>
                        <span className='card-title'>Authorization</span>
                        <div>

                            <div className='input-field'>
                                <input
                                    // placeholder='email'
                                    id='email'
                                    type='text'
                                    className='validate'
                                    name='email'
                                    value={values.email}
                                    onChange={onInputChange}
                                />
                                <label htmlFor='email'>Email</label>
                            </div>

                            <div className='input-field'>
                                <input
                                    // placeholder='Password'
                                    id='password'
                                    type='password'
                                    className='validate'
                                    name='password'
                                    value={values.password}
                                    onChange={onInputChange}
                                />
                                <label htmlFor='password'>Password</label>
                            </div>

                        </div>
                    </div>
                    <div className='card-action'>
                        <button
                            className='btn yellow darken-4'
                            style={{ marginRight: '10px' }}
                            disabled={isLoading}
                            onClick={onLoginClick}
                        >
                            Log in
                        </button>
                        <button
                            className='btn grey lighten-1'
                            onClick={onRegisterClick}
                            disabled={isLoading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
