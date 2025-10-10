'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataCita = () => {

  const isRunned = useRef(false);
  const router = useRouter();
  const [firstName, setFirstName] = useState(sessionStorage.getItem("nombre"));
  const [paternalLastName, setPaternalLastName] = useState(sessionStorage.getItem("paterno"));
  const [maternalLastName, setMaternalLastName] = useState(sessionStorage.getItem("materno"));
  const [verNameFull, setverNameFull] = useState(true);
  const [horario, setHorario] = useState(sessionStorage.getItem("horario"));
  const [ubicacion, setUbicacion] = useState(sessionStorage.getItem("ubicacion"));
  const [ubicacionDireccion, setUbicacionDireccion] = useState(sessionStorage.getItem("ubicacionDireccion"));
  const [ubicacionApertura, setUbicacionApertura] = useState(sessionStorage.getItem("ubicacionApertura"));
  const [ubicacionCierre, setUbicacionCierre] = useState(sessionStorage.getItem("ubicacionCierre"));

  const handleAceptar = () => {

    router.push("/camaracomparecita");

  }

  useEffect(() => {

    if (sessionStorage.getItem("paterno") === 'null') {

      setverNameFull(false);
      setFirstName(sessionStorage.getItem("nombre") || '');

    } else {

      setverNameFull(true);
      setFirstName(sessionStorage.getItem("nombre") || '');
      setPaternalLastName(sessionStorage.getItem("paterno") || '');
      setMaternalLastName(sessionStorage.getItem("materno") || '');

    }

  }, []);


  return (
    <>
      <>
      </>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              {!verNameFull ? (
                <>
                  <div className="txtOp_P2">Nombre/Given name</div>
                  <div className="txtVer_P2 P_button">{firstName}</div>
                </>
              ) : (
                <>
                  <div className="txtOp_P2">Nombres/Given names</div>
                  <div className="txtVer_P2 P_button">{firstName}</div>

                  <div className="txtOp_P2">Apellidos/Surname</div>
                  <div className="txtVer_P2 P_button">
                    {paternalLastName} {maternalLastName}
                  </div>
                </>
              )}
              <div className="txtOp_P2">Ubicación/Location</div>
              <div className="txtVer_P2">{ubicacion}</div>
              <div className="txtVer_P2">{ubicacionDireccion}</div>
              <div className="txtVer_P2">{ubicacionApertura} {ubicacionCierre}</div>
              <div className="txtOp_P2">Fecha/Date</div>
              <div className="txtVer_P2">{horario}</div>
              <hr className="line" />
              <p className=' text-center Footer__text'>La fecha de expiración son
                30 días posteriores a la generación.</p>
            </div>

          </div>
        </div>
        <div className="footer">
          <div className="containerCont_P2">
            <button className='button_P2' onClick={e => handleAceptar()} >
              <span className='txtButton_P2'>Aceptar</span>
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

export default DataCita