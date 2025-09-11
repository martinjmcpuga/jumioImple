'use client'

import React, { useEffect } from 'react'
import UploadComprobanteCarta from '../components/Pages/UploadComprobanteCarta/UploadComprobanteCarta'
import { useAppContext } from '../context/AppContext'

const Page = () => {
  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Comprobante de Carta');
    sessionStorage.setItem('interName','Comprobante de Carta');
}, []);
  return (
    <>
      <UploadComprobanteCarta />
    </>
  )
}

export default Page