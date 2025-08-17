'use client'

import { Suspense, use, useEffect, useState } from 'react'
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'
import dynamic from 'next/dynamic'
import { JumioAccountCreation } from '../Api/jumioAccountCreation'
import { getTokenJumio10085 } from '../Api/getTokenJumio10085'
import { useSearchParams } from 'next/navigation'
import { useAppContext } from '../../context/AppContext'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {
  const [sdkToken, setSdkToken] = useState('')
  const searchParams = useSearchParams()
  //const { setIdJumioSelfie } = useAppContext()
  const { cpvI } = useAppContext()
  const { tokenJumio } = useAppContext()

  useEffect(() => {
    const cpv = localStorage.getItem('sCpv');
    if (!cpv) {
      console.error('No cpv found in search params')
      return
    }
    const fetchSdkToken = async () => {

      const obj = {
        cpv: localStorage.getItem('sCpv')
      };

      if (tokenJumio) {
        setSdkToken(tokenJumio)
        return
      }
      try {
        const tokenData = await getTokenJumio10085(obj)
        if (!tokenData || !tokenData.sdk || !tokenData.sdk.token) {
          throw new Error('Invalid token data received')

        } else {
          // setIdJumioSelfie(tokenData.idJumioSelfie)
          setSdkToken(tokenData.sdk.token)
        }


      } catch (error) {
        alert('Error generating Jumio SDK token:', error)
      }
    }

    fetchSdkToken()
  }, [])

  if (!sdkToken) return <p>Loading Jumio...</p>

  return (
    <Suspense fallback={<div>Loading Jumio Component...</div>}>
      <JumioComponent token={sdkToken} />
    </Suspense>
  )
}
