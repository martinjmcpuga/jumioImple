'use client'

import React, { useState } from 'react'
import './ImgAnteriorError.css'
import Footer from '../../Footer/Footer'
import Link from 'next/link'
import { useAppContext } from '../../../context/AppContext'

const ImgAnteriorError = () => {
  const { cpvI } = useAppContext()

  const handleButtonClick = async () => {
    // Lógica para manejar el clic del botón
  }


  return (
    <>
      <main className="containerRender onContentExpands animate__animated animate__fadeIn">
        <section className="containerInfo_P2">
          <div className="containerIdent_P2">
            <div className="txt_title pbutton">
              Evite sombras o reflejos y asegurase que su documento este enfocado.
            </div>
            <div>
                <div className="txt_title center">Vista anterior</div>
                 <img 
                    src='assets/frente-credencial-error.jpg' 
                    alt="check" 
                    style={{ width: '150px', height: 'auto', display: 'block', margin: '0 auto' }} 
                    />
            </div>
            <hr className="line my-6" />

            <section className="containerButtonOnExpands_P2" style={{ marginTop: '2rem' }}>
              <div className="btnContinue">
               <Link href={'/jumiocomponent'}>
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

export default ImgAnteriorError
