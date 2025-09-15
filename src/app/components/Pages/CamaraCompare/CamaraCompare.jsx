'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import WebCam from 'react-webcam'
import * as faceApi from 'face-api.js'
import './CamaraCompare.css'
import Modal from "react-bootstrap/Modal";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSelfieToCamara_Jumio } from '../../Api/getSelfieToCamara_Jumio';

const CamComponent = ({ }) => {

    const { IdJumio } = useAppContext();
    const router = useRouter();
    const webCamRef = useRef(null)
    const mainButton = useRef(null)
    const DropMenu = useRef(null)
    const switchButton = useRef(null)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)
    const [facingMode, setFacingMode] = useState("user")
    const [devices, SetDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState("")
    const [countdown, setCountdown] = useState(null)
    const [message, setMessage] = useState("Por favor, mire al centro del círculo y mantenga su rostro allí")
    const [isCapturing, setIsCapturing] = useState(false) // Nuevo estado
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [show, setShow] = useState(false);
    const [showStatus, setShowStatus] = useState(null);
    const [showMessage, setShowMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [showMsjUsu, setShowMsjUsu] = useState("No se ha podido verificar que la persona en la identificación sea la misma que la del biométrico.Intenta de nuevo o póngase en contacto con los administradores de este servicio.");

    const handleFilterByVideoInputDevices = useCallback((devices) => {
        SetDevices(devices.filter(({ kind }) => kind === "videoinput"))
    }, [])

    useEffect(() => {

        const loadModels = async () => {
            await faceApi.nets.tinyFaceDetector.loadFromUri(process.env.PUBLIC_URL + '/models');

            setModelsLoaded(true)
        }

        loadModels();

        const fetchDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            handleFilterByVideoInputDevices(devices);
        };

        fetchDevices();
    }, []);


    //Sugerencia de uso de useEffect para envio de imagen
    useEffect(() => {
        // console.log(imageSrc);
    }, [imageSrc])

    useEffect(() => {
        if (countdown === null) return;
        setMessage("Cara detectada tomando foto en... " + countdown + "segundos");
    }, [countdown])

    const detectFace = async () => {
        if (!webCamRef.current || !modelsLoaded || isCapturing) return; // Si está capturando, no hacer nada

        const video = webCamRef.current.video;
        const detection = await faceApi.detectSingleFace(video, new faceApi.TinyFaceDetectorOptions());

        if (detection && countdown === null) {
            //console.log("Rostro detectado ✅");
            setIsCapturing(true) // Bloquear reconocimiento
            setCountdown(3)
            setMessage("Cara detectada, tomando foto en 3 segundos")

            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(interval)
                        camOnCapture();
                        setMessage("Foto tomada, procesando...")
                        setTimeout(() => {
                            setIsCapturing(false) // Reanudar reconocimiento después de 3 segundos
                            setMessage("Por favor, mire al centro del círculo y mantenga su rostro allí")
                        }, 3000)
                        return null
                    }
                    return prev - 1
                })
            }, 1000);
        }
    }


    //Esta es la función que se ejecuta cuando se toma la foto
    //Poner servicio de envio aqui 

    const handleClose = () => {
        setShow(false);
    };

    const camOnCapture = async () => {

        setShow(false);
        setLoading(false);
        setImageSrc(webCamRef.current.getScreenshot())
        setIsCapturing(true);

        const objIncode = {
            id: sessionStorage.getItem('id_jumio'),
            documentoBase64: webCamRef.current.getScreenshot()
        }

        const response = await getSelfieToCamara_Jumio(objIncode);

        if (response.status === 200) {

            router.push("/bandeja");

        } else if (response.status === 500) {

            setLoading(true);
            setShow(true);
            setShowStatus("Error");
            setShowMessage(showMsjUsu);

        } else {

            setLoading(true);
            setShow(true);
            setShowStatus("Error");
            setShowMessage(showMsjUsu);

        }


    }

    useEffect(() => {
        if (!modelsLoaded) return;
        const interval = setInterval(detectFace, 500);
        return () => clearInterval(interval);
    }, [modelsLoaded, isCapturing]) // Se reactiva solo cuando isCapturing es falso

    return (
        <>

            <div className="containerRender animate__animated animate__fadeIn">
                {!loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="containerInfo_P2 animate__animated animate__fadeIn">

                        <section className="camDisplay ">
                            <WebCam
                                className='webCam'
                                key={selectedDevice}
                                audio={false}
                                ref={webCamRef}
                                screenshotFormat='image/png'
                                videoConstraints={{
                                    height: 1400,
                                    width: 2200,
                                    facingMode: facingMode,
                                    deviceId: selectedDevice
                                }}

                            />
                            <div className='messageForCamContainer'>
                                <div className='messaseForCam'>{message}</div>
                            </div>


                        </section>

                        <div className="footer ">
                            <div className="containerCont_P2">
                                <div className="btnContinue">
                                    <>
                                        <button
                                            className="button_P2 animate__animated animate__fadeIn"
                                            onClick={camOnCapture}
                                        >
                                            <span className="txtButton_P2">Tomar foto</span>
                                        </button>
                                    </>
                                </div>
                            </div>
                            <div className="imageContainer_P2">
                                <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
                            </div>
                        </div>
                    </div>

                )}

            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
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
    )
}

export default CamComponent
