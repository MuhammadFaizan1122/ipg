import React, { useState } from 'react'
import { fsDb } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore"
import ImageUploading from 'react-images-uploading';

export default function NewAdmission() {
    const [name, setName] = useState()
    const [father, setFather] = useState()
    const [num, setNum] = useState()
    const [date, setDate] = useState()
    const [fees, setFees] = useState()
    const [CNIC, setCNIC] = useState()
    const [address, setAddress] = useState()
    const [status, setStatus] = useState()
    const [payDate, setPayDate] = useState()
    const [images, setImages] = useState([]);
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };
    const memberCollectionRef = collection(fsDb, "members")
    const ImageFunction = () => {
        return (
            <div className="border-[2px] border-[#ffcb04] w-[95%] rounded flex justify-center">
                <ImageUploading
                    value={images}
                    onChange={onChange}
                    // maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className="flex text-center">
                            {images?.length == 0 ? <button
                                className='h-32'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button> : ""}
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="pt-2">
                                    <div className='w-40 h-40 mx-auto'>
                                        <img src={image['data_url']} alt="" className='h-[100%] mx-auto' />
                                    </div>
                                    <div className="image-item__btn-wrapper">
                                        <button className='text-white rounded p-2 m-2 bg-[green]' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='text-white rounded p-2 m-2 bg-[red]' onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        );
    }
    const handleMember = async () => {
        await addDoc(memberCollectionRef, {
            member_name: name,
            member_father: father,
            member_num: num,
            joining_date: date,
            member_fees: fees,
            member_cnic: CNIC,
            member_address: address,
            member_status: status,
            pay_date: payDate,
            member_image: images[0].data_url
        }).then(() => {
            setName("")
            setFather("")
            setNum("")
            setDate("")
            setFees("")
            setCNIC("")
            setAddress("")
            setStatus("")
            setPayDate("")
            setImages("")
            alert("Member added")
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
                        <input type="text" alt="" value={name} onChange={(e) => setName(e.target.value)} className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Father Name  </label><br />
                        <input type="text" alt="" value={father} onChange={(e) => setFather(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Phone Number *</label><br />
                        <input type="text" alt="" value={num} onChange={(e) => setNum(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Joining Date *</label><br />
                        <input type="text" alt="" value={date} onChange={(e) => setDate(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Advance Fees *</label><br />
                        <input type="text" alt="" value={fees} onChange={(e) => setFees(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter CNIC *</label><br />
                        <input type="text" alt="" value={CNIC} onChange={(e) => setCNIC(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Pay Date *</label><br />
                        <input type="text" alt="" value={payDate} onChange={(e) => setPayDate(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter pay date' />
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Member Status *</label><br />
                        <input type="text" alt="" value={status} onChange={(e) => setStatus(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter status' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Upload member image *</label><br />
                        {<ImageFunction />}
                    </div>
                    <div className='w-[100%] my-4'>
                        <label className='w-[15%] py-2'>Enter Address *</label><br />
                        <input type="text" alt="" value={address} onChange={(e) => setAddress(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                    </div>
                </div>

            </div>
            <button onClick={() => handleMember()} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] p-2 rounded text-white float-right  m-4'>Add Member</button>
        </div>
    )
}
