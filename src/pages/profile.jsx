import React from 'react';

const Profile = () => {
    return (
        <div className='bg-cyan-50 flex flex-col items-center'>
            <img className='w-16 h-16 rounded-full m-5' src="https://images.pexels.com/photos/15465414/pexels-photo-15465414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilepic" />
            <p>username</p>
            <p>bio</p>
            <button>Edit Profile</button>
            <div className='flex'>
                <button>Comments</button>
                <button>Favorites</button>
            </div>
            <div>
                comment div
            </div>
            <div>
                favorite div
            </div>
        </div>
    );
}

export default Profile;
