'use client';

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import { mtFindPersonJumio } from '../../Api/mtFindPersonJumio';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dataconfirm = () => {

  const { setRutaBack } = useAppContext();
  const [loading, setLoading] = useState(true);
  const isRunned = useRef(false);
  const [firstName, setFirstName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [claveDeElector, setClaveDeElector] = useState('');
  const [verNameFull, setverNameFull] = useState(true);
  const { cpvI } = useAppContext();
  const { setTokenJumio } = useAppContext();
  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    setRutaBack('/documentos');
  }, []);

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
        setBirthDate(sessionStorage.getItem("fechaNacimientoFront") || '');
        setClaveDeElector(sessionStorage.getItem("curpValidate") || '');

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


  return (
    <>

      <div className="containerRender onContentExpands animate__animated animate__fadeIn">
        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="containerInfo_P2 animate__animated animate__fadeIn">
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

                  <div className="txtCpv_P2">Apellidos/Surname</div>
                  <div className="txtVer_P2">
                    {paternalLastName} {maternalLastName}
                  </div>
                </>
              )}
              <div className="txtOp_P2">
                Número de Identificación/Identity Number
              </div>
              <div className="txtVer_P2">{claveDeElector}</div>
            </div>

            <Link href="/bandeja" className="btnBack_P2">
              <section className="containerButtonOnExpands_P2 mt-4">
                <button
                  className="btnVer_P14OK buttonExpandsBase"
                >
                  <span className="txtVer_P14OK">Continuar</span>
                </button>
                <br />
              </section>
            </Link>
          </div>

        )}

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

export default Dataconfirm
