'use client'

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cita() {

    const { IdJumio, setRutaBack } = useAppContext();
    const router = useRouter();
    const [strCPV, setStrCPV] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [show, setShow] = useState(false);
    const [showStatus, setShowStatus] = useState(null);
    const [showMessage, setShowMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [validateCurpCpv, setValidateCurpCpv] = useState(true);

    useEffect(() => {
        setRutaBack('/bandeja');
    }, []);

    useEffect(() => {

        setStrCPV(localStorage.getItem("sCpv") || '');

    }, []);

    const onValidateFaceMach = async () => {


        //navigate("/RequerimientosSelectedCita", {
        //    state: {
        //        rutaContinue: "/PantallaBase27",
        //        typeCredential: "lic",
        //    },
        //});

    };

    const onTest = async () => {
        router.push("/requerimientosselectedcita");
    };

    const handleClose = async () => {
        setShow(false);
        //window.location.href = "https://midpr.net/";
    };

    const onContinueModel = async () => {
        setModalShow(false);
    };



    return (
        <>
            <div className='containerInfo_P2 animate__animated animate__fadeIn'>
                <div className='containerIdent_P2'>
                    <div className='txtOp_P2'>Operación/Operation</div>
                    <div className='txtVer_P2'>Recolección de Credencial</div>
                    <div className='txtCpv_P2'>CPV/PVC</div>
                    <div className='txtVer_P2'>{strCPV}</div>
                    <div className='txtOp_P2'>Remitente/Sender</div>
                    <div className='txtVer_P2'>Business Prey</div>
                </div>
                <div className='containerDoc_P2'>
                    <div className='txtReq_P2'>Esta operación requiere:</div>
                </div>
                <div className='container_data_operation'>
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-12 mb-2">
                                <img src="assets/pin_yellow.svg" align="left" className='imgFol_P2 animate__animated animate__fadeIn' />
                                <div className='txtDocReq_P2'>Ubicarse</div>
                                <div className='txtIdenOf_P2 '>Lugar de recolección</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <img src="assets/doc_yellow.svg" align="left" className='imgFol_P2 animate__animated animate__fadeIn' />
                                <div className='txtDocReq_P2'>Fecha</div>
                                <div className='txtIdenOf_P2'>Fecha de recolección</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="footer">
                <div className="containerCont_P2">
                    {validateCurpCpv ? (
                        <>
                            <button className="button_P2" onClick={onTest}>
                                <span className="txtButton_P2">Aceptar</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="button_P2" onClick={onValidateFaceMach}>
                                <span className="txtButton_P2">Aceptar</span>
                            </button>
                        </>
                    )}
                </div>
                <div className="imageContainer_P2">
                    <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
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
    )
}

export default Cita
