import React, { useState } from 'react'
import { fsDb } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore"
import ImageUploading from 'react-images-uploading';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function NewAdmission() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // Error State

    const [nameErr, setNameErr] = useState("")
    const [numErr, setNumErr] = useState("")
    const [dateErr, setDateErr] = useState("")
    const [addressErr, setAddressErr] = useState("")
    const [payDateErr, setPayDateErr] = useState("")
    const [statusErr, setStatusErr] = useState("")
    const onChange = (imageList) => {
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
        if (name == undefined || name == "") {
            setNameErr("Please enter name")
        }
        else if (num == undefined || num == "") {
            setNumErr("Please enter number")
        }
        else if (date == undefined || date == "") {
            setDateErr("Please enter joining date")
        }
        else if (address == undefined || address == "") {
            setAddressErr("Please enter address")
        }
        else if (payDate == undefined || payDate == "") {
            setPayDateErr("Please enter payment date")
        }
        else if (status == undefined || status == "") {
            setStatusErr("Please enter member status")
        }
        else {
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
                handleOpen()
            })
        }
    }
    return (
        <>
            <div className='w-[95%] mt-4 mx-auto'>
                <div className='border-b-[2px] border-[#ffcb04]'>
                    <h2 className='text-2xl p-2'>New Admission</h2>
                </div>
                <div className='my-2'>
                    <div className='flex'>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Name *</label><br />
                            <input type="text" alt="" value={name} onChange={(e) => (setName(e.target.value), setNameErr(""))} className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                            <span className='text-[red] text-[14px]'>{nameErr}</span>
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Father Name  </label><br />
                            <input type="text" alt="" value={father} onChange={(e) => setFather(e.target.value)} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Phone Number *</label><br />
                            <input type="text" alt="" value={num} onChange={(e) => (setNum(e.target.value), setNumErr(""))} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                            <span className='text-[red] text-[14px]'>{numErr}</span>
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Joining Date *</label><br />
                            <input type="text" alt="" value={date} onChange={(e) => (setDate(e.target.value), setDateErr(""))} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                            <span className='text-[red] text-[14px]'>{dateErr}</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Advance Fees</label><br />
                            <input type="text" alt="" value={fees} onChange={(e) => setFees(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter CNIC</label><br />
                            <input type="text" alt="" value={CNIC} onChange={(e) => setCNIC(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Pay Date *</label><br />
                            <input type="text" alt="" value={payDate} onChange={(e) => (setPayDate(e.target.value), setPayDateErr(""))} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter pay date' />
                            <span className='text-[red] text-[14px]'>{payDateErr}</span>
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Member Status *</label><br />
                            <input type="text" alt="" value={status} onChange={(e) => (setStatus(e.target.value), setStatusErr(""))} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter status' />
                            <span className='text-[red] text-[14px]'>{statusErr}</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Upload member image</label><br />
                            {<ImageFunction />}
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Address *</label><br />
                            <input type="text" alt="" value={address} onChange={(e) => (setAddress(e.target.value), setAddressErr(""))} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                            <span className='text-[red] text-[14px]'>{addressErr}</span>
                        </div>
                    </div>

                </div>
                <button onClick={() => handleMember()} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] p-2 rounded text-white float-right  m-4'>Add Member</button>
                {/* <button onClick={() => handleNotification()} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] p-2 rounded text-white float-right  m-4'>Notifaication</button> */}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" className='text-center'>
                        Congractulation...
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ m: 2 }} className='text-center'>
                        Your new member is added successfully.
                    </Typography>
                    <button onClick={() => handleClose()} className='bg-[#ffcb04] text-white p-2 mt-4 text-center mx-auto w-[100%] rounded'>Done</button>
                </Box>
            </Modal>
        </>
    )
}
