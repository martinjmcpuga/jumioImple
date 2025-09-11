'use client'

import React, { useEffect } from 'react'
import RequerimientosSelected from '../components/Pages/RequerimientosSelected/RequerimientosSelected'
import { useAppContext } from '../context/AppContext'
const Page = () => {
  const {setInterName}=useAppContext();


  useEffect(() => {
    sessionStorage.setItem('interName','Autenticación Domiciliar');
    setInterName('Autenticación Domiciliar');
}, []);

  return (
    <>
      <RequerimientosSelected />
    </>
  )
}

export default Page