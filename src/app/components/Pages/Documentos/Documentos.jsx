'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Footer from '../../Footer/Footer'
import { useAppContext } from '../../../context/AppContext'
import './paises.css'
import { getDocumentoByPais } from '../../Api/getDocumentoByPais'
import dynamic from 'next/dynamic'
import { components } from 'react-select'

const Select = dynamic(() => import('react-select'), { ssr: false });

const Documentos = () => {
  const { setCpvI, setRutaBack } = useAppContext()

  const [identificacion, setIdentificacion] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const isRunned = useRef(false)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [showStatus, setShowStatus] = useState(null)
  const [showMessage, setShowMessage] = useState("")

  useEffect(() => {
    setRutaBack('/paises')
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isRunned.current) return
    isRunned.current = true

    async function fetchDocs() {
      setLoading(true)
      const objIncode = { pais: sessionStorage.getItem("paisIso2") }
      const response = await getDocumentoByPais(objIncode)

      if (response.status === 200) {
        setIdentificacion(response.listModelDocumentoPais)
      } else {
        setShow(true)
        setShowStatus("Error " + response.status)
        setShowMessage(response.message)
      }
      setLoading(false)
    }

    fetchDocs()
  }, [])

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 52,
      borderRadius: 4,
      boxShadow: 'none',
      borderColor: '#c4cbd1',
      '&:hover': { borderColor: '#c4cbd1' },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#0078ff26'
        : state.isFocused ? '#f1f1f1'
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
  }

  // 🔹 Componente para mostrar opciones en el dropdown
  const Option = (props) => (
    <components.Option {...props}>
      <div className="documentos__option">
        <span className="documentos__option-text">{props.data.descripcionTexto}</span>
      </div>
    </components.Option>
  )

  // 🔹 Componente para mostrar el valor seleccionado
  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="documentos__option">
        <span className="documentos__option-text">{props.data.descripcionTexto}</span>
      </div>
    </components.SingleValue>
  )

  const handleChange = (option) => {
    setSelectedOption(option)
    sessionStorage.setItem("idDocPais", option.id)

    if (option.valorAppIncode === '0' || option.valorAppIncode === '2') {
      setCpvI("credencial")
    } else if (option.valorAppIncode === '1') {
      setCpvI("pasaporte")
    }
  }

  return (
    <>
      <div className="documentos animate__animated animate__fadeIn">
        <div className="documentos__content onContentExpands">
          <p className="documentos__title">Documento de Identificación</p>

          {isMounted && (
            <Select
              styles={customStyles}
              options={identificacion}
              onChange={handleChange}
              value={selectedOption}
              components={{ Option, SingleValue }}
              placeholder="Seleccionar documento"
              getOptionLabel={(e) => e.descripcionTexto}
              getOptionValue={(e) => e.id}
            />
          )}

          <hr className="documentos__divider" />

          <div className="documentos__actions">
            {!selectedOption ? (
              <button className="documentos__btn documentos__btn--disabled" disabled>
                Continuar
              </button>
            ) : (
              <Link href="/infocredencial" passHref>
                <button className="documentos__btn">
                  Continuar
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Documentos
