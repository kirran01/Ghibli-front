import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';


const NavModal = ({ closeModal }) => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);

    return (
        <div>
            {isLoggedIn && <ul className='flex flex-col items-center p-5'>
                <Link onClick={closeModal} className='m-2' to={'/'}>
                    Home
                </Link>
                <Link onClick={closeModal} className='m-2' to={'/signup'}>
                    Signup
                </Link>
                <Link onClick={closeModal} className='m-2' to={'/login'}>
                    Login
                </Link>
                <Link onClick={closeModal} className='m-2' to={'/profile'}>
                    Profile
                </Link>
            </ul>}
            {!isLoggedIn && <ul className='flex flex-col items-center p-5'>
                <Link onClick={closeModal} className='m-2' to={'/'}>
                    Home
                </Link>
                <Link onClick={closeModal} className='m-2' to={'/signup'}>
                    Signup
                </Link>
                <Link onClick={closeModal} className='m-2' to={'/login'}>
                    Login
                </Link>
            </ul>}
        </div>
    );
}

export default NavModal;
