'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '../../Footer/Footer'
import { useAppContext } from '../../../context/AppContext'
import Select from 'react-select'
import './documentos.css'

const Documentos = () => {
  const { cpvI } = useAppContext()
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [isMounted, setIsMounted] = useState(false) // Evita el hydration mismatch
  const { setCpvI } = useAppContext() // aquí lo traes

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const opciones = [
    { value: 'credencial', label: 'Credencial para votar' },
    { value: 'pasaporte', label: 'Pasaporte' }
  ]

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#c4cbd1',
      minHeight: '48px',
      padding: '0 4px',
      boxShadow: 'none',
      '&:hover': { borderColor: '#c4cbd1' }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#C1C1C1'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#C1C1C1'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px'
    })
  }

  if (!isMounted) {
    return null // Evita renderizar en el servidor
  }

  return (
    <main className="containerRender onContentExpands animate__animated animate__fadeIn">
      <section className="containerInfo_P2">
        <div className="containerIdent_P2 onContentExpands">
          <p className="txtDocumentos">Documento de Identificación</p>
          <br />

        <Select
            options={opciones}
            onChange={(option) => {
                setSelectedDoc(option)
                setCpvI(option.value) // Guardar en el contexto
            }}
            styles={customStyles}
            placeholder="Seleccionar"
        />

          <br />
          <hr className="line" />

          <section className="containerButtonOnExpands_P2" style={{ marginTop: '2rem' }}>
            <div className="btnContinue">
                 {!selectedDoc  ? (
                  <button className="btnVer_P3" disabled>
                    <span className="txtVer_P3">Continuar</span>
                  </button>
                ) : (
              <Link href={selectedDoc ? '/infocredencial' : '#'} passHref>
                <button
                  className="button_P2"
                  disabled={!selectedDoc}
                  style={{
                    opacity: selectedDoc ? 1 : 0.6,
                    cursor: selectedDoc ? 'pointer' : 'not-allowed'
                  }}
                >
                  <span className="txtButton_P2">Continuar</span>
                </button>
              </Link>
              )}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Documentos
