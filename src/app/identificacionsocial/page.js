'use client'

import React, { useEffect } from 'react'
import IdentificacionSocial from '../components/Pages/IdentificacionSocial/IdentificacionSocial'
import { useAppContext } from '../context/AppContext'

const Page = () => {
  const {setInterName}=useAppContext();

useEffect(() => {
  sessionStorage.setItem('interName','Identificación Social');
    setInterName('Identificación Social');
}, []);

  return (
    <>
      <IdentificacionSocial />
    </>
  )
}

export default Page