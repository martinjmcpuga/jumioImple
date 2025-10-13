'use client'

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { mtFindPersonJumio } from "../../Api/mtFindPersonJumio";
import Modal from "react-bootstrap/Modal";
import "./requerimientos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { mtUpdateHistorialCompletoJumio } from "../../Api/mtUpdateHistorialCompletoJumio";

const RequerimientosSelectedN5Carta = (props) => {

  const isRunned = useRef(false);
  const router = useRouter();
  const { IdJumio, setRutaBack } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const [domicilioParticular, setDomicilioParticular] = useState(false);
  const [domicilioParticularRef, setDomicilioParticularRef] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartaCompromiso, setCartaCompromiso] = useState(false);

  const [contratoIndividual, setContratoIndividual] = useState(false);
  const [onehabilita, setOnehabilita] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [openedBy, setOpenedBy] = useState('');

  useEffect(() => {
    setRutaBack('/requerimientosn5');
  }, []);


  const handleButtonClick = async () => {
    router.push('/experiencialaboral');
  };

  const handleButtonRef = async () => {
    router.push('/historiallaboral');
  }

  const handleRedirecNotComproante = () => {

    if (openedBy === 'carta') {

      router.push('/uploadcomprobantecarta');

    } else if (openedBy === 'contrato') {

      router.push('/uploadcomprobantecontrato');

    }

  }

  const handleClose = () => {
    setShow(false);
  };

  const handleButtonFiscal = async (param) => {
    setOpenedBy(param);
    setShowModal(true);
  }

  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const objCons = {
        id: sessionStorage.getItem('id_jumio')
      }

      const responsePerson = await mtFindPersonJumio(objCons);

      if (responsePerson.status === 200) {

        if (responsePerson.historial0 === true &&
          responsePerson.historial1 === true &&
          responsePerson.historial2 === true) {

          const responseHistorialCompleto = await mtUpdateHistorialCompletoJumio(objCons);

          setDomicilioParticularRef(true);

        }

        if (responsePerson.aniosExperienciaBol === true) {
          setDomicilioParticular(true);
        }

        if (responsePerson.onHistorialCompleto === true) {
          setDomicilioParticularRef(true);
        }

        if (responsePerson.cartaCompromiso === true) {
          setCartaCompromiso(true);
        }

        if (responsePerson.contratoIndividual === true) {
          setContratoIndividual(true);
        }

        setLoading(false);

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(responsePerson.status);
        setShowMessage(responsePerson.message);

      }

    }

    createSession();

  }, []);


  const getResumen = async () => {

    router.push('/camaracompare');

  };

  useEffect(() => {

    if (domicilioParticular === true && domicilioParticularRef === true &&
      cartaCompromiso === true) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }

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
                                    Experiencia Laboral
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
                                    Experiencia Laboral
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
                                    Historial Laboral
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
                                    Historial Laboral
                                  </div>
                                </div>
                              </article>
                            </>
                          )}

                          {!cartaCompromiso ? (
                            <>

                              <hr className="line--Margin" />
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1" disabled />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Carta compromiso
                                    <img
                                      onClick={() => handleButtonFiscal('carta')}
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
                                    <input type="radio" className="rdnSize mt-1" checked />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Carta compromiso
                                  </div>
                                </div>
                              </article>
                            </>
                          )}

                          {!contratoIndividual ? (
                            <>

                              <hr className="line--Margin" />
                              <article className="d-flex  align-items-center">
                                <div className="textCheck w-100  d-flex align-items-center">
                                  <div className="containerCheck_P28 spaceRadio">
                                    <input type="radio" className="rdnSize mt-1" disabled />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Contrato individual
                                    <img
                                      onClick={() => handleButtonFiscal('contrato')}
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
                                    <input type="radio" className="rdnSize mt-1" checked />
                                  </div>
                                  <div className="w-100  Spacing d-flex align-items-center">
                                    Contrato individual
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
                            <span className="txtVer_P3">Completar</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="button_P2 animate__animated animate__fadeIn"
                            onClick={getResumen}
                          >
                            <span className="txtButton_P2">Completar</span>
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

      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="animate__animated animate__fadeIn"
        show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <p className="txtMsj_P1">Reconozco y declaro que las imágenes que procederé a cargar en la aplicación han sido previamente revisadas y testadas. Acepto toda responsabilidad legal y moral relacionada con el uso y la análisis de estas imágenes en la plataforma conforme a la Política de Privacidad previamente suscrita. Asimismo, el usuario libera a DPR y sus clientes de cualquier responsabilidad derivada del uso indebido o de la inobservancia de los lineamientos descritos. Declaro haber entendido, y estoy de acuerdo y conforme con los términos y condiciones establecidos por DPR para la carga de imágenes en la plataforma.</p>
          <button
            className={`buttonCookies_P1 ${onehabilita ? "buttonEnabled" : ""}`}
            onClick={() => setOnehabilita(!onehabilita)}
          >

            <div className="txtCookies_P1">Acepto términos y condiciones</div>
          </button>
          <div className="spaceButtonModal" />
          <button
            className={!onehabilita ? "buttonModal_P1" : "buttonModal_disable"}
            onClick={props.onHide}
            disabled={onehabilita}
          >
            <div
              className={
                !onehabilita ? "txtButtonModal_P1" : "txtButtonModal_disable"
              }
              onClick={handleRedirecNotComproante}
            >
              Confirmar
            </div>
          </button>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose} animation={false} className="animate__animated animate__fadeIn" centered>
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

export default RequerimientosSelectedN5Carta;
