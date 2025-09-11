'use client'

import React, { useEffect } from 'react'
import DomicilioPersonal from '../components/Pages/DomicilioPersonal/DomicilioPersonal'
import { useAppContext } from '../context/AppContext'


const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Domicilio Personal');
    sessionStorage.setItem('interName','Domicilio Personal');
}, []);


  return (
    <>
      <DomicilioPersonal />
    </>
  )
}

export default Page