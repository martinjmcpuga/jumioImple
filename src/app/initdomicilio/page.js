'use client';

import React, { useEffect } from 'react'
import InitDomicilio from '../components/Pages/InitDomicilio/InitDomicilio'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const { setInterName, setTitle } = useAppContext();

  useEffect(() => {
    sessionStorage.setItem('Title', 'Operación');
    sessionStorage.setItem('interName', 'Autenticación Domiciliar');
    setInterName('Autenticación Domiciliar');
    setTitle('Operación');
  }, []);

  return (
    <div>
      <InitDomicilio />
    </div>
  )
}

export default Page