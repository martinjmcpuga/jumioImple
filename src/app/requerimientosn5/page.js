'use client'

import React, { useEffect } from 'react'
import RequerimientosN5 from '../components/Pages/RequerimientosN5/RequerimientosN5'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Autenticación Laboral');
    sessionStorage.setItem('interName','Autenticación Laboral');
}, []);

  return (
    <>
      <RequerimientosN5 />
    </>
  )
}

export default Page