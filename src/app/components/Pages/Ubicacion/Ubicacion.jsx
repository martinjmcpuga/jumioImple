'use client';

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import "./Ubicacion.css";
import Modal from "react-bootstrap/Modal";
import dynamic from 'next/dynamic';
import { getUbicacionWsaicm } from "../../Api/getUbicacionWsaicm";
import 'bootstrap/dist/css/bootstrap.min.css';
const Select = dynamic(() => import('react-select'), { ssr: false });

const Ubicacion = () => {

  const { setRutaBack } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(null);
  const isRunned = useRef(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    setRutaBack('/estados');
  }, []);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      const obj = {
        idEstado: sessionStorage.getItem("idestado")
      };

      const response = await getUbicacionWsaicm(obj);

      if (response.listModelUbicaciones != null && response.listModelUbicaciones != []) {
        setOptions(response.listModelUbicaciones);
      } else {
        setShow(true);
        setShowStatus("Aviso");
        setShowMessage("No existen ubicaciones para el estado seleccionado");
      }
    }

    createSession();

  }, []);

  const handleButtonClick = async () => {

    router.push("/requerimientosselectedcita");

  };


  const handleClose = () => {
    setShow(false);
    router.push("/estados");
  };


  const handleChange = (selectedOption) => {
    setButtonEnabled(true);
    setSelectedOption(selectedOption);
    sessionStorage.setItem("idUbicacion", selectedOption.id);
    sessionStorage.setItem("ubicacion", selectedOption.nombre);
    sessionStorage.setItem("ubicacionDireccion", selectedOption.direccion);
    sessionStorage.setItem("ubicacionApertura", selectedOption.apertura);
    sessionStorage.setItem("ubicacionCierre", selectedOption.cierre);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 52,
      borderRadius: 4,
      boxShadow: 'none',
      borderColor: '#c4cbd1',
      '&:hover': {
        borderColor: '#c4cbd1',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#0078ff26'
        : state.isFocused
          ? '#f1f1f1'
          : 'white',
      color: '#333',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
  };


  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Seleccione la ubicación más conveniente</div>
              <hr className="line" />
              <div className="containerInfo_Normal">
                <span className="textState">Ubicación</span>
                <br />
                <Select
                  options={options}
                  onChange={handleChange}
                  value={selectedOption}
                  getOptionValue={(terminal) => terminal.nombre}
                  formatOptionLabel={(terminal, { context }) => (
                    <div className="Card__container Card__fontType">
                      <div className="animate__animated animate__fadeIn">{terminal.nombre}</div>
                      {context === 'menu' && (
                        <>
                          <div className="animate__animated animate__fadeIn">{terminal.direccion}</div>
                          <div className="animate__animated animate__fadeIn">{terminal.apertura} {terminal.cierre} </div>
                        </>
                      )}
                    </div>
                  )}
                  placeholder="Seleccionar"
                  styles={customStyles}
                />

              </div>

              <hr className="lineSimple" />
              <div className="btnContinue">
                {!isButtonEnabled ? (
                  <button className="btnVer_P3">
                    <span className="txtVer_P3">Continuar</span>
                  </button>
                ) : (
                  <button className="button_P2 animate__animated animate__fadeIn" onClick={handleButtonClick}>
                    <span className="txtButton_P2">Continuar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" alt="Food Brand" />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Body className="backGroudModal">
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
  );
};

export default Ubicacion;
