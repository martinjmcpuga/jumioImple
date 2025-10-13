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
      <div className="initBack_P2 animate__animated animate__fadeIn">

        <div>

          {loading ? (

            <div className="spinner" />

          ) : (

            <div className='animate__animated animate__fadeIn'>
              <div className='containerInfo_P2 onContentExpands'>
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

      {/* Mensaje de errores */}

      <Modal show={show} onHide={handleClose} animation={false} centered className="animate__animated animate__fadeIn">
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
  );
}

export default UploadComprobante;