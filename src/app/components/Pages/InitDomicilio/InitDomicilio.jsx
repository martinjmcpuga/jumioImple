'use client'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import "./style.css";

const InitDomicilio = () => {

  const isRunned = useRef(false);
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [cpv, setCpv] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [validateCurpCpv, setValidateCurpCpv] = useState(true);

  useEffect(() => {
    setCpv(localStorage.getItem('sCpv'));
  }, []);

  const onTest = async () => {
    router.push('/requerimientosn2');
  };

  return (
    <>
      <div className="containerRender onContentExpands">
        <div className='containerInfo_P2 animate__animated animate__fadeIn'>
          <div className='containerIdent_P2'>
            <div className='txtOp_P2'>Operación/Operation</div>
            <div className='txtVer_P2'>Verificación de Domicilio Personal</div>
            <div className='txtCpv_P2'>CPV/PVC</div>
            <div className='txtVer_P2'>{cpv}</div>
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
                  <img src='assets/doc_yellow.svg' align="left" className='imgFol_P2' />
                  <div className='txtDocReq_P2'>Comprobante de Domicilio</div>
                  <div className='txtIdenOf_P2'>Recibo de Agua, Luz o Teléfono.</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <img src='assets/setting_yellow.svg' align="left" className='imgFol_P2' />
                  <div className='txtDocReq_P2'>Acceso a Ubicación</div>
                  <div className='txtIdenOf_P2'>Debe permitir el acceso en su navegador.</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="footer ">
        <div className="containerCont_P2">

          <>
            <button className="button_P2" onClick={onTest}>
              <span className="txtButton_P2">Aceptar</span>
            </button>
          </>

        </div>
        <div className="imageContainer_P2">
          <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
        </div>
      </div>

    </>
  );
}

export default InitDomicilio;
