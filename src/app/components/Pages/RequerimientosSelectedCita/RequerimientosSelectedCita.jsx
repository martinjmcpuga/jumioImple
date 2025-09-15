'use client'

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import Modal from "react-bootstrap/Modal";
import "./requerimientos.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const RequerimientosSelectedCita = () => {

  const isRunned = useRef(false);
  const router = useRouter();
  const { IdJumio, setRutaBack } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const [domicilioParticular, setDomicilioParticular] = useState(false);
  const [domicilioParticularRef, setDomicilioParticularRef] = useState(false);
  const [loading, setLoading] = useState(false);

  const [identificacionSocial, setIdentificacionSocial] = useState(false);
  const [identificacionFiscal, setIdentificacionFiscal] = useState(false);

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    setRutaBack('/cita');
  }, []);


  const handleClose = () => {
    setShow(false);
  };

  const handleButtonClick = async () => {
    router.push("/estados");
  };

  const handleButtonRef = async () => {
    router.push("/fechacita");
  }

  const getResumen = async () => {
    //navigate("/DataCita");
  };

  useEffect(() => {

    async function createSession() {

      if (sessionStorage.getItem("idestado") != null && sessionStorage.getItem("idUbicacion") != null) {
        setDomicilioParticular(true);
      }

      if (sessionStorage.getItem("horario") != null) {
        setDomicilioParticularRef(true);
      }

      if (domicilioParticular && domicilioParticularRef) {
        setButtonEnabled(true);
      }
    }

    createSession();

  });


  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <div className='animate__animated animate__fadeIn'>
                <div className="containerInfo_P2">
                  <div className="containerIdent_P2">
                    <div className="txtOp_P2">Requerimientos</div>
                    <hr className="line" />
                    <div className="container-fluid ">
                      <div className="row">
                        <div className="col-12">

                          {!domicilioParticular ? (
                            <>
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1" disabled />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Ubicación de cabina
                                    <img
                                      onClick={handleButtonClick}
                                      src="assets/arrow_green.svg"
                                      alt=""
                                      className="Arrow__button--sizing"
                                    />
                                  </div>
                                </div>
                              </article>
                            </>
                          ) : (
                            <>
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1" checked />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Ubicación de cabina
                                  </div>
                                </div>
                              </article>
                            </>
                          )}

                          {!domicilioParticularRef ? (
                            <>
                              <hr className="line--Margin" />
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1 " disabled />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Seleccionar horario y fecha de
                                    recolección
                                    <img
                                      onClick={handleButtonRef}
                                      src="assets/arrow_green.svg"
                                      alt=""
                                      className="Arrow__button--sizing"
                                    />
                                  </div>
                                </div>
                              </article>
                            </>
                          ) : (
                            <>
                              <hr className="line--Margin" />
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1 " checked />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Seleccionar horario y fecha de
                                    recolección
                                  </div>
                                </div>
                              </article>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="lineSimple" />
                    <div className="btnContinue">
                      {!isButtonEnabled ? (
                        <>
                          <button className="btnVer_P3">
                            <span className="txtVer_P3">Aceptar</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="button_P2 animate__animated animate__fadeIn"
                            onClick={getResumen}
                          >
                            <span className="txtButton_P2">Aceptar</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="footer">
                  <div className="imageContainer_P2">
                    <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

      <Modal className="animate__animated animate__fadeIn" show={show} onHide={handleClose} animation={false} centered>
        <Modal.Body className="backGroudModal">
          <div className="msjTitleModalDiv">Error {showStatus}</div>
          <div className="msjErrorModal">{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button_P2" onClick={handleClose}>
            <span className="txtButton_P2">Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequerimientosSelectedCita;
