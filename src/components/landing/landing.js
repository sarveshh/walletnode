import React, { useState } from 'react'
import Footer from './footer/footer';
import Hero from './hero/hero'
import Info from './info/info'
import { homeObjOne, homeObjTwo, homeObjThree } from './info/data';
import Navbar from './navbar/navbar'
import Features from './features/features';
import Sidebar from './sidebar/sidebar'

const Landing = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Hero />
            <Features />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            <Info {...homeObjThree} />
            <Footer />
        </>
    )
}

export default Landing
