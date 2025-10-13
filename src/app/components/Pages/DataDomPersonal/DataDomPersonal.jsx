'use client'

import React from "react";
import { useEffect, useRef, useState } from "react";
import { getCodigoPostalCpt_Jumio } from "../../Api/getCodigoPostalCpt_Jumio";
import { getPointCoordenadas_Jumio } from "../../Api/getPointCoordenadas_Jumio";
import { useRouter } from 'next/navigation';
import { Modal } from 'react-bootstrap';
import "./styleDomPersonal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
// Importación dinámica para react-select
const Select = dynamic(() => import('react-select'), { ssr: false });

function DataDomPersonal() {

    const ref = useRef(null);
    const router = useRouter();
    const [codigoPostal, setCodigoPostal] = useState("");
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");
    const [edo, setEdo] = useState("");
    const [muni, setMuni] = useState("");
    const [numExterior, setnumExterior] = useState("");
    const [numInterior, setnumInterior] = useState("");
    const [tipoColonia, setTipoColonia] = useState([]);
    const [selectedColoniaOption, setSelectedColoniaOption] = useState(null); 
    const [blContinue, setBlContinue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [show, setShow] = useState(false);
    const [showStatus, setShowStatus] = useState(null);
    const [showMessage, setShowMessage] = useState('');
    const [latitud, setLatitud] = useState(0.0);
    const [longitud, setLongitud] = useState(0.0);

    useEffect(() => {


        async function createSession1() {

            setTipoColonia([]);
            setSelectedColoniaOption(null); // Limpia la opción seleccionada al inicio

            const cp = sessionStorage.getItem('cp_comprobante');
            if (cp && cp !== "null" && cp !== "0") {

                setCodigoPostal(cp);

                const modelCodigoPostal = { cp };

                const response = await getCodigoPostalCpt_Jumio(modelCodigoPostal);

                if (response.status === 200) {

                    setEdo(response.listRest[0].nomestado);
                    setMuni(response.listRest[0].municipio);
                    setTipoColonia(response.listRest);
                    
                    if (response.listRest.length === 1) {
                        const soleOption = response.listRest[0];
                        setSelectedColoniaOption(soleOption);
                        setColonia(soleOption.asentamiento);
                    }
                } else {

                    setTipoColonia([]);

                }
            }

            setLoading(false);
        }

        createSession1();

    }, []);



    var config = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    function onError() {
        setShow(true);
        setShowStatus(500);
        setShowMessage('No se pudo encontrar tu ubicación.');
        router.push("/datadompersonal");
    }

    function onSucccess(position) {
        setLatitud(position.coords.latitude);
        setLongitud(position.coords.longitude);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
    }, []);

    const handleClose = () => setShow(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        // La validación ahora usa el estado 'colonia' que se actualiza desde el Select
        if (codigoPostal !== "" && calle !== "" && numExterior !== "" && tipoColonia.length > 0 && colonia !== "") {
            setBlContinue(true);
            setShowHeader(true);
        } else {
            setBlContinue(false);
        }
    }, [codigoPostal, calle, numExterior, tipoColonia, colonia]);

    const fnFetCodigoPostalCpt = async (cpCod) => {
        setTipoColonia([]);
        setSelectedColoniaOption(null); // Limpiar selección al cambiar CP

        const modelCodigoPostal = { cp: cpCod };

        const response = await getCodigoPostalCpt_Jumio(modelCodigoPostal);
        if (response.status === 200) {
            setEdo(response.listRest[0].nomestado);
            setMuni(response.listRest[0].municipio);
            setTipoColonia(response.listRest);
             // Opcional: Si solo hay una opción, la preseleccionamos
            if (response.listRest.length === 1) {
                const soleOption = response.listRest[0];
                setSelectedColoniaOption(soleOption);
                setColonia(soleOption.asentamiento);
            }
        } else {
            setTipoColonia([]);
        }
    }

    const handkeOnKeyDown = async (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter" || event.keyCode === 13) {
            fnFetCodigoPostalCpt(codigoPostal);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= 5) {
            setCodigoPostal(value);

            if (value.length < 5) {
                setColonia("");
                setSelectedColoniaOption(null); // Limpiar opción seleccionada
                setTipoColonia([]);
            }
        }

        if (value.length === 5) {
            fnFetCodigoPostalCpt(value);
        }
    };

    // Guardamos el objeto completo de la opción seleccionada
    const handleChangeLic = (selectedOption) => {
        setSelectedColoniaOption(selectedOption);
        if (selectedOption) {
            // Guardamos el string para mantener la compatibilidad con tu useEffect
            setColonia(selectedOption.asentamiento); 
        } else {
            setColonia("");
        }
    };

    const getContinue = async () => {
        setShowHeader(false);
        const direccion = `${calle} ${numExterior}, ${colonia}, ${muni}, ${codigoPostal}, ${edo}`;

        const geolocalizacion = await getPointCoordenadas_Jumio({ direccion });

        if (geolocalizacion.status === 200) {
            sessionStorage.setItem("cpDom", codigoPostal);
            sessionStorage.setItem("coloniaDom", colonia);
            sessionStorage.setItem("calleDom", calle);
            sessionStorage.setItem("numExtDom", numExterior);
            sessionStorage.setItem("numInteDom", numInterior);
            sessionStorage.setItem("edoDom", edo);
            sessionStorage.setItem("muniDom", muni);
            sessionStorage.setItem("latitud", latitud);
            sessionStorage.setItem("longitud", longitud);
            sessionStorage.setItem("latitud_obtenida", geolocalizacion.latitud);
            sessionStorage.setItem("longitud_obtenida", geolocalizacion.longitud);
            router.push("/validarubicacion");

        } else {

            setShow(true);
            setShowStatus(geolocalizacion.status);
            setShowMessage(geolocalizacion.message);

        }
    };

    const getRein = () => router.push('/dirrefpersonal');

    const style = {
        control: (base) => ({
            ...base,
            height: 52,
            borderRadius: 4,
            boxShadow: 'none',
            borderColor: '#c4cbd1',
            '&:hover': {
                borderColor: '#c4cbd1',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#0078ff26' // solo la seleccionada
                : 'white',
            color: '#333',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#f1f1f1', // hover ligero para las demás
            }
        }),
        singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }),
    };

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">
                <div className="containerRenderForm onContentExpands">
                    <div className="containerInfo_P2">
                        <div className="containerIdent_P2 scrollDataPersonal">
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                <div className="animate__animated animate__fadeIn heigthData1">
                                    <div className="txtOp_P2">Domicilio Personal</div>
                                    <div className="subTitle">Dirección laboral o donde normalmente desempeña su actividad diaria.</div>
                                    <hr className="separadorLine" />
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="txtSubtitle">Código Postal:</div>
                                            <input
                                                type="text"
                                                value={codigoPostal}
                                                ref={ref}
                                                onChange={handleChange}
                                                onKeyDown={handkeOnKeyDown}
                                                placeholder="C.P."
                                                className="spaceLeft"
                                            />
                                        </div>
                                        <div>
                                            <div className="txtSubtitle">Colonia:</div>
                                            <Select
                                                styles={style}
                                                className="select-wrapper"
                                                classNamePrefix="select"
                                                placeholder="Selecciona la colonia"
                                                options={tipoColonia}
                                                // Usamos el objeto completo para que mantenga la selección
                                                value={selectedColoniaOption}
                                                // Indicamos a react-select qué campo usar como valor y etiqueta
                                                getOptionValue={(option) => option.asentamiento}
                                                getOptionLabel={(option) => option.asentamiento}
                                                onChange={handleChangeLic}
                                                formatOptionLabel={tipoColonia => (
                                                    <div className="containerEmisor">
                                                        <div className="licenciaValue">{tipoColonia.asentamiento}</div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <div className="txtSubtitle">Calle:</div>
                                            <input
                                                type="text"
                                                value={calle}
                                                onChange={(event) => setCalle(event.target.value)}
                                                placeholder="Calle:"
                                                className="spaceLeft"
                                            />
                                        </div>
                                        <div className="contenedorNum">
                                            <div className="numExt">
                                                <div className="txtSubtitle">Exterior:</div>
                                                <input
                                                    type="text"
                                                    value={numExterior}
                                                    onChange={(event) => setnumExterior(event.target.value)}
                                                    placeholder="Número"
                                                    className="spaceLeft"
                                                />
                                            </div>
                                            <div className="numInt">
                                                <div className="txtSubtitle">Interior:</div>
                                                <input
                                                    type="text"
                                                    value={numInterior}
                                                    onChange={(event) => setnumInterior(event.target.value)}
                                                    className="spaceLeft"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <hr className="line" />
                                    <div className='btnContinue'>
                                        {!blContinue ? (
                                            <button className='btnVer_P3'>
                                                <span className='txtVer_P3'>Mapear</span>
                                            </button>
                                        ) : (
                                            <div className='containerCont_P2'>
                                                <div className="spaceButton14">
                                                    <button className='button_P2 animate__animated animate__fadeIn' type="submit" onClick={getContinue}>
                                                        <span className='txtButton_P2'>Mapear</span>
                                                    </button>
                                                </div>
                                                <div className="spaceButton14">
                                                    <button className='buttonRein_P2' onClick={getRein}>
                                                        <span className='txtButtonRein_P14'>Reintentar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="imageContainer_P2">
                        <img src="assets/foodbrand@2x.png" className="imgFooter_P2" />
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} className="animate__animated animate__fadeIn">
                <Modal.Body>
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

export default DataDomPersonal;