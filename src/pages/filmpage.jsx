import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Filmpage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({})
    const [comments, setComments] = useState([])
    useEffect(() => {
        axios.get(`https://ghibliapibase.fly.dev/films/${id}`)
            .then(res => {
                console.log(res.data, 'film')
                setFilm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/comments/all-comments')
            .then(res => {
                console.log(res.data, 'rdcomments')
            })
            .catch(err => {
                console.log(err)
            })
    })
    const addToFavs = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/favorites/create-favorite', {
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
                console.log(err)
            })
    }
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <div className='flex flex-col items-center p-2'>
                <p className='text-2xl m-1 text-center'>{film.title}({film.release_date})</p>
                <p className='text-xl m-1'>{film.original_title}</p>
                <img className='w-96 rounded-lg m-2 border-4 border-white' src={film.movie_banner} alt="banner" />
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
                        <input className='border-2 rounded' type="text" placeholder='Comment' />
                        <div className='flex items-center m-2'>
                            <button className='bg-cyan-700 hover:bg-cyan-600 rounded-md p-2 m-2' type="">Submit</button>
                            <button className='p-2 bg-slate-200 rounded-md m-2'>Cancel</button>
                        </div>
                    </form>
                </div>
                <div className='bg-white m-3 p-5 border-2 text-sm rounded-lg'>
                    <div className='flex items-center'>
                        <p className='m-2'>Username</p>
                        <AccountCircleIcon />
                    </div>
                    <p className='m-2'>Photo booth williamsburg before they sold out pop-up raw denim. Banjo fam kale chips master cleanse tumblr JOMO. Tote bag kogi succulents poutine, semiotics bitters thundercats organic tilde normcore biodiesel occupy.</p>
                    <p className='m-2'>date</p>
                </div>
            </div>
        </div>
    );
}

export default Filmpage;
