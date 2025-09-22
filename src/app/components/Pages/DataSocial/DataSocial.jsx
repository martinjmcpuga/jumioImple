'use client';

import React, { useEffect, useState } from 'react';
import { mtFindPersonJumio } from '../../Api/mtFindPersonJumio';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataSocial = ({ }) => {

  const isRunned = useRef(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");

  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const [userNss, setUserNss] = useState("");
  const [verNameFull, setverNameFull] = useState(true);

  const handleClose = () => {
    setShow2(false);
  };

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      const objJumioSelfie = {
        id: sessionStorage.getItem('id_jumio'),
        idJumio: sessionStorage.getItem('id_jumio')
      };

      const responsePersonJumio = await mtFindPersonJumio(objJumioSelfie);

      if (responsePersonJumio.status === 200) {

        if (responsePersonJumio.paterno === 'null') {

          setverNameFull(false);
          setFirstName(responsePersonJumio.nombre);

        } else {

          setverNameFull(true);
          setFirstName(responsePersonJumio.nombre);
          setPaternalLastName(responsePersonJumio.paterno);
          setMaternalLastName(responsePersonJumio.materno);

        }
        setUserNss(sessionStorage.getItem("socialStr") || '');

      } else {

        setLoading(true);
        setShow2(true);
        setShowStatus(400);
        setShowMessage(responsePersonJumio.message);

      }

      setLoading(true);

    }

    createSession();

  }, []);


  const handleReintentar = () => {
    router.push('/identificacionsocial');
  }

  const handleAceptar = () => {
    setShow2(false);
    router.push('/uploadnss');
  }

  return (
    <>

      <div className="initBack_P2 animate__animated animate__fadeIn">
        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className="containerRender">
              <div className="containerInfo_P2">
                <div className="containerIdent_P2">
                  {!verNameFull ? (
                    <>
                      <div className="txtOp_P2">Nombre/Given name</div>
                      <div className="txtVer_P2">{firstName}</div>
                    </>
                  ) : (
                    <>
                      <div className="txtOp_P2">Nombres/Given names</div>
                      <div className="txtVer_P2">{firstName}</div>

                      <div className="txtCpv_P2">Apellidos/Surname</div>
                      <div className="txtVer_P2">
                        {paternalLastName} {maternalLastName}
                      </div>
                    </>
                  )}
                  <div className="txtOp_P2">Identificación Social/Social number</div>
                  <div className="txtVer_P2">{userNss}</div>
                  <hr className="line" />
                  <p className=' text-center Footer__text'>La fecha de expiración son
                    <strong> 360 días</strong>  posteriores a la generación.</p>
                </div>

              </div>
            </div>
          </>
        )}

        <div className="footer">
          <div className="containerCont_P2">
            <button className='button_P2' onClick={e => handleAceptar()} >
              <span className='txtButton_P2'>Aceptar</span>
            </button>
            <div className="spaceButton14" />
            <button className='buttonRein_P2' onClick={e => handleReintentar()}>
              <span className='txtButtonRein_P14'>Reintentar</span>
            </button>
          </div>
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
  )
}

export default DataSocial
