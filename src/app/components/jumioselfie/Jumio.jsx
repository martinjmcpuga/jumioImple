'use client'

import { Suspense, use, useEffect, useState } from 'react';
import { useRef } from 'react';
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'
import dynamic from 'next/dynamic'
import { JumioAccountCreation } from '../Api/jumioAccountCreation'
import { getTokenJumio10085 } from '../Api/getTokenJumio10085'
import { useSearchParams } from 'next/navigation'
import { useAppContext } from '../../context/AppContext'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {

  const isRunned = useRef(false);
  const [sdkToken, setSdkToken] = useState('')
  const searchParams = useSearchParams()
  //const { setIdJumioSelfie } = useAppContext()
  const { cpvI } = useAppContext()
  const { tokenJumio } = useAppContext()


  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    async function createSession() {
      const obj = {
        cpv: localStorage.getItem('sCpv')
      };
      const tokenData = await getTokenJumio10085(obj)
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
