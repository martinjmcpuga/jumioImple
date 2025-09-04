'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Form, Spinner, Modal } from 'react-bootstrap';
import { getPaisByIso } from '../../Api/getPaisByIso';
import { useAppContext } from '../../../context/AppContext';
import Footer from '../../Footer/Footer';
import Link from 'next/link';
import './paises.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import { mtfindCpvIdJumio } from '../../Api/mtfindCpvIdJumio';

const Select = dynamic(() => import('react-select'), { ssr: false });

const Paises = () => {
  const { setRutaBack } = useAppContext();
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
  const { cpvI, curpValidate, setPais, setPaisIso2 } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRutaBack('/requerimientos');
  }, []);

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
        // 🔥 Normalizamos las opciones para React-Select
        const options = response.listModelPais.map((p) => ({
          value: p.claveIso3,
          label: p.nombre,
          claveIso2: p.claveIso2,
          nombre: p.nombre,
          ruta: p.ruta,
          caracteres: p.caracteres,
          numeroNacionalTxt: p.numeroNacionalTxt,
        }));
        setCountry(options);
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
    const sCpv = cpvI;
    if (sCpv) setRutaBackCpv('/?i=' + sCpv);
    if (curpStr.length < caracteres) setBlContinueOp('1');
  }, [curpStr, caracteres]);

  const onValidateFaceMach = async () => {
    //console.log('Validar Face Match...');
  };

  const onValidateCurp = async () => {
    setGame('2');
    const curpVal = mounted ? curpValidate : null;
    if (localStorage.getItem('curpValidate') === curpStr) {
      const objPerson = { cpv: cpvI };
      const responseIdPerson = await mtfindCpvIdJumio(objPerson);
      if (responseIdPerson.status === 400) {
        setGame('3');
        setBlContinueOp('3');
      } else if (responseIdPerson.status === 200) {
        setGame('3');
        setBlContinueOp('4');
      } else {
        showModalError(
          `Error ${responseIdPerson.status}`,
          responseIdPerson.message
        );
      }
    } else {
      showModalError(
        'Credenciales inválidas',
        'El Número de Identificación Nacional no es correcto.'
      );
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
    setCaracteres(selectedOption.caracteres);
    setmsjnumeroNacional(selectedOption.numeroNacionalTxt);
    localStorage.setItem('pais', selectedOption.value); // claveIso3
    localStorage.setItem('paisIso2', selectedOption.claveIso2);
    setPais(selectedOption.label);
    setPaisIso2(selectedOption.claveIso2);
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
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#0078ff26'
        : state.isFocused
        ? '#f1f1f1'
        : 'white',
      color: '#333',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
  };

  return (
    <>
      <div className="containerInfo_P2 animate__animated animate__fadeIn">
        <div className="containerIdent_P2 onContentExpands">
          <p className="txtNat_P3">Nacionalidad</p>
          <Select
            options={country}
            onChange={handleChangePais}
            styles={customStyles}
            formatOptionLabel={(country) => (
              <div className="containerNac animate__animated animate__fadeIn">
                <div className="pais">
                  {country.claveIso2} {country.label}
                </div>
                <div className="paisBandera animate__animated animate__fadeIn">
                  <img
                    className="bandera"
                    src={country.ruta || '/images/default-flag.svg'}
                    alt={country.label}
                  />
                </div>
              </div>
            )}
            placeholder="Seleccionar nacionalidad"
          />

          <br />
          {showCurp && (
            <div className="containerInfoOnExpands">
              <p className="txtNum_P3">Número de Identificación Nacional</p>
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
                        <img src="assets/check.svg" alt="check" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <section className="btnRenderPercent">
                <br />
                <hr className="line" />
                {blContinueOp === '1' && (
                  <button className="btnVer_P3">
                    <span className="txtVer_P3">Verificar</span>
                  </button>
                )}
                {blContinueOp === '2' && (
                  <>
                    <button className="btnVer_P3_Select" onClick={onValidateCurp}>
                      <span className="txtVer_P3">Verificar</span>
                    </button>
                  </>
                )}
                {blContinueOp === '3' && (
                  <Link href={'/documentos'}>
                    <button className="button_P2 animate__animated animate__fadeIn">
                      <span className="txtButton_P2">Continuar</span>
                    </button>
                  </Link>
                )}
                {blContinueOp === '4' && (
                  <button
                    className="button_P2 animate__animated animate__fadeIn"
                    onClick={onValidateFaceMach}
                  >
                    <span className="txtButton_P2">Continuar</span>
                  </button>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        className="animate__animated animate__fadeIn"
      >
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
