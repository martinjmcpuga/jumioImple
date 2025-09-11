'use client'

import React, { useEffect } from 'react'
import AutenticacionLaboral from '../components/Pages/AutenticacionLaboral/AutenticacionLaboral'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Autenticación Laboral');
    sessionStorage.setItem('interName','Autenticación Laboral');
}, []);

  return (
    <>
      <AutenticacionLaboral />
    </>
  )
}

export default Page