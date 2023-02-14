import React from 'react';

const Searchbar = ({ films, updateFilms, searchInput, setSearchInput }) => {

    const filterResults = (e) => {
        setSearchInput(e.target.value)
        const newFilmList = films.filter(film => {
            return film.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        updateFilms(newFilmList)
    }
    return (
        <div className='m-5'>
            <input onChange={filterResults} type="text" placeholder='Search for a film' value={searchInput} />
        </div>
    );
}

export default Searchbar;
