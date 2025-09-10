'use client'

import React, { useEffect, useState } from 'react'
import { JumioSdkComponent } from "@jumio/websdk";
import { useRef } from 'react';
import { ApiJumioRetrieval } from '../Api/ApiJumioRetrieval';
import { useAppContext } from '@/app/context/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';

const JumioComponent = ({ token }) => {

  const { IdJumio } = useAppContext()
  const jumioRef = useRef(null);
  const router = useRouter();
  const { tokenJumio } = useAppContext();
  const [cpv, setCpv] = useState('');
  const { cpvI } = useAppContext();

  useEffect(() => {

    const handleStatus = async (event) => {

      router.push('/requerimientoselfie');

    }

    if (jumioRef.current) {
      //  jumioRef.current.innerHTML= template;
      jumioRef.current.addEventListener('workflow:success', handleStatus);
    }
  }, [jumioRef]);

  return (
    <div className='h-screen lel'>

      <jumio-sdk dc="us" locale='es' token={token} ref={jumioRef}>
      </jumio-sdk>

    </div>
  )
}

export default JumioComponent
