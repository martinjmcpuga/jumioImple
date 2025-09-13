'use client'

import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { mtUpdateComprobanteCompletoJumio } from '../../Api/mtUpdateComprobanteCompletoJumio';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

const DataExperienciaLaboral = () => {

  const isRunned = useRef(false);
  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExperience, setUserExperience] = useState("");
  const [verNameFull, setverNameFull] = useState(true);

  useEffect(() => {
    setRutaBack('/experiencialaboral');
  }, []);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      // setLoading(true);

      setUserExperience(sessionStorage.getItem("experienciaLabel"));
      setFirstName(sessionStorage.getItem("nombre") || '');
      setPaternalLastName(sessionStorage.getItem("paterno") || '');
      setMaternalLastName(sessionStorage.getItem("materno") || '');


    }

    createSession();

  }, []);

  const handleReintentar = () => {
    router.push('/experiencialaboral');
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleAceptar = async () => {

    const objConsComprobanteCompleto = {
      id: sessionStorage.getItem('id_jumio'),
      aniosExperiencia: sessionStorage.getItem("experiencia")
    };

    const responseComprobanteCompleto = await mtUpdateComprobanteCompletoJumio(objConsComprobanteCompleto);

    if (responseComprobanteCompleto.status === 200) {

      router.push(sessionStorage.getItem("n5com"));

    } else {

      setLoading(true);
      setShow(true);
      setShowStatus(400);
      setShowMessage(responseComprobanteCompleto.message);
    }

  }

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">

              {!verNameFull ? (
                <>
                  <div className="txtOp_P2">Nombre/Given name</div>
                  <div className="txtVer_P2">{firstName}</div>

                </>
              ) : (
                <>
                  <div className="txtOp_P2">Nombres/Given names</div>
                  <div className="txtVer_P2">{firstName}</div>
                  <div className="txtOp_P2">Apellidos/Surname</div>
                  <div className="txtVer_P2">{paternalLastName} {maternalLastName}</div>
                </>
              )}

              <div className="txtOp_P2">Experiencia/Experience</div>
              <div className="txtVer_P2">{userExperience}</div>
              <hr className="line" />
              <div className=' text-center Footer__text'>
                La fecha de expiración son
              </div>
              <div className="infoCenter"><strong> 90 días</strong>  posteriores a la generación.</div>
            </div>

          </div>
        </div>
        <div className="footer">
          <div className="containerCont_P2">
            <button className='button_P2' onClick={e => handleAceptar()} >
              <span className='txtButton_P2'>Aceptar</span>
            </button>
            <div className="spaceButton14" />
            <button className='buttonRein_P2' onClick={e => handleReintentar()}>
              <span className='txtButtonRein_P14'>Reintentar</span>
            </button>
          </div>
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
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
  )
}

export default DataExperienciaLaboral