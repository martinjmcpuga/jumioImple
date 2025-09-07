'use client'

import React from 'react';
import { useEffect, useRef, useState } from "react";
import { getGetDocIndividualWsaicm } from '../../Api/getGetDocIndividualWsaicm';
import { useRouter } from 'next/navigation';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import dynamic from 'next/dynamic';
import Modal from 'react-bootstrap/Modal';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './DataCss.css'

const Viewer = dynamic(
    () => import('@react-pdf-viewer/core').then((mod) => mod.Viewer),
    { ssr: false }
);

const Worker = dynamic(
    () => import('@react-pdf-viewer/core').then((mod) => mod.Worker),
    { ssr: false }
);



const DocumentosPrev = () => {



  const isRunned = useRef(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const navigate = useRouter();
  const [showError, setShowError] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [validacionDoc, setValidacionDoc] = useState(false);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const objDoc = {
        cpv: sessionStorage.getItem('sCpv'),
      }

      const responseDoc = await getGetDocIndividualWsaicm(objDoc);

      if (responseDoc.status === 200) {

        setPdfUrl(responseDoc.doc);
        setLoading(false);
        setShow(true);

      } else {

        setLoading(false);
        setShowError(true);
        setShowStatus(400);
        setShowMessage(responseDoc.message);
      }

    }

    createSession();

  }, []);

  const handleAceptar = async () => {
    navigate('/PantallaBase27');
  }

  const handleClose = () => {
    setShow(false);
    navigate('/PantallaBase27');
  }

  const handleCloseError = () => {
    setShowError(false);
    navigate('/PantallaBase27');
  }

  const handleConfirmar = () => {
    navigate("/FlujoIncodeSigDoc", {
      state: {
        rutaContinue: "/PantallaBase26N5",
        typeCredential: "ine"
      }
    });
  }

  const newplugin = defaultLayoutPlugin();

  return (
    <>
      <>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          show={show}
          onHide={handleClose}
          className='Modal_Styled'
        >
          <Modal.Body >
            <div className='d-flex justify-content-between align-items-center '>
              <p className="title-body mb-5 mt-0 d-flex align-items-center">Firma de Documento</p>
              <p className="mb-0 mt-0">
                <img  alt="" onClick={handleClose} />
              </p>
            </div>
           <div className='newModal'  style={{ height: '43vh', '--scale-factor': 1 }}>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'  >
                <Viewer defaultScale={.9} fileUrl={pdfUrl} plugins={[newplugin]} httpHeaders={{
                  "Content-Type": "application/json",

                }} />
              </Worker>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='p-7 mt-3 rounded-pill Button__autorizar w-full d-flex align-items-center justify-content-evenly' onClick={handleConfirmar}>
              <img   srcSet="" />
              Autorizar Documento
            </button>
          </Modal.Footer>
        </Modal>



      </>

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
                <div className='some-page-wrapper' />
              </div>
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
              <img src='/assets/foodbrand@2x.png'  className="imgFooter_P2" />
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

export default DocumentosPrev