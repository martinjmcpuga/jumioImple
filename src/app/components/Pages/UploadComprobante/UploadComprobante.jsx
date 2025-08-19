'use client'

import { useRef, useState, useEffect } from "react";
//import { Document, Page } from 'react-pdf';
//import { pdfjs } from 'react-pdf';
import Modal from "react-bootstrap/Modal";
import "./styleUploadFile.css";
import { uploadFilesServiceN5_Jumio } from "../../Api/uploadFilesServiceN5_Jumio";
import { validateComprobanteByNameCPV_Jumio } from "../../Api/validateComprobanteByNameCPV_Jumio";
import { validateComprobanteByQR_Jumio } from "../../Api/validateComprobanteByQR_Jumio";
import { mtUpdateComprobante0_Jumio } from "../../Api/mtUpdateComprobante0_Jumio";
import { uploadFilesServiceN5Archivo2_Jumio } from "../../Api/uploadFilesServiceN5Archivo2_Jumio";
import { validateFechaPagoN5_Jumio } from "../../Api/validateFechaPagoN5_Jumio";
import dynamic from 'next/dynamic';
const Document = dynamic(() => import('react-pdf'), { ssr: false });
const Page = dynamic(() => import('react-pdf'), { ssr: false });
const pdfjs = dynamic(() => import('react-pdf'), { ssr: false });

