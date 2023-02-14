import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext)
    const [loginInput, setLoginInput] = useState({
        loginPassword: '',
        loginName: ''
    })
    const handleLoginInput = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    }
    const login = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            username: loginInput.loginName,
            password: loginInput.loginPassword
        })
            .then(res => {
                storeToken(res.data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => {
                console.log(err, 'errlogin')
            })
    }
    return (
        <div className='h-screen flex flex-col justify-center content-center items-center bg-cyan-50'>
            <div className='bg-white flex flex-col justify-center items-center rounded-lg drop-shadow-lg'>
                <p className='m-5 text-lg'>Log In</p>
                <form className='m-5 flex flex-col items-center '>
                    <label className='m-2'>Username</label>
                    <input className='border-gray border-2 rounded-md m-2' onChange={handleLoginInput} value={loginInput.signupName} name="loginName" type="text" />
                    <label className='m-2'>Password</label>
                    <input className='border-gray border-2 rounded-md m-2' onChange={handleLoginInput} value={loginInput.signupPassword} name="loginPassword" type="password" />
                    <button className='bg-cyan-800 p-2 m-5 text-white rounded-md' onClick={login} >Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
