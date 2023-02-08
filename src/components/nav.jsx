import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NavModal from './navModal';
import Modal from 'react-modal';
import { useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
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
            <ul className='p-5 flex justify-between'>
                <li className='md:invisible lg:invisible'>
                    <MenuIcon onClick={openModal} className='cursor-pointer' sx={{ color: 'white' }} />
                    <HomeIcon onClick={()=>{navigate('/')}} sx={{color:'white', margin:'0px 8px 0px', cursor:'pointer'}}/>
                </li>
                <li onClick={logOut} className='md:invisible lg:invisible text-white cursor-pointer'>
                    Log Out
                </li>
            </ul>
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
