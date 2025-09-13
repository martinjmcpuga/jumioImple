'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import ConfirmarFirmaDoc from '../components/Pages/ConfirmarFirmaDoc/ConfirmarFirmaDoc'

const Page = () => {

  const { setInterName } = useAppContext();

  useEffect(() => {
    setInterName('Firma de Documento');
    sessionStorage.setItem('interName', 'Firma');
  }, []);

  return (
    <>
      <ConfirmarFirmaDoc />
    </>
  )
}

export default Page