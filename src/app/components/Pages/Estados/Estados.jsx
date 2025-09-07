'use client'

import React, { useState, useEffect, useRef } from "react";
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import "./Estados.css";
import dynamic from 'next/dynamic';
import { getEstadoWsaicm } from "../../Api/getEstadoWsaicm";
const Select = dynamic(() => import('react-select'), { ssr: false });

const Estados = () => {

  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setStates] = useState()
  const isRunned = useRef(false);
  const [listEstados, getListEstados] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setRutaBack('/requerimientosselectedcita');
  }, []);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const obj = {
        cpv: ''
      };

      const response = await getEstadoWsaicm(obj);

      if (response.status === 200) {
        getListEstados(response.listModelEstados);
      }

      setLoading(false);

    }

    createSession();

  }, []);

  const handleButtonClick = async () => {

    //
    //navigate("/Ubicacion", {
    //  state: { user: "userTest" },
    //});

  };

  const style = {
    control: base => ({
      ...base,
      height: "52px !important",
      borderRadius: "4px !important",
      boxShadow: "none !important",
      borderColor: "#c4cbd1 !important",
      "&:hover": {
        borderColor: "#c4cbd1 !important"
      }

    })
  };

  const handleChange = (selectedOption) => {
    setButtonEnabled(true);
    setSelectedOption(selectedOption);
    sessionStorage.setItem("idestado", selectedOption.idestado);

  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Seleccione la ubicación más conveniente</div>
              <hr className="line" />
              <div className="containerInfo_Normal ">
                <span className="textState">Estado</span>
                <br />
                <Select
                  styles={style}
                  options={listEstados}
                  onChange={handleChange}
                  value={selectedOption}
                  formatOptionLabel={state => (
                    <div className="containerDom">
                      <div className="animate__animated animate__fadeIn pais">{state.nombre}</div>
                    </div>
                  )}
                  placeholder="Selecciona tu Estado"
                />

              </div>
              <hr className="lineSimple" />
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
    </>
  );
};

export default Estados;
