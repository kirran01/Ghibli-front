import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Comment = () => {
    return (
        <div className='bg-white m-3 p-5 border-2 text-sm rounded-lg'>
            <div className='flex items-center'>
                <p className='m-2'>Username</p>
                <AccountCircleIcon />
            </div>
            <p className='m-2'>Photo booth williamsburg before they sold out pop-up raw denim. Banjo fam kale chips master cleanse tumblr JOMO. Tote bag kogi succulents poutine, semiotics bitters thundercats organic tilde normcore biodiesel occupy.</p>
            <p className='m-2'>date</p>
        </div>
    );
}

export default Comment;
