'use client'

import React, { useState, useEffect } from 'react'
import './RequerimientosSelfie.css'
import Link from 'next/link';
import Footer from '../../Footer/Footer';
import { useAppContext } from '@/app/context/AppContext';

const RequerimientosSelfie = () => {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const { setRutaBack } = useAppContext();
  useEffect(() => {
    setRutaBack('/documentos');
  }, []);


  const handleButtonClick = async () => {
    // Lógica para manejar el clic del botón

  };

  useEffect(() => {
    setButtonEnabled(isChecked && isChecked2);
  }, [isChecked, isChecked2]);

  return (
    <>
      <main className="containerRender onContentExpands animate__animated animate__fadeIn">
        <section className="containerInfo_P2">
          <div className="containerIdent_P2">
            <div className="txtOp_P2">Verificación facial</div>
            <div className="txtSilver_P2">
              Escaneo de rostro para verificar que es una persona real.
            </div>

            <hr className="line my-6" />
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="containerCheck_P28 spaceRadio">
                      <input
                        type="radio"
                        className="rdnSize"
                        checked={isChecked}
                        onChange={() => {
                          setChecked(!isChecked);
                        }}
                      />
                    </td>
                    <td>
                      <div className="textCheck">
                        Su cara debe estar uniformemente iluminada y distinguirse del fondo
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="containerCheck_P28 spaceRadio">
                      <input
                        type="radio"
                        className="rdnSize"
                        checked={isChecked2}
                        onChange={() => {
                          setChecked2(!isChecked2);
                        }}
                      />
                    </td>
                    <td>
                      <div className="textCheck">
                        Coloque su mirada directamente a la cámara
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section className="containerButtonOnExpands_P2">
              <div></div>

              <br />

              <div className="btnContinue">
                {!isButtonEnabled ? (
                  <>
                    <button className="btnVer_P3">
                      <span className="txtVer_P3">Continuar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={'/infoselfie'}>
                      <button
                        className="button_P2 animate__animated animate__fadeIn"
                        onClick={handleButtonClick}
                        direction={'/requerimientos'}
                      >
                        <span className="txtButton_P2">Continuar</span>
                      </button>
                    </Link>
                  </>

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

export default RequerimientosSelfie