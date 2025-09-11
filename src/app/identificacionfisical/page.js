'use client'

import React, { useEffect } from 'react'
import IdentificacionFisical from '../components/Pages/IdentificacionFisical/IdentificacionFisical'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Identificación Fiscal');
    sessionStorage.setItem('interName','Identificación Fiscal');
  }, []);

  return (
    <>
      <IdentificacionFisical />
    </>
  )
}

export default Page