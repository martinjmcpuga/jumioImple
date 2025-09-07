'use client'

import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataSocial() {

  const isRunned = useRef(false);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");
  const [show2, setShow2] = useState(false);
  const [userNss, setUserNss] = useState("");
  const [verNameFull, setverNameFull] = useState(true);


  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setFirstName(sessionStorage.getItem("nombre") || '');
      setPaternalLastName(sessionStorage.getItem("paterno") || '');
      setMaternalLastName(sessionStorage.getItem("materno") || '');
      setUserNss(sessionStorage.getItem("socialStr") || '');

    }

    createSession();

  }, []);


  const handleReintentar = () => {
    router.push('/identificacionsocial');
  }

  const handleAceptar = () => {
    setShow2(false);
    router.push('/uploadnss');
  }

  return (
    <>

      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              {!verNameFull ? (
                <>
                  <div className="txtOp_P2">Nombre/Given name</div>
                  <div className="txtVer_P2">{firstName}</div>
                </>
              ) : (
                <>
                  <div className="txtOp_P2">Nombres/Given names</div>
                  <div className="txtVer_P2">{firstName}</div>

                  <div className="txtCpv_P2">Apellidos/Surname</div>
                  <div className="txtVer_P2">
                    {paternalLastName} {maternalLastName}
                  </div>
                </>
              )}
              <div className="txtOp_P2">Identificación Social/Social number</div>
              <div className="txtVer_P2">{userNss}</div>
              <hr className="line" />
              <p className=' text-center Footer__text'>La fecha de expiración son
                <strong> 360 días</strong>  posteriores a la generación.</p>
            </div>

          </div>
        </div>
        <div className="footer">
          <div className="containerCont_P2">
            <button className='button_P2' onClick={e => setShow2(true)} >
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


      <Modal show={show2} animation={false} centered>
        <Modal.Body className="backGroudModal">
          <div className="msjTitleModalDiv pb-2">Atención</div>
          <div className="msjErrorModal">La documentación que deberá subir en el siguiente apartado es:
            <br />
            -Constancia de Vigencia de Derechos actualizada del IMSS</div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button_P2" onClick={handleAceptar}>
            <span className="txtButton_P2">Continuar</span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DataSocial
