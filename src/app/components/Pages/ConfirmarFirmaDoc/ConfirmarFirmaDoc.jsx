'use client';

import React from "react";
import { useEffect, useRef, useState } from "react";
import './style.css';

function ConfirmarFirmaDoc() {

    const isRunned = useRef(false);
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


    return (
        <>
            <div className='containerInfo_P2 animate__animated animate__fadeIn'>
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
        </>
    )
}
export default ConfirmarFirmaDoc
