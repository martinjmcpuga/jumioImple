'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { validacionNSS_Jumio } from "../../Api/validacionNSS_Jumio";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function IdentificacionSocial() {

  const isRunned = useRef(false);
  const router = useRouter();
  const { IdJumio } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [socialStr, setSocialStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    // Habilitar el botón solo si la longitud del texto es menor a 11
    setButtonEnabled(socialStr.length < 11);
  }, [socialStr]);


  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      if (sessionStorage.getItem('correo') === null ||
        sessionStorage.getItem('correo') === "") {

        setLoading(false);
        setShow(true);
        setShowStatus(500);
        setShowMessage("Error al obtener correo");

      } else {
        setLoading(false);
      }

    }

    createSession();

  }, []);

  const handleButtonClick = async () => {

    setLoading(true);

    const objValida = {
      id: sessionStorage.getItem('id_jumio'),
      correo: sessionStorage.getItem('correo'),
      nss: socialStr,
    };

    const response = await validacionNSS_Jumio(objValida);

    if (response.status === 200) {

      sessionStorage.setItem('socialStr', '' + socialStr);
      router.push('/datasocial');

    } else {
      setLoading(false)
      setButtonEnabled(false);
      setShow(true);
      setShowStatus(response.status);
      setShowMessage(response.message);
    }

  };

  const handleChange = (event) => {

    const value = event.target.value.toUpperCase().slice(0, 11);
    setSocialStr(value);

  };

  const handleClick = (event) => {
    if (document.activeElement === ref.current) {
      // Lógica adicional al hacer clic en el input
    } else {
      // Lógica adicional al hacer clic en otra parte
    }
  };


  const handkeOnKeyDown = async (event) => {
    if (
      event.code === "Enter" ||
      event.code === "NumpadEnter" ||
      event.keyCode === 13
    ) {
      this.onValidateSocial();
    }
  };

  const handleClose = () => {
    setShow(false);
    setButtonEnabled(false);
  }

  const style = {
    borderColor: "#c4cbd1 !important",
    display: "block",
    width: "100%",
    padding: "7px 0 7px 7px",
    border: "1px solid #c4cbd1",
    borderRadius: "0.375rem",
    height: "52px",
  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <div className="containerIdent_P2">
                <p className="txtNum_P3">Identificación Social</p>
                <>
                  <Form>
                    <input
                      style={style}
                      required={true}
                      maxLength={11}
                      type="Number"
                      ref={ref}
                      placeholder="NSS"
                      value={socialStr}
                      onChange={handleChange}
                      onClick={handleClick}
                      onKeyDown={handkeOnKeyDown}
                    />
                  </Form>
                </>
                <br />
                <div className="btnContinue">
                  {isButtonEnabled ? (
                    <>
                      <button className="btnVer_P3">
                        <span className="txtVer_P3">Continuar</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button_P2 animate__animated animate__fadeIn"
                        onClick={handleButtonClick}
                      >
                        <span className="txtButton_P2">Continuar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
        </div>
      </div>

      <Modal className="animate__animated animate__fadeIn" show={show} onHide={handleClose} animation={false} centered backdrop="static">
        <Modal.Body className='backGroudModal'>
          <div className='msjTitleModalDiv'>Error {showStatus}</div>
          <div className='msjErrorModal'>{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button_P2' onClick={handleClose}>
            <span className='txtButton_P2'>Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default IdentificacionSocial;
