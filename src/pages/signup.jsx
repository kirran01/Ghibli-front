import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [signupError, setSignUpError] = useState(false)
    const [signupInput, setSignupInput] = useState({
        signupEmail: '',
        signupPassword: '',
        signupName: ''
    })
    const handleSignupInput = (e) => {
        setSignupInput({ ...signupInput, [e.target.name]: e.target.value })
    }
    const signup = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            email: signupInput.signupEmail,
            password: signupInput.signupPassword,
            username: signupInput.signupName,
        })
            .then(res => {
                navigate('/login')
            })
            .catch(err => {
                console.log(err, 'errsignup')
                setSignUpError(true)
                setErrorMessage(err.response.data.message)
                console.log(err.response.data.message, 'erdm')
            })
    }
    return (
        <div className='h-screen flex flex-col justify-center content-center items-center bg-cyan-50'>
            {signupError && <p className='my-4 text-center px-5'>{errorMessage}</p>}
            <div className='bg-white flex flex-col justify-center items-center rounded-lg drop-shadow-lg'>
                <h1 className='m-5'>Sign up</h1>
                <form className='m-5 flex flex-col items-center '>
                    <label className='m-2'>Email</label>
                    <input className='border-gray border-2 rounded-md m-2' onChange={handleSignupInput} value={signupInput.signupEmail} name="signupEmail" type="text" />
                    <label className='m-2'>Username</label>
                    <input className='border-gray border-2 rounded-md m-2' onChange={handleSignupInput} value={signupInput.signupName} name="signupName" type="text" />
                    <label className='m-2'>Password</label>
                    <input className='border-gray border-2 rounded-md m-2' onChange={handleSignupInput} value={signupInput.signupPassword} name="signupPassword" type="password" />
                    <button className='bg-cyan-800 p-2 m-5 text-white rounded-md' onClick={signup} >Create Account</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
