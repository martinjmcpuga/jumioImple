'use client'

import React, { useEffect } from 'react'
import HistorialLaboral from '../components/Pages/HistorialLaboral/HistorialLaboral'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Historial Laboral');
    sessionStorage.setItem('interName','Historial Laboral');
}, []);

  return (
    <>
      <HistorialLaboral />
    </>
  )
}

export default Page