'use client'

import React, { use, useEffect,useState } from 'react'
import Bandeja from '../components/Pages/Bandeja/Bandeja'
import Footer from '../components/Footer/Footer';






const Page = () => {

    useEffect(() => {
        localStorage.setItem('interName','Operaciones');
        localStorage.setItem('TitleMain','Bandeja');
    }, []);




      const handleback = () => setShow(false);
        const handleShow = () => setShow(true);


  return (
    <>
    
          <div className="initBack_P2 animate__animated animate__fadeIn">


        <div className="Container_fitContent ">
          <Bandeja />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Page