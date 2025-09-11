'use client'

import React, { use, useEffect } from 'react'
import RequerimientosN2 from '../components/Pages/RequerimientosN2/RequerimientosN2'
import { useAppContext } from '../context/AppContext'


const Page = () => {
  const {setInterName}=useAppContext();
  useEffect(() => {
    setInterName('Autenticación Domiciliar');
    sessionStorage.setItem('interName','Autenticación Domiciliar');
}, []);
  return (
    <>
      <RequerimientosN2 />
    </>
  )
}

export default Page