'use client'

import { useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import maplibregl from 'maplibre-gl';
import "./styleDomPersonal.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { appGlobal } from "../../Api/appGlobal";
import { mtUpdatePersonRef_Jumio } from "../../Api/mtUpdatePersonRef_Jumio";

function ValidarUbicacionReferencia() {

    const isRunned = useRef(false);
    const cpRef = "54050";
    const coloniaRef = "Bosques de Mexico";
    const calleRef = "Bosques de chihuahua";
    const numExtRef = "87";
    const numInteRef = "";
    const edoRef = "Mexico";
    const muniRef = "Tlalnepantla de Baz";
    const latitud = "19.535325976818562";
    const longitud = "-99.22885245646118";


    const [latitud_obtenid, setLatitudObj] = useState(latitud);
    const [longitud_obtenid, setLongitudObj] = useState(longitud);

    const [lat] = useState(latitud);
    const [lng] = useState(longitud);

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

            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
                center: [lng, lat],
                zoom: zoom,
                preserveDrawingBuffer: true
            });

            map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

            marker = new maplibregl.Marker({
                className: "marker",
                color: "#FF0000", draggable: true
            })
                .setLngLat([longitud_obtenid, latitud_obtenid])
                .addTo(map.current);

            marker.on('dragend', onDragEnd);

        }

        createSession();

    }, []);


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
                        formData.append("renombreFile", "Mapa2_");
                        formData.append("cpv", localStorage.getItem("sCpv"));
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
                                id: localStorage.getItem('idPerson'),
                                cpRef: cpRef,
                                coloniaRef: coloniaRef,
                                calleRef: calleRef,
                                numExtRef: numExtRef,
                                numInteRef: numInteRef,
                                edoRef: edoRef,
                                muniRef: muniRef,
                                latRef: "0",
                                logRef: "0",
                                longitudRef: longitud_obtenid,
                                latitudRef: latitud_obtenid,
                                scoreRef: "0",
                                distanciaRef: "0",
                                userAgentRef: userAgent,
                                codePaisRef: "MEX",
                                privateIpRef: ip,
                                publicIpRef: publicIp,
                                domicilioParticularRef: true,
                                imagenRef: "",
                            };

                            const response = await mtUpdatePersonRef_Jumio(objInsertDom);

                            if (response.status === 200) {

                                navigate("/Requerimientos_Selected");

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

        </>
    );
}

export default ValidarUbicacionReferencia;
