import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
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
        axios.post('http://localhost:3000/auth/signup', {
            email: signupInput.signupEmail,
            password: signupInput.signupPassword,
            username: signupInput.signupName,
        })
            .then(res => {
                console.log(res.data)
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='h-screen flex justify-center content-center items-center bg-cyan-50'>
            <div className='bg-white flex flex-col justify-center items-center rounded-md drop-shadow-md'>
                <h1 className='m-5'>Sign up</h1>
                <form className='m-5 flex flex-col items-center '>
                    <label>Email</label>
                    <input onChange={handleSignupInput} value={signupInput.signupEmail} name="signupEmail" type="text" className='border-gray border-2 rounded-md' />
                    <label>Username</label>
                    <input onChange={handleSignupInput} value={signupInput.signupName} name="signupName" type="text" className='border-gray border-2 rounded-md' />
                    <label>Password</label>
                    <input onChange={handleSignupInput} value={signupInput.signupPassword} name="signupPassword" type="text" className='border-gray border-2 rounded-md' />
                    <button onClick={signup} className='bg-cyan-800 p-2 m-5 text-white rounded-md'>Create Account</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
