'use client'

import React, { useEffect } from 'react'
import ComprobanteIngreso from '../components/Pages/ComprobanteIngreso/ComprobanteIngreso'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Comprobante de Ingreso');
    sessionStorage.setItem('interName','Comprobante de Ingreso');
}, []);

  return (
    <>
      <ComprobanteIngreso />
    </>
  )
}

export default Page