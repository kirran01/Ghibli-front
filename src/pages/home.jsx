import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Preview from '../components/preview';
import { Link } from 'react-router-dom';

const Home = () => {
    const [films, setFilms] = useState([])
    const [reqStatus, setReqStatus] = useState('')
    useEffect(() => {
        axios.get('https://ghibliapibase.fly.dev/films')
            .then(res => {
                setFilms(res.data)
                setReqStatus('success')
            })
            .catch(err => {
                console.log(err, 'err')
                setReqStatus('error')
            })
    }, [])
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <h1 className='text-2xl m-5'>Studio Ghibli Archive</h1>
            {reqStatus === '' && <h1>Loading...</h1>}
            {reqStatus === 'success' && films.map(film => {
                return (<>
                    <Link to={'/film/' + film.id}>
                        <Preview film={film} />
                    </Link>
                </>)
            })}
            {reqStatus === 'error' && <h1>Uh oh! Something has gone wrong :(</h1>}
        </div>
    );
}

export default Home;
