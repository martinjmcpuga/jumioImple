'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import RequerimientosN5Recibo from '../components/Pages/RequerimientosN5Recibo/RequerimientosN5Recibo'
const Page = () => {
  const { setInterName } = useAppContext();


  useEffect(() => {
    sessionStorage.setItem('interName', 'Autenticación Domiciliar');
    setInterName('Autenticación Domiciliar');
  }, []);

  return (
    <>
      <RequerimientosN5Recibo />
    </>
  )
}

export default Page