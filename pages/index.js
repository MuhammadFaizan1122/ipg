import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head'
// import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { fsDb } from '../config/firebase';

export default function Home() {
  const router = useRouter()
  const memberCollectionRef = collection(fsDb, "members")
  const [members, setMembers] = useState([])
  const [activeMembers, setActiveMembers] = useState([])
  const [inactiveMembers, setInactiveMembers] = useState([])
  const [expired, setExpired] = useState([])
  useEffect(() => {
    const loginCheck = localStorage.getItem('logedIn');
    if (loginCheck == undefined) {
      router.push('/login')
    }
    const getting = async () => {
      const data = await getDocs(memberCollectionRef)
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      let positive_array = list?.filter(function (value) {
        return value.member_status == "active";
      });
      let negative_array = list?.filter(function (value) {
        return value.member_status == "inactive";
      });
      setActiveMembers(positive_array)
      setInactiveMembers(negative_array)
      setMembers(list)

      let currentDay = new Date().getDate()
      let currentMonth = new Date().getMonth()

      let filter = list.filter(data => {
        let day = new Date(data.pay_date).getDate()
        let month = new Date(data.pay_date).getMonth()
        return currentDay > day && currentMonth > month
      })
      setExpired(filter)
      return filter
    }
    getting()
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
                <p className='text-[40px] text-black text-center font-semibold my-2'>{members?.length}</p>
              </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[pink]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Active Member</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>{activeMembers?.length}</p>
            </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[#ffcb04]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Inactive Member</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>{inactiveMembers?.length}</p>
            </div>
            </div>
            <div className='shadow-xl h-40 mx-4 rounded-2xl bg-[#EDFF71]  flex justify-center items-center my-2'><div>
              <p className='text-[20px] text-black text-center font-semibold my-2'>Total Expired Memberships</p>
              <p className='text-[40px] text-black text-center font-semibold my-2'>{expired.length}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
