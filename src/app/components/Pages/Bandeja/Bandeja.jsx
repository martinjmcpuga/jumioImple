'use client';

import React, { useEffect, useState } from 'react';
import { getPerfilAicmJumio } from '../../Api/getPerfilAicmJumio';
import { getRetrievalByAccount } from '../../Api/getRetrievalByAccount';
import { useRef } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { Form, Spinner, Modal } from 'react-bootstrap';
import { getRetrievalByAccountSelfie } from '../../Api/getRetrievalByAccountSelfie';

const Bandeja = () => {

  const { IdJumio } = useAppContext();
  const isRunned = useRef(false);
  const router = useRouter();

  /**----------------*/

  const [loading, setLoading] = useState(false);
  const [curpStr, setCurpStr] = useState('');
  const [telefonoAsociado, setTelefonoAsociado] = useState('');

  /**----------------*/

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  /**Varibles perfil */

  const [direccion, setDireccion] = useState("");
  const [validateDomi, setValidateDomi] = useState(false);
  const [validateLab, setValidateLab] = useState(false);
  const [validateCita, setValidateCita] = useState(false);
  const [validateSigInd, setValidateSigInd] = useState(false);

  /**----------------*/

  const [auDomicilio, setAuDomicilio] = useState(false);
  const [auHistorial, setAuHistorial] = useState(false);
  const [auHistorialComprobate, setAuHistorialComprobate] = useState(false);
  const [auDeclaratoria, setAuDeclaratoria] = useState(false);
  const [auCita, setAuCita] = useState(false);
  const [auCitaVer, setAuCitaVer] = useState(false);

  useEffect(() => {
    setCurpStr(localStorage.getItem('curpValidate'))
    setTelefonoAsociado(localStorage.getItem('telefono'))
  }, []);

  const handleClose = () => { };

  const showModalError = (title, message) => {
    setShowStatus(title);
    setShowMessage(message);
    setShow(true);
  };


  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      //localStorage.setItem("curpValidate", "MACK991119HMCRMV09")
      //localStorage.setItem("sCpv", "7B5696B8F0")
      //localStorage.setItem("idJumioSelfie", "9424ebf8-3b0b-45c7-bb6a-4aa7893e27ea")

      const obj = {
        id: IdJumio,
        cpv: localStorage.getItem("sCpv")
      };

      const responsePerfilCpv = await getPerfilAicmJumio(obj);

      if (responsePerfilCpv.status === 200) {

        const objJumio = {
          idJumio: IdJumio,
          curpValidate: localStorage.getItem("curpValidate")
        };

        const response = await getRetrievalByAccount(objJumio);

        if (response.status === 200) {

          const objJumioSelfie = {
            idJumioSelfie: localStorage.getItem("idJumioSelfie"),
          };

          const responseSelfie = await getRetrievalByAccountSelfie(objJumioSelfie);

          if (responseSelfie.status === 200) {

            if (responsePerfilCpv.auDomicilio === true) {
              setAuDomicilio(true);
            }

            if (responsePerfilCpv.auHistorial === true) {
              setAuHistorial(true);
            }

            if (responsePerfilCpv.auHistorialComprobate === true) {
              setAuHistorialComprobate(true);
            }

            if (responsePerfilCpv.auDeclaratoria === true) {
              setAuDeclaratoria(true);
            }

            if (responsePerfilCpv.n5BGC === true) {
              //getPalencaUsersAccounts(obj);
            }

            if (responsePerfilCpv.auCita === true) {

              setAuCitaVer(true);

            } else {

              setAuCitaVer(false);

            }

            setLoading(false);

          } else {

            setLoading(false);
            showModalError('Error', responseSelfie.message);

          }

        } else {

          setLoading(false);
          showModalError('Error', response.message);

        }

      } else {

        setLoading(false);
        showModalError('Error', responsePerfilCpv.message);

      }

    }

    createSession();

  }, []);

  const getHomeDomPersonal = async (event) => {

    router.push('/initdomicilio');
  };

  const onDomComplete = async () => {

  };

  return (

    <>
      {loading ? (

        <div className="containerRender">
          <div className="spinner"></div>
        </div>

      ) : (

        <div className="containerInfo_P2 containerRenderN1 animate__animated animate__fadeIn onContentExpands">

          {/* Identificacion personal */}

          <div className="cards animate__animated animate__fadeIn">
            <div
              className="rcorners27"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                <div>
                  <div className="txtDocReq_P27">Identificación Personal</div>
                  <div className="txtIdenOf_P27" align="left">
                    {curpStr}
                  </div>
                  <div className="txtVerificado">Verificado</div>
                </div>
              </div>
              <img src='assets/flecha_url.svg' className="flecha_url" />
            </div>
          </div>

          {/* Telefono e Email verificado */}

          <div className="cards animate__animated animate__fadeIn">
            <div
              className="rcorners27"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src='assets/telefonoVerificado.svg' align="left" className="imgFol_P27_Img" />
                <div>
                  <div className="txtDocReq_P27">Número Celular</div>
                  <div className="txtIdenOf_P27" align="left">
                    {telefonoAsociado}
                  </div>
                  <div className="txtVerificado">Verificado</div>
                </div>
              </div>
              <img src='assets/flecha_url.svg' className="flecha_url" />
            </div>
          </div>

          {/* Verificar Domicilio */}

          {auDomicilio ? (
            <>
              <>
                {!validateDomi ? (
                  <>
                    <div className="cards animate__animated animate__fadeIn">
                      <div className="rcornersDes27" onClick={getHomeDomPersonal}>
                        <img src='assets/file_alt.svg' align="left" className="imgFol_P27_Img marginCustom" />
                        <img
                          src='assets/arrow_green.svg'
                          align="right"
                          className="flecha_url"
                        />
                        <div className="txtDocReq_P27">Domicilio Personal</div>
                        <div className="txtVerificadoDes27" align="left">
                          Sin verificar
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cards animate__animated animate__fadeIn">
                      <div
                        className="rcorners27"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                          <div>
                            <div className="txtDocReq_P27">Domicilio Personal</div>
                            <div className="txtIdenOf_P27" align="left">
                              {direccion}
                            </div>
                            <div className="txtVerificado">Verificado</div>
                          </div>
                        </div>
                        <img src='assets/flecha_url.svg' onClick={onDomComplete} className="flecha_url" />
                      </div>
                    </div>
                  </>
                )}
              </>
            </>
          ) : (
            <></>
          )}

          {/* Verificar Autenticación Laboral*/}

          {auHistorial ? (
            <>
              <>
                {!validateLab ? (
                  <>
                    <div className="rcornersDes27" >
                      <img src='assets/file_alt.svg' align="left" className="imgFol_P27_Img marginCustom" />
                      <img
                        src='assets/arrow_green.svg'
                        align="right"
                        className="flecha_url"
                      />
                      <div className="txtDocReq_P27">Autenticación Laboral</div>
                      <div className="txtVerificadoDes27" align="left">
                        No Validado
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cards animate__animated animate__fadeIn">
                      <div
                        className="rcorners27"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                          <div>
                            <div className="txtDocReq_P27">Autenticación Laboral</div>
                            <div className="txtIdenOf_P27" align="left">
                              BUSINESS PREY
                            </div>
                            <div className="txtVerificado">Verificado</div>
                          </div>
                        </div>
                        <img src='assets/flecha_url.svg' className="flecha_url" />
                      </div>
                    </div>
                  </>
                )}
              </>
            </>
          ) : (
            <></>
          )}

          {/* Verificar Autenticación Laboral*/}

          {auHistorialComprobate ? (
            <>
              <>
                {!validateLab ? (
                  <>
                    <div className="rcornersDes27">
                      <img src='assets/file_alt.svg' align="left" className="imgFol_P27_Img marginCustom" />
                      <img
                        src='assets/arrow_green.svg'
                        align="right"
                        className="flecha_url"
                      />
                      <div className="txtDocReq_P27">Autenticación Laboral</div>
                      <div className="txtVerificadoDes27" align="left">
                        No Validado
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cards animate__animated animate__fadeIn">
                      <div
                        className="rcorners27"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                          <div>
                            <div className="txtDocReq_P27">Autenticación Laboral</div>
                            <div className="txtIdenOf_P27" align="left">
                              BUSINESS PREY
                            </div>
                            <div className="txtVerificado">Verificado</div>
                          </div>
                        </div>
                        <img src='assets/flecha_url.svg' className="flecha_url" />
                      </div>
                    </div>
                  </>
                )}
              </>
            </>
          ) : (
            <></>
          )}

          {/* Verificar Firma de documento */}

          {auDeclaratoria ? (
            <>
              <>
                {!validateSigInd ? (
                  <>
                    <div className="rcornersDes27"
                      style={{ marginTop: "12px" }}
                    >
                      <img src='assets/file_alt.svg' align="left" className="imgFol_P27_Img marginCustom" />
                      <img
                        src='assets/arrow_green.svg'
                        align="right"
                        className="flecha_url"
                      />
                      <div className="txtDocReq_P27">Firma de Documento</div>
                      <div className="txtVerificadoDes27" align="left">
                        No Validado
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cards animate__animated animate__fadeIn">
                      <div
                        className="rcorners27"
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                          <div>
                            <div className="txtDocReq_P27">Firma de Documento</div>
                            <div className="txtIdenOf_P27" align="left">
                              BUSINESS PREY
                            </div>
                            <div className="txtVerificado">Verificado</div>
                          </div>
                        </div>
                        <img src='assets/flecha_url.svg' className="flecha_url" />
                      </div>
                    </div>
                  </>
                )}
              </>
            </>
          ) : (
            <></>
          )}

          {/*  Generar Cita */}

          {auCitaVer ? (
            <>
              {auCita ? (
                <>
                  <>
                    {!validateCita ? (
                      <>
                        <div className="rcornersDes27"
                          style={{ marginTop: "12px" }}
                        >
                          <img src='assets/generarCitaDisabled.svg' align="left" className="imgFol_P27_Img marginCustom" />
                          <img
                            src='assets/arrow_green.svg'
                            align="right"
                            className="flecha_url "
                          />
                          <div className="txtDocReq_P27">Generar cita</div>
                          <div className="txtVerificadoDes27" align="left">
                            No Validado
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cards animate__animated animate__fadeIn">
                          <div
                            className="rcorners27"
                            style={{ display: "flex", justifyContent: "space-between" }}
                          >
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <img src='assets/user_green.svg' align="left" className="imgFol_P27_Img" />
                              <div>
                                <div className="txtDocReq_P27">Generar cita</div>
                                <div className="txtIdenOf_P27" align="left">
                                  BUSINESS PREY
                                </div>
                                <div className="txtVerificado">Agendada</div>
                              </div>
                            </div>
                            <img src='assets/flecha_url.svg' className="flecha_url" />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                </>
              ) : (
                <>
                  <div className="rcornersDes27"
                    style={{ marginTop: "12px" }}>
                    <img src='assets/generarCitaDisabled.svg' align="left" className="imgFol_P27_Img marginCustom" />
                    <img
                      src='assets/arrow_green.svg'
                      align="right"
                      className="flecha_url "
                    />
                    <div className="txtDocReq_P27">Generar cita</div>
                    <div className="txtVerificadoDes27" align="left">
                      No Validado
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
            </>
          )}
        </div>
      )}

      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
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

export default Bandeja