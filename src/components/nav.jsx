import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NavModal from './navModal';
import Modal from 'react-modal';
import { useState } from 'react';


const Nav = () => {
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
            <ul className='p-5 flex'>
                <li onClick={openModal} className='md:invisible lg:invisible'>
                    <MenuIcon sx={{ color: 'white' }} />
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
