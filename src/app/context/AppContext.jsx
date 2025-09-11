'use client'

import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
const AppContext = createContext()
// This context will be used to share state across the application
// such as Jumio ID, CPV, CURP validation, country, and token
export const AppProvider = ({ children }) => {
    const [IdJumio, setIdJumio] = useState('')
    const [cpvI, setCpvI] = useState('')
    const [curpValidate, setCurpValidate] = useState('')
    const [pais, setPais] = useState('')
    const [paisIso2, setPaisIso2] = useState('')
    const [tokenJumio, setTokenJumio] = useState('')
    const [rutaBack, setRutaBack] = useState('')
    const [Title, setTitle] = useState('Enrolamiento')
    const [interName, setInterName] = useState('Autenticación Personal')

    useEffect(() => {
        if(sessionStorage.getItem('Title')){
            setTitle(sessionStorage.getItem('Title'))
        }
        if(sessionStorage.getItem('interName')){
            setInterName(sessionStorage.getItem('interName'))
        }
    }, [])

    return (
        <AppContext.Provider value={{ IdJumio, setIdJumio, cpvI, setCpvI, curpValidate, setCurpValidate, pais, setPais, paisIso2, setPaisIso2, tokenJumio, setTokenJumio, rutaBack, setRutaBack, Title, setTitle, interName, setInterName }}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext)
}