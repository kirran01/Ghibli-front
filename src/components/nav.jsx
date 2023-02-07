import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NavModal from './navModal';
import Modal from 'react-modal';
import { useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';


const Nav = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
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
                <li onClick={openModal} className='md:invisible lg:invisible'>
                    <MenuIcon sx={{ color: 'white' }} />
                </li>
                <li onClick={logOut} className='md:invisible lg:invisible text-white'>
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
