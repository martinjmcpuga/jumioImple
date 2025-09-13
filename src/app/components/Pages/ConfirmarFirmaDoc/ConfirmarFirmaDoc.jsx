'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import './style.css';

function ConfirmarFirmaDoc() {

    const isRunned = useRef(false);
    const router = useRouter();
    const [strStatus, setStrStatus] = useState("");
    const [strOperation, setStrOperation] = useState("");

    useEffect(() => {

        if (isRunned.current) return;
        isRunned.current = true;

        async function createSession() {

            setStrOperation("Firma Biométrica de Documento");
            setStrStatus("Verificado");

        }

        createSession();

    }, []);

    const onComplete = async () => {
        router.push('/bandeja');
    }

    const handleReintentar = async () => {
        router.push('/bandeja');
    }

    return (
        <>
            <div className='containerInfo_P2 animate__animated animate__fadeIn'>
                <div className="containerRender">
                    <div className='containerIdent_P2'>
                        <div className='txtOp_P2'>Operación/Operation</div>
                        <div className='txtVer_P2'>{strOperation}</div>
                        <div className='txtOp_P2'>Remitente/Sender</div>
                        <div className='txtVer_P2'>BP Intelligence</div>
                    </div>
                    <div className='containerDoc_P2'>
                        <div className='txtReq_P2'>En esta operación se realizó:</div>
                    </div>
                    <div className='container_data_operation'>
                        <img src="assets/file.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Autorización de Documento</div>
                        <p className='txtIdenOf_P2_6'>Aceptación de términos y condiciones del documento.</p>

                        <img src="assets/scanner.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Firma Biométrica</div>
                        <p className='txtIdenOf_P2_6'>Autenticación de rasgos faciales para firma de
                            documento.</p>
                    </div>
                </div>
                <div className="footer">
                    <div className="containerCont_P2">
                        <button className='button_P2' onClick={onComplete} >
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
        </>
    )
}
export default ConfirmarFirmaDoc
