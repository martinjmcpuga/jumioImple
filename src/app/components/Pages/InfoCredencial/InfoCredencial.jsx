'use client'

import React, { useState } from 'react'
import './InfoCredencial.css'
import Footer from '../../Footer/Footer'
import Link from 'next/link'
import { useAppContext } from '../../../context/AppContext'

const InfoCredencial = () => {
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const { cpvI } = useAppContext()
  const { setCpvI } = useAppContext() // aquí lo traes

  const handleButtonClick = async () => {
    // Lógica para manejar el clic del botón
  }

  const isButtonEnabled = check1 && check2

  return (
    <>
      <main className="containerRender onContentExpands animate__animated animate__fadeIn">
        <section className="containerInfo_P2">
          <div className="containerIdent_P2">
            <div className="txtOp_P2" style={{ color: '#2A67E1' }}>
              Información de tu documento
            </div>
            <div className="txtSilver_P2">
              Escaneo de tu documento de Identificación
            </div>
            <hr className="line my-6" />

            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="containerCheck_P28 spaceRadio" style={{ verticalAlign: 'top' }}>
                      <input
                        type="checkbox"
                        className="rdnSize"
                        checked={check1}
                        onChange={() => setCheck1(!check1)}
                      />
                    </td>
                    <td>
                      <div className="textCheck">
                        Para proteger tu identidad, es necesario validar tu
                        información personal. Este proceso tomará sólo unos
                        minutos.
                      </div>
                    </td>
                  </tr>
                  <tr><td style={{ height: '16px' }}></td></tr>
                  <tr>
                    <td className="containerCheck_P28 spaceRadio" style={{ verticalAlign: 'top' }}>
                      <input
                        type="checkbox"
                        className="rdnSize"
                        checked={check2}
                        onChange={() => setCheck2(!check2)}
                      />
                    </td>
                    <td>
                      <div className="textCheck">
                        Recuerda dar acceso a la cámara en la configuración de
                        tu dispositivo.
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: '100px' }}></tr>

                </tbody>
              </table>
            </div>

            <hr className="line my-6" />

            <section className="containerButtonOnExpands_P2" style={{ marginTop: '2rem' }}>
              <div className="btnContinue">
                {!isButtonEnabled ? (
                  <button className="btnVer_P3" disabled>
                    <span className="txtVer_P3">Continuar</span>
                  </button>
                ) : (
                  <Link
                    href={cpvI === 'credencial' ? '/imganterior' : cpvI === 'pasaporte' ? '/pasaporteanterior' : '#'}
                  >
                    <button
                      className="button_P2 animate__animated animate__fadeIn"
                      onClick={handleButtonClick}
                    >
                      <span className="txtButton_P2">Continuar</span>
                    </button>
                  </Link>
                )}
              </div>
            </section>

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default InfoCredencial
