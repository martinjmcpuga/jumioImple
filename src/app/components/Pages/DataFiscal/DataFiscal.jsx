'use client'

import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import './DataCss.css'
import { mtFindPersonJumio } from '../../Api/mtFindPersonJumio';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataFiscal = () => {

  const isRunned = useRef(false);
  const { IdJumio } = useAppContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");
  const [userRfc, setUserRfc] = useState('');
  const [verNameFull, setverNameFull] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const handleClose = () => {
    setShow2(false);
  };

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      const objJumioSelfie = {
        id: sessionStorage.getItem('id_jumio'),
        idJumio: sessionStorage.getItem('id_jumio')
      };

      const responsePersonJumio = await mtFindPersonJumio(objJumioSelfie);

      if (responsePersonJumio.status === 200) {

        setFirstName(responsePersonJumio.nombre);
        setPaternalLastName(responsePersonJumio.paterno);
        setMaternalLastName(responsePersonJumio.materno);
        setUserRfc(sessionStorage.getItem("userRfc") || '');

      } else {

        setLoading(true);
        setShow2(true);
        setShowStatus(400);
        setShowMessage(responsePersonJumio.message);

      }

      setLoading(true);

    }

    createSession();

  }, []);

  const handleAceptar = () => {

    router.push('/requerimientosselected');

  }

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">

        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className="containerRender animate__animated animate__fadeIn">
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

                  <div className="txtOp_P2">Identificación fiscal/Tax number</div>
                  <div className="txtVer_P2">{userRfc}</div>
                  <hr className="line" />
                  <p className=' text-center Footer__text'>La fecha de expiración son
                    <strong> 360 días</strong>  posteriores a la generación.</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="footer">
          <div className="containerCont_P2">
            <button className='button_P2' onClick={e => handleAceptar()}>
              <span className='txtButton_P2'>Aceptar</span>
            </button>
          </div>
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
        </div>
      </div>

      <Modal show={show2} onHide={handleClose} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
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
  )
}

export default DataFiscal