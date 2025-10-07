'use client'

import { useRef, useState, useEffect } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import { uploadFilesService } from "../../Api/uploadFilesService";
import { validacionTipoComprobanteJumio } from "../../Api/validacionTipoComprobanteJumio";
import Modal from "react-bootstrap/Modal";
import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styleUploadFile.css";

const PDFDocument = dynamic(() => import('react-pdf').then(m => m.Document), { ssr: false });
const PDFPage = dynamic(() => import('react-pdf').then(m => m.Page), { ssr: false });

function UploadComprobante() {

  useEffect(() => {
    (async () => {
      const { pdfjs } = await import('react-pdf');

      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    })();
  }, [])

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { IdJumio, setRutaBack } = useAppContext();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [showMessage2, setShowMessage2] = useState("");
  const [continueWithOutFile, setContinueWithOutFile] = useState(true);
  const isRunned = useRef(false);
  const [imageShare, setImageShare] = useState("");
  const [showErrorFile, setShowErrorFile] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filesImage, setFilesImage] = useState([]);
  const [buttonDown, setButtonDown] = useState(false);

  useEffect(() => {
    setRutaBack('/comprobantedompersonal');
  }, []);

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
        console.log(file)
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
        console.log(file)
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

  const showModalError = (title, message) => {
    setShowStatus(title);
    setShowMessage(message);
    setShow(true);
  };

  const handleReloadImage = async () => {

    setLoading(true);

    let responseVerificate = null;

    if (filesImage.length > 0) {

      responseVerificate = await uploadFilesService(
        filesImage[0], "Comprobante_", sessionStorage.getItem("sCpv"), sessionStorage.getItem('id_jumio')
      );

    } else if (selectedFile) {

      responseVerificate = await uploadFilesService(
        selectedFile, "Comprobante_", sessionStorage.getItem("sCpv"), sessionStorage.getItem('id_jumio')
      );
    }

    if (responseVerificate.status === 200) {

      const obj = {
        idJumio: sessionStorage.getItem('id_jumio'),
        nombreComprobante0: "Comprobante_",
        nombreComprobante1: sessionStorage.getItem("sCpv"),
        nombreComprobante2: "_1.png",
        tipoComprobante: sessionStorage.getItem('tipo_comprobante')
      };

      const responseComprobante = await validacionTipoComprobanteJumio(obj);

      if (responseComprobante.status === 200) {

        sessionStorage.setItem('cp_comprobante', responseComprobante.cp);
        sessionStorage.setItem('documentType', responseComprobante.documentType);
        sessionStorage.setItem('fechaValidaComprobante', responseComprobante.fechaValida);
        router.push('/datadompersonal');

      } else {

        setLoading(false);
        showModalError(responseComprobante.status, responseComprobante.message);

      }

    } else {

      setLoading(false);
      showModalError(responseVerificate.status, responseVerificate.message);

    }

  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <>
      <>
        <div className="initBack_P2 animate__animated animate__fadeIn containerRender">
          <div className="containerInfo_P2 onContentExpands">
            <div className="containerIdent_P2Document">

              {loading ? (
                <div className="spinnerWrapper">
                  <div className="spinner" />
                  <p className="loadingText">Cargando, por favor espera...</p>
                </div>
              ) : (
                <div className="animate__animated animate__fadeIn">

                  {/* Caso: Imagenes múltiples */}
                  {filesImage.length > 0 && (
                    <div className="previewCard min-h-full ">
                      <h3 className="previewTitle">Revisa tu foto</h3>
                      <p className="previewSubtitle">
                        Asegúrate de que las letras sean legibles y con buena iluminación.
                      </p>

                      <div className="previewGallery">
                        {filesImage.map((file, index) => (
                          <img
                            key={index}
                            className="previewImage"
                            src={URL.createObjectURL(file)}
                            alt="Archivo seleccionado"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caso: Archivo único */}
                  {selectedFile && (
                    <div className="previewCard animate__animated animate__fadeIn">
                      <h3 className="previewTitle">Revisa tu archivo</h3>
                      <p className="previewSubtitle">
                        Asegúrate de que las letras sean legibles y con buena iluminación.
                      </p>

                      {selectedFile.type.startsWith("image/") && (
                        <div className="previewWrapper">
                          <img
                            className="previewImage"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Archivo seleccionado"
                          />
                          <button
                            className="buttonSecondary"
                            onClick={handleReloadImage2}
                          >
                            Cargar otro archivo
                          </button>
                        </div>
                      )}

                      {selectedFile.type === "application/pdf" && (
                        <div className="pdfPreview">
                          <PDFDocument
                            file={selectedFile}
                            onLoadSuccess={onDocumentLoadSuccess}
                          >
                            <PDFPage
                              pageNumber={1}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                            />
                          </PDFDocument>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Caso: Nada seleccionado */}
                  {!selectedFile && filesImage.length === 0 && (
                    <div className="containerIdent_P2">
                      <div
                        className="dropZone"
                        id="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleClick}
                      >
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          accept=".pdf, .jpeg, .jpg, .png"
                          onChange={handleFileChange}
                        />
                        <div className="dropZoneContent">
                          <span className="dropZoneIcon">📂</span>
                          <p className="dropZoneText">Haz clic o arrastra un archivo aquí</p>
                          <small className="dropZoneHint">Formatos permitidos: PDF, JPG, PNG</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="footer">
                <div className="containerCont_P2">
                  {!selectedFile && filesImage.length === 0 ? (
                    <button className="buttonDisabled" disabled>
                      Continuar
                    </button>
                  ) : (
                    <button className="button_P2" onClick={handleReloadImage}>
                      Continuar
                    </button>
                  )}
                </div>
                <div className="imageContainer_P2">
                  <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de errores */}
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          className="animate__animated animate__fadeIn"
        >
          <Modal.Body className="backGroudModal">
            <div className="msjTitleModalDiv">Error</div>
            <div className="msjErrorModal">{showMessage}</div>
          </Modal.Body>
          <Modal.Footer>
            <button className="button_P2" onClick={handleClose}>
              <span className="txtButton_P2">Regresar</span>
            </button>
          </Modal.Footer>
        </Modal>
      </>

    </>
  );
}

export default UploadComprobante;