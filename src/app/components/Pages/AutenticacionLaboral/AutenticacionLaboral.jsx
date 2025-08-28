'use client'
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import './style.css';

const AutenticacionLaboral = () => {

  const isRunned = useRef(false);
  const { IdJumio } = useAppContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");
  const [userRfc, setUserRfc] = useState('');
  const [verNameFull, setverNameFull] = useState(true);
  const [cpv, setCpv] = useState("");

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setFirstName(localStorage.getItem("nombre") || '');
      setPaternalLastName(localStorage.getItem("paterno") || '');
      setMaternalLastName(localStorage.getItem("materno") || '');
      setUserRfc(localStorage.getItem("userRfc") || '');
      setCpv(localStorage.getItem("sCpv") || '');
    }

    createSession();

  }, []);


  return (
    <>
      <div className='containerInfo_P2'>
        <div className='containerIdent_P2'>
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
                <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2' />
                <div className='txtDocReq_P2'>Actividad Laboral</div>
                <div className='txtIdenOf_P2 '>Haber realizado alguna actividad remunerada.</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2' />
                <div className='txtDocReq_P2'>Comprobante de Ingreso</div>
                <div className='txtIdenOf_P2'>Recibo de nómina.</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <img src="assets/folder_yellow.svg" align="left" className='imgFol_P2' />
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
    </>
  )
}

export default AutenticacionLaboral