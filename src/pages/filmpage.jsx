import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comment from '../components/comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Filmpage = () => {
    const { storeToken, user, setUser, authenticateUser, logOut } = useContext(AuthContext)
    const { id } = useParams()
    const [film, setFilm] = useState({})
    const [comments, setComments] = useState([])
    const [favorites, setFavorites] = useState([])
    const [commentInput, setCommentInput] = useState('')
    const [reqStatus, setReqStatus] = useState('')
    const [commentError, setCommentError] = useState(false)
    const [favoriteError, setFavoriteError] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:3000/favorites/get-favorites')
            .then(res => {
                setFavorites(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
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
                console.log(film,'film')
                let filteredComments = allComments.filter(oneComment => oneComment.postId === film.id)
                console.log(allComments, 'ac')
                console.log(filteredComments, 'fc')
                setComments(filteredComments)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const isFavorited = () => {
        const obj = favorites.find(favorite => favorite.owner === user._id && favorite.showId === film.id)
        if (obj) {
            return true
        } else {
            return false
        }
    }
    const addToFavs = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/favorites/create-favorite/${film.id}`, {
            image: film.image,
            title: film.title,
            original_title: film.original_title,
            showId: id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                setFavoriteError(true)
                setInterval(() => {
                    setFavoriteError(false)
                }, 1500)
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
                let newComment = res.data
                setComments([...comments, newComment])
                setCommentInput('')

            })
            .catch(err => {
                console.log(err)
                setCommentError(true)
                setInterval(() => {
                    setCommentError(false)
                }, 1500)
            })
    }
    const deleteFav = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:3000/favorites/delete-favorite/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => {
                console.log('deleted')
            })
            .catch(err => {
                console.log(err,)
            })
    }
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <div className='flex flex-col items-center p-2'>
                {reqStatus === 'success' && <p className='text-2xl lg:text-3xl m-1 text-center'>{film.title}({film.release_date})</p>}
                <p className='text-xl m-1 lg:text-2xl'>{film.original_title}</p>
                {reqStatus === 'success' && <img className='w-96 lg:w-1/2 md:w-1/2 rounded-lg m-2 border-4 border-white' src={film.movie_banner} alt="banner" />}
                {reqStatus === '' && <p>Loading...</p>}
            </div>
            <div className='text-center p-2'>
                <div className='m-5'>
                    <p className='lg:text-lg m-2 underline'>Plot</p>
                    <p className='text-sm md:px-10 lg:px-15'>{film.description}</p>
                </div>
                <div className='m-5'>
                    <p className='lg:text-lg m-2 underline'>Running Time</p>
                    <p className='text-sm'>{film.running_time} mins</p>
                </div>
                <div className='m-5'>
                    <p className='lg:text-lg m-2 underline'>RT Score</p>
                    <p className='text-sm'>{film.rt_score}%</p>
                </div>
                <div className='m-5'>
                    <p className='lg:text-lg m-2 underline'>Director</p>
                    <p className='text-sm'>{film.director}</p>
                </div>
            </div>
            {user && !favoriteError && !isFavorited() && <button onClick={addToFavs} className='bg-cyan-400 hover:bg-cyan-300 rounded-md p-2'>Favorite</button>}
            {user && !favoriteError && isFavorited() && <button onClick={deleteFav} className='bg-cyan-700 hover:bg-cyan-600 rounded-md p-2 text-white'>Favorited</button>}
            {favoriteError && <p>Log in to favorite</p>}
            <div className='flex flex-col items-center'>
                <p className='lg:text-lg my-4 underline'>Discussion</p>
                <div>
                    <form className='flex flex-col items-center' action="">
                        {!commentError && <input value={commentInput} className='border-2 rounded' type="text" placeholder='Add a comment!' onChange={(e) => { setCommentInput(e.target.value) }} />}
                        {commentError && <p>Log in to comment</p>}
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
