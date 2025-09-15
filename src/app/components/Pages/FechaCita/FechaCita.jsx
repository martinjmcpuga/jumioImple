'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Modal from "react-bootstrap/Modal";
import dynamic from 'next/dynamic';
import { getHorariosWsaicm } from "../../Api/getHorariosWsaicm";
const Select = dynamic(() => import('react-select'), { ssr: false });
import "./FechaCIta.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const FechaCita = () => {

  const router = useRouter();
  const { IdJumio, setRutaBack } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [date, setDates] = useState()
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const isRunned = useRef(false);
  const [ubicacion, setUbicacion] = useState("");
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");

  const handleButtonClick = async () => {
    router.push('/requerimientosselectedcita');
  };

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setUbicacion(sessionStorage.getItem("ubicacion"));

      if (sessionStorage.getItem("idUbicacion") != null) {

        const obj = {
          idUbicacion: sessionStorage.getItem("idUbicacion"),
          id: sessionStorage.getItem("idPerson"),
        };

        const response = await getHorariosWsaicm(obj);

        if (response.status == 200) {

          setOptions(response.listModel);

        } else {
          setShow(true);
          setShowStatus("Aviso");
          setShowMessage("No existen horarios");
        }


      } else {
        setShow(true);
        setShowStatus("Aviso");
        setShowMessage("No existen ubicaciones");
      }

    }

    createSession();

  }, []);


  const style = {
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

  const handleChange = (selectedOption) => {
    setButtonEnabled(true);
    setSelectedOption(selectedOption);
    sessionStorage.setItem("horario", selectedOption.horario);
  };

  const handleClose = () => {
    setShow(false);
    router.push('/requerimientosselectedcita');
  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Ubicación</div>
              <div className="txtSilver_P2">{ubicacion}</div>
              <hr className="line__custom line__margin--custom" />
              <div className="containerInfo_Normal ">
                <span className="textState mb-3">Fecha</span>

                <Select
                  styles={style}
                  options={options}
                  onChange={handleChange}
                  value={selectedOption}
                  formatOptionLabel={date => (
                    <div className="Card__container Card__fontType">
                      <div className="animate__animated animate__fadeIn ">{date.horario}</div>
                    </div>
                  )}
                  placeholder="Seleccionar"
                />
              </div>
              <hr className="lineSimple " />
              <div className="btnContinue">
                {!isButtonEnabled ? (
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
          </div>
        </div>
        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
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

}

export default FechaCita