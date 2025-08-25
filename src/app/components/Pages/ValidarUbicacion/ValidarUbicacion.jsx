'use client'

import { mtUpdatePersonDom_Jumio } from "../../Api/mtUpdatePersonDom_Jumio";
import { appGlobal } from "../../Api/appGlobal";
import { Form, Spinner, Modal } from 'react-bootstrap';
import { useEffect } from "react";
import { useAppContext } from '@/app/context/AppContext';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter, useSearchParams } from 'next/navigation';
import maplibregl from 'maplibre-gl';
import "./styleDomPersonal.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

function ValidarUbicacion() {

    const isRunned = useRef(false);
    const router = useRouter();
    const { IdJumio } = useAppContext();
    const [cpDom, setCpDom] = useState("");
    const [coloniaDom, setColoniaDom] = useState("");
    const [calleDom, setCalleDom] = useState("");
    const [numExtDom, setNumExtDom] = useState("");
    const [numInteDom, setNumInteDom] = useState("");
    const [edoDom, setEdoDom] = useState("");
    const [muniDom, setMuniDom] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [latitud_obtenid, setLatitudObj] = useState("");
    const [longitud_obtenid, setLongitudObj] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");


    const [loading, setLoading] = useState(false);

    /******************************************************************** */

    const [showError, setShowError] = useState(false);
    const [showStatusError, setShowStatusError] = useState(null);
    const [showMessageError, setShowMessageError] = useState('');

    const apiKey = "v1.public.eyJqdGkiOiJiMmFjY2FmYS0xZDhhLTQ4YjQtYTFiYy02YTVhNzE0NzJmODUifQ-7Ig1uwnspuC1J5aC38jUMyg6x7XijGQv8vIYREBtoZMsGUi7l6bwdczQZqJCiVEee2wTO6oKchjAlJ7xGrEBidJPOPJVkEkqz-JX-245pU7HY7JJDxuKUgV6ql3u25uECVSbtHUZgJgzXmVxgUk93TnR1i7G5n_cOEWOSxY5Cuhbs6zM93XRiPwOXaYF5do7L42UjsstyXgQx_6RrZW7bXBLb2XdGrYwzChumBW07aDyoFqepLjbd6iKOfEXAylogYinmtVIh8kz-vQrfuLd0yqbNkb9UfLgZ8RpGK4IkRtECJbJMKzSaYJnCubbPHiQcKmngwA9IrmoZZP78cnA.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx";
    const mapName = "mapBeta";
    const region = "us-east-1";

    const mapContainer = useRef(null);
    const map = useRef(null);
    let marker = useRef(null);
    const [zoom] = useState(16);

    useEffect(() => {

        if (isRunned.current) return;
        isRunned.current = true;

        async function createSession() {

            setCpDom(localStorage.getItem('cpDom'));
            setColoniaDom(localStorage.getItem("coloniaDom"));
            setCalleDom(localStorage.getItem("calleDom"));
            setNumExtDom(localStorage.getItem("numExtDom"));
            setNumInteDom(localStorage.getItem("numInteDom"));
            setEdoDom(localStorage.getItem("edoDom"));
            setMuniDom(localStorage.getItem("muniDom"));
            setLatitud(localStorage.getItem("latitud"));
            setLongitud(localStorage.getItem("longitud"));

            setLatitudObj(localStorage.getItem("latitud_obtenida"));
            setLongitudObj(localStorage.getItem('longitud_obtenida'));

            setLat(localStorage.getItem("latitud_obtenida"));
            setLng(localStorage.getItem('longitud_obtenida'));


            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
                center: [localStorage.getItem('longitud_obtenida'), localStorage.getItem("latitud_obtenida")],
                zoom: zoom,
                preserveDrawingBuffer: true
            });

            map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

            marker = new maplibregl.Marker({
                className: "marker",
                color: "#FF0000", draggable: true
            })
                .setLngLat([localStorage.getItem('longitud_obtenida'), localStorage.getItem("latitud_obtenida")])
                .addTo(map.current);

            marker.on('dragend', onDragEnd);

        }

        createSession();

    }, []);


    const handleClose = () => setShowError(false);

    const handlePrint = useReactToPrint({

        content: () => mapContainer.current,
        print: async () => {
            const doc = new jsPDF();
            doc.html(mapContainer.current, {
                html2canvas: {
                    removeContainer: true,
                    scale: .4,
                },
                margin: 1,
                x: 4,
                async callback(doc) {
                    const file = doc.output('blob');
                    try {
                        setLoading(true);
                        const formData = new FormData();

                        formData.append("file", file);
                        formData.append("renombreFile", "Mapa1_");
                        formData.append("cpv", localStorage.getItem("sCpv"));
                        formData.append("idJumio", IdJumio);
                        const url = appGlobal.hostFile + "upload_2C_Jumio";
                        const params = {
                            method: "POST",
                            body: formData
                        };
                        const response = await fetch(url, params);
                        const result = await response.json();
                        console.log('Upload successful:', result);

                        const responseIp = await fetch('https://api.ipify.org?format=json');
                        const data = await responseIp.json();
                        let publicIp = data.ip;

                        let navigator_info = window.navigator;
                        let userAgent = navigator_info.userAgent;
                        let ip = "0.0.0.0"

                        if (publicIp !== undefined && publicIp !== null && publicIp !== '') {

                            let navigator_info = window.navigator;
                            let userAgent = navigator_info.userAgent;
                            let ip = "0.0.0.0";

                            const objInsertDom = {
                                id: IdJumio,
                                documentType: "",
                                documentTypeLabel: "",
                                cpDom: cpDom,
                                coloniaDom: coloniaDom,
                                calleDom: calleDom,
                                numExtDom: numExtDom,
                                numInteDom: numInteDom,
                                edoDom: edoDom,
                                muniDom: muniDom,
                                latDom: latitud,
                                logDom: longitud,
                                longitudDom: longitud_obtenid,
                                latitudDom: latitud_obtenid,
                                scoreDom: "0",
                                distanciaDom: "0",
                                userAgentDom: userAgent,
                                codePaisDom: "MEX",
                                privateIpDom: ip,
                                publicIpDom: publicIp,
                                domicilioParticular: true,
                                imagenDom: "",
                            };

                            const response = await mtUpdatePersonDom_Jumio(objInsertDom);

                            if (response.status === 200) {

                                router.push('/requerimientosselected');

                            } else {
                                setLoading(false);
                                setShowError(true);
                                setShowStatusError(response.status);
                                setShowMessageError(response.message);

                            }

                        } else {
                            setLoading(false);
                            setShowError(true);
                            setShowStatusError("400");
                            setShowMessageError("Error al obtener la ubicación");
                        }

                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }

                },
            });
        },
    });

    function onDragEnd() {
        const lngLat = marker.getLngLat();
        let { lng, lat } = lngLat;
        setLatitudObj(lat);
        setLongitudObj(lng);
    }


    const onButtonClick = async () => {

        handlePrint();
    };

    const hanCloseError = async () => {
        setShowError(false);
    }

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">

                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>

                        <div className="containerRender">
                            <div className="containerInfo_P2">
                                <div className="containerIdent_P2 scrollDataPersonal">
                                    <div>
                                        <div className="map-wrap" ref={mapContainer}>
                                            <div className="map" id="mapContainer" />
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className='containerCont_P2'>
                                <br />
                                <br />
                                <div className='btnContinue'>
                                    <button className='button_P2 animate__animated animate__fadeIn' onClick={onButtonClick}>
                                        <span className='txtButton_P2'>Capturar</span>
                                    </button>
                                </div>
                                <br />
                            </div>
                            <div className="imageContainer_P2">
                                <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
                            </div>
                        </div>

                    </>
                )}

            </div>

            <Modal show={showError} onHide={handleClose} centered backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="msjTitleModalDiv">{showStatusError}</div>
                    <div className="msjErrorModal">{showMessageError}</div>
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

export default ValidarUbicacion;
