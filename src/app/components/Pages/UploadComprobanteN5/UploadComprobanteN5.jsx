'use client'

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import UploadFile from "./UploadFile";
import './ComprobanteIngreso.css'

const UploadComprobanteN5 = () => {

  const [enabled, setEnabled] = useState(true)
  const { IdJumio, setRutaBack } = useAppContext();

  useEffect(() => {
    setRutaBack('/comprobanteingreso');
  }, []);

  const handleFiles = () => {
    setEnabled(true);
  }

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="container-fluid " onClick={handleFiles}>

                <div className="row d-flex align-items-center">
                  <div className="col-2">
                    <input type="file" id="archivoInput" className="HiddenInput" />
                    <img src="assets/folderOpen.svg" alt="" />
                  </div>
                  <div className="col-10 ">
                    <div className="d-flex justify-content-start align-items-center h-100">
                      <p className="padMsj mb-0 mt-0 Typography__HeaderCard Message__Files">Cargar Archivo</p>
                      <p className="mt-0 mb-0 Loader__label HiddenInput" id="Loader__text"></p>
                    </div>

                    <div className="Loader__container    h-25">
                      <div className="loader h-100 HiddenInput" id="loader">

                      </div>
                    </div>

                  </div>

                </div>
                <hr className="lineSimple " />
                <div className="row">
                  <div className="col-12">

                    <p className="mb-0 mt-0 Typography__CardContent">
                      <abbr className="TrabajoActual--color">Recomendación</abbr>
                      <br />
                      Los formatos permitidos son PDF, JPEG o PNG.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
          {enabled ? (<UploadFile />)
            : null}
        </div>
      </div>
    </>
  )
}

export default UploadComprobanteN5