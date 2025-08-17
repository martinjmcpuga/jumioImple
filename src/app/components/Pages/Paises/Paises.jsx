'use client';

import React, { useEffect, useState, useRef } from 'react';
import './paises.css';
import Footer from '../../Footer/Footer';
import { Form, Spinner, Modal } from 'react-bootstrap';

import { getPaisByIso } from '../../Api/getPaisByIso';
import { mtfindCpv } from '../../Api/mtfindCpv';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });


const Paises = () => {


  const ref = useRef(null);
  const isRunned = useRef(false);

  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [game, setGame] = useState('1');
  const [rutaBackCpv, setRutaBackCpv] = useState('');
  const [curpStr, setCurpStr] = useState('');
  const [blContinueOp, setBlContinueOp] = useState('1');
  const [showCurp, setShowCurp] = useState(false);
  const [msjnumeroNacionalPholder, setmsjnumeroNacional] = useState('');
  const [loading, setLoading] = useState(false);
  const [caracteres, setCaracteres] = useState(0);
  const [country, setCountry] = useState([]);
  const { cpvI } = useAppContext();
  const { curpValidate } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const {setPais}= useAppContext();
  const {setPaisIso2}= useAppContext();
  
  const showModalError = (title, message) => {
    setShowStatus(title);
    setShowMessage(message);
    setShow(true);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {
      setLoading(true);
      const response = await getPaisByIso({});
      if (response.status === 200) {
        setCountry(response.listModelPais);
      } else {
        setShow(true);
        setShowStatus(`Error ${response.status}`);
        setShowMessage(response.message);
      }
      setLoading(false);
    }

    createSession();
  }, []);

  useEffect(() => {
      const sCpv = cpvI
      if (sCpv) setRutaBackCpv('/?i=' + sCpv);
      if (curpStr.length < caracteres) setBlContinueOp('1');

  }, [curpStr, caracteres]);

  const onValidateFaceMach = async () => {
    //console.log('Validar Face Match...');
  };

const onValidateCurp = async () => {
    //console.log('Validar CURP:', curpStr);
  setGame('2');
  const curpVal = mounted ? curpValidate : null;
  if (localStorage.getItem("curpValidate") === curpStr) {
    const objPerson = { cpv: cpvI };
    const responseIdPerson = await mtfindCpv(objPerson);
      //console.log('Response ID Person:', responseIdPerson);
    if (responseIdPerson.status === 400) {
      setGame('3');
      setBlContinueOp('3');
    } else if (responseIdPerson.status === 200) {
      setGame('3');
      setBlContinueOp('4');
    } else {
      showModalError(`Error ${responseIdPerson.status}`, responseIdPerson.message);
    }
  } else {
    showModalError('Credenciales inválidas', 'El Número de Identificación Nacional no es correcto.');
  }
};

  const handleClose = () => setShow(false);
  const onModalShow = () => setModalShow(true);

  const handleChange = (event) => {
    const val = event.target.value.toUpperCase();
    if (val.length <= caracteres + 2) {
      setCurpStr(val);
      if (val.length === caracteres) setBlContinueOp('2');
    }
  };

  const handleChangePais = (selectedOption) => {
    const setSelectedOption = selectedOption.claveIso3;
    setCaracteres(selectedOption.caracteres);
    setmsjnumeroNacional(selectedOption.numeroNacionalTxt);
    if (mounted) {
      //console.log(selectedOption)
      setPais(setSelectedOption);
      setPaisIso2(selectedOption.claveIso2);
    }
    setShowCurp(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') onValidateCurp();
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 52,
      borderRadius: 4,
      boxShadow: 'none',
      borderColor: '#c4cbd1',
      '&:hover': {
        borderColor: '#c4cbd1',
      },
    }),
  };

  return (
    <>
      <div className="containerInfo_P2">
        <div className="containerIdent_P2 onContentExpands">
          <p className="txtNat_P3">Nacionalidad</p>
          <br />
          <Select
            options={country}
            onChange={handleChangePais}
            styles={customStyles}
            formatOptionLabel={(country) => (
              <div className="animate__animated animate__fadeIn containerNac">
                <div className="pais">{country.claveIso2} {country.nombre}</div>
                <div className="animate__animated animate__fadeIn paisBandera">
                  <img className="bandera" src={country.ruta || '/images/default-flag.svg'} alt={country.nombre} />
                </div>
              </div>
            )}
            placeholder="Seleccionar nacionalidad"
          />
          <br />
          {showCurp && (
            <div className="containerInfoOnExpands">
              <p className="txtNum_P3">Número de Identificación Nacional</p>
              <br />
              {['1', '2', '3'].includes(game) && (
                <div className="Row_P3">
                  <div className="Column_P3">
                    <Form.Control
                      style={{
                        borderColor: '#c4cbd1',
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #c4cbd1',
                        borderRadius: '8px 0 0 8px',
                        height: '52px',
                      }}
                      required
                      maxLength={18}
                      type="text"
                      ref={ref}
                      placeholder={msjnumeroNacionalPholder}
                      value={curpStr}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  {game === '2' && (
                    <div className="Column1_P3 animate__animated myDiv_P3">
                      <div className="myDiv_P3_3">
                        <Spinner animation="border" size="sm" />
                      </div>
                    </div>
                  )}
                  {game === '3' && (
                    <div className="Column1_P3 animate__animated myDiv_P3">
                      <div className="myDiv_P3_3">
                        <img src='assets/check.svg' alt="check" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <section className="btnRenderPercent">
                <br />
                <hr className="line" />
                {blContinueOp === '1' && (
                  <button className="btnVer_P3"><span className="txtVer_P3">Verificar</span></button>
                )}
                {blContinueOp === '2' && (
                  <>
                   <br />
                  <button className="btnVer_P3_Select" onClick={onValidateCurp}>
                    <span className="txtVer_P3">Verificar</span>
                  </button>
                 
                </>
                )}
                {blContinueOp === '3' && (
                  <Link href={'/documentos'}>
                    <button className="button_P2 animate__animated animate__fadeIn" >
                      <span className="txtButton_P2">Continuar</span>
                    </button>
                  </Link>
                )}
                {blContinueOp === '4' && (
                  <button className="button_P2 animate__animated animate__fadeIn" onClick={onValidateFaceMach}>
                    <span className="txtButton_P2">Continuar</span>
                  </button>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

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

      <Footer />
    </>
  );
};

export default Paises;
