import Head from 'next/head'
import React from 'react'

export default function index() {
  return (
    <>
      <Head>
        <title>Inventory Management | Pivot Point BMS</title>
      </Head>
      <div className='flex h-full items-center justify-center'>
        <h1 className='text-2xl font-medium'>Product/Service</h1>
      </div>
    </>
  )
}
