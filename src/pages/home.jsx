import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Preview from '../components/preview';
import { Link } from 'react-router-dom';
import Searchbar from '../components/searchbar';

const Home = ({ films, sortByRuntime,isFiltering, setIsFiltering, sortByTitle, sortByRating, filteredFilms, setFilms, updateFilms, setFilteredFilms }) => {
    const [searchInput, setSearchInput] = useState('')
    useEffect(() => {
        setSearchInput('')
    }, [])
    useEffect(() => {
        axios.get('https://ghibliapibase.fly.dev/films')
            .then(res => {
                setFilteredFilms(res.data)
            })
            .catch(err => {
                console.log(err, 'err')
            })
    }, [])
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <h1 className='text-2xl mb-5 pt-2 text-center'>Studio Ghibli Archive</h1>
            <Searchbar films={films} updateFilms={updateFilms} searchInput={searchInput} setSearchInput={setSearchInput} />
            <div>
                <button className='p-2 bg-slate-50 rounded-md m-2' onClick={sortByRuntime}>Runtime</button>
                <button className='p-2 bg-slate-50 rounded-md m-2' onClick={sortByRating}>Rating</button>
            </div>
            <div className='bg-cyan-50'>
                <div className='flex flex-col items-center justify-center content-center lg:flex-row lg:flex-wrap md:flex-row md:flex-wrap'>
                    {filteredFilms.map(film => {
                        return (<>
                            <Link to={'/film/' + film.id}>
                                <Preview film={film} />
                            </Link>
                        </>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
