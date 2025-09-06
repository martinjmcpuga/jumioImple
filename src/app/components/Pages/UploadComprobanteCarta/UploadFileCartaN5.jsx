'use client'

import React, { useState, useRef, useEffect } from "react";
import { uploadCartaCompromiso_2C_Jumio } from "../../Api/uploadCartaCompromiso_2C_Jumio";
import { updateCartaCompromisoStatusJumio } from "../../Api/updateCartaCompromisoStatusJumio";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Modal from "react-bootstrap/Modal";
import dynamic from 'next/dynamic';
import "./styleUploadFile.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const PDFDocument = dynamic(() => import('react-pdf').then(m => m.Document), { ssr: false });
const PDFPage = dynamic(() => import('react-pdf').then(m => m.Page), { ssr: false });

function UploadFileCartaN5() {

  useEffect(() => {
    (async () => {

      const { pdfjs } = await import('react-pdf');
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

    })();
  }, [])

  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const isRunned = useRef(false);
  const [imageShare, setImageShare] = useState("");
  const [showErrorFile, setShowErrorFile] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setRutaBack('/requerimientosn5');
  }, []);

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
      setSelectedFile(file);
    } else {
      alert(
        "Tipo de archivo no válido. Por favor, seleccione un archivo PDF, JPEG o PNG."
      );
      setShowErrorFile(true);
    }
  };

  const handleDrop = (event) => {
    setShowErrorFile(false);
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file.type === "application/pdf" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      setSelectedFile(file);
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
  };

  const handleReloadImage2 = () => {
    setSelectedFile(null);

  };

  const handleReloadImage = async () => {

    setLoading(true);

    const responseVerificate = await uploadCartaCompromiso_2C_Jumio(
      selectedFile, "Carta_", localStorage.getItem("sCpv"), sessionStorage.getItem('id_jumio')
    );

    if (responseVerificate.status === 200) {

      const objCons = {
        id: sessionStorage.getItem('id_jumio')
      }

      const responseStatus = await updateCartaCompromisoStatusJumio(objCons);

      if (responseStatus.status === 200) {

        router.push("/requerimientosn5cartaselected");

      } else {

        setShow(true);
        setShowStatus(responseStatus.status);
        setShowMessage(responseStatus.message);

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

    setLoading(false);

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

                  {selectedFile ? (
                    <div>
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
                          <PDFDocument file={(selectedFile)} onLoadSuccess={onDocumentLoadSuccess}>
                            <PDFPage pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                          </PDFDocument>
                        </div>
                      )}

                      <div className="space"></div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="drop-zone centerButtonUp"
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
            {!selectedFile ? (
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

export default UploadFileCartaN5;