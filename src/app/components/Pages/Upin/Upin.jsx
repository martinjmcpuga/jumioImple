'use client'

import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Upin = () => {

  const ref = useRef(null);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [fiscalStr, setfiscalStr] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonEnabled(fiscalStr.length < 6);
  }, [fiscalStr]);

  const handleClose = () => {
    setShow(false);
    setButtonEnabled(false);
  }

  const handleChange = (event) => {
    // Limitar la longitud del texto a 6 caracteres
    const value = event.target.value.toUpperCase().slice(0, 6);
    setfiscalStr(value);
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
      event.keyCode === 6
    ) {
      this.onValidateSocial();
    }
  };

  const handleButtonClick = async () => {

    //localStorage.setItem("upin", "" + fiscalStr);
    //navigate('/PantallaBase27')

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
              <>
                <div className="containerIdent_P2">
                  <p className="txtNum_P3">uPin</p>
                  <Form>
                    <input
                      style={style}
                      required={true}
                      maxLength={6}
                      ref={ref}
                      placeholder="uPin"
                      value={fiscalStr}
                      onChange={handleChange}
                      onClick={handleClick}
                      onKeyDown={handkeOnKeyDown}
                      type="password"
                    />
                  </Form>

                  <hr className="lineSimple" />

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
              </>
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
  )
}

export default Upin