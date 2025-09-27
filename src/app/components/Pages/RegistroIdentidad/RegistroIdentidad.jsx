'use client'


import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import dynamic from 'next/dynamic';
import Modal from 'react-bootstrap/Modal';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './DataCss.css'

const RegistroIdentidad = () => {

  const { setRutaBack } = useAppContext();
  const router = useRouter();
  const isRunned = useRef(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [validacionDoc, setValidacionDoc] = useState(false);
  const [list, setList] = React.useState([]);

  useEffect(() => {
    setRutaBack('/');
  }, []);

  const handleAceptar = async () => {
    router.push('/');
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleCloseError = () => {
    setShowError(false);
  }

  const newplugin = defaultLayoutPlugin();

  return (
    <>

      {loading ? (

        <div className="spinner"></div>

      ) : (
        <div className="initBack_P2 animate__animated animate__fadeIn">
          <div className="">
            <div className="containerInfo_P2">
              <div className="containerIdent_P2 scrollDataPersonal">
                <div className="txtOp_P2">Operación/Operation</div>
                <div className="txtVer_P2">Firma Biométrica de Documento</div>
                <div className="txtOp_P2">Remitente/Sender</div>
                <div className="txtVer_P2">BP Intelligence</div>
                <br />
              </div>
            </div>
            <div className='containerDoc_P2'>
              <div className='txtReq_P2'>En esta operación se realizó:</div>
            </div>
            <div className='container_data_operation'>
              <img src='assets/file.svg' align="left" className='imgFol_P2' />
              <div className='txtDocReq_P2'>Autorización de Documento</div>
              <p className='txtIdenOf_P2_6'>Aceptación de términos y condiciones del documento.</p>

              <img src='assets/scanner.svg' align="left" className='imgFol_P2' />
              <div className='txtDocReq_P2'>Firma Biométrica</div>
              <p className='txtIdenOf_P2_6'>Autenticación de rasgos faciales para firma de
                documento.</p>
            </div>
          </div>

          <div className="footer">
            <div className="containerCont_P2">

              {validacionDoc ? (
                <button className='button_P2'>
                  <span className='txtButton_P2'>Confirmar</span>
                </button>
              ) : (
                <>
                  <button className='button_P2' onClick={e => handleAceptar()}>
                    <span className='txtButton_P2'>Confirmar</span>
                  </button>
                </>
              )}

              <div className="spaceButton14" />
            </div>
            <div className="imageContainer_P2">
              <img src='/assets/foodbrand@2x.png' className="imgFooter_P2" />
            </div>
          </div>
        </div>
      )}

      <Modal className="animate__animated animate__fadeIn" show={showError} onHide={handleCloseError} animation={false} centered backdrop="static">
        <Modal.Body className='backGroudModal'>
          <div className='msjTitleModalDiv'> {showStatus}</div>
          <div className='msjErrorModal'>{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button_P2' onClick={handleCloseError}>
            <span className='txtButton_P2'>Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default RegistroIdentidad