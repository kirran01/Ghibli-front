import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Preview from '../components/preview';
import { Link } from 'react-router-dom';
import Searchbar from '../components/searchbar';

const Home = ({ films, filteredFilms, setFilms, updateFilms }) => {
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <h1 className='text-2xl mb-5 pt-2 text-center'>Studio Ghibli Archive</h1>
            <Searchbar films={films} updateFilms={updateFilms} />
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
            <footer className='my-10'>
                <p>Studio Ghibli Archive by Kirran Kirpalani</p>
            </footer>
        </div>
    );
}

export default Home;
