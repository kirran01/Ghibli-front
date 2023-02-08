import React from 'react';

const Preview = ({ film }) => {
    return (
        <div className='flex flex-col items-center m-5'>
            <p>{film.title}</p>
            <p>{film.original_title}</p>
            <img className='rounded-lg w-44 border-4 border-white shadow-md' src={film.image} alt="film" />
        </div>
    );
}

export default Preview;
