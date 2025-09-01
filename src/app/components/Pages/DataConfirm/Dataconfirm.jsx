'use client';

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';

const Dataconfirm = () => {

  const { setRutaBack } = useAppContext();
  useEffect(() => {
    setRutaBack('/documentos');
  }, []);

  const [loading, setLoading] = useState(true);
  const isRunned = useRef(false);
  const [firstName, setFirstName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [claveDeElector, setClaveDeElector] = useState('');
  const [verNameFull, setverNameFull] = useState(true);
  const { cpvI } = useAppContext();
  const { setTokenJumio } = useAppContext();

  useEffect(() => {
    setFirstName(localStorage.getItem("nombre") || '');
    setPaternalLastName(localStorage.getItem("paterno") || '');
    setMaternalLastName(localStorage.getItem("materno") || '');
    setBirthDate(localStorage.getItem("fechaNacimientoFront") || '');
    setClaveDeElector(localStorage.getItem("curpValidate") || '');

  }, []);


  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(false);

      setTimeout(() => {

        setLoading(true);

      }, 2000);

    }

    createSession();

  }, []);


  return (
    <>

      <div className="containerRender onContentExpands">
        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="containerInfo_P2 animate__animated animate__fadeIn">
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
              <div className="txtOp_P2">
                Número de Identificación/Identity Number
              </div>
              <div className="txtVer_P2">{claveDeElector}</div>
            </div>

            <Link href="/bandeja" className="btnBack_P2">
              <section className="containerButtonOnExpands_P2 mt-4">
                <button
                  className="btnVer_P14OK buttonExpandsBase"
                >
                  <span className="txtVer_P14OK">Continuar</span>
                </button>
                <br />
              </section>
            </Link>
          </div>

        )}

      </div>

    </>
  )
}

export default Dataconfirm
