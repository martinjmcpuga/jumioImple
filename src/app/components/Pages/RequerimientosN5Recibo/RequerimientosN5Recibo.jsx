'use client'

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

function RequerimientosN5Recibo() {

  const isRunned = useRef(false);
  const router = useRouter();
  const { IdJumio, setRutaBack } = useAppContext();
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [validateCurpCpv, setValidateCurpCpv] = useState(true);
  const [cpv, setCpv] = useState(false);

  useEffect(() => {

    setCpv(sessionStorage.getItem('sCpv'));

  }, []);

  const onTest = async () => {

    /** Validacion documento laboral  */

    //navigate("/RequerimientosSelectedN5Recibo");

  };

  const handleClose = async () => {
    setShow(false);
    window.location.href = "https://midpr.net/";
  };

  const onContinueModel = async () => {
    setModalShow(false);
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
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="containerCont_P2">
                <>
                  <button className="button_P2 buttonExpandsBase" onClick={onTest}>
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


      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        backdrop="static"
      >
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
}

export default RequerimientosN5Recibo;
