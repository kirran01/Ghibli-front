import React from 'react';

const Searchbar = ({ films, updateFilms }) => {

    const filterResults = (e) => {
        const newFilmList = films.filter(film => {
            return film.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        updateFilms(newFilmList)
    }
    return (
        <div className='m-5'>
            <input onChange={filterResults} type="text" placeholder='Search a film' />
        </div>
    );
}

export default Searchbar;
