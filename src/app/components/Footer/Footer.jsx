'use client'

import { Button } from '@headlessui/react';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

const Footer = ({direction,enabled}) => {

      const [validateCurpCpv, setValidateCurpCpv] = useState(true);

        const onTest = async () => {
    
  };

    const onValidateFaceMach = async () => {


  };


  return (
    <footer className='footer'>
      <div >
        <div className="containerCont_P2">
        {enabled ? 
          (validateCurpCpv ? (
            <Link href={direction} className='buttonExpandsBase'>
              <Button href={direction} className=" button_P2 buttonExpandsBase py-1.5  hover:scale-90 duration-150" onClick={onTest}>
                <span className="txtButton_P2">Confirmar</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href={direction} className="button_P2 buttonExpandsBase hover:scale-110" onClick={onValidateFaceMach}>
                <span className="txtButton_P2">Confirmar</span>
              </Link>
            </>
          ))
        : (
          <>
            <br />
          </>
        )}
        </div>
        <div className="imageContainer_P2 py-1">
          <img src='/assets/foodbrand@2x.png' className="imgFooter_P2" />
        </div>
      </div>
    </footer>
  )
}

export default Footer