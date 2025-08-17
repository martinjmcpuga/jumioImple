'use client';

import React, { useState, Fragment, useEffect } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image';
import './ModalMain.css'; // Ensure you have the correct path to your CSS file

export default function MyVerticallyCenteredModal({ modalShow, onHide }) {


    const [onehabilita, setOnehabilita] = useState(true);


  return (
  <>

      <Dialog open={modalShow}  onClose={() => {}} className=" relative z-50 fade animate__animated animate__fadeIn modal show">
        <div className="fixed inset-0 flex items-center justify-center p-4 ModalMain__shadow">
        <DialogPanel className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl space-y-4">
          <DialogTitle className="text-lg font-medium text-gray-900">
            Uso de Cookies
            
          <div className='line_P2'/>
          </DialogTitle>


          <Description as="div" className="text-sm text-gray-500 space-y-2">
            <p>
              Sistema de Confiabilidad DPR SAPI, requiere el consentimiento del Uso de Cookies de todos los Usuarios de esta Aplicación Web. Las cookies son pequeños fragmentos de texto que nuestra Aplicación Web envía al navegador; permiten que las operaciones realizadas por el Usuario recuerden información sobre la sesión, lo que facilita verificaciones con fuentes externas y hace la experiencia más ágil.
            </p>
            <p>
              Otras tecnologías, como identificadores únicos, geolocalización, píxeles y almacenamiento local, también se pueden usar para estos fines.
            </p>
          </Description>

          <div className="flex flex-col space-y-3">
            <button
              className={`buttonCookies_P1 flex items-center ${onehabilita ? 'buttonEnabled' : ''}`}
              onClick={() => setOnehabilita(!onehabilita)}
            >
              <Image
                src={onehabilita ? '/assets/ok_default.svg' : '/assets/ok_done.svg'}
                alt="checkbox"
                width={24}
                height={24}
              />
              <span className="ml-2 txtCookies_P1">Aceptar Uso de Cookies</span>
            </button>

            <button
              onClick={()=>onHide()}
              disabled={onehabilita}
              className={`buttonModal_P1 py-2 rounded ${
                onehabilita ? 'opacity-50 cursor-not-allowed' : 'buttonModal_P1'
              }`}
            >
              <span className={onehabilita ? 'txtButtonModal_disable' : 'txtButtonModal_P1'} >
                Confirmar
              </span>
            </button>
          </div>

          <div className="text-xs text-gray-500 bg-[#f1f8fd] w-full p-2 rounded-lg">
            IMPORTANTE: Consulte nuestro{' '}
            <a 
              href="https://midpr.net/cookies.php"
              target="_blank"
              rel="noopener noreferrer"
              className="underline txtCookiesFooorter_P1"
            >
              Uso de Cookies
            </a>{' '}
            para más detalles sobre la recolección y uso de datos.
          </div>
        </DialogPanel>
      </div>
      </Dialog>
   
  </>
  );
}
