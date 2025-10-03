'use client'

import React, { useEffect } from 'react'
import UploadComprobanteContrato from '../components/Pages/UploadComprobanteCarta/UploadComprobanteContrato'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const { setInterName } = useAppContext();

  useEffect(() => {
    setInterName('Comprobante de Contrato');
    sessionStorage.setItem('interName', 'Comprobante de Contrato');
  }, []);

  return (
    <>
      <UploadComprobanteContrato />
    </>
  )
}

export default Page