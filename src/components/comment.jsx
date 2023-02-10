import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommentsDisabled } from '@mui/icons-material';

const Comment = ({ comment, comments, setComments }) => {
    const [editInput, setEditInput] = useState('')
    const [openEdit, setOpenEdit] = useState(false)
    console.log(comment, 'c')
    console.log(comments, 'cs')
    const editComment = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/comments/edit-comment/${comment._id}`, {
            comment: editInput
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                setOpenEdit(false)
                let theComment = res.data
                let updatedComment = comments.map(oneComment => {
                    return oneComment._id === comment._id ? { ...oneComment, ...theComment } : oneComment
                })
                setComments(updatedComment)
                console.log(res.data, 'rdcomm')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const deleteComment = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:3000/comments/delete-comment/${comment._id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                let filteredForDelete = comments.filter(oneComment => oneComment._id !== comment._id)
                setComments(filteredForDelete)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='bg-white m-3 p-5 border-2 text-sm rounded-lg w-96'>
            <div className='flex items-center'>
                {comments && comment && <p className=''>{comment.owner.username}</p>}
                {comments && comment && comment.owner.profileImage ?
                    <img className='w-6 h-6 rounded-full m-2' src={comment.owner.profileImage} alt="img" />
                    :
                    <AccountCircleIcon />
                }
            </div>
            <div className=''>
                {openEdit && comment && comments && <>
                    <div className='flex items-center'>
                        <form className='flex my-5' value={editInput} onSubmit={editComment}>
                            <input value={editInput} onChange={(e) => { setEditInput(e.target.value) }} type="text" placeholder='New comment' />
                            <button className='mx-2 p-1 bg-slate-200 rounded-md'>Submit</button>
                        </form>
                        <button className='mx-2 p-1 bg-slate-200 rounded-md' onClick={() => { setOpenEdit(false) }}>Cancel</button>
                    </div>
                </>
                }
                {!openEdit && comment && comments && <p className='my-2'>{comment.comment}</p>}
            </div>
            <div className='flex justify-between items-center'>
                {comment && <p className='text-xs'>{new Date(comment.day).toDateString().substring(3)}</p>}
                <div>
                    {!openEdit && <button className='mx-2 p-1 bg-slate-200 rounded-md' onClick={() => { setOpenEdit(true) }}>Edit</button>}
                    {!openEdit && <button className='mx-2 p-1 bg-slate-200 rounded-md' onClick={deleteComment}>Delete</button>}
                </div>
            </div>
        </div>
    );
}

export default Comment;
