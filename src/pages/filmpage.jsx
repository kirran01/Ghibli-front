import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Filmpage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({})
    useEffect(() => {
        axios.get(`https://ghibliapibase.fly.dev/films/${id}`)
            .then(res => {
                console.log(res.data, 'rd')
                setFilm(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className='bg-cyan-50'>
            <div className='flex flex-col items-center p-2'>
                <p className='text-2xl m-1 text-center'>{film.title}({film.release_date})</p>
                <p className='text-xl m-1'>{film.original_title}</p>
                <img className='w-96 rounded-lg m-2' src={film.movie_banner} alt="banner" />
            </div>
            <div className='text-center p-2'>
                <div className='m-5'>
                    <p>Plot</p>
                    <p className='text-sm'>{film.description}</p>
                </div>
                <div className='m-5'>
                    <p>Running Time</p>
                    <p className='text-sm'>{film.running_time} mins</p>
                </div>
                <div className='m-5'>
                    <p>RT Score</p>
                    <p className='text-sm'>{film.rt_score}%</p>
                </div>
                <div className='m-5'>
                    <p>Director</p>
                    <p className='text-sm'>{film.director}</p>
                </div>
                <div className='m-5'>
                    <p>Producer</p>
                    <p className='text-sm'>{film.producer}</p>
                </div>
            </div>
        </div>
    );
}

export default Filmpage;
