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

  const isRunned = useRef(false);
  const [sdkToken, setSdkToken] = useState('')
  const searchParams = useSearchParams()
  const { setIdJumio } = useAppContext()
  const { cpvI } = useAppContext()
  const { tokenJumio } = useAppContext()

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {
      const obj = {
        cpv: localStorage.getItem('sCpv'),
        documentType: cpvI
      };
      const tokenData = await getTokenJumio10085(obj)
      setIdJumio(tokenData.idJumio)
      setSdkToken(tokenData.sdk.token)
    }

    createSession();
  }, []);



  return (
    <Suspense fallback={<div>Loading Jumio Component...</div>}>
      <JumioComponent token={sdkToken} />
    </Suspense>
  )
}
