import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const loginCheck = localStorage.getItem('logedIn');
    if (loginCheck == undefined) {
      router.push('/login')
    }
  }, [])

  return (
    <div className=''>
      <Head>
        <title>Iron Power Gym</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-[100%] bg-[#fff] overflow-hidden'>
        <div className='mt-10 text-[#ffcb04]'>
          <p className='text-[32px] text-black mb-2 px-4 hidden sm:block'>Dashboard</p>
          <div className='mx-auto w-[100%] mb-10  rounded-2xl overflow-hidden'>
            <img src="/Gym-2-Banner.jpg" alt="" className='w-[100%] px-4 rounded-2xl' />
          </div>
          <div className='grid grid-cols-4 sm:grid-cols-2'>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[lightGreen] flex justify-center items-center my-2'>
              <div>
                <p className='text-[20px] text-black text-center font-semibold my-2'>Total Member</p>
                <p className='text-[40px] text-black text-center font-semibold my-2'>5000</p>
              </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[pink]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Active Member</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>5000</p>
            </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[#ffcb04]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Inactive Member</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>5000</p>
            </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[#EDFF71]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Total Expired Memberships</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>5000</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
