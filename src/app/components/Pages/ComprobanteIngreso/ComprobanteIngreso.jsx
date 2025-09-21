'use client'

import React, { useEffect, useState } from "react";
import { mtUpdateComprobanteCompletoJumio } from "../../Api/mtUpdateComprobanteCompletoJumio";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Modal from 'react-bootstrap/Modal';
import './ComprobanteIngreso.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Select = dynamic(() => import('react-select'), { ssr: false });

const ComprobanteIngreso = () => {

  const Options = [
    {
      Data: "Recibo de nómina"
    }
  ]

  const Esquema = [
    {
      Data: "Quincenal"
    },
    {
      Data: "Mensual"
    },
    {
      Data: "Variable"
    }
  ]

  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter()
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [modal, setModal] = useState(false)
  const [userData, setUserData] = useState({})
  const [option, setSelectedOption] = useState("");
  const [esquema, setEsquema] = useState("");

  const [selectComprobante, setSelectComprobante] = useState("");
  const [selectEsquema, setSelectEsquema] = useState("");

  const [showError, setShowError] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleCloseError = () => {
    setShowError(false);
  };

  useEffect(() => {
    setRutaBack(sessionStorage.getItem("n5com"));
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    sessionStorage.setItem('selectComprobante', selectedOption.Data);
    setSelectComprobante(selectedOption.Data);
  };

  const handleEsquemaChange = (option) => {
    setEsquema(option);
    sessionStorage.setItem('selectEsquema', option.Data);
    setSelectEsquema(option.Data);
  }

  const handleClose = async () => {

    const objConsComprobanteCompleto = {
      id: sessionStorage.getItem('id_jumio'),
      comprobante: selectComprobante,
      esquema: selectEsquema
    };

    const response = await mtUpdateComprobanteCompletoJumio(objConsComprobanteCompleto);

    if (response.status === 200) {

      setModal(false);
      router.push("/uploadcomprobanten5");

    } else {

      setLoading(false);
      setShowError(true);
      setShowStatus(response.status);
      setShowMessage(response.message);


    }
  }

  useEffect(() => {
    if (option !== "" && esquema !== "") {
      setButtonEnabled(true)
      setUserData({
        Comprobante: option,
        Esquema: esquema
      })
    }
  }, [option, esquema])

  return (
    <>
      <Modal className="animate__animated animate__fadeIn" show={modal} onHide={handleClose} animation={true} centered backdrop="static">
        <Modal.Header className='backGroudModal  '>
          <div className="msjTitleModalDiv padMsj">Atención</div>
          <hr className="lineSimple" />
        </Modal.Header>
        <Modal.Body className='backGroudModal'>
          <div className='Typography__Modal'>Es necesario tener disponibles los
            documentos probatorios en formato físico o
            digital antes de proceder.</div>
          <p className="Typography__Modal--sizing">
            Si cuenta con los documentos impresos:
          </p>
          <ul className="Typography__Modal--sizing">
            <li>Coloque los documentos sobre una
              superficie plana.</li>
            <li>
              Procure tener una buena iluminación.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className='button_P2' >
            <span className='txtButton_P2' onClick={handleClose}>Capturar</span>
          </button>
        </Modal.Footer>
      </Modal>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">

              <p className="txtNat_P3">Comprobante</p>
              <Select
                options={Options}
                onChange={handleChange}
                value={option}
                formatOptionLabel={Comprobante => (
                  <div className="containerDom">
                    <div className="animate__animated animate__fadeIn pais">{Comprobante.Data}</div>
                  </div>
                )}
                placeholder="Seleccionar"
              />
              <br />

              <p className="txtNat_P3Com">Esquema</p>
              <Select
                options={Esquema}
                onChange={handleEsquemaChange}
                value={esquema}
                formatOptionLabel={Comprobante => (
                  <div className="containerDom">
                    <div className="animate__animated animate__fadeIn pais">{Comprobante.Data}</div>
                  </div>
                )}
                placeholder="Seleccionar"
              />

              <hr className="lineSimple" />

              <div className="btnContinue">
                {!isButtonEnabled ? (
                  <>
                    <button className="btnVer_P3">
                      <span className="txtVer_P3" >Continuar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="button_P2 animate__animated animate__fadeIn"
                      onClick={e => setModal(true)}
                    >
                      <span className="txtButton_P2">Continuar</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
        </div>
      </div>

      <Modal show={showError} onHide={handleCloseError} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
        <Modal.Body>
          <div className="msjTitleModalDiv">{showStatus}</div>
          <div className="msjErrorModal">{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button_P2" onClick={handleClose}>
            <span className="txtButton_P2">Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ComprobanteIngreso