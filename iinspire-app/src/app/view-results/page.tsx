import React from 'react'
import "../../..//public/styles/navbar.css"
import Navbar from '@/components/util/navbar';
import Footer from '@/components/util/footer';
import Profile from "@/components/results/Profile";


function ViewResults(){
    return (
        <div>
            <Navbar />
            <Profile />
            <Footer />
        </div>
    );
};

export default ViewResults