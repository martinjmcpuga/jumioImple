import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "./styleDomPersonal.css";

const HomeSolvencia = () => {

  const [strCPV, setStrCPV] = useState("");
  const router = useRouter();

  useEffect(() => {
    setStrCPV(sessionStorage.getItem("sCpv"));
  });

  const onTest = async () => {

    //router.push("/menusolvencia");

  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerInfo_P2">
          <div className="containerIdent_P2">
            <div className="txtOp_P2">Operación/Operation</div>
            <div className="txtVer_P2">Capacidad de Endeudamiento</div>
            <div className="txtCpv_P2">CPV/PVC</div>
            <div className="txtVer_P2">{strCPV}</div>
            <div className="txtOp_P2">Remitente/Sender</div>
            <div className="txtVer_P2">BP Intelligence</div>
          </div>
          <div className="containerDoc_P2">
            <div className="txtReq_P2">Esta operación requiere:</div>
          </div>
          <div className="container_data_operation">
            <p>
              <img src='assets/pin_yellow.svg' align="left" className="imgFol_P2" />
              <div className="txtDocReq_P2">Recibo de nómina o estado bancario</div>
              <div className="txtIdenOf_P2">3 Documentos más recientes.</div>
            </p>
            <p>
              <img src='assets/doc_yellow.svg' align="left" className="imgFol_P2" />
              <div className="txtDocReq_P2">Documento de Identificación</div>
              <div className="txtIdenOf_P2">Número de Identificación Nacional (CURP).</div>
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="containerCont_P2">
            <button className="button_P2" onClick={onTest}>
              <span className="txtButton_P2">Confirmar</span>
            </button>
          </div>
          <div className="imageContainer_P2">
            <img src='assets/foodbrand@2x.png' className="imgFooter_P2" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSolvencia;
