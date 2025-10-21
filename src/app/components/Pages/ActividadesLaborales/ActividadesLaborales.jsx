'use client'

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { mtFindPersonJumio } from "../../Api/mtFindPersonJumio";
import { mtUpdateHistorialCompletoJumio } from "../../Api/mtUpdateHistorialCompletoJumio";
import './HistorialLaboral.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActividadesLaborales = () => {
  const { IdJumio } = useAppContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [blContinue, setBlContinue] = useState(false);

  const [blHistorial0, setBlHistorial0] = useState(false);
  const [blHistorial1, setBlHistorial1] = useState(false);
  const [blHistorial2, setBlHistorial2] = useState(false);

  const [blHistorial0Visible, setBlHistorial0Visible] = useState(false);
  const [blHistorial1Visible, setBlHistorial1Visible] = useState(false);
  const [blOnActividad, setBlOnActividad] = useState(true);
  const [blHistorialNo, setBlHistorialNo] = useState(false);

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const isRunned = useRef(false);

  const handleButtonClick = async () => {
    const objCons = { id: sessionStorage.getItem('id_jumio') };
    const response = await mtUpdateHistorialCompletoJumio(objCons);

    if (response.status === 200) {
      router.push(sessionStorage.getItem("n5com"));
    } else {
      setLoading(false);
      setShow(true);
      setShowStatus(response.status);
      setShowMessage(response.message);
    }
  };

  const handleButtonFiscal = async () => {
    router.push('/historiallaboral');
  };

  const onAddNuevaAct = async () => {
    router.push('/historiallaboral');
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {
      setLoading(true);
      const objCons = { id: sessionStorage.getItem('id_jumio') };
      const responsePerson = await mtFindPersonJumio(objCons);

      if (responsePerson.status === 200) {
        if (responsePerson.historial0 === true) {
          setBlHistorial0(true);
          setBlContinue(true);
          setBlOnActividad(false);
        }
        if (responsePerson.historial1 === true) {
          setBlHistorial1(true);
          setBlHistorial0Visible(true);
        }
        if (responsePerson.historial2 === true) {
          setBlHistorial2(true);
          setBlHistorial1Visible(true);
        }

        if (responsePerson.historial0 && responsePerson.historial1 && responsePerson.historial2) {
          await mtUpdateHistorialCompletoJumio(objCons);
          setBlOnActividad(true);
        }
      } else {
        setShow(true);
        setShowStatus(responsePerson.status);
        setShowMessage(responsePerson.message);
      }

      setLoading(false);
    }

    createSession();
  }, []);

  // 🔹 Elemento reutilizable para cada actividad
  const ActividadItem = ({ checked }) => (
    <div className="row">
      <div className="col-12">
        <article className="d-flex align-items-center">
          <div className="textCheck w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="containerCheck_P28 spaceRadio">
                <input type="radio" className="rdnSize mt-1" checked={checked} readOnly />
              </div>
              <div className="Spacing">Actividad Laboral</div>
            </div>

            {/* 🔹 Mostrar solo si no está checked */}
            {!checked && (
              <img
                onClick={handleButtonFiscal}
                src="assets/arrow_green.svg"
                alt=""
                className="Arrow__button--sizing"
              />
            )}
          </div>
        </article>
      </div>
      <br />
      <br />
      <hr className="lineSimple" />
    </div>
  );

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="containerInfo_P2 animate__animated animate__fadeIn">
              <div className="containerIdent_P2">
                <div className="txtOp_P2">Actividades Laborales</div>
                <div className="txtSilver_P2">
                  Agregue una ó hasta tres Actividades Laborales, de la más reciente a la más antigua.
                </div>
                <hr className="line" />

                <div className="container-fluid">
                  {!blHistorialNo && (
                    <>
                      <ActividadItem checked={blHistorial0} />
                      {blHistorial0Visible && <ActividadItem checked={blHistorial1} />}
                      {blHistorial1Visible && <ActividadItem checked={blHistorial2} />}

                      {!blOnActividad && (
                        <div className="containerAddActContainer_Actividadivity">
                          <div className="divDashed">
                            <button className="btnVer_P3Acti m02" onClick={onAddNuevaAct}>
                              <span className="mb-0 text-center p-2">Agregar Actividad</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <hr className="lineSimple" />

                {blContinue ? (
                  <div className="btnContinue">
                    <button className="button_P2" onClick={handleButtonClick}>
                      <span className="txtButton_P2">Continuar</span>
                    </button>
                  </div>
                ) : (
                  <div className="btnContinue">
                    <button className="btnVer_P3">
                      <span className="txtVer_P3">Continuar</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
        <Modal.Body>
          <div className="msjTitleModalDiv">{showStatus}</div>
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

export default ActividadesLaborales;
