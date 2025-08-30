'use client'

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import './ExperienciaLaboral.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

const ExperienciaLaboral = () => {

  const Options = [
    {
      label: "0 años",
      value: 0
    },
    {
      label: "1 año",
      value: 1
    },
    {
      label: "2 años",
      value: 2
    },
    {
      label: "3 años",
      value: 3
    },
    {
      label: "4 años",
      value: 4
    },
    {
      label: "5 años",
      value: 5
    },
    {
      label: "6 años",
      value: 6
    },
    {
      label: "7 años",
      value: 7
    },
    {
      label: "8 años o más",
      value: 8
    },

  ]

  const router = useRouter();
  const { IdJumio } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [option, setSelectedOption] = useState("");
  const [urlBack, setUrlBack] = useState("");

  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setUrlBack(localStorage.getItem("n5com"));

    }

    createSession();

  }, []);

  const handleButtonClick = async () => {
    router.push('/dataexperiencialaboral');
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setButtonEnabled(true);
    localStorage.setItem("experiencia", selectedOption.value);
    localStorage.setItem("experienciaLabel", selectedOption.label);
  };


  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">

              <p className="txtNat_P3Exp">¿Cuántos años de experiencia laboral tiene?</p>
              <div>
                <Select
                  options={Options}
                  onChange={handleChange}
                  value={option}
                  formatOptionLabel={Time => (
                    <div className="containerDom">
                      <div className="animate__animated animate__fadeIn pais">{Time.label}</div>
                    </div>
                  )}
                  placeholder="Seleccionar"
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
  )
}

export default ExperienciaLaboral