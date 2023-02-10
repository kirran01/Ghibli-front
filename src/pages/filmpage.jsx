import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../components/comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Filmpage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({})
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState('')
    const [reqStatus, setReqStatus] = useState('')

    useEffect(() => {
        axios.get(`https://ghibliapibase.fly.dev/films/${id}`)
            .then(res => {
                setReqStatus('success')
                setFilm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/comments/all-comments')
            .then(res => {
                let allComments = res.data
                let filteredComments = allComments.filter(oneComment => oneComment.postId === film.id)
                setComments(filteredComments)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const addToFavs = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/favorites/create-favorite/${film.id}`, {
            image: film.image,
            title: film.title,
            original_title: film.original_title,
            showId: film.id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data, 'addedtofavs')
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }
    const addComment = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/comments/create-comment', {
            comment: commentInput,
            postId: id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data, 'addcomment')
                let newComment = res.data
                setComments([...comments, newComment])
                setCommentInput('')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <div className='flex flex-col items-center p-2'>
                {reqStatus === 'success' && <p className='text-2xl m-1 text-center'>{film.title}({film.release_date})</p>}
                <p className='text-xl m-1'>{film.original_title}</p>
                {reqStatus === 'success' && <img className='w-96 rounded-lg m-2 border-4 border-white' src={film.movie_banner} alt="banner" />}
                {reqStatus === '' && <p>Loading...</p>}
            </div>
            <div className='text-center p-2'>
                <div className='m-5'>
                    <p className='m-2 underline'>Plot</p>
                    <p className='text-sm'>{film.description}</p>
                </div>
                <div className='m-5'>
                    <p className='m-2 underline'>Running Time</p>
                    <p className='text-sm'>{film.running_time} mins</p>
                </div>
                <div className='m-5'>
                    <p className='m-2 underline'>RT Score</p>
                    <p className='text-sm'>{film.rt_score}%</p>
                </div>
                <div className='m-5'>
                    <p className='m-2 underline'>Director</p>
                    <p className='text-sm'>{film.director}</p>
                </div>
                <div className='m-5'>
                    <p className='m-2 underline'>Producer</p>
                    <p className='text-sm'>{film.producer}</p>
                </div>
            </div>
            <button onClick={addToFavs} className='bg-cyan-400 hover:bg-cyan-300 rounded-md p-2'>Favorite</button>
            <div className='flex flex-col items-center'>
                <p className='my-4 underline'>Discussion</p>
                <div>
                    <form className='flex flex-col items-center' action="">
                        <input value={commentInput} className='border-2 rounded' type="text" placeholder='Add a comment!' onChange={(e) => { setCommentInput(e.target.value) }} />
                        <div className='flex items-center m-2'>
                            <button className='bg-cyan-400 hover:bg-cyan-300 rounded-md p-2 m-2' type="" onClick={addComment}>Submit</button>
                            <button className='p-2 bg-slate-200 hover:bg-slate-100 rounded-md m-2' onClick={(e) => {
                                e.preventDefault()
                                setCommentInput('')
                            }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    {comments.map(comment => {
                        return (
                            <Comment comment={comment} comments={comments} setComments={setComments} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Filmpage;
