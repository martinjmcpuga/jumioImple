'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { getListEstadosJumio } from "../../Api/getListEstadosJumio";
import { mtFindPersonJumio } from "../../Api/mtFindPersonJumio";
import { mtUpdateHistorial0Jumio } from "../../Api/mtUpdateHistorial0Jumio";
import { mtUpdateHistorial1Jumio } from "../../Api/mtUpdateHistorial1Jumio";
import { mtUpdateHistorial2Jumio } from "../../Api/mtUpdateHistorial2Jumio";
import { mtfindSaveLapJumio } from "../../Api/mtfindSaveLapJumio";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './HistorialLaboral.css';
import './flags.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const country = [
  { label: "Mexico", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png", value: "MX" },
  { label: "Argentina", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1920px-Flag_of_Argentina.svg.png", value: "AR" },
  { label: "Brasil", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png", value: "BR" },
  { label: "Chile", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/1920px-Flag_of_Chile.svg.png", value: "CL" },
  { label: "United States", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png", value: "US" }
];

const HistorialLaboral = () => {
  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();

  const [isButtonEnabled, setButtonEnabled] = useState(true);
  const [selectedDateInicio, setselectedDateInicio] = useState(null);
  const [selectedDateTermino, setselectedDateTermino] = useState(null);
  const [states, setStates] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [onehabilita, setOnehabilita] = useState(false);

  const [puesto, setPuesto] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [blHistorial0Ruta, setBlHistorial0Ruta] = useState(false);
  const [stateOption, setstateOption] = useState(null);

  const isRunned = useRef(false);
  const [loading, setLoading] = useState(false);
  const [blActual, setBlActual] = useState(false);

  useEffect(() => { setRutaBack(sessionStorage.getItem("n5com")); }, []);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    (async function createSession() {
      setLoading(true);
      setPais('México');
      const objCons = { id: sessionStorage.getItem('id_jumio') };
      const responsePerson = await mtFindPersonJumio(objCons);
      if (responsePerson.status === 200) {
        if (responsePerson.onActividad === true) setBlActual(true);
        if (responsePerson.historial0 === false) setBlHistorial0Ruta("0");
        else if (responsePerson.historial1 === false) setBlHistorial0Ruta("1");
        else if (responsePerson.historial2 === false) setBlHistorial0Ruta("2");
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  // const handleDisabledTermino = async (event) => {

  //   if (event.target.checked && !onehabilita) {
  //     setOnehabilita(true);
  //     setIsSubscribed(true);
  //   } else if (event.target.checked && onehabilita) {
  //     setOnehabilita(false);
  //     setIsSubscribed(false);
  //   }

  // }

  // <-- AQUI: cargamos y transformamos los estados a { value, label, init }
  useEffect(() => {
    getListEstadosJumio().then(item => {
      const list = item?.listEstados || [];
      const formatted = list.map(edo => ({
        value: edo.nombreEstado,
        label: edo.nombreEstado,
        init: edo.init,        // mantiene la abreviatura si existe
        original: edo          // opcional, por si necesitas otros campos
      }));
      setStates(formatted);
    });
  }, []);

  const handleDisabledTermino = () => {
    const newVal = !onehabilita;
    setOnehabilita(newVal);
    setIsSubscribed(newVal);
  };

  const pad = n => (n < 10 ? '0' + n : '' + n);
  const handleButtonClick = async () => {
    if (!selectedDateInicio) return;
    const dateStr = `${selectedDateInicio.getFullYear()}-${pad(selectedDateInicio.getMonth()+1)}-${pad(selectedDateInicio.getDate())}`;
    let dateStrFinish = '';
    if (!isSubscribed && selectedDateTermino) {
      dateStrFinish = `${selectedDateTermino.getFullYear()}-${pad(selectedDateTermino.getMonth()+1)}-${pad(selectedDateTermino.getDate())}`;
    }
    const objCons = { id: sessionStorage.getItem('id_jumio') };
    let updateFn = null;
    if (blHistorial0Ruta === '0') updateFn = mtUpdateHistorial0Jumio;
    else if (blHistorial0Ruta === '1') updateFn = mtUpdateHistorial1Jumio;
    else if (blHistorial0Ruta === '2') updateFn = mtUpdateHistorial2Jumio;
    const responseHis = await updateFn(objCons);
    if (responseHis?.status === 200) {
      const objLab = { id: sessionStorage.getItem('id_jumio'), puesto, organizacion, actual: isSubscribed, fechaInicio: dateStr, fechaFin: dateStrFinish, pais, estado };
      const response = await mtfindSaveLapJumio(objLab);
      if (response.status === 200) router.push('/actividadeslaborales');
      else { /* manejar error */ }
    } else { /* manejar error */ }
  };

  // estilos para react-select (se aplican inline)
  const style = {
    control: (base, state) => ({
      ...base,
      minHeight: 52,
      borderRadius: 6,
      boxShadow: 'none',
      borderColor: state.isFocused ? '#0078ff80' : '#c4cbd1',
      '&:hover': { borderColor: '#0078ff80' },
      background: 'white'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? 'rgba(0,120,255,0.15)' : (state.isFocused ? '#f1f1f1' : 'white'),
      color: '#333',
      padding: '8px 12px',
      cursor: 'pointer'
    }),
    singleValue: base => ({ ...base, display: 'flex', alignItems: 'center', gap: '8px' }),
    placeholder: base => ({ ...base, color: '#777' }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    menuList: base => ({ ...base, maxHeight: 240 }),
  };

  // Componente Option personalizado para forzar estilos inline
  const CustomOption = (props) => {
    const { innerRef, innerProps, isFocused, isSelected } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          backgroundColor: isSelected ? 'rgba(0,120,255,0.15)' : (isFocused ? '#f1f1f1' : 'white'),
          color: '#333',
          padding: '8px 12px',
          cursor: 'pointer',
          userSelect: 'none' // evita que el texto se seleccione por accidente
        }}
      >
        {props.children}
      </div>
    );
  };

  // Al abrir cualquier menú, limpiamos selección de texto (evita el "azul")
  const handleMenuOpen = () => {
    if (typeof window !== 'undefined' && window.getSelection) {
      const sel = window.getSelection();
      if (sel) {
        try {
          if (sel.removeAllRanges) sel.removeAllRanges();
          else if (sel.empty) sel.empty();
        } catch (e) { /* ignore */ }
      }
    }
  };

  // <-- AQUI: actualizamos para usar selectedOption.label (y guardamos el objeto)
  const handleChangeState = (selectedOption) => {
    setstateOption(selectedOption);
    setEstado(selectedOption?.label || '');
  };

  const handleChangePais = (selectedOption) => {
    setPais(selectedOption?.label || '');
  };

  useEffect(() => {
    if (puesto !== "" && organizacion !== "" && estado !== "") setButtonEnabled(true);
    else setButtonEnabled(false);
  }, [puesto, organizacion, estado]);

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">
              {loading ? (
                <div className="containerRender"><div className="spinner" /></div>
              ) : (
                <div className='animate__animated animate__fadeIn'>
                  <div className="txtNat_P3Hist">Puesto</div>
                  <input className="dateStyle mb-3" required maxLength={30} value={puesto} onChange={(e) => setPuesto(e.target.value)} type="text" placeholder="Nombre del puesto" />

                  <div className="txtNat_P3Hist">Organización</div>
                  <input className="dateStyle mb-3" required maxLength={30} value={organizacion} onChange={(e) => setOrganizacion(e.target.value)} type="text" placeholder="Nombre de la organización" />

                  {!blActual && (
                    <>
                      <div className="TrabajoActual d-flex container-fluid py-1" style={{ backgroundColor: '#379bf321', borderRadius: '8px', borderColor: '#379bf3' }}>
                        <div className="row containerTrabajo">
                          <div className="col-1 d-flex justify-content-start ">
                            <input type="radio" className="RadioSpace" checked={onehabilita} onClick={handleDisabledTermino} onChange={handleDisabledTermino} />
                          </div>
                          <div className="col-10">
                            <p className="mb-0 lining"><abbr className="TrabajoActual--color">Trabajo actual</abbr> <br />Selecciona esta opción si este es su trabajo actual.</p>
                          </div>
                        </div>
                      </div>
                      <br />
                    </>
                  )}

                  <div className="txtNat_P3Hist pt15">Inicio</div>
                  <DatePicker
                    className="w-full rounded-lg border border-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c805f6e]"
                    selected={selectedDateInicio}
                    onChange={setselectedDateInicio}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown showYearDropdown dropdownMode="scroll" yearDropdownItemNumber={100}
                    locale="es" placeholderText="YYYY-MM-DD" minDate={new Date(1950,0,1)} maxDate={new Date()}
                  />

                  {!isSubscribed && (
                    <>
                      <div className="txtNat_P3Hist pt15">Terminación</div>
                      <DatePicker
                        className="w-full rounded-lg border border-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c805f6e]"
                        selected={selectedDateTermino}
                        onChange={setselectedDateTermino}
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown showYearDropdown dropdownMode="scroll" yearDropdownItemNumber={100}
                        locale="es" placeholderText="YYYY-MM-DD" minDate={selectedDateInicio || new Date(1950,0,1)} maxDate={new Date()}
                      />
                    </>
                  )}

                  <div className="txtNat_P3Hist pt15">País</div>
                  <Select
                    className="myReactSelect"
                    classNamePrefix="myRS"
                    options={country}
                    onChange={handleChangePais}
                    styles={style}
                    components={{ Option: CustomOption }}
                    formatOptionLabel={c => (
                      <div className="containerNac" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="pais">{c.value} {c.label}</div>
                        <div><img className="bandera" src={c.image} alt={c.label} /></div>
                      </div>
                    )}
                    placeholder="Seleccionar país"
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    onMenuOpen={handleMenuOpen}
                  />
                  <div className="txtNat_P3Hist pt15">Estado</div>
                  <Select
                    className="myReactSelect"
                    classNamePrefix="myRS"
                    options={states}
                    onChange={handleChangeState}
                    value={stateOption}
                    styles={style}
                    components={{ Option: CustomOption }}
                    formatOptionLabel={(s) => (
                      <div className="containerDom" style={{ userSelect: 'none' }}>{s.init} {s.label}</div>
                    )}
                    placeholder="Seleccionar estado"
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    menuPosition="fixed"
                    onMenuOpen={handleMenuOpen}
                  />

                  <hr className="lineSimple" />

                  <div className="btnContinue">
                    {!isButtonEnabled ? (
                      <button className="btnVer_P3"><span className="txtVer_P3">Continuar</span></button>
                    ) : (
                      <button className="button_P2 animate__animated animate__fadeIn" onClick={handleButtonClick}><span className="txtButton_P2">Continuar</span></button>
                    )}
                    <br /><br /><br />
                  </div>
                </div>
              )}
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

export default HistorialLaboral;
