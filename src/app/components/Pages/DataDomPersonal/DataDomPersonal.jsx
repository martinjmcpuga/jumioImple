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
const Select = dynamic(() => import('react-select'), { ssr: false });

function DataDomPersonal() {

    const ref = useRef(null);
    const router = useRouter();
    const isRunned = useRef(false);
    const [codigoPostal, setCodigoPostal] = useState("");
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");
    const [edo, setEdo] = useState("");
    const [muni, setMuni] = useState("");
    const [numExterior, setnumExterior] = useState("");
    const [numInterior, setnumInterior] = useState("");
    const [tipoColonia, setTipoColonia] = useState([]);
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

            if (sessionStorage.getItem('cp_comprobante') != null &&
                sessionStorage.getItem('cp_comprobante') != undefined &&
                sessionStorage.getItem('cp_comprobante') != "null" &&
                sessionStorage.getItem('cp_comprobante') != 0) {

                setCodigoPostal(sessionStorage.getItem('cp_comprobante'));

                const modelCodigoPostal = {
                    cp: sessionStorage.getItem('cp_comprobante')
                }

                const response = await getCodigoPostalCpt_Jumio(modelCodigoPostal);

                if (response.status === 200) {

                    setEdo(response.listRest[0].nomestado);
                    setMuni(response.listRest[0].municipio);
                    setTipoColonia(response.listRest);

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


    /*se ejecuta si el permiso fue denegado o no se puede encontrar una ubicación*/
    function onError() {
        setShow(true);
        setShowStatus(500);
        setShowMessage('No se pudo encontrar tu ubicación.');
        router.push("/datadompersonal");
    }

    /* se ejecuta si los permisos son concedidos y se encuentra una ubicación*/
    function onSucccess(position) {
        setLatitud(position.coords.latitude);
        setLongitud(position.coords.longitude);

    }

    useEffect(() => {

        async function getFuncionEstados() {
            /*así llamamos la función getCurrentPosition*/

            navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
        }
        getFuncionEstados();

    }, []);


    const handleClose = (event) => {

    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (codigoPostal !== "" && calle !== "" && numExterior !== "" && tipoColonia != []) {
            setBlContinue(true);
            setShowHeader(true);
        } else {
            setBlContinue(false);
        }
    });

    useEffect(() => {

        if (isRunned.current) return;
        isRunned.current = true;

        async function createSession() {

            setLoading(true);
            setTipoColonia([]);

            const modelCodigoPostal = {
                cp: codigoPostal
            }

            const response = await getCodigoPostalCpt_Jumio(modelCodigoPostal);

            if (response.status === 200) {
                setEdo(response.listRest[0].nomestado);
                setMuni(response.listRest[0].municipio);
                setTipoColonia(response.listRest);
            } else {
                setTipoColonia([]);
            }

            setLoading(false);

        }

        createSession();

    }, []);

    const fnFetCodigoPostalCpt = async (cpCod) => {

        setTipoColonia([]);

        const modelCodigoPostal = {
            cp: cpCod
        }

        const response = await getCodigoPostalCpt_Jumio(modelCodigoPostal);
        if (response.status === 200) {
            setEdo(response.listRest[0].nomestado);
            setMuni(response.listRest[0].municipio);
            setTipoColonia(response.listRest);
        } else {
            setTipoColonia([]);
        }

    }

    const handkeOnKeyDown = async (event) => {
        if (
            event.code === "Enter" ||
            event.code === "NumpadEnter" ||
            event.keyCode === 13
        ) {

            fnFetCodigoPostalCpt(codigoPostal);
        }
    };

    const handleChange = (event) => {
        if (event.target.value.length <= 5) {
            setCodigoPostal(event.target.value);
        }

        if (event.target.value.length === 5) {
            fnFetCodigoPostalCpt(event.target.value);
        }
    };

    const handleChangeLic = async (selectedOption) => {
        const setSelectedOption = selectedOption.tipoColonia;
        setColonia(selectedOption.asentamiento);
    };

    const getContinue = async () => {

        setShowHeader(false);
        /**1.- Construye la direción con base a los datos ingresados por el usuario */
        const direccion = "" + calle + " " + numExterior + ", " + colonia + ", " + muni + ", " + codigoPostal + ", " + edo;

        const objCons = {
            direccion: direccion
        }

        const geolocalizacion = await getPointCoordenadas_Jumio(objCons);

        /** 3.- Obtiene las coordenadas de la dirección */

        if (geolocalizacion.status === 200) {

            const latitud_obtenida = geolocalizacion.latitud;
            const longitud_obtenida = geolocalizacion.longitud;

            sessionStorage.setItem("cpDom", codigoPostal);
            sessionStorage.setItem("coloniaDom", colonia);
            sessionStorage.setItem("calleDom", calle);
            sessionStorage.setItem("numExtDom", numExterior);
            sessionStorage.setItem("numInteDom", numInterior);
            sessionStorage.setItem("edoDom", edo);
            sessionStorage.setItem("muniDom", muni);
            sessionStorage.setItem("latitud", latitud);
            sessionStorage.setItem("longitud", longitud);
            sessionStorage.setItem("latitud_obtenida", latitud_obtenida);
            sessionStorage.setItem("longitud_obtenida", longitud_obtenida);

            router.push("/validarubicacion");

        } else {

            setShow(true);
            setShowStatus(geolocalizacion.status);
            setShowMessage(geolocalizacion.message);

        }
    };

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
                ? '#0078ff26'
                : state.isFocused
                    ? '#f1f1f1'
                    : 'white',
            color: '#333',
            cursor: 'pointer',
        }),
        singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }),
    };

    const getRein = async () => {

        router.push('/dirrefpersonal');
    };

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">

                <div className="containerRenderForm onContentExpands">
                    <div className="containerInfo_P2Form">
                        <div className="containerIdent_P2 scrollDataPersonal">

                            {loading ? (
                                <div className="spinner"></div>
                            ) : (

                                <div className="animate__animated animate__fadeIn heigthData1">
                                    <div className="txtOp_P2">Domicilio Personal</div>
                                    <div className="subTitle">Dirección laboral o donde normalmente despeña su actividad diaria.</div>
                                    <hr className="separadorLine" />
                                    <div>
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
                                                <div>
                                                    <Select
                                                        styles={style}
                                                        className="select-wrapper"
                                                        classNamePrefix="select"
                                                        placeholder="Selecciona la colonia"
                                                        options={tipoColonia}
                                                        value={tipoColonia.asentamiento}
                                                        onChange={handleChangeLic}
                                                        formatOptionLabel={tipoColonia => (
                                                            <div className="containerEmisor">
                                                                <>
                                                                    <div className="licenciaValue">{tipoColonia.asentamiento}</div>
                                                                </>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div />
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
                                            <div className="contenedorNum ">
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
                                                    <div className="inputWrap">
                                                        <div className="txtSubtitle">Interior:</div>
                                                        <input
                                                            type="text"
                                                            value={numInterior}
                                                            onChange={(event) => setnumInterior(event.target.value)}
                                                            className="spaceLeft"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <hr className="line" />
                                    <div className='btnContinue'>
                                        {!blContinue ? (
                                            <>
                                                <button className='btnVer_P3'>
                                                    <span className='txtVer_P3'>Mapear</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
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
                                            </>
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
