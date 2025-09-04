'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import WebCam from 'react-webcam'
import * as faceApi from 'face-api.js'
import './CamaraCompare.css'
import Modal from "react-bootstrap/Modal";
import { Dropdown } from 'react-bootstrap';
import { getSelfieToCamara } from '../../Api/getSelfieToCamara'
import 'bootstrap/dist/css/bootstrap.min.css';

const CamComponent = ({ loading }) => {


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
        console.log(imageSrc);
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


        setImageSrc(webCamRef.current.getScreenshot())


        setTimeout(() => {

            router.push("/bandeja");

        }, 2000);

        /*
        loading(true);
        setIsCapturing(true);

        const objIncode = {
            id: localStorage.getItem("sCpv"),
            documentoBase64: webCamRef.current.getScreenshot()
        }

        const response = await getSelfieToCamara(objIncode);

        if (response.status === 200) {


            //const responseComparingFaces = await getComparingFaces(objIncode);

            //if (responseComparingFaces.status === 200) {

            navigate("/PantallaBase27");
            

            //} else {


            //  setShow(true);
            //  setShowStatus(responseComparingFaces.status);
            //  setShowMessage(responseComparingFaces.message);

            //}


        } else {

            loading(false);
            setShow(true);
            setShowStatus(response.status);
            //setShowMessage(response.message);

        }
        */

    }

    useEffect(() => {
        if (!modelsLoaded) return;
        const interval = setInterval(detectFace, 500);
        return () => clearInterval(interval);
    }, [modelsLoaded, isCapturing]) // Se reactiva solo cuando isCapturing es falso

    return (
        <>
            <section className="camDisplay ">
                <WebCam
                    className='webCam'
                    key={selectedDevice}
                    audio={false}
                    ref={webCamRef}
                    screenshotFormat='image/png'
                    videoConstraints={{
                        height: 1100,
                        width: 2000,
                        facingMode: facingMode,
                        deviceId: selectedDevice
                    }}

                />
                <div className='messageForCamContainer'>
                    <div className='messaseForCam'>{message}</div>
                </div>

                <article className='camButtons'>

                    <img src="assets/cameraSwitchForMobile.svg" alt="" className='camButtons__camSwitchButton' onClick={() => switchButton.current.click()} />
                    <img src="assets/cameraMainButton2.svg" alt="" className='camButtons__camMainButton' onClick={() => mainButton.current.click()} />
                    <Dropdown show={showDropMenu} onClick={() => setShowDropMenu(!showDropMenu)}>
                        <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='camButtons__camSettingButtonContainer'>
                            <img src="assets/camaraSettings.svg" alt="Settings" className="camButtons__camSettingButton" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu show={showDropMenu} onClick={() => setShowDropMenu(!showDropMenu)} style={{ maxHeight: '60px', maxWidth: '60px', overflow: 'auto' }}>
                            {devices.length > 0 && (

                                devices.map((device, index) => (
                                    <Dropdown.Item key={index} value={device.deviceId} onClick={() => setSelectedDevice(device.deviceId)}>{device.label}</Dropdown.Item>
                                ))
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <button id="startbutton" onClick={camOnCapture} className='d-none' ref={mainButton}>Take photo</button>
                    <button id="startbutton" ref={switchButton} className='d-none' onClick={() =>
                        setFacingMode(facingMode === "user" ? "environment" : "user")
                    }>Change Camera</button>
                    {devices.length > 0 && (
                        <select name="InputVideoDevices" className='d-none' onChange={(e) => setSelectedDevice(e.target.value)}>
                            {devices.map((device, index) => (
                                <option key={index} value={device.deviceId}>{device.label}</option>
                            ))}
                        </select>
                    )}
                </article>


            </section>

            <Modal show={show} onHide={handleClose} animation={false} centered>
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
