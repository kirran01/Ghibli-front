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
        axios.post('http://localhost:3000/auth/login', {
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
        <div className='h-screen flex justify-center content-center items-center bg-cyan-50'>
            <div className='bg-white flex flex-col justify-center items-center rounded-md drop-shadow-md'>
                <h1 className='m-5'>Log In</h1>
                <form className='m-5 flex flex-col items-center '>
                    <label>Username</label>
                    <input onChange={handleLoginInput} value={loginInput.signupName} name="loginName" type="text" className='border-gray border-2 rounded-md' />
                    <label>Password</label>
                    <input onChange={handleLoginInput} value={loginInput.signupPassword} name="loginPassword" type="text" className='border-gray border-2 rounded-md' />
                    <button onClick={login} className='bg-cyan-800 p-2 m-5 text-white rounded-md'>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
