import React from 'react'
export default function NewAdmission() {
    return (
        <div className='w-[95%] mt-4 mx-auto'>
            <div className='border-b-[2px] border-[#ffcb04]'>
                <h2 className='text-2xl p-2'>New Admission</h2>
            </div>
            <div className='my-2'>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Name *</label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Father Name  </label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Phone Number *</label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Joining Date *</label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Advance Fees *</label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter CNIC *</label><br />
                        <input type="text" alt="" className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                    </div>
                </div>
                <div className='w-[100%] my-4'>
                    <label className='w-[15%] py-2'>Enter Address *</label><br />
                    <input type="text" alt="" className='outline-none p-2 w-[97.5%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                </div>
            </div>
            <button className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] p-2 rounded text-white float-right  m-4'>Add Member</button>    
        </div>
    )
}
