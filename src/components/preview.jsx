import React from 'react';

const Preview = ({ film }) => {
    console.log(film, 'f')
    return (
        <div>
            <p>{film.title}</p>
            <p>{film.original_title}</p>
            <div>
                <img src={film.image} alt="film" />
            </div>
        </div>
    );
}

export default Preview;
