'use client'
import React, { useState, useRef } from "react";
import options from './options.json';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import "./styleDomPersonal.css";
import { useRouter } from 'next/navigation';

function ComprobanteDomPersonal() {
    
    const isRunned = useRef(false);
    const router = useRouter();
    const [blContinue, setBlContinue] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const onTest = async () => {

        router.push('/uploadcomprobante');

    };

    const handleSelectChange = (selectedOption) => {

        setSelectedOption(selectedOption);

        setBlContinue(true);

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

    return (
        <>
            <div className="initBack_P2 animate__animated animate__fadeIn">

                <div className="containerRender">
                    <div className="containerInfo_P2">
                        <div className="containerIdent_P2">
                            <div className="txtOp_P2">Domicilio Personal</div>
                            <div className="subTitle">Dirección donde normalmente reside o pernocta.</div>
                            <hr className="separadorLine" />
                            <div>
                                <span className="txtSubtitle">Comprabante de domicilio</span>
                                <div>
                                    <Select
                                        styles={style}
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        options={options.map((option) => ({ value: option.value, label: option.label }))}
                                        placeholder="Selecciona el Comprobante"
                                    />
                                </div>
                            </div>
                            <hr className="lineSimple" />
                            <div className='btnContinue'>
                                {!blContinue ? (
                                    <>
                                        <button className='btnVer_P3'>
                                            <span className='txtVer_P3'>Continuar</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className='button_P2 animate__animated animate__fadeIn' onClick={onTest}>
                                            <span className='txtButton_P2'>Continuar</span>
                                        </button>
                                    </>
                                )}
                            </div>
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

export default ComprobanteDomPersonal;
