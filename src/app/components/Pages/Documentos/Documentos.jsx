'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Footer from '../../Footer/Footer'
import { useAppContext } from '../../../context/AppContext'
import Select from 'react-select'
import './documentos.css'
import { getDocumentoByPais } from '../../Api/getDocumentoByPais'

const Documentos = () => {

  const { cpvI } = useAppContext()
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [isMounted, setIsMounted] = useState(false) // Evita el hydration mismatch
  const { setCpvI } = useAppContext() // aquí lo traes
  const { setRutaBack } = useAppContext();

  const [blContinue, setBlContinue] = useState(false);
  const [txtSelect, setTxtSelect] = useState('');
  const [identificacion, setidentificacion] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const isRunned = useRef(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    setRutaBack('/paises');
  }, []);

  useEffect(() => {
    setIsMounted(true)
  }, [])


  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      const objIncode = {
        pais: localStorage.getItem("paisIso2"),
      }

      const response = await getDocumentoByPais(objIncode);

      if (response.status === 200) {

        setidentificacion(response.listModelDocumentoPais);
        setLoading(false);

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus("Error " + response.status);
        setShowMessage(response.message);

      }

    }

    createSession();

  }, []);


  const style = {
    control: (base) => ({
      ...base,
      height: "52px !important",
      borderRadius: "0.375rem !important",
      boxShadow: "none !important",
      borderColor: "#c4cbd1 !important",
      "&:hover": {
        borderColor: "#c4cbd1 !important"
      }
    }),
  };

  const handleChange = async (selectedOption) => {

    setSelectedOption(selectedOption);
    const valorAppIncode = selectedOption.valorAppIncode;
    localStorage.setItem("idDocPais", selectedOption.id);
    setTxtSelect(valorAppIncode);

    //console.log(selectedOption);
    //console.log(valorAppIncode);
    //console.log("idDocPais " + selectedOption.id);

    if (valorAppIncode === '0' || valorAppIncode === '2') {
      setCpvI("credencial");
    } if (valorAppIncode === '1') {
      setCpvI("pasaporte");
    }

  };

  return (
    <main className="animate__animated animate__fadeIn">
      <section className="containerInfo_P2">
        <div className="containerIdent_P2 onContentExpands">
          <p className="txtDocumentos">Documento de Identificación</p>

          <Select
            styles={style}
            options={identificacion}
            onChange={handleChange}
            value={selectedOption}
            formatOptionLabel={state => (
              <div className="containerDom">
                <div className="animate__animated animate__fadeIn pais">{state.descripcionTexto}</div>
              </div>
            )}
            placeholder="Seleccionar documento"
          />

          <hr className="line" />

          <section className="containerButtonOnExpands_P2" style={{ marginTop: '2rem' }}>
            <div className="btnContinue">
              {!selectedOption ? (
                <button className="btnVer_P3" disabled>
                  <span className="txtVer_P3">Continuar</span>
                </button>
              ) : (
                <Link href={selectedOption ? '/infocredencial' : '#'} passHref>
                  <button
                    className="button_P2"
                    disabled={!selectedOption}
                    style={{
                      opacity: selectedOption ? 1 : 0.6,
                      cursor: selectedOption ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <span className="txtButton_P2">Continuar</span>
                  </button>
                </Link>
              )}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Documentos
