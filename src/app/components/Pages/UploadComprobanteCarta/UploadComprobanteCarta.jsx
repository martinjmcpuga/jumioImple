'use client'

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import './ComprobanteIngreso.css'
import Modal from 'react-bootstrap/Modal';
import UploadFileCartaN5 from "./UploadFileCartaN5";
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadComprobanteCarta = () => {

  const [enabled, setEnabled] = useState(true)
  const [modal, setModal] = useState(false)
  const { IdJumio, setRutaBack } = useAppContext();

  useEffect(() => {
    setRutaBack('/requerimientosn5cartaselected');
  }, []);



  const handleFiles = () => {
    setEnabled(true);
  }

  useEffect(() => {
    setModal(true)
  }, [])

  return (
    <>
      <Modal className="animate__animated animate__fadeIn" show={modal} animation={true} centered backdrop="static">
        <Modal.Header className=' py-3 '>
          <div className="msjTitleModalDiv padMsj">Prepara tu documento</div>
          <hr className="lineSimple" />
        </Modal.Header>
        <Modal.Body className=''>
          <div className='Typography__Modal'>A continuación te pediremos que tengas a la
            mano tus documentos, para llevar a cabo su
            digitalización de esto. </div>
          <p className="Typography__Modal--sizing">
            Te hacemos las siguientes recomendaciones
          </p>
          <ul className="Typography__Modal Modal__List--style" >
            <li className="mb-2"> El nombre del solicitante debe ir en este orden: nombre, apellido paterno, apellido materno.</li>
            <li className="mb-2">
              El documento debe estar firmado.
            </li>
            <li>
              La fecha del documento debe ser igual o posterior a la fecha de emisión de la solicitud.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className='button_P2' >
            <span className='txtButton_P2' onClick={() => setModal(false)}>Capturar</span>
          </button>
        </Modal.Footer>
      </Modal>

      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="container-fluid " onClick={handleFiles}>

                <div className="row d-flex align-items-center">
                  <div className="col-2">
                    <input type="file" id="archivoInput" className="HiddenInput" />
                    <img src="assets/folderOpen.svg" alt="" />
                  </div>
                  <div className="col-10 ">
                    <div className="d-flex justify-content-start align-items-center h-100">
                      <p className="padMsj mb-0 mt-0 Typography__HeaderCard Message__Files">Cargar Archivo</p>
                      <p className="mt-0 mb-0 Loader__label HiddenInput" id="Loader__text"></p>
                    </div>

                    <div className="Loader__container    h-25">
                      <div className="loader h-100 HiddenInput" id="loader">

                      </div>
                    </div>

                  </div>

                </div>
                <hr className="lineSimple " />
                <div className="row">
                  <div className="col-12">

                    <p className="mb-0 mt-0 Typography__CardContent">
                      <abbr className="TrabajoActual--color">Te hacemos las siguientes recomendaciones</abbr>
                      <br />
                      El único formato permitido es PDF
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {enabled ? (<UploadFileCartaN5 />)
            : null}

        </div>
      </div>
    </>
  )
}

export default UploadComprobanteCarta