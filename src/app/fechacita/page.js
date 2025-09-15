'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import FechaCita from '../components/Pages/FechaCita/FechaCita'

const Page = () => {

  const { setInterName } = useAppContext();

  useEffect(() => {
    setInterName('Experiencia Laboral');
    sessionStorage.setItem('interName', 'Experiencia Laboral');
  }, []);

  return (
    <>
      <FechaCita />
    </>
  )
}

export default Page