'use client';

import JumioJsx from "./components/jumio/Jumio";
import { useState, useEffect,useRef } from "react";
import Pantalla2 from "./components/Pages/Pantalla2/Pantalla2";
import Footer from "./components/Footer/Footer";
import { getCpvCurpPais } from "./components/Api/getCpvCurpPais";
import { mtfindCpv } from "./components/Api/mtfindCpv";
import { validateCurp } from "./components/Api/validateCurp";
import { useSearchParams } from 'next/navigation'
import MyVerticallyCenteredModal from "./components/Modals/ModalMain/ModalMain";
import { useAppContext } from './context/AppContext';


export default function Home() {

  

  const searchParams = useSearchParams()
  const isRunned = useRef(false);
  const [modalShow, setModalShow] = useState(true);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validateCurpCpv, setValidateCurpCpv] = useState(true);
  const i = searchParams.get('i')
  const { setCpvI } = useAppContext();


    const onContinueModel = async () => {
    setModalShow(false);
  };




   useEffect(() => {

    localStorage.setItem('interName','Autenticación Personal');
    localStorage.setItem('TitleMain','Enrolamiento');

    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {

      localStorage.clear();

      if (!i) {

        setLoading(false);
        setModalShow(false);
        setShow(true);
        setShowStatus(500);
        setShowMessage("Error al obtener el cpv");
        console.log("Error al obtener el cpv");

      } else {

        setLoading(false);

        const obj = {
          cpv: i
        };
        setCpvI(i);
        console.log(obj)

        const response = await getCpvCurpPais(obj);

        if (response.status === 200) {

          if (response.pais !== null && response.pais !== '') {

            if (response.pais === 'MX') {

              localStorage.setItem("sCpv", i);
              localStorage.setItem("vigenciaCpv", response.vigencia);
              localStorage.setItem("telefono", response.telefono);
              localStorage.setItem("correo", response.correo);

              const responseIdPerson = await mtfindCpv(obj);

              if (responseIdPerson.status === 400) {

                const objValida = {
                  curp: response.curp
                };

                const responseValidate = await validateCurp(objValida);

                if (responseValidate.status === 200) {

                  localStorage.setItem("nombreManual", "200");
                  localStorage.setItem("curpValidate", "" + response.curp);
                  localStorage.setItem("nombre", responseValidate.nombre);
                  localStorage.setItem("paterno", responseValidate.paterno);
                  localStorage.setItem("materno", responseValidate.materno);
                  setValidateCurpCpv(true);

                } else if (responseValidate.status === 201) {

                  localStorage.setItem("curpValidate", "" + response.curp);
                  localStorage.setItem("nombreManual", "201");

                } else {

                  setLoading(true);
                  setShow(true);
                  setModalShow(false);
                  setShowStatus(responseValidate.status);
                  setShowMessage(responseValidate.message);

                }

              } else if (responseIdPerson.status === 200) {

                if (responseIdPerson.id != null && responseIdPerson.id !== "") {

                  localStorage.setItem("idPerson", "" + responseIdPerson.id);
                  localStorage.setItem("uuid", "" + responseIdPerson.uuid);
                  localStorage.setItem("curpValidate", "" + responseIdPerson.identificationNumberId);
                  localStorage.setItem("nombre", responseIdPerson.nombre);
                  localStorage.setItem("paterno", responseIdPerson.paterno);
                  localStorage.setItem("materno", responseIdPerson.materno);
                  setValidateCurpCpv(false);

                }

              } else {

                setLoading(true);
                setShow(true);
                setModalShow(false);
                setShowStatus(responseIdPerson.status);
                setShowMessage(responseIdPerson.message);

              }

              setLoading(true);
              setModalShow(true);

            } else {

              localStorage.setItem("sCpv", i);
              localStorage.setItem("curpValidate", "" + response.curp);
              localStorage.setItem("vigenciaCpv", response.vigencia);
              localStorage.setItem("telefono", response.telefono);
              localStorage.setItem("correo", response.correo);

              const objPerson = {
                cpv: i
              };

              const responseIdPerson = await mtfindCpv(objPerson);

              if (responseIdPerson.status === 400) {

                localStorage.setItem("curpValidate", "" + response.curp);
                localStorage.setItem("nombreManual", "201");
                setValidateCurpCpv(true);

              }

              if (responseIdPerson.status === 200) {
                if (responseIdPerson.id != null && responseIdPerson.id !== "") {
                  localStorage.setItem("idPerson", "" + responseIdPerson.id);
                  localStorage.setItem("uuid", "" + responseIdPerson.uuid);
                  setValidateCurpCpv(false);
                }
              }

              setLoading(true);
              setModalShow(true);

            }

          } else {

            setLoading(true);
            setShow(true);
            setModalShow(false);
            setShowStatus(500);
            setShowMessage("Error al obtener el país del cpv");

          }

        } else {

          setLoading(true);
          setShow(true);
          setModalShow(false);
          setShowStatus(response.respuesta);
          setShowMessage(response.mensaje);

        }
      }
    }

    createSession();

  }, []);


  return (
    < >
              {loading ? (
          <>
            <div className="containerRender">
              <div className="onContentExpands">
                <Pantalla2 />
              </div>

            </div>
                <Footer direction={'/requerimientos'} enabled={true}/>

          </>
        ) : (
          <>
            <div className="containerRender">
              <div className="spinner"></div>
            </div>
            
          </>

          
        )}
     <MyVerticallyCenteredModal  modalShow={modalShow} onHide={onContinueModel}/>
    </>
  );
}
