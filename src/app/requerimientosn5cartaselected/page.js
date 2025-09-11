'use client'

import React, { useEffect } from 'react'
import RequerimientosSelectedN5Carta from '../components/Pages/RequerimientosSelectedN5Carta/RequerimientosSelectedN5Carta'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();
  
  useEffect(() => {
    sessionStorage.setItem('interName','Autenticación Laboral');
    setInterName('Autenticación Laboral');
}, []);

  return (
    <>
      <RequerimientosSelectedN5Carta />
    </>
  )
}

export default Page