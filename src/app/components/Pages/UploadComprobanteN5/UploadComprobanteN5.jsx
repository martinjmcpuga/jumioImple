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

          {enabled ? (<UploadFile />)
            : null}

        </div>
      </div>
    </>
  )
}

export default UploadComprobanteN5