'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { mtUpdateRfcJumio } from "../../Api/mtUpdateRfcJumio";
import { validacionRFC_Jumio } from "../../Api/validacionRFC_Jumio";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const IdentificacionFisical = () => {

  const ref = useRef(null);
  const { IdJumio } = useAppContext();
  const router = useRouter();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [fiscalStr, setfiscalStr] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonEnabled(fiscalStr.length < 13);
  }, [fiscalStr]);

  const handleButtonClick = async () => {

    setLoading(true);

    const objRfc = {
      id: IdJumio,
      rfc: fiscalStr,
    };

    const response = await validacionRFC_Jumio(objValida);

    if (response.status === 200) {

      const responseRfcJumio = await mtUpdateRfcJumio(objRfc);

      if (responseRfcJumio.status === 200) {

        setLoading(false);
        localStorage.setItem('userRfc', '' + fiscalStr);
        router.push('/datafiscal');

      } else {

        setShow(true);
        setShowStatus("Error " + responseRfcJumio.status);
        setShowMessage(responseRfcJumio.message);

      }


    } else {

      if (response.status === 410) {

        setLoading(false)
        setButtonEnabled(false);
        setShow(true);
        setShowStatus("Error 410");
        setShowMessage("" + response.mensaje + ". " + response.message);

      } else {

        setLoading(false)
        setButtonEnabled(false);
        setShow(true);
        setShowStatus("Error " + response.status);
        setShowMessage(response.message);

      }

    }

  };

  const handleClose = () => {
    setShow(false);
    setButtonEnabled(false);
  }

  const handleChange = (event) => {
    // Limitar la longitud del texto a 18 caracteres
    const value = event.target.value.toUpperCase().slice(0, 13); ///Envia el valor del RFC a la variable fiscalStr
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
      event.keyCode === 13
    ) {
      this.onValidateSocial();
    }
  };

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
                  <p className="txtNum_P3">Identificación Fiscal</p>
                  <Form>
                    <input
                      style={style}
                      required={true}
                      maxLength={13}
                      ref={ref}
                      placeholder="RFC"
                      value={fiscalStr}
                      onChange={handleChange}
                      onClick={handleClick}
                      onKeyDown={handkeOnKeyDown}
                    />
                  </Form>

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

      <Modal show={show} onHide={handleClose} animation={false} centered backdrop="static" className="animate__animated animate__fadeIn">
        <Modal.Body className='backGroudModal'>
          <div className='msjTitleModalDiv'>{showStatus}</div>
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

export default IdentificacionFisical