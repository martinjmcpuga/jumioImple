'use client';

import React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import './style.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutenticacionLaboral = () => {

  const isRunned = useRef(false);
  const [loading, setLoading] = useState(true);
  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [userRfc, setUserRfc] = useState('');
  const [verNameFull, setverNameFull] = useState(true);
  const [cpv, setCpv] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    setRutaBack('/bandeja');
    setCpv(sessionStorage.getItem("sCpv"));
  }, []);


  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(false);

      setTimeout(() => {

        setLoading(true);

      }, 1300);


    }

    createSession();

  }, []);

  const onContinue = async () => {

    /** Validacion documento laboral  */

    router.push('/requerimientosn5');

  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="containerRender onContentExpands">
        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className='containerInfo_P2'>
              <div className='containerIdent_P2 animate__animated animate__fadeIn'>
                <div className='txtOp_P2'>Operación/Operation</div>
                <div className='txtVer_P2'>Autenticación Laboral</div>
                <div className='txtCpv_P2'>CPV/PVC</div>
                <div className='txtVer_P2'>{cpv}</div>
                <div className='txtOp_P2'>Remitente/Sender</div>
                <div className='txtVer_P2'>Business Prey</div>
              </div>
              <div className='containerDoc_P2'>
                <div className='txtReq_P2'>Esta operación requiere:</div>
              </div>
              <div className="container_data_operation">
                <div className="container-fluid ">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2 animate__animated animate__fadeIn' />
                      <div className='txtDocReq_P2'>Actividad Laboral</div>
                      <div className='txtIdenOf_P2 '>Haber realizado alguna actividad remunerada.</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2 animate__animated animate__fadeIn' />
                      <div className='txtDocReq_P2'>Comprobante de Ingreso</div>
                      <div className='txtIdenOf_P2'>Recibo de nómina.</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2 animate__animated animate__fadeIn' />
                      <div className='txtDocReq_P2'>Carta Compromiso</div>
                      <div className='txtIdenOf_P2'>Documento expedido</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2' />
                      <div className='txtDocReq_P2'>Contrato Individual</div>
                      <div className='txtIdenOf_P2'>Documento expedido</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="footer">
              <div className="containerCont_P2">
                <>
                  <button className="button_P2 buttonExpandsBase" onClick={onContinue}>
                    <span className="txtButton_P2">Aceptar</span>
                  </button>
                </>
              </div>
              <div className="imageContainer_P2">
                <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
              </div>
            </div>
          </>
        )}
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
  )
}

export default AutenticacionLaboral