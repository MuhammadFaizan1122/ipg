import React, { useEffect, useState } from 'react'
import Edit from './Components/Edit'
import { MdDeleteOutline } from "react-icons/md"
import { collection, getDocs } from "firebase/firestore"
import { fsDb } from "../config/firebase";

export default function Memberships() {
    const memberCollectionRef = collection(fsDb, "members")
    const [member, setMember] = useState([])

    // Data Fetching 

    useEffect(() => {
        const getting = async () => {
            const data = await getDocs(memberCollectionRef)
            const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setMember(list)
        }
        getting()
    }, [])
    function Paid(member) {
        let currentDay = new Date().getDate()
        let currentMonth = new Date().getMonth()

        let filter = member.filter(data => {
            let day = new Date(data.pay_date).getDate()
            let month = new Date(data.pay_date).getMonth()
            console.log(month)
            console.log(currentMonth)
            return currentDay <= day && currentMonth > month
        })
        return filter
    }

    return (
        <div className='w-[95%] mt-4 mx-auto'>
            <div className='border-b-[2px] border-[#ffcb04]'>
                <h2 className='text-2xl p-2'>Charged Memberships</h2>
            </div>
            <div className='bg-[#ffcb043b] py-4 rounded flex'>
                <div className='font-semibold truncate h-6 w-[5%] text-center sm:hidden'>S/N</div>
                <div className='font-semibold truncate h-6 w-[5%] sm:hidden sm:pl-2'>Img</div>
                <div className='font-semibold truncate h-6 w-[20%] sm:w-[50%] sm:pl-2'>Name</div>
                <div className='font-semibold truncate h-6 w-[20%] sm:hidden'>Father Name</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Status</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[20%]'>Number</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Date</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Edit</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Delete</div>
            </div>
            <div className='w-[100%] my-2 mb-10'>
                {
                    Paid(member).map((item, index) => {
                        return (
                            <div className='border-b-[1px] flex items-center' key={index}>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[5%] text-center sm:hidden'>{index + 1}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[5%] sm:hidden'>
                                    <img src="/profile.png" className='w-[40px] h-[40px]' alt="" />
                                </div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[20%] sm:w-[50%] sm:pl-2'>{item.member_name}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[20%] sm:hidden'>{item.member_father}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.member_status}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[20%] text-center'>{item.member_num}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.joining_date}</div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><Edit item={item} /></div>
                                <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><button className='bg-[red] hover:bg-[#ff00001a] hover:text-[red] border-[2px] duration-200 border-[red] px-4 sm:px-2 rounded text-white'><span className='hidden sm:block text-white'><MdDeleteOutline /></span> <span className='sm:hidden'>Delete</span></button></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
