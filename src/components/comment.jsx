import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Comment = ({ comment }) => {
    console.log(comment, 'c')
    const editComment = (e) => {
        e.preventDefault()
        console.log('editcomment')
    }
    const deleteComment = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:3000/comments/delete-comment/${comment._id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='bg-white m-3 p-5 border-2 text-sm rounded-lg w-96'>
            <div className='flex items-center'>
                <p className=''>{comment.owner.username}</p>
                {comment.owner.profileImage ?
                    <img className='w-6 h-6 rounded-full m-2' src={comment.owner.profileImage} alt="img" />
                    :
                    <AccountCircleIcon />
                }
            </div>
            <div className=''>
                <p className='my-2'>{comment.comment}</p>
            </div>

            <div className='flex justify-between items-center'>
                <p className=''>{new Date(comment.day).toDateString().substring(3)}</p>
                <div>
                    <button className='mx-2 p-1 bg-slate-200 rounded-md' onClick={editComment}>Edit</button>
                    <button className='mx-2 p-1 bg-slate-200 rounded-md' onClick={deleteComment}>Delete</button>
                </div>
            </div>
            {/* new Date(post.comments[0].day).toDateString().substring(3) */}
        </div>
    );
}

export default Comment;
