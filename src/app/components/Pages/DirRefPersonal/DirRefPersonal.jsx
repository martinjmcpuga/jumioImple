'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import "./styleDomPersonal.css";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

const country = [
  {
    label: "Mexico",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
    value: "MX",
  },
];

function DirRefPersonal() {

  const router = useRouter();
  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const handleClose = () => {
    setShow2(false);
  };

  const onTest = async () => {
    router.push('/datarefpersonal');
  };

  const handleChange = (selectedOption) => {
    const setSelectedOption = selectedOption.value;
  };

  const [blContinue, setBlContinue] = useState(true);

  const style = {
    control: (base) => ({
      ...base,
      height: "52px !important",
      borderRadius: "0.375rem !important",
      boxShadow: "none !important",
      borderColor: "#c4cbd1 !important",
      "&:hover": {
        borderColor: "#c4cbd1 !important",
      },
    }),
  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">


        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Domicilio de referencia</div>
              <div className="subTitle">
                Dirección laboral o donde normalmente despeña su actividad
                diaria.
              </div>
              <hr className="separadorLine" />
              <div>
                <span className="txtSubtitle">Pais</span>
                <div>
                  <Select
                    styles={style}
                    options={country}
                    onChange={handleChange}
                    value={{
                      value: "MX",
                      label: "Mexico",
                      image:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
                    }}
                    formatOptionLabel={(country) => (
                      <div className="containerDom">
                        <div className="pais">
                          {country.value} {country.label}
                        </div>
                        <div className="paisBandera">
                          <img className="bandera" src={country.image} />
                        </div>
                      </div>
                    )}
                    placeholder="Selecciona tu País"
                  />
                </div>
              </div>
              <hr className="lineSimple" />
              <div className="btnContinue">
                {!blContinue ? (
                  <>
                    <button className="btnVer_P3">
                      <span className="txtVer_P3">Continuar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="button_P2 animate__animated animate__fadeIn"
                      onClick={onTest}
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

      <Modal show={show2} onHide={handleClose} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
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
  );
}

export default DirRefPersonal;
