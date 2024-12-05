import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; 

const Layout = ({ children, auth }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar auth={auth} />
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;