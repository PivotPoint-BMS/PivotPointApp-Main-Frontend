import type { NextPage } from 'next'
import Head from 'next/head'
import SideBar from '../components/SideBar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pivot Point BMS</title>
      </Head>

      <SideBar />
    </>
  )
}

export default Home
