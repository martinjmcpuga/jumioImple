'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'; 
import "./requerimientos.css";
import Footer from '../../Footer/Footer';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';

const Requerimientos = () => {

  const [isChecked, setChecked] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const { cpvI } = useAppContext();



    const handleButtonClick = async () => {
      // Lógica para manejar el clic del botón

  };


  const handleRadioChange = () => {
    const newCheckedStatus = !isChecked;
    setChecked(newCheckedStatus);
    setButtonEnabled(newCheckedStatus);
  };


  return (
    <>
          <main className="containerRender onContentExpands animate__animated animate__fadeIn">
          <section className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Requerimientos</div>
              <div className="txtSilver_P2">
                Antes de iniciar, por favor confirma lo siguiente:
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
                          onChange={handleRadioChange}
                        />
                      </td>
                      <td>
                        <div className="textCheck">
                          Cuento con identificación oficial vigente con
                          fotografía (ej. Credencial de Identidad, Pasaporte).
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
                    <Link href={'/paises'}>
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

export default Requerimientos