'use client'

import React, { useEffect, useRef, useState } from "react";
import { getPerfilAicmJumio } from "../../Api/getPerfilAicmJumio";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import "./requerimientos.css";

const RequerimientosN2 = () => {

  const isRunned = useRef(false);
  const router = useRouter();
  const { IdJumio, setRutaBack } = useAppContext();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [checketList, setChecketList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const [verIdentificacionSocial, setVerIdentificacionSocial] = useState(true);
  const [verIdentificacionFiscal, setVerIdentificacionFiscal] = useState(true);


  useEffect(() => {
    setRutaBack('/initdomicilio');
  }, []);

  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const objCons = {
        id: sessionStorage.getItem('id_jumio'),
        cpv: localStorage.getItem("sCpv")
      }

      const responsePerfil = await getPerfilAicmJumio(objCons);

      if (responsePerfil.status === 200) {

        /** --------------------------- */

        if (responsePerfil.n2_nss_rfc === true) {

          setVerIdentificacionSocial(true);
          setVerIdentificacionFiscal(true);

        } else {

          if (responsePerfil.n2_nss === true) {

            setVerIdentificacionSocial(true);

          } else {


            setVerIdentificacionSocial(false);

          }

          /** ------------------------------------ */

          if (responsePerfil.n2_rfc === true) {

            setVerIdentificacionFiscal(true);

          } else {


            setVerIdentificacionFiscal(false);

          }

        }

        /** -------------------------------------- */

        setLoading(false);

      } else {
        setLoading(false);
        setShow(true);
        setShowStatus(responsePerfil.status);
        setShowMessage(responsePerfil.message);
      }

    }

    createSession();

  }, []);

  useEffect(() => {
    const newItems = [];

    if (!verIdentificacionSocial) newItems.push(3);
    if (!verIdentificacionFiscal) newItems.push(4);

    setChecketList(prev => [...new Set([...prev, ...newItems])]);
  }, [verIdentificacionFiscal, verIdentificacionSocial]);


  const handleButtonClick = async () => {
    router.push('/requerimientosselected');
  };

  useEffect(() => {
    if (checketList.includes(1) && checketList.includes(3) && checketList.includes(4)) {
      setButtonEnabled(true);
    }

  }, [checketList])

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="containerRender onContentExpands">
            <div className="containerInfo_P2">
              <div className="containerIdent_P2">
                <div className="txtOp_P2">Requerimientos</div>
                <div className="txtSilver_P2">
                  Antes de iniciar, por favor confirma lo siguiente:
                </div>
                <hr className="line" />
                <div className="container-fluid ">

                  <div className="row">
                    <div className="col-12">

                      <article className="d-flex  align-items-center">
                        <div className="containerCheck_P28 spaceRadio">
                          <input
                            type="radio"
                            className="rdnSize"
                            onChange={e => setChecketList([...checketList, 1])}
                          />
                        </div>

                        <div className="textCheck">
                          Cuento con un comprobante de domicilio no
                          mayor a 3 meses (ej. recibo de agua, luz,
                          teléfono).
                        </div>
                      </article>

                      {/* Verificar Identificacion Social */}

                      {verIdentificacionSocial ? (
                        <>
                          <hr className="line--Margin" />
                          <article className="d-flex  align-items-center">
                            <div className="containerCheck_P28 spaceRadio">
                              <input
                                type="radio"
                                className="rdnSize"
                                onChange={e => setChecketList([...checketList, 3])}
                              />
                            </div>

                            <div className="textCheck">
                              Cuento con Número de Identificación Social
                              (ej. NSS, SSN, CSS).
                            </div>
                          </article>

                        </>
                      ) : (
                        <></>
                      )}

                      {/* Verificar Identificacion Fiscal */}

                      {verIdentificacionFiscal ? (
                        <>
                          <hr className="line--Margin" />
                          <article className="d-flex  align-items-center">
                            <div className="containerCheck_P28 spaceRadio">
                              <input
                                type="radio"
                                className="rdnSize"
                                onChange={e => setChecketList([...checketList, 4])}
                              />
                            </div>

                            <div className="textCheck">
                              Cuento con Número de Identificación Fiscal
                              (ej. RFC, RUC, NIT).
                            </div>
                          </article>

                        </>
                      ) : (
                        <></>
                      )}

                    </div>
                  </div>

                </div>
                <hr className="lineSimple" />
                <div className="btnContinue">
                  {!isButtonEnabled ? (
                    <>
                      <button className="btnVer_P3">
                        <span className="txtVer_P3">Iniciar</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button_P2 animate__animated animate__fadeIn"
                        onClick={handleButtonClick}
                      >
                        <span className="txtButton_P2">Iniciar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="footer">
          <div className="imageContainer_P2">
            <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RequerimientosN2;
