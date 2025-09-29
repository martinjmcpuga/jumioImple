'use client'

import React, { useState, useEffect, useRef } from "react";
import { mtFindPersonJumio } from "../../Api/mtFindPersonJumio";

const MenuSolvencia = () => {

  const isRunned = useRef(false);
  const [validateButtonNextQ, setValidateButtonNextQ] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingresoMensual, setIngresoMensual] = useState(false);
  const [gastoMensual, setGastoMensual] = useState(false);

  const [consultaBuro, setConsultaBuro] = useState(false);
  const [referenciasPersonales, setReferencias] = useState(false);

  const handleNext = () => {

    /*
    navigate("/FlujoIncodeSolvencia", {
      state: {
        rutaContinue: "/SummarySolvencia",
        typeCredential: "ine"
      }
    });
    */

  }
  /** PRUEBA AWS */
  useEffect(() => {

    if (isRunned.current) return;
    setLoading(true);
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const objJumioSelfie = {
        id: sessionStorage.getItem('id_jumio'),
        idJumio: sessionStorage.getItem('id_jumio'),
      };

      const response = await mtFindPersonJumio(objJumioSelfie);

      if (response.status === 200) {

        /** Validacion datos completos de licencia */
        if (response.ingresoMensualOK === true && response.nomina1OK === true && response.nomina2OK === true && response.nomina3OK === true) {

          if (response.gastoMensualOK === true &&
            response.consultaBuroOK === true &&
            response.referenciasPersonalesOK === true) {

            setValidateButtonNextQ(true);
            setLoading(false);

          }
          setLoading(false);
        }

      }

      setLoading(true);

    }

    createSession();

  }, []);

  const handleClose = () => {
    setShow(false);
  }

  const getHomeTest1 = async () => {
    //navigate("/IngresoMensual2");
  };

  const getHomeTest2 = async () => {
    //navigate("/GastoMensual")
  }

  const getHomeTest3 = async () => {
    //navigate("/BuroCredito")
  }

  const getHomeTest4 = async () => {
    //navigate("/ReferenciasPersonalesSolv")
  }

  return (
    <>
      <div className='initBack_P2 animate__animated animate__fadeIn'>

        <div className='containerRender'>

          {loading ? (
            <div className="containerRender">
              <div className="spinner"></div>
            </div>
          ) : (

            <div className="containerInfo_P2">
              <div className="rcornesDes27--modify">

                {/* Experiencia profesional */}

                {!ingresoMensual ? (
                  <>
                    <div className="itemAuto">
                      <div className="col-2 boxCheck">
                        <input type="radio" className="rdnSizeCheck" disabled />
                      </div>
                      <div className="col-8 centerText">
                        <span className="Experiencia-profesional">
                          Ingreso Mensual
                        </span>
                      </div>
                      <div className="col-2 boxCheck">
                        <img
                          className="Rectangle-1408"
                          src='assets/boton-play.svg'
                          onClick={getHomeTest1}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="itemAuto">
                        <div className="col-2 boxCheck">
                          <input type="radio" className="rdnSizeCheck" checked />
                        </div>
                        <div className="col-8 centerText">
                          <span className="Experiencia-profesional">
                            Ingreso Mensual
                          </span>
                        </div>
                        <div className="col-2 boxCheck" />
                      </div>
                    </div>
                  </>
                )}
                <hr className="hrItem" />

                {/* Conociemiento vial */}

                {!gastoMensual ? (
                  <>
                    <div className="itemAuto">
                      <div className="col-2 boxCheck">
                        <input type="radio" className="rdnSizeCheck" disabled />
                      </div>
                      <div className="col-8 centerText">
                        <span className="Experiencia-profesional">
                          Gasto Mensual
                        </span>
                      </div>
                      <div className="col-2 boxCheck">
                        <img
                          className="Rectangle-1408"
                          src='assets/boton-play.svg'
                          onClick={getHomeTest2}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="itemAuto">
                        <div className="col-2 boxCheck">
                          <input type="radio" className="rdnSizeCheck" checked />
                        </div>
                        <div className="col-8 centerText">
                          <span className="Experiencia-profesional">
                            Gasto Mensual
                          </span>
                        </div>
                        <div className="col-2 boxCheck" />
                      </div>
                    </div>
                  </>
                )}

                <hr className="hrItem" />


                {!consultaBuro ? (
                  <>
                    <div className="itemAuto">
                      <div className="col-2 boxCheck">
                        <input type="radio" className="rdnSizeCheck" disabled />
                      </div>
                      <div className="col-8 centerText">
                        <span className="Experiencia-profesional">
                          Consulta buro de crédito
                        </span>
                      </div>
                      <div className="col-2 boxCheck">
                        <img
                          className="Rectangle-1408"
                          src='assets/boton-play.svg'
                          onClick={getHomeTest3}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="itemAuto">
                        <div className="col-2 boxCheck">
                          <input type="radio" className="rdnSizeCheck" checked />
                        </div>
                        <div className="col-8 centerText">
                          <span className="Experiencia-profesional">
                            Consulta buro de crédito                      </span>
                        </div>
                        <div className="col-2 boxCheck" />
                      </div>
                    </div>
                  </>
                )}

                <hr className="hrItem" />

                {!referenciasPersonales ? (
                  <>
                    <div>
                      <div className="itemAuto">
                        <div className="col-2 boxCheck">
                          <input
                            className="radioClassCheck"
                            type="radio"
                            disabled
                          />
                        </div>
                        <div className="col-8 centerText">
                          <span className="Conocimiento-vial">Referencias Personales</span>
                        </div>
                        <div className="col-2 boxCheck">
                          <img
                            className="Rectangle-1408"
                            src='assets/boton-play.svg'
                            onClick={getHomeTest4}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="itemAuto">
                        <div className="col-2 boxCheck">
                          <input type="radio" className="rdnSizeCheck" checked />
                        </div>
                        <div className="col-8 centerText">
                          <span className="Conocimiento-vial">Referencias Personales</span>
                        </div>
                        <div className="col-2 boxCheck" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </div>

        <div className="footer">
          <div className="containerCont_P2">
            {!validateButtonNextQ ? (
              <>
                <button className='btnVer_P3'>
                  <span className='txtVer_P3'>Completar</span>
                </button>

              </>
            ) : (
              <>
                <button
                  className="button_P2 animate__animated animate__fadeIn"
                  onClick={handleNext}>
                  <span className="txtButton_P2">Completar</span>
                </button>
              </>
            )}
          </div>
          <div className="imageContainer_P2">
            <img src='assets/foodbrand@2x.png' className="imgFooter_P2" />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Body className='backGroudModal'>
          <div className='msjTitleModalDiv'>Error {showStatus}</div>
          <div className='msjErrorModal'>{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button_P2' onClick={handleClose}>
            <span className='txtButton_P2'>Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default MenuSolvencia
