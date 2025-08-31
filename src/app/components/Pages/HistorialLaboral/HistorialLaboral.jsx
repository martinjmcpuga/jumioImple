'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { getListEstadosJumio } from "../../Api/getListEstadosJumio";

import dynamic from 'next/dynamic';
import { mtFindPersonJumio } from "../../Api/mtFindPersonJumio";
import { mtUpdateHistorial0Jumio } from "../../Api/mtUpdateHistorial0Jumio";
import { mtUpdateHistorial1Jumio } from "../../Api/mtUpdateHistorial1Jumio";
import { mtUpdateHistorial2Jumio } from "../../Api/mtUpdateHistorial2Jumio";
import { mtfindSaveLapJumio } from "../../Api/mtfindSaveLapJumio";

import './HistorialLaboral.css'
const Select = dynamic(() => import('react-select'), { ssr: false });

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

const HistorialLaboral = () => {

  const { IdJumio } = useAppContext();
  const router = useRouter();
  const [isButtonEnabled, setButtonEnabled] = useState(true);
  const [selectedDateInicio, setselectedDateInicio] = useState();
  const [selectedDateTermino, setselectedDateTermino] = useState();
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

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setUrlBack(localStorage.getItem("n5com"));
      setPais('México');

      setLoading(true);

      const objCons = {
        id: IdJumio
      }

      const responsePerson = await mtFindPersonJumio(objCons);

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
      id: IdJumio,
    }

    if (blHistorial0Ruta === '0') {

      const responseHis0 = await mtUpdateHistorial0Jumio(objCons);

      if (responseHis0.status === 200) {

        const objLab = {
          id: localStorage.getItem('idPerson'),
          puesto: puesto,
          organizacion: organizacion,
          actual: isSubscribed,
          fechaInicio: dateStr,
          fechaFin: dateStrFinish,
          pais: pais,
          estado: estado,
        }

        const response = await mtguardarLaboral(objLab);

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
          id: IdJumio,
          puesto: puesto,
          organizacion: organizacion,
          actual: isSubscribed,
          fechaInicio: dateStr,
          fechaFin: dateStrFinish,
          pais: pais,
          estado: estado,
        }

        const response = await mtguardarLaboral(objLab);

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
          id: IdJumio,
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
    position: "absolute",
    right: 'calc(10% + 8px)',
    top: '7px',
    bottom: '7px',
    width: '1px',
    background: '#ccc',
    content: "''",
  }

  useEffect(() => {
    getListEstadosJumio().then(item => {
      setStates(item.listEstados)
    })
  }, [])


  const handleChangeState = (selectedOption) => {
    setstateOption(selectedOption);
    const setSelectedOption = selectedOption.nombreEstado;
    setEstado(setSelectedOption);
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
                      <hr className="lineSimple" />
                      <div className="TrabajoActual d-flex  container-fluid py-1" id="RadioSelected">
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
                    className="dateStyle mb-3"
                    selected={selectedDateInicio}
                    onChange={handleDateChangeInicio}
                    onCalendarClose={handleDatePickerClose}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    dropdownMode="select"
                    disabled={isEnabled}
                    locale="es"
                    placeholderText="YYYY-MM-DD"
                  />

                  {!isSubscribed && (
                    <div>
                      <p className="txtNat_P3Hist">Terminación</p>
                      <div>
                        <DatePicker
                          className="dateStyle mb-3"
                          selected={selectedDateTermino}
                          onChange={handleDateChangeTermino}
                          onCalendarClose={handleDatePickerCloseT}
                          dateFormat="yyyy-MM-dd"
                          showMonthDropdown={true}
                          showYearDropdown={true}
                          dropdownMode="select"
                          disabled={isEnabled}
                          locale="es"
                          id="termino"
                          placeholderText="YYYY-MM-DD"
                        />
                      </div>
                    </div>
                  )}

                  <p className="txtNat_P3Hist">País</p>









                  <br />
                  <p className="txtNat_P3Hist">Estado</p>

                  <Select
                    options={states}
                    onChange={handleChangeState}
                    value={stateOption}
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