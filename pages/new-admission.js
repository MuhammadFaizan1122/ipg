import React, { useState } from 'react'
import { db, fsDb } from "../config/firebase";
import { storage } from "../config/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"

export default function NewAdmission() {
    const [name, setName] = useState()
    const [father, setFather] = useState()
    const [num, setNum] = useState()
    const [date, setDate] = useState()
    const [fees, setFees] = useState()
    const [CNIC, setCNIC] = useState()
    const [address, setAddress] = useState()

    const memberCollectionRef = collection(fsDb, "members")

    const handleMember = async () => {
        await addDoc(memberCollectionRef, {
            member_name: name,
            member_father: father,
            member_num: num,
            joining_date: date,
            member_fees: fees,
            member_cnic: CNIC,
            member_address: address,
        })
    }
    return (
        <div className='w-[95%] mt-4 mx-auto'>
            <div className='border-b-[2px] border-[#ffcb04]'>
                <h2 className='text-2xl p-2'>New Admission</h2>
            </div>
            <div className='my-2'>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Name *</label><br />
                        <input type="text" alt="" onChange={(e) => setName(e.target.value)} className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Father Name  </label><br />
                        <input type="text" alt="" onChange={(e) => setFather(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Phone Number *</label><br />
                        <input type="text" alt="" onChange={(e) => setNum(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Joining Date *</label><br />
                        <input type="text" alt="" onChange={(e) => setDate(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Advance Fees *</label><br />
                        <input type="text" alt="" onChange={(e) => setFees(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter CNIC *</label><br />
                        <input type="text" alt="" onChange={(e) => setCNIC(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                    </div>
                </div>
                <div className='w-[100%] my-4'>
                    <label className='w-[15%] py-2'>Enter Address *</label><br />
                    <input type="text" alt="" onChange={(e) => setAddress(e.target.value)} className='outline-none p-2 w-[97.5%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                </div>
            </div>
            <button onClick={() => handleMember()} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] p-2 rounded text-white float-right  m-4'>Add Member</button>
        </div>
    )
}
