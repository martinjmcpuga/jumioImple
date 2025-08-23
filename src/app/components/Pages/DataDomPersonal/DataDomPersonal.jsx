'use client'

import React from "react";
import { useEffect, useRef, useState } from "react";
import { getCodigoPostalCpt_Jumio } from "../../Api/getCodigoPostalCpt_Jumio";
import { getPointCoordenadas_Jumio } from "../../Api/getPointCoordenadas_Jumio";
import { useRouter } from 'next/navigation';
import "./styleDomPersonal.css";
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

    const handleCloseError = async () => {
        setShow(false);
        /*
          navigate("/AppIncodeDocument", {
              state: {
                  rutaContinue: "/DataDomPersonal",
              }
          });
          */
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

            const params = {
                cpRef: codigoPostal,
                coloniaRef: colonia,
                calleRef: calle,
                numExtRef: numExterior,
                numInteRef: numInterior,
                edoRef: edo,
                muniRef: muni,
                latitud_obtenida: latitud_obtenida,
                longitud_obtenida: longitud_obtenida
            };

            const queryString = new URLSearchParams(params).toString();
            router.push(`/validarubicacion?${queryString}`);

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
        })
    };

    const getRein = async () => {

        router.push('/dirrefpersonal');
    };

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">

                <div className="containerRenderForm">
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

        </>
    );
}

export default DataDomPersonal;
