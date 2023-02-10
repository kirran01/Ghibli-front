import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NavModal from './navModal';
import Modal from 'react-modal';
import { useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Nav = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const customStyles = {
        content: {
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <nav className='bg-cyan-900'>
            {isLoggedIn && <ul className='p-5 flex justify-between'>
                <div className='flex items-center content-center'>
                    <li>
                        <HomeIcon onClick={() => { navigate('/') }} sx={{ color: 'white', margin: '0px 8px 0px', cursor: 'pointer' }} />
                    </li>
                    <li className='lg:hidden md:hidden'>
                        <MenuIcon onClick={openModal} className='cursor-pointer' sx={{ color: 'white' }} />
                    </li>
                    <li className='text-white cursor-pointer hidden lg:list-item md:list-item'>
                        Profile
                    </li>
                </div>
                <li onClick={logOut} className='text-white cursor-pointer'>
                    Log Out
                </li>
            </ul>}
            {!isLoggedIn && <ul className='p-5 flex justify-between'>
                <div className='flex items-center content-center'>
                    <li>
                        <HomeIcon onClick={() => { navigate('/') }} sx={{ color: 'white', margin: '0px 8px 0px', cursor: 'pointer' }} />
                    </li>
                    <li className='lg:hidden md:hidden'>
                        <MenuIcon onClick={openModal} className='cursor-pointer' sx={{ color: 'white' }} />
                    </li>
                    </div>
                    <div className='flex'>
                    <li className='text-white cursor-pointer hidden lg:list-item md:list-item mx-2'>
                       Login
                    </li>
                    <li className='text-white cursor-pointer hidden lg:list-item md:list-item mx-2'>
                       Sign Up
                    </li>
                    </div>
            </ul>}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <NavModal closeModal={closeModal} />
            </Modal>
        </nav>
    );
}

export default Nav;
