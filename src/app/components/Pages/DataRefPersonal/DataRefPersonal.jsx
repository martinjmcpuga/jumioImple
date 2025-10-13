'use client'

import React from "react";
import { useEffect, useRef, useState } from "react";
import { getCodigoPostalCpt_Jumio } from "../../Api/getCodigoPostalCpt_Jumio";
import { getPointCoordenadas_Jumio } from "../../Api/getPointCoordenadas_Jumio";
import { useRouter } from 'next/navigation';
import "./styleDomPersonal.css";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataRefPersonal = () => {

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
    const [selectedColoniaOption, setSelectedColoniaOption] = useState(null);
    const [blContinue, setBlContinue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [show, setShow] = useState(false);
    const [showStatus, setShowStatus] = useState(null);
    const [showMessage, setShowMessage] = useState('');

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (codigoPostal !== "" && calle !== "" && numExterior !== "" && tipoColonia.length > 0 && colonia !== "") {
            setBlContinue(true);
            setShowHeader(true);
        } else {
            setBlContinue(false);
        }
    }, [codigoPostal, calle, numExterior, tipoColonia, colonia]);

    useEffect(() => {
        // Lógica omitida para limpieza de código.
    }, []);

    const fnFetCodigoPostalCpt = async (cpCod) => {
        setTipoColonia([]);
        setSelectedColoniaOption(null);

        const modelCodigoPostal = {
            cp: cpCod
        }

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
        const value = event.target.value;
        if (value.length <= 5) {
            setCodigoPostal(value);

            if (value.length < 5) {
                setColonia("");
                setSelectedColoniaOption(null);
                setTipoColonia([]);
            }
        }

        if (value.length === 5) {
            fnFetCodigoPostalCpt(value);
        }
    };

    const handleChangeLic = (selectedOption) => {
        setSelectedColoniaOption(selectedOption);
        if (selectedOption) {
            setColonia(selectedOption.asentamiento);
        } else {
            setColonia("");
        }
    };

    const getContinue = async () => {
        setShowHeader(false);
        const direccion = "" + calle + " " + numExterior + ", " + colonia + ", " + muni + ", " + codigoPostal + ", " + edo;

        const objCons = {
            direccion: direccion
        }

        const geolocalizacion = await getPointCoordenadas_Jumio(objCons);

        if (geolocalizacion.status === 200) {

            const latitud_obtenida = geolocalizacion.latitud;
            const longitud_obtenida = geolocalizacion.longitud;

            sessionStorage.setItem("cpRef", codigoPostal);
            sessionStorage.setItem("coloniaRef", colonia);
            sessionStorage.setItem("calleRef", calle);
            sessionStorage.setItem("numExtRef", numExterior);
            sessionStorage.setItem("numInteRef", numInterior);
            sessionStorage.setItem("edoRef", edo);
            sessionStorage.setItem("muniRef", muni);
            sessionStorage.setItem("latitud_obtenidaRef", latitud_obtenida);
            sessionStorage.setItem("longitud_obtenidaRef", longitud_obtenida);
            router.push("/validarubicacionreferencia");

        } else {

            setShow(true);
            setShowStatus(geolocalizacion.status);
            setShowMessage(geolocalizacion.message);

        }
    };

    const style = {
        control: base => ({
            ...base,
            height: "52px !important",
            borderRadius: "0.375rem !important",
            boxShadow: "none !important",
            borderColor: "#c4cbd1 !important",
            "&:hover": {
                borderColor: "#c4cbd1 !important"
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#0078ff26' : 'white',
            color: '#333',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#f1f1f1',
            }
        }),
    };

    const getRein = async () => {

        router.push('/dirrefpersonal');
    };

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">

                <div className="containerRenderForm">
                    <div className="containerInfo_P2Form">
                        <div className="containerIdent_P2">

                            {loading ? (
                                <div className="spinner"></div>
                            ) : (

                                <div className="animate__animated animate__fadeIn heigthData1">
                                    <div className="txtOp_P2">Dirección de referencia 1</div>
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
                                                        value={selectedColoniaOption}
                                                        getOptionValue={(option) => option.asentamiento}
                                                        getOptionLabel={(option) => option.asentamiento}
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
                                                {/* ✨ AJUSTE DE ESTRUCTURA: Eliminado div 'inputWrap' redundante */}
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
                        <img src="assets/foodbrand@2x.png" className="imgFooter_P2" alt="Food Brand" />
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

export default DataRefPersonal;