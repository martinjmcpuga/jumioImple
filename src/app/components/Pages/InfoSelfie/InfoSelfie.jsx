'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '../../Footer/Footer'
import './InfoSelfie.css'
import { useAppContext } from '@/app/context/AppContext'

const handleButtonClick = () => {

}

const InfoSelfie = () => {

  const { setRutaBack } = useAppContext();
  useEffect(() => {
    setRutaBack('/requerimientosselfie');
  }, []);
  const handleButtonClick = () => {

  }

  return (
    <>
      <main className="containerRender onContentExpands animate__animated animate__fadeIn">
        <section className="containerInfo_P2">
          <div className="containerIdent_P2">
            <div className="textCheck pbutton">
              Evite mover su cara y coloquela dentro del marco mostrado
            </div>
            <div>
              <img className="animate__animated animate__fadeIn mainPicture"
                src='assets/faceSelfie.png'
                alt="check"

              />
            </div>
            <hr className="line my-6" />

            <section className="containerButtonOnExpands_P2" style={{ marginTop: '2rem' }}>
              <div className="btnContinue">
                <Link href={'/jumiocomponentselfie'}>
                  <button
                    className="button_P2 animate__animated animate__fadeIn"
                    onClick={handleButtonClick}
                  >
                    <span className="txtButton_P2">Continuar</span>
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default InfoSelfie