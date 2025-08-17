'use client'

import { Suspense, use, useEffect, useState } from 'react'
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'

import dynamic from 'next/dynamic'
import { JumioAccountCreation } from '../Api/jumioAccountCreation'
import { FetchAccAWS } from '../Api/FetchAccAWS'
import { useSearchParams } from 'next/navigation'
import { useAppContext } from '../../context/AppContext'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {
  const [sdkToken, setSdkToken] = useState('')
  const searchParams = useSearchParams()
  const { setIdJumio } = useAppContext()
  const { cpvI } = useAppContext()
  const { tokenJumio } = useAppContext()

  useEffect(() => {
    const cpv = localStorage.getItem('sCpv') || cpvI
    if (!cpv) {
      console.error('No cpv found in search params')
      return
    }
    const fetchSdkToken = async () => {
      if (tokenJumio) {
        setSdkToken(tokenJumio)
        return
      }
      try {
        const tokenData = await FetchAccAWS(cpv)
        if (!tokenData || !tokenData.sdk || !tokenData.sdk.token || !tokenData.idJumio) {
          throw new Error('Invalid token data received')
          
        }else{
        setIdJumio(tokenData.idJumio)  
        setSdkToken(tokenData.sdk.token)
        }


      } catch (error) {
        alert('Error generating Jumio SDK token:', error)
      }
    }

    fetchSdkToken()
  }, [])

  if (!sdkToken) return <p>Loading Jumio...</p>

  return(
    <Suspense fallback={<div>Loading Jumio Component...</div>}>
      <JumioComponent token={sdkToken} />
    </Suspense>
  )
}
