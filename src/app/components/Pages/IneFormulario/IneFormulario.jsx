'use client'

import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subYears from "date-fns/subYears";
import es from "date-fns/locale/es";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../Footer/Footer";

const IneFormulario = () => {

  registerLocale("es", es);
  setDefaultLocale("es");

  const [formState, setFormState] = useState({
    nombre: "",
    apellido: "",
    fecha: "",
    sexo: "",
  });

  const { IdJumio, setRutaBack } = useAppContext();
  const isRunned = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const today = new Date();
  const tenYearsAgo = subYears(today, 94);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateEmision, setdateEmision] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (nombre !== "" && apellidoPaterno !== "" || nombre !== "" && apellidoMaterno !== "") {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  });


  useEffect(() => {

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      setLoading(false);

      setTimeout(() => {

        setLoading(true);

      }, 1500);

    }

    createSession();

  }, []);



  const handleButtonClick = async () => {

    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("paterno", apellidoPaterno);
    sessionStorage.setItem("materno", apellidoMaterno);

    let monthStr = "";
    if ((selectedDate.getMonth() + 1) < 10) {
      monthStr = "0" + (selectedDate.getMonth() + 1);
    } else {
      monthStr = "" + (selectedDate.getMonth() + 1);
    }

    let darStr = "";
    if ((selectedDate.getDate()) < 10) {
      darStr = "0" + (selectedDate.getDate());
    } else {
      darStr = "" + (selectedDate.getDate());
    }

    let dateStr = "" + selectedDate.getFullYear() + "-" + (monthStr) + "-" + darStr;
    sessionStorage.setItem("fechaNacimientoFront", dateStr);
    router.push("/documentos");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setdateEmision(date);
    setIsEnabled(false);
  };

  const handleDatePickerClose = () => {
    if (selectedDate === null) {
      setIsEnabled(false);
    }
  };

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">

        {!loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className="containerRender animate__animated animate__fadeIn">
              <div className="containerInfo_P2">
                <div className="containerIdent_P2">
                  <div>
                    <form>
                      <div className="form-group">
                        <p className="txtNat_P3Hist">Nombre</p>
                        <input type="text"
                          value={nombre || ''}
                          onChange={(event) => setNombre(event.target.value.toUpperCase())}
                          className="form-control" />
                      </div>
                      <br />
                      <div className="form-group">
                        <p className="txtNat_P3Hist">Apellido Paterno:</p>
                        <input type="text"
                          value={apellidoPaterno || ''}
                          onChange={(event) => setApellidoPaterno(event.target.value.toUpperCase())}
                          className="form-control" />
                      </div>
                      <br />
                      <div className="form-group">
                        <p className="txtNat_P3Hist">Apellido Materno:</p>
                        <input type="text"
                          value={apellidoMaterno || ''}
                          onChange={(event) => setApellidoMaterno(event.target.value.toUpperCase())}
                          className="form-control" />
                      </div>
                      <br />
                      <div  className="form-group w-full">
                        <p className="txtNat_P3Hist mb-2">Fecha de Nacimiento:</p>
                        <div>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            onCalendarClose={handleDatePickerClose}
                            dateFormat="yyyy-MM-dd"
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            minDate={tenYearsAgo}
                            maxDate={today}
                            disabled={isEnabled}
                            locale="es"
                            className="w-full rounded-lg border border-gray-100 px-4 py-2 pl-2 pr-[10.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#3c805f6e]"/>
                        </div>
                      </div>
                      <br />
                    </form>
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="imageContainer_P2">
                <img src="assets/foodbrand@2x.png" className="imgFooter_P2" alt="Brand Logo" />
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />

    </>
  );
}

export default IneFormulario;
