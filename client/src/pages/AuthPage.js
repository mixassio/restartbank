import React, { useContext, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: '', password: ''});

  useEffect(() => {
    message(error);
    clearError()
  }, [error, message, clearError]);
  useEffect(() => {
    window.M.updateTextFields();
  }, [])
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (error) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId);
      message(data.message)
      redirect('/songs')
    } catch (error) {}
  }
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Songs</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Autorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Input Email"
                  id="email"
                  type="text"
                  name='email'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name='password'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className='btn yellow darken-4' style={{marginRight: 10}} onClick={loginHandler} disabled={loading}>Sign In</button>
            <button className='btn grey lighten-1 black-text' onClick={registerHandler} disabled={loading}>Registration</button>
          </div>
        </div>
      </div>
    </div>
  )
}