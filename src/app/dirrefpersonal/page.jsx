'use client'

import React, { useEffect } from 'react'
import DirRefPersonal from '../components/Pages/DirRefPersonal/DirRefPersonal'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Domicilio de Referencia');
    sessionStorage.setItem('interName','Domicilio de Referencia');
  }, []);

  return (
    <>
      <DirRefPersonal />
    </>
  )
}

export default Page