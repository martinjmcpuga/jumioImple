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
    "label": "United States",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
    "value": "US"
  }
];


const HistorialLaboral = () => {

  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [isButtonEnabled, setButtonEnabled] = useState(true);
  const [selectedDateInicio, setselectedDateInicio] = useState(null);
  const [selectedDateTermino, setselectedDateTermino] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [states, setStates] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [onehabilita, setOnehabilita] = useState(false);

  {/** Variables del formulario */ }

  const [puesto, setPuesto] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [pais, setPais] = useState('');
  const [estado, setEstado] = useState('');
  const [listEdo, setListEdo] = useState([]);
  const [blHistorial0Ruta, setBlHistorial0Ruta] = useState(false);
  const [stateOption, setstateOption] = useState("");
  const [option, setSelectedOption] = useState("");
  const isRunned = useRef(false);
  const [loading, setLoading] = useState(false);
  const [blActual, setBlActual] = useState(false);

  {/** Variables que disparan mensaje de error  */ }

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const [urlBack, setUrlBack] = useState("");


  useEffect(() => {
    setRutaBack(sessionStorage.getItem("n5com"));
  }, []);


  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(true);

      setUrlBack(sessionStorage.getItem("n5com"));
      setPais('México');

      const objCons = {
        id: sessionStorage.getItem('id_jumio')
      }

      const responsePerson = await mtFindPersonJumio(objCons);

      console.log(responsePerson);

      if (responsePerson.status === 200) {

        if (responsePerson.onActividad === true) {
          setBlActual(true);
        }

        if (responsePerson.historial0 === false) {
          setBlHistorial0Ruta("0");
        } else if (responsePerson.historial1 === false) {
          setBlHistorial0Ruta("1");
        } else if (responsePerson.historial2 === false) {
          setBlHistorial0Ruta("2");
        }

        setLoading(false);

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(responsePerson.status);
        setShowMessage(responsePerson.message);

      }

    }

    createSession();

  }, []);



  const handleDisabledTermino = async (event) => {

    if (event.target.checked && !onehabilita) {
      setOnehabilita(true);
      setIsSubscribed(true);
    } else if (event.target.checked && onehabilita) {
      setOnehabilita(false);
      setIsSubscribed(false);
    }

  }

  const handleDateChangeInicio = (date) => {
    setselectedDateInicio(date);
    setIsEnabled(false);
  };

  const handleDateChangeTermino = (date) => {
    setselectedDateTermino(date);
    setIsEnabled(false);
  };

  const handleDatePickerClose = (date) => {
    if (selectedDateInicio === null) {
      setselectedDateInicio(date);
    }
  };

  const handleDatePickerCloseT = (date) => {
    if (selectedDateTermino === null) {
      setselectedDateTermino(date);
    }
  };

  const handleButtonClick = async () => {

    let monthStr = "";
    if ((selectedDateInicio.getMonth() + 1) < 10) {
      monthStr = "0" + (selectedDateInicio.getMonth() + 1);
    } else {
      monthStr = "" + (selectedDateInicio.getMonth() + 1);
    }

    let darStr = "";
    if ((selectedDateInicio.getDate()) < 10) {
      darStr = "0" + (selectedDateInicio.getDate());
    } else {
      darStr = "" + (selectedDateInicio.getDate());
    }

    let dateStr = "" + selectedDateInicio.getFullYear() + "-" + (monthStr) + "-" + darStr;

    let dateStrFinish = "";

    if (!isSubscribed) {

      monthStr = "";
      if ((selectedDateTermino.getMonth() + 1) < 10) {
        monthStr = "0" + (selectedDateTermino.getMonth() + 1);
      } else {
        monthStr = "" + (selectedDateTermino.getMonth() + 1);
      }


      darStr = "";
      if ((selectedDateTermino.getDate()) < 10) {
        darStr = "0" + (selectedDateTermino.getDate());
      } else {
        darStr = "" + (selectedDateTermino.getDate());
      }

      dateStrFinish = "" + selectedDateTermino.getFullYear() + "-" + (monthStr) + "-" + darStr;
    }

    const objCons = {
      id: sessionStorage.getItem('id_jumio'),
    }

    console.log('blHistorial0Ruta -> ' + blHistorial0Ruta);

    if (blHistorial0Ruta === '0') {

      const responseHis0 = await mtUpdateHistorial0Jumio(objCons);

      console.log(responseHis0);

      if (responseHis0.status === 200) {

        const objLab = {
          id: sessionStorage.getItem('id_jumio'),
          puesto: puesto,
          organizacion: organizacion,
          actual: isSubscribed,
          fechaInicio: dateStr,
          fechaFin: dateStrFinish,
          pais: pais,
          estado: estado,
        }

        const response = await mtfindSaveLapJumio(objLab);

        console.log(response);

        if (response.status === 200) {

          router.push('/actividadeslaborales');

        } else {

          setLoading(false);
          setShow(true);
          setShowStatus(response.status);
          setShowMessage(response.message);
        }

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(responseHis0.status);
        setShowMessage(responseHis0.message);

      }
    } else if (blHistorial0Ruta === '1') {

      const responseHis0 = await mtUpdateHistorial1Jumio(objCons);

      if (responseHis0.status === 200) {

        const objLab = {
          id: sessionStorage.getItem('id_jumio'),
          puesto: puesto,
          organizacion: organizacion,
          actual: isSubscribed,
          fechaInicio: dateStr,
          fechaFin: dateStrFinish,
          pais: pais,
          estado: estado,
        }

        const response = await mtfindSaveLapJumio(objLab);

        if (response.status === 200) {

          router.push('/actividadeslaborales');

        } else {
          setLoading(false);
          setShow(true);
          setShowStatus(response.status);
          setShowMessage(response.message);
        }

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(responseHis0.status);
        setShowMessage(responseHis0.message);

      }

    } else if (blHistorial0Ruta === '2') {

      const responseHis0 = await mtUpdateHistorial2Jumio(objCons);

      if (responseHis0.status === 200) {

        const objLab = {
          id: sessionStorage.getItem('id_jumio'),
          puesto: puesto,
          organizacion: organizacion,
          actual: isSubscribed,
          fechaInicio: dateStr,
          fechaFin: dateStrFinish,
          pais: pais,
          estado: estado,
        }

        const response = await mtfindSaveLapJumio(objLab);

        if (response.status === 200) {

          router.push('/actividadeslaborales');

        } else {
          setLoading(false);
          setShow(true);
          setShowStatus(response.status);
          setShowMessage(response.message);
        }

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(responseHis0.status);
        setShowMessage(responseHis0.message);

      }
    }
  };

  const style = {
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

  useEffect(() => {
    getListEstadosJumio().then(item => {
      setStates(item.listEstados)
    })
  }, [])


  const handleChangeState = (selectedOption) => {
    setstateOption(selectedOption); // 👈 guarda el objeto completo
    setEstado(selectedOption.nombreEstado); // esto sigue guardando solo el string si lo necesitas
  };


  const handleChange = (selectedOption) => {
    const setSelectedOption = selectedOption.value;
  };

  const handlePuestoChange = (event) => {
    setPuesto(event.target.value);
  };

  const handleOrganizacionChange = (event) => {
    setOrganizacion(event.target.value);
  };

  {/** Inicio del componete */ }

  useEffect(() => {
    if (puesto !== "" && organizacion !== "" && estado !== "") {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  });

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">
        <div className="containerRender">
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">

              {loading ? (
                <div className="containerRender">
                  <div className="spinner"></div>
                </div>
              ) : (

                <div className='animate__animated animate__fadeIn'>
                  <p className="txtNat_P3Hist">Puesto</p>

                  <input
                    className="dateStyle mb-3"
                    required={true}
                    maxLength={30}
                    value={puesto}
                    onChange={handlePuestoChange}
                    type="text"
                    placeholder="Nombre del puesto"
                  />

                  <p className="txtNat_P3Hist">Organización</p>

                  <input
                    className="dateStyle mb-3"
                    required={true}
                    maxLength={30}
                    type="text"
                    value={organizacion}
                    onChange={handleOrganizacionChange}
                    placeholder="Nombre de la organización"
                  />

                  {!blActual ? (
                    <>
                      <div className="TrabajoActual d-flex  container-fluid py-1" id="RadioSelected" style={{ backgroundColor: '#379bf321', borderRadius: '8px', borderColor: '#379bf3' }}>
                        <div className="row containerTrabajo">
                          <div className="col-1 d-flex justify-content-start ">
                            <input type="radio" className="RadioSpace" checked={onehabilita} onClick={handleDisabledTermino} onChange={handleDisabledTermino} />
                          </div>
                          <div className="col-10">
                            <p className="mb-0 lining"><abbr className="TrabajoActual--color">Trabajo actual</abbr> <br />Selecciona esta opción si este es su trabajo
                              actual.</p>
                          </div>
                        </div>
                      </div>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}  
                  <p className="txtNat_P3Hist">Inicio</p>
                  <DatePicker
                    className="w-full rounded-lg border border-gray-100 px-4 py-2 pl-2 pr-[10.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#3c805f6e]"
                    selected={selectedDateInicio}
                    onChange={(date) => setselectedDateInicio(date)}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="scroll"
                    yearDropdownItemNumber={100} // muestra 100 años en el scroll
                    locale="es"
                    placeholderText="YYYY-MM-DD"
                    minDate={new Date(1950, 0, 1)}
                    maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  />
                    {!isSubscribed && (
                      <>
                        <p className="txtNat_P3Hist">Terminación</p>
                        <DatePicker
                          className="w-full rounded-lg border border-gray-100 px-4 py-2 pl-2 pr-[10.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#3c805f6e]"
                          selected={selectedDateTermino}
                          onChange={(date) => setselectedDateTermino(date)}
                          dateFormat="yyyy-MM-dd"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="scroll"
                          yearDropdownItemNumber={100}
                          locale="es"
                          placeholderText="YYYY-MM-DD"
                          minDate={selectedDateInicio || new Date(1950, 0, 1)}
                          maxDate={new Date(new Date().getFullYear(), 11, 31)}
                        />
                      </>
                    )}

                  <p className="txtNat_P3Hist">País</p>
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

                  <br />
                  <p className="txtNat_P3Hist">Estado</p>
                  <Select
                    options={states}
                    onChange={handleChangeState}
                    value={stateOption}  // ahora es el objeto completo
                    formatOptionLabel={State => (
                      <div className="containerDom">
                        <div className="animate__animated animate__fadeIn pais">{State.init} {State.nombreEstado}</div>
                      </div>
                    )}
                    placeholder="Seleccionar"
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
  )
}

export default HistorialLaboral