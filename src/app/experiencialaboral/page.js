'use client'

import React, { useEffect } from 'react'
import ExperienciaLaboral from '../components/Pages/ExperienciaLaboral/ExperienciaLaboral'
import { useAppContext } from '../context/AppContext'

const Page = () => {

  const {setInterName}=useAppContext();

  useEffect(() => {
    setInterName('Experiencia Laboral');
    sessionStorage.setItem('interName','Experiencia Laboral');
}, []);

  return (
    <>
      <ExperienciaLaboral />
    </>
  )
}

export default Page