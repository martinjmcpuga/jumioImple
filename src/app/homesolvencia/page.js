'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import HomeSolvencia from '../components/Pages/HomeSolvencia/HomeSolvencia'

const Page = () => {

  const { setInterName } = useAppContext();

  useEffect(() => {
    setInterName('Historial Laboral');
    sessionStorage.setItem('interName', 'Historial Laboral');
  }, []);

  return (
    <>
      <HomeSolvencia />
    </>
  )
}

export default Page