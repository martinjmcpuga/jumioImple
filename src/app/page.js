'use client';

import JumioJsx from "./components/jumio/Jumio";
import { useState, useEffect, useRef } from "react";
import Pantalla2 from "./components/Pages/Pantalla2/Pantalla2";
import Footer from "./components/Footer/Footer";
import { getCpvCurpPaisJumio } from "./components/Api/getCpvCurpPaisJumio";
import { validateCurp_Jumio } from "./components/Api/validateCurp_Jumio";
import { mtfindCpvIdJumio } from "./components/Api/mtfindCpvIdJumio";
import { useSearchParams } from 'next/navigation'
import { useAppContext } from './context/AppContext';
import { useRouter } from 'next/navigation';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

  const searchParams = useSearchParams()
  const isRunned = useRef(false);
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validateCurpCpv, setValidateCurpCpv] = useState(true);
  const i = searchParams.get('i')
  const { setCpvI, setIdJumio } = useAppContext();
  const [onehabilita, setOnehabilita] = useState(true);

  const onContinueModel = async () => {
    setModalShow(false);
  };

  const handleClose = async () => {
    setShow(false);
    window.location.href = "https://midpr.icu/usuarioaicm/";
  };


  const onTest = async () => {
    router.push("/requerimientos");
  };


  const onValidateFaceMach = async () => {
    router.push("/bandeja");
  };

  useEffect(() => {

    localStorage.setItem('interName', 'Autenticación Personal');
    localStorage.setItem('TitleMain', 'Enrolamiento');

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

        const response = await getCpvCurpPaisJumio(obj);

        if (response.status === 200) {

          if (response.pais !== null && response.pais !== '') {

            if (response.pais === 'MX') {

              localStorage.setItem("sCpv", i);
              localStorage.setItem("vigenciaCpv", response.vigencia);
              localStorage.setItem("telefono", response.telefono);
              localStorage.setItem("correo", response.correo);

              const responseIdPerson = await mtfindCpvIdJumio(obj);

              if (responseIdPerson.status === 400) {

                const objValida = {
                  curp: response.curp
                };

                const responseValidate = await validateCurp_Jumio(objValida);

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

                  setIdJumio(responseIdPerson.id);
                  localStorage.setItem("idPerson", "" + responseIdPerson.id);
                  localStorage.setItem("curpValidate", "" + responseIdPerson.userReference);
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

              const responseIdPerson = await mtfindCpvIdJumio(objPerson);

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
          <div className="footer ">
            <div className="containerCont_P2">
              {validateCurpCpv ? (
                <>
                  <button className="button_P2 buttonExpandsBase " onClick={onTest}>
                    <span className="txtButton_P2">Confirmar</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="button_P2 buttonExpandsBase " onClick={onValidateFaceMach}>
                    <span className="txtButton_P2">Confirmar</span>
                  </button>
                </>
              )}
            </div>
            <div className="imageContainer_P2">
              <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="containerRender">
            <div className="spinner"></div>
          </div>

        </>

      )}

      <Modal
        show={modalShow} size="sm"
        onHide={onContinueModel}
        centered backdrop="static"
        keyboard={false}
        className="animate__animated animate__fadeIn"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="txtHead_P1">Uso de Cookies</div>
          </Modal.Title>
          <div className="p1">
            <div className="btn-close" >
              <a href="https://midpr.icu/usuarioaicm/" role="button"></a>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="txtMsj_P1">
            Sistema de Confiabilidad DPR SAPI, requiere el consentimiento del Uso
            de Cookies de todos los Usuarios de esta Aplicación Web. Las cookies
            son pequeños fragmentos de texto que nuestra Aplicación Web envía al
            navegador, permiten que las operaciones realizadas por Usuario
            recuerden información sobre la sesión, lo que facilita realizar
            verificaciones con fuentes externas y hacer que la secuencia de las
            Operaciones Realizadas sea más ágil.Otras tecnologías, como los
            identificadores únicos y geolocalización que se usan en el navegador,
            aplicación o dispositivo, los píxeles y el almacenamiento local,
            también se pueden usar para estos fines.
          </p>
          <button
            className={`buttonCookies_P1 ${onehabilita ? "buttonEnabled" : ""}`}
            onClick={() => setOnehabilita(!onehabilita)}
          >
            <div className="txtCookies_P1">Aceptar Uso de Cookies</div>
          </button>
          <div className="spaceButtonModal" />
          <button
            className={!onehabilita ? "buttonModal_P1" : "buttonModal_disable"}
            onClick={onContinueModel}
            disabled={onehabilita}
          >
            <div
              className={
                !onehabilita ? "txtButtonModal_P1" : "txtButtonModal_disable"
              }
            >
              Confirmar
            </div>
          </button>
        </Modal.Body>
        <div className="foorterBackground_P1">
          <Modal.Footer>
            <span className="txtFooorter_P1">
              IMPORTANTE: Consulte nuestro{" "}
              <span className="txtCookiesFooorter_P1">
                <a href="https://midpr.net/cookies.php" target="_blank">
                  Uso de Cookies
                </a>
              </span>{" "}
              para más detalles sobre la recolección y uso de datos.
            </span>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        backdrop="static"
      >
        <Modal.Body className="backGroudModal">
          <div className="msjTitleModalDiv">{showStatus}</div>
          <div className="msjErrorModal">{showMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className="button_P2" onClick={handleClose}>
            <span className="txtButton_P2">Regresar</span>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
