'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import Modal from 'react-bootstrap/Modal';
import "./requerimientos.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function RequerimientosN5(props) {

  const { IdJumio } = useAppContext();
  const router = useRouter();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [checketComprobante, setChecketComprobante] = useState([]);
  const [checketNotComprobante, setChecketNotComprobante] = useState([]);
  const [isButtonEnabledPerfil, setButtonEnabledPerfil] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [onehabilita, setOnehabilita] = useState(true);

  const handleButtonClick = async () => {

    localStorage.setItem("n5com", "/RequerimientosSelectedN5");
    //navigate("/RequerimientosSelectedN5");

  };

  const handleButtonCarta = async () => {

    localStorage.setItem("n5com", "/RequerimientosN5CartaSelected");
    //navigate("/RequerimientosN5CartaSelected");

  }

  useEffect(() => {
    if (checketComprobante.includes(1)) {
      setButtonEnabled(true);
    } else if (checketComprobante.includes(2)) {
      setButtonEnabledPerfil(false);
    }
  }, [checketComprobante]);


  const handleNotComprobanteChange = () => {
    setChecketNotComprobante([1]);
    setShowModal(true);  // Mostrar el modal cuando seleccionas "No cuento con comprobante de ingresos"
  };

  const handleRedirecNotComproante = () => {

    localStorage.setItem("n5com", "/RequerimientosSelectedN5Comprobante");
    //navigate("/RequerimientosSelectedN5Comprobante");

  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Requerimientos</div>
              <div className="txtSilver_P2">
                Antes de iniciar, por favor confirma lo siguiente:
              </div>
              <hr className="line" />
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-12">
                    <article className="d-flex align-items-center">
                      <div className="containerCheck_P28 spaceRadio">
                        <input
                          type="radio"
                          className="rdnSize"
                          name="comprobante"  // Agregar name para agrupar los radio buttons
                          onChange={() => setChecketComprobante([1])}
                        />
                      </div>
                      <div className="textCheck">
                        Cuento con el recibo de nómina de mi actual empleo con QR.
                      </div>
                    </article>
                    <hr className="lineSimple" />
                    <article className="d-flex align-items-center">
                      <div className="containerCheck_P28 spaceRadio">
                        <input
                          type="radio"
                          className="rdnSize"
                          name="comprobante"  // Agregar name para agrupar los radio buttons
                          onChange={() => setChecketComprobante([2])}
                        />
                      </div>
                      <div className="textCheck">
                        Cuento con carta compromiso y contrato individual.
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <hr className="lineSimple" />
              <div className="btnContinue">
                {isButtonEnabledPerfil ? (
                  <>
                    {!isButtonEnabled ? (
                      <>
                        <button className="btnVer_P3">
                          <span className="txtVer_P3">Iniciar</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button_P2 animate__animated animate__fadeIn"
                          onClick={handleButtonClick}
                        >
                          <span className="txtButton_P2">Iniciar</span>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="button_P2 animate__animated animate__fadeIn"
                      onClick={handleButtonCarta}
                    >
                      <span className="txtButton_P2">Iniciar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" alt="foodbrand" />
          </div>
        </div>
      </div>

      {/* Agregado: Modal */}

      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="animate__animated animate__fadeIn"
        show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            <div className="txtHead_P1"> <br /></div>
          </Modal.Title>
          <div className="p1">
            <button className="btn-close" onClick={handleRedirecNotComproante}></button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="txtMsj_P1">Me comprometo formalmente a entregar mi comprobante de ingreso al área responsable dentro de un plazo no mayor a treinta (30) días naturales a partir de ésta fecha. Entiendo y acepto que el incumplimiento de esta obligación resultará en la revocación automática y sin previo aviso de mis permisos de acceso. Reconozco que esta medida es parte de las políticas de control y seguridad interna y que cualquier demora o falta en la entrega del comprobante de ingreso implica mi aceptación de las consecuencias mencionadas, incluyendo, pero no limitado a, la pérdida de acceso y privilegios. Declaro haber entendido los términos y condiciones aquí expuestos y me comprometo a cumplir con ellos de manera íntegra.</p>
          <button
            className={`buttonCookies_P1 ${onehabilita ? "buttonEnabled" : ""}`}
            onClick={() => setOnehabilita(!onehabilita)}
          >
            <div className="txtCookies_P1">Acepto términos y condiciones</div>
          </button>
          <div className="spaceButtonModal" />
          <button
            className={!onehabilita ? "buttonModal_P1" : "buttonModal_disable"}
            onClick={props.onHide}
            disabled={onehabilita}
          >
            <div
              className={
                !onehabilita ? "txtButtonModal_P1" : "txtButtonModal_disable"
              }
              onClick={handleRedirecNotComproante}
            >
              Confirmar
            </div>
          </button>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default RequerimientosN5;