function UploadComprobante() {


  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [showMessage2, setShowMessage2] = useState("");
  const [continueWithOutFile, setContinueWithOutFile] = useState(true);
  const isRunned = useRef(false);
  const [imageShare, setImageShare] = useState("");
  const [showErrorFile, setShowErrorFile] = useState(false);
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filesImage, setFilesImage] = useState([]);
  const [buttonDown, setButtonDown] = useState(false);

  const catchButton = (Validate) => {

    const button = document.getElementById("drop-zone");
    if (Validate) {
      button.classList.add("buttonOnManyImages");
    } else {
      button.classList.remove("buttonOnManyImages");
    }

  }

  const handleFileChange = (event) => {
    setShowErrorFile(false);
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Almacena el archivo seleccionado
    }

    if (
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        catchButton(true);
        setFilesImage([...filesImage, file]);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    } else {
      alert(
        "Tipo de archivo no válido. Por favor, seleccione un archivo PDF, JPEG o PNG."
      );
      setShowErrorFile(true);
    }
  };

  const handleNewImage = () => {

    setShow2(false);
    catchButton(false);

  }

  const handleDrop = (event) => {
    setShowErrorFile(false);
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        catchButton(true);
        setFilesImage([...filesImage, file]);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    } else {
      alert(
        "Tipo de archivo no válido. Por favor, seleccione un archivo PDF, JPEG o PNG."
      );
      setShowErrorFile(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleClose = () => {
    setShow(false);
    setSelectedFile(null);
    setFilesImage([]);
    setContinueWithOutFile(true);
  };

  const handleClose2 = () => {
    setShow2(false);
    catchButton(true);
    setContinueWithOutFile(false);
  };

  const handleReloadImage2 = () => {
    setSelectedFile(null);

  };

  useEffect(() => {
    if (buttonDown) {
      handleContinueImages();
      setButtonDown(false);
    }
  }, [buttonDown]);

  const handleContinueImages = () => {
    setLoading(false);
    setShow2(true);
    setShowMessage2("¿Deseas agregar otra imagen?");
  }

  const handleReloadImage = async () => {

    if ((filesImage.length > 0 && filesImage.length < 2) && continueWithOutFile) {

      setButtonDown(true);
      setLoading(true);

    } else {

      setLoading(true);

      let responseVerificate = null;

      if (selectedFile) {

        responseVerificate = await uploadFilesServiceN5_Jumio(
          selectedFile, "", localStorage.getItem("sCpv")
        );

        if (responseVerificate.status === 200) {

          const objAWS = {
            cpv: localStorage.getItem("sCpv"),
            nombreUser: localStorage.getItem("nombre"),
            paterno: localStorage.getItem("paterno"),
            materno: localStorage.getItem("materno"),
            nombreComprobante0: "",
            nombreComprobante1: localStorage.getItem("sCpv"),
            nombreComprobante2: "_1.png"
          };

          const responseComprobanteByName = await validateComprobanteByNameCPV_Jumio(objAWS);

          if (responseComprobanteByName.status === 200) {

            const responseFechaPago = await validateFechaPagoN5(objAWS);

            if (responseFechaPago.status === 200) {

              const objValidacionQR = {
                cpv: localStorage.getItem("sCpv"),
              };

              const responseValidacionQR = await validateComprobanteByQR_Jumio(objValidacionQR);

              if (responseValidacionQR.status === 200) {

                const objCons = {
                  id: localStorage.getItem('idPerson'),
                  nombreComprobante0: responseVerificate.re_name,
                }

                const responseHis0 = await mtUpdateComprobante0_Jumio(objCons);

                if (responseHis0.status === 200) {

                  //navigate("/RequerimientosSelectedN5");

                } else {

                  setShow(true);
                  setShowStatus(responseHis0.status);
                  setShowMessage(responseHis0.message);

                }

              } else {

                setShow(true);
                setShowStatus(responseValidacionQR.status);
                setShowMessage(responseValidacionQR.message);

              }

            } else {

              setShow(true);
              setShowStatus(responseFechaPago.status);
              setShowMessage(responseFechaPago.message);

            }

          } else {

            setShow(true);
            setShowStatus(responseComprobanteByName.status);
            setShowMessage(responseComprobanteByName.message);

          }

        } else if (responseVerificate.status === 500) {

          setShow(true);
          setShowStatus("407");
          setShowMessage("Tamaño del archivo incorrecto");

        } else {

          setShow(true);
          setShowStatus(responseVerificate.status);
          setShowMessage(responseVerificate.message);

        }

      } else {

        /* Servicio de envio de archivo para el caso de que  se haya seleccionado multiples fotos
        la variable se llama filesImage */

        responseVerificate = await uploadFilesServiceN5_Jumio(
          filesImage[0], "", localStorage.getItem("sCpv")
        );

        if (responseVerificate.status === 200) {

          if (filesImage[1] !== undefined) {

            responseVerificate = await uploadFilesServiceN5Archivo2_Jumio(
              filesImage[1], "V2_", localStorage.getItem("sCpv")
            );

          }

          if (responseVerificate.status === 200) {

            const objAWS = {
              cpv: localStorage.getItem("sCpv"),
              nombreUser: localStorage.getItem("nombre"),
              paterno: localStorage.getItem("paterno"),
              materno: localStorage.getItem("materno"),
              nombreComprobante0: "",
              nombreComprobante1: localStorage.getItem("sCpv"),
              nombreComprobante2: "_1.png"
            };

            const responseComprobanteByName = await validateComprobanteByNameCPV_Jumio(objAWS);

            if (responseComprobanteByName.status === 200) {

              const responseFechaPago = await validateFechaPagoN5_Jumio(objAWS);

              if (responseFechaPago.status === 200) {

                const objValidacionQR = {
                  cpv: localStorage.getItem("sCpv"),
                };

                const responseValidacionQR = await validateComprobanteByQR_Jumio(objValidacionQR);

                if (responseValidacionQR.status === 200) {

                  const objCons = {
                    id: localStorage.getItem('idPerson'),
                    nombreComprobante0: responseVerificate.re_name,
                  }

                  const responseHis0 = await mtUpdateComprobante0_Jumio(objCons);

                  if (responseHis0.status === 200) {

                    // navigate("/RequerimientosSelectedN5");

                  } else {

                    setShow(true);
                    setShowStatus(responseHis0.status);
                    setShowMessage(responseHis0.message);

                  }

                } else {

                  setShow(true);
                  setShowStatus(responseValidacionQR.status);
                  setShowMessage(responseValidacionQR.message);

                }

              } else {

                setShow(true);
                setShowStatus(responseFechaPago.status);
                setShowMessage(responseFechaPago.message);

              }

            } else {

              setShow(true);
              setShowStatus(responseComprobanteByName.status);
              setShowMessage(responseComprobanteByName.message);

            }

          } else if (responseVerificate.status === 500) {

            setShow(true);
            setShowStatus("407");
            setShowMessage("Tamaño del archivo incorrecto");

          } else {

            setShow(true);
            setShowStatus(responseVerificate.status);
            setShowMessage(responseVerificate.message);

          }

        } else if (responseVerificate.status === 500) {

          setShow(true);
          setShowStatus("407");
          setShowMessage("Tamaño del archivo incorrecto");

        } else {

          setShow(true);
          setShowStatus(responseVerificate.status);
          setShowMessage(responseVerificate.message);

        }

      }

      setLoading(false);

    }

  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <div className="initBack_P2 animate__animated animate__fadeIn">

        <div>

          {loading ? (

            <div className="spinner" />

          ) : (

            <div className='animate__animated animate__fadeIn'>
              <div className='containerInfo_P2'>
                <div className="containerIdent_P2">
                  {filesImage.length > 0 ? (
                    <div>
                      <div className="textFileSelectUp">Revisa tu foto:</div>
                      <p className="subtitleTextFileUp">
                        Asegúrate que las letras se vean claras y tenga buena
                        iluminación
                      </p>

                      <div>
                        {filesImage.map((file, index) => (

                          <div key={index}>
                            <div className="contaunerFileUp">
                              <img
                                className="borderPaddingUp"
                                src={URL.createObjectURL(filesImage[index])}
                                alt="Archivo seleccionado"
                              />
                            </div>
                          </div>
                        ))}


                        <div className="buttonCenterUp">
                          <div className="spaceButtonReloadUp">
                          </div>
                        </div>
                        <div className="space"></div>
                      </div>


                      <div className="space"></div>
                    </div>
                  ) : null}
                  {selectedFile ? (
                    <div className='animate__animated animate__fadeIn'>
                      <div className="textFileSelectUp">Revisa tu foto:</div>
                      <p className="subtitleTextFileUp">
                        Asegúrate que las letras se vean claras y tenga buena
                        iluminación
                      </p>
                      {selectedFile.type.startsWith("image/") && (
                        <div>
                          <div className="contaunerFileUp">
                            <img
                              className="borderPaddingUp"
                              src={URL.createObjectURL(selectedFile)}
                              alt="Archivo seleccionado"
                            />
                          </div>

                          <div className="buttonCenterUp">
                            <div className="spaceButtonReloadUp">
                              <button
                                className="buttonReloadUp"
                                onClick={handleReloadImage2}
                              >
                                <span className="txtButton_P2_OpUp">Cargar otro archivo</span>
                              </button>
                            </div>
                          </div>
                          <div className="space"></div>
                        </div>
                      )}
                      {selectedFile.type === "application/pdf" && (
                        <div className="contextPdfUp">
                          <Document file={(selectedFile)} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={1} />
                          </Document>
                        </div>
                      )}

                      <div className="space"></div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="drop-zone centerButtonUp"
                        id="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleClick}>
                        <div className="buttonFileUp">
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept=".pdf, .jpeg, .jpg, .png"
                            onChange={handleFileChange}
                          />
                          <span>Cargar Archivo</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <br />
          <br />
          <br />
          <br />

          <div className="footer">
            {!selectedFile && !filesImage.length > 0 ? (
              <>
                <div className='containerCont_P2'>
                  <button className='btnVer_P3'>
                    <span className='txtVer_P3'>Continuar</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='containerCont_P2'>
                  <button className='button_P2' onClick={handleReloadImage} >
                    <span className='txtButton_P2'>Continuar</span>
                  </button>
                </div>
              </>
            )}
            <div className="imageContainer_P2">
              <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal on NewImage */}

      <Modal className="animate__animated animate__fadeIn" show={show2} onHide={handleClose2} animation={true} centered backdrop="static">
        <Modal.Body className="backGroudModal">
          <div className="msjTitleModalDiv">{showMessage2}</div>
        </Modal.Body>
        <Modal.Footer>

          <button className="buttonRein_P2" onClick={handleNewImage}>
            <span className="txtButtonRein_P14">Agregar nueva imagen</span>
          </button>
          <br />

          <button className="button_P2" onClick={handleClose2}>
            <span className="txtButton_P2">Continuar</span>
          </button>
        </Modal.Footer>
      </Modal>

      {/* Mensaje de errores */}

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Body className="backGroudModal">
          <div className="msjTitleModalDiv">Error {showStatus}</div>
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

export default UploadComprobante;