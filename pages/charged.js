import React, { useEffect, useState } from 'react'
import Edit from './Components/Edit'
import { MdDeleteOutline } from "react-icons/md"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { fsDb } from "../config/firebase";

export default function Memberships() {
    const memberCollectionRef = collection(fsDb, "members")
    const [member, setMember] = useState([])
    const [loading, setLoading] = useState(true)

    // Data Fetching 

    useEffect(() => {
        const getting = async () => {
            const data = await getDocs(memberCollectionRef)
            const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setMember(list)
            setLoading(false)
        }
        getting()
    }, [])
    function Paid(member) {
        let currentDay = new Date().getDate()
        let currentMonth = new Date().getMonth()
        let currentYear = new Date().getFullYear()

        let filter = member.filter(data => {
            let day = new Date(data.pay_date).getDate()
            let month = new Date(data.pay_date).getMonth()
            let year = new Date(data.pay_date).getFullYear()
            return currentDay <= day && currentMonth >= month && currentYear == year || currentMonth == 0 && currentYear > year ? currentDay <= day && month == 11 : ''
        })
        return filter
    }

    // Delete member 
    const handleDelete = async (item) => {
        const userDoc = doc(fsDb, "members", item)
        await deleteDoc(userDoc)
    }
    return (
        <div className='w-[95%] mt-4 mx-auto'>
            <div className='border-b-[2px] border-[#ffcb04]'>
                <h2 className='text-2xl p-2'>Charged Memberships</h2>
            </div>
            <div className='bg-[#ffcb043b] py-4 rounded flex'>
                <div className='font-semibold truncate h-6 w-[4%] text-center sm:hidden'>S/N</div>
                <div className='font-semibold truncate h-6 w-[4%] sm:hidden sm:pl-2'>Img</div>
                <div className='font-semibold truncate h-6 w-[22%] sm:w-[50%] sm:pl-2'>Name</div>
                <div className='font-semibold truncate h-6 w-[20%] sm:hidden'>Father Name</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Status</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[20%]'>Number</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Date</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Edit</div>
                <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Delete</div>
            </div>
            <div className='w-[100%] my-2 mb-10'>
                {loading ?
                    <div className='text-center mt-10 mx-auto w-[100%]'>
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div> :
                    Paid(member).length == 0 ?
                        <div className='text-center mt-10 mx-auto w-[100%]'>
                            <div class="text-[22px]">No Data Found</div>
                        </div> :
                        Paid(member).map((item, index) => {
                            return (
                                <div className='border-b-[1px] flex items-center' key={index}>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[2%] text-center sm:hidden'>{index + 1}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[6%] h-[60px] sm:hidden'>
                                        <img src={item.member_image != undefined ? item.member_image : "/profile.jpg"} className='w-auto mx-auto h-[100%]' alt="" />
                                    </div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[22%] sm:w-[50%] sm:pl-2'>{item.member_name}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[20%] sm:hidden'>{item.member_father}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.member_status}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[20%] text-center'>{item.member_num}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.joining_date}</div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><Edit item={item} /></div>
                                    <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><button onClick={() => handleDelete(item.id)} className='bg-[red] hover:bg-[#ff00001a] hover:text-[red] border-[2px] duration-200 border-[red] px-4 sm:px-2 rounded text-white'><span className='hidden sm:block text-white'><MdDeleteOutline /></span> <span className='sm:hidden'>Delete</span></button></div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}
