import React from 'react';

const Home = ({ user, laravelVersion, phpVersion }) => {
    return (
        <div>
            <h1>Selamat Datang di Halaman Home</h1>
            <p>Laravel Version: {laravelVersion}</p>
            <p>PHP Version: {phpVersion}</p>
            {user ? '' : <a href="/login">Login</a>}
            {user ? '': <a href="/register">Register</a> }
            <a href="/blogs">Visit Blog</a>
        </div>
    );
};

export default Home;