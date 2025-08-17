'use client';

import React, { useState,useEffect } from "react";
import "./style.css";

function Header({ imgBack, imgBackRig, rutaBack, title, name,titleSizing }) {

 const [interName, setInterName] = useState('Autenticación Personal');
 const [titleMain, setTitleMain] = useState('Enrolamiento');

 useEffect(() => {

  if(localStorage.getItem('interName')){
    setInterName(localStorage.getItem('interName'));
  }

  if(localStorage.getItem('TitleMain')){
    setTitleMain(localStorage.getItem('TitleMain'));
  
  }
 
 }, []);




  const onBackPage = async () => {
    navigate(rutaBack);
  };

  const onBackPageRih = async () => {
    navigate(imgBackRig);
  };

  
  // Modal

  const [show, setShow] = useState(false);
  const handleback = () => setShow(false);

  const handleClose = async () => {
    window.location.href = "https://midpr.net/";
  };

  const handleShow = () => setShow(true);
  const btnMtDeletePerson = async () => {

    window.location.href = "https://midpr.net/";

  };

  return (
    <>
      <div className="backTitleDem_P2">
        <div className="imgLeft">
          {!imgBack ? (
            <></>
          ) : (
            <>
              <img src='/assets/arrow_back.svg' align="left" onClick={onBackPage} />
            </>
          )}
        </div>
        <div>
          <div className="imgaicm">
            <img src='/assets/aicm.svg' />
          </div>
          <div>
            <p className='txtTitleDem_P2' >{titleMain}</p>
          </div>
        </div>

        <div className="imgRight">
          {!imgBackRig ? (
            <></>
          ) : (
            <>
              <img className="logImg" src='/assets/logout.png' onClick={handleShow} />
            </>
          )}
        </div>
      </div>

      <div className="life">
        <div id="life-bar">
          {/* Identificación personal */}
          {name === "steepOne" && (
            <div>
              {" "}
              <div className="filled25"></div> <div className="empty25"></div>{" "}
            </div>
          )}
          {name === "steepTwo" && (
            <div>
              {" "}
              <div className="filled50"></div> <div className="empty50"></div>{" "}
            </div>
          )}
          {name === "steepThree" && (
            <div>
              {" "}
              <div className="filled75"></div> <div className="empty75"></div>{" "}
            </div>
          )}
          {name === "steepFour" && (
            <div>
              {" "}
              <div className="filled100"></div> <div className="empty100"></div>{" "}
            </div>
          )}
          {/* Licencia de conducir */}
          {name === "HomeLicConducir" && (
            <div>
              {" "}
              <div className="filled10"></div> <div className="empty10"></div>{" "}
            </div>
          )}
          {name === "TipoLicencia" && (
            <div>
              {" "}
              <div className="filled25"></div> <div className="empty25"></div>{" "}
            </div>
          )}
          {name === "NumeroLic" && (
            <div>
              {" "}
              <div className="filled50"></div> <div className="empty50"></div>{" "}
            </div>
          )}
          {name === "LicDate" && (
            <div>
              {" "}
              <div className="filled75"></div> <div className="empty75"></div>{" "}
            </div>
          )}
          {/* domicilio */}
          {name === "HomeDomPersonal" && (
            <div>
              {" "}
              <div className="filled10"></div> <div className="empty10"></div>{" "}
            </div>
          )}
          {name === "DirDomPersonal" && (
            <div>
              {" "}
              <div className="filled25"></div> <div className="empty25"></div>{" "}
            </div>
          )}
          {name === "DataDomPersonal" && (
            <div>
              {" "}
              <div className="filled50"></div> <div className="empty50"></div>{" "}
            </div>
          )}
        </div>
      </div>

      {/* <HorizontalNonLinearStepper/> */}
      <div className={titleSizing ? "backIdenPersonal_P2--size":"backIdenPersonal_P2"}>
        <p className="txtIdenPerso_P2">{interName}</p>
      </div>
    </>
  );
}

export default Header;
