'use client';

import React from 'react'
import { useRef, useState, useEffect } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { getWsAddScoreJumio } from "../../Api/getWsAddScoreJumio";
import './style.css';


const ResumeAddScore = () => {

    const isRunned = useRef(false);
    const router = useRouter();
    const { IdJumio } = useAppContext();
    const [dateReco, setDateReco] = useState("");
    const [strOperation, setStrOperation] = useState("");
    const [strStatus, setStrStatus] = useState("");

    useEffect(() => {

        if (isRunned.current) return;
        isRunned.current = true;

        async function createSession() {

            setStrOperation("Verificación de Domicilio Personal");
            setStrStatus("Verificado");

        }

        createSession();

    }, []);


    const onComplete = async () => {

        try {

            const objModel = {
                id: IdJumio
            }

            const responseAdd = await getWsAddScoreJumio(objModel);
            router.push('/bandeja');

        } catch (e) {
            console.log('Error')
        }

    }

    return (
        <>

            <div className='initBack_P2 animate__animated animate__fadeIn'>

                {/* <div className='containerRender'> */}

                <div className='containerInfo_P2'>
                    <div className='containerIdent_P2'>
                        <div className='txtOp_P2'>Operación/Operation</div>
                        <div className='txtVer_P2'>{strOperation}</div>
                        <div className='txtCpv_P2'>Estatus/Status</div>
                        <div className='txtVer_P2'>{strStatus}</div>
                    </div>
                    <div className='containerDoc_P2'>
                        <div className='txtReq_P2'>En esta operación se realizó:</div>
                    </div>
                    <div className='container_data_operation'>
                        <img src="assets/file.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Captura de comprobante</div>
                        <p className='txtIdenOf_P2_6'>Comprobante de domicilio válido.</p>

                        <img src="assets/shield.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Presencia en ubicación</div>
                        <p className='txtIdenOf_P2_6'>Presencia en dirección proporcionada.</p>

                        <img src="assets/shield.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Presencia registral</div>
                        <p className='txtIdenOf_P2_6'>Revisión en registros públicos.</p>

                        <img src="assets/shield.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Presencia digital</div>
                        <p className='txtIdenOf_P2_6'>Actividad digital en los últimos 30 días.</p>

                        <img src="assets/scanner.svg" align="left" className='imgFol_P2' />
                        <div className='txtDocReq_P2'>Autorización de operación</div>
                        <p className='txtIdenOf_P2_6'>Autorización con reconocimiento facial.</p>
                    </div>
                </div>

                <div className="footer">
                    <div className='containerCont_P2'>
                        <button className='button_P2' onClick={onComplete} >
                            <span className='txtButton_P2'>Terminar</span>
                        </button>
                    </div>
                    <div className='imageContainer_P2'>
                        <img src="assets/foodbrand@2x.png" className='imgFooter_P2' />
                    </div>
                </div>

            </div>

        </>
    )
}
export default ResumeAddScore
