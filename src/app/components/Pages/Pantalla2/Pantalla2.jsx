import React, { useEffect, useState } from 'react';
import './style.css';
import { useAppContext } from '../../../context/AppContext';

function Pantalla2() {

    const { cpvI } = useAppContext();

  

    return (
        <>
            <div className='containerInfo_P2'>
                <div className='containerIdent_P2'>
                    <div className='txtOp_P2'>Operación/Operation</div>
                    <div className='txtVer_P2'>Verificación de Identificación Personal</div>
                    <div className='txtOp_P2'>CPV/PVC</div>
                    <div className='txtVer_P2'>{cpvI}</div>
                    <div className='txtOp_P2'>Remitente/Sender</div>
                    <div className='txtVer_P2'>Business Prey</div>
                </div>
                <div className='containerDoc_P2'>
                    <div className='txtReq_P2'>Esta operación requiere:</div>
                </div>
                <div className='container_data_operation'>
                    <img src='/assets/folder_alt.svg' align="left" className='imgFol_P2' />
                    <div className='txtDocReq_P2'>Documento de Identificación</div>
                    <div className='txtIdenOf_P2'>Identificación oficial o Pasaporte</div>
                </div>
            </div>
        </>
    )
}

export default Pantalla2
