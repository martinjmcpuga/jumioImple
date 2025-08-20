'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import "./DomicilioPersonal.css";
import './flags.css';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

const country = [
  {
    "label": "Mexico",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
    "value": "MX"
  },
  {
    "label": "Argentina",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1920px-Flag_of_Argentina.svg.png",
    "value": "AR"
  },
  {
    "label": "Brasil",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png",
    "value": "BR"
  },
  {
    "label": "Chile",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/1920px-Flag_of_Chile.svg.png",
    "value": "CL"
  },
  {
    "label": "Japan",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png",
    "value": "JP"
  },
  {
    "label": "United States",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
    "value": "US"
  }
];

const DomicilioPersonal = () => {

  const [isButtonEnabled, setButtonEnabled] = useState(true);
  const router = useRouter();

  const handleButtonClick = async () => {

    router.push('/comprobantedompersonal');

  };

  const handleChange = (selectedOption) => {
    const setSelectedOption = selectedOption.value;
  };

  const style = {
    control: base => ({
      ...base,
      height: "52px !important",
      borderRadius: "0.375rem !important",
      boxShadow: "none !important",
      borderColor: "#c4cbd1 !important",
      "&:hover": {
        borderColor: "#c4cbd1 !important"
      }

    })
  };


  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              <div className="txtOp_P2">Domicilio Personal</div>
              <div className="txtSilver_P2">
                Dirección donde normalmente reside o pernocta.
              </div>
              <hr className="separadorLine" />
              <span className="txtSubtitle">País</span>

              <Select
                options={country}
                onChange={handleChange}
                styles={style}
                formatOptionLabel={country => (
                  <div className="containerNac">
                    <div className="pais">{country.value} {country.label}</div>
                    <div className="paisBandera">
                      <img className="bandera" src={country.image} />
                    </div>
                  </div>
                )}
                placeholder="Seleccionar nacionalidad"
              />

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

export default DomicilioPersonal;
