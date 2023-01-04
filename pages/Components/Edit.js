import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ImageUploading from 'react-images-uploading';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fsDb } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Edit({ item }) {
    const [open, setOpen] = useState(false);
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

    // Image Update 
    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
    };
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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setName(item?.member_name)
        setFather(item?.member_father)
        setNum(item?.member_num)
        setDate(item?.joining_date)
        setFees(item?.member_fees)
        setCNIC(item?.member_cnic)
        setAddress(item?.member_address)
        setStatus(item?.member_status)
        setPayDate(item?.pay_date)
        setImages([item?.member_image])

    }, [])

    // Update member data 
console.log(images)
    const handleUpdate = async () => {
        const userDoc = doc(fsDb, "members", item.id)
        const UpdatedData = {
            member_name: name,
            member_father: father,
            member_num: num,
            joining_date: date,
            member_fees: fees,
            member_cnic: CNIC,
            member_address: address,
            member_status: status,
            pay_date: payDate,
            member_image: images[0],
        }
        await updateDoc(userDoc, UpdatedData)
        handleClose()
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 rounded text-white'>Edit</button>
            <BootstrapDialog
                onClose={handleClose}
                className="editPopup"
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Client Information
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <div className='w-[100%] mx-auto'>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Name</label><br />
                                <input type="text" alt="" onChange={(e) => setName(e.target.value)} value={name} className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Father Name  </label><br />
                                <input type="text" alt="" onChange={(e) => setFather(e.target.value)} value={father} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Phone Number</label><br />
                                <input type="text" alt="" onChange={(e) => setNum(e.target.value)} value={num} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Joining Date</label><br />
                                <input type="text" alt="" onChange={(e) => setDate(e.target.value)} value={date} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Advance Fees</label><br />
                                <input type="text" alt="" onChange={(e) => setFees(e.target.value)} value={fees} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client CNIC</label><br />
                                <input type="text" alt="" onChange={(e) => setCNIC(e.target.value)} value={CNIC} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Enter Pay Date *</label><br />
                                <input type="text" alt="" value={payDate} onChange={(e) => setPayDate(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Enter Member Status *</label><br />
                                <input type="text" alt="" value={status} onChange={(e) => setStatus(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                            </div>
                        </div>
                        {/* <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Enter Address *</label><br />
                            <input type="text" alt="" value={address} onChange={(e) => setAddress(e.target.value)} className='outline-none p-2 w-[97.5%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                        </div> */}
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Upload member image</label><br />
                                {<ImageFunction />}
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Enter Address *</label><br />
                                <input type="text" alt="" value={address} onChange={(e) => (setAddress(e.target.value))} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter address' />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => handleUpdate()} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 py-2 rounded text-white'>Update</button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}