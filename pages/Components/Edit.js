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
import {AiOutlineEdit} from "react-icons/ai"

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
        setImages([{ data_url: item?.member_image }])

    }, [])
    const [updating, setUpdating] = useState(false)

    // Update member data 
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
            member_image: images[0].data_url,
        }
        await updateDoc(userDoc, UpdatedData)
        handleClose()
        setUpdating(false)
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 rounded text-white sm:px-2'><span className='hidden sm:block text-white'><AiOutlineEdit /></span> <span className='sm:hidden'>Delete</span></button>
            <BootstrapDialog
                onClose={handleClose}
                className="editPopup "
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle className="dark:bg-[#1e1e1e] dark:text-white" id="customized-dialog-title" onClose={handleClose}>
                    Client Information
                </BootstrapDialogTitle>
                <DialogContent dividers className='dark:bg-[#1e1e1e]'>
                    <div className='w-[100%] mx-auto'>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client Name</label><br />
                                <input type="text" alt="" onChange={(e) => setName(e.target.value)} value={name} className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded dark:text-white' placeholder='Enter name' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client Father Name  </label><br />
                                <input type="text" alt="" onChange={(e) => setFather(e.target.value)} value={father} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded dark:text-white' placeholder='Enter father name' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client Phone Number</label><br />
                                <input type="text" alt="" onChange={(e) => setNum(e.target.value)} value={num} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded dark:text-white' placeholder='Enter phone number' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client Joining Date</label><br />
                                <input type="text" alt="" onChange={(e) => setDate(e.target.value)} value={date} className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded dark:text-white' placeholder='Enter joining date' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client Advance Fees</label><br />
                                <input type="text" alt="" onChange={(e) => setFees(e.target.value)} value={fees} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter advance fees' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Client CNIC</label><br />
                                <input type="text" alt="" onChange={(e) => setCNIC(e.target.value)} value={CNIC} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter CNIC' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Enter Pay Date *</label><br />
                                <input type="text" alt="" value={payDate} onChange={(e) => setPayDate(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter address' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Enter Member Status *</label><br />
                                <input type="text" alt="" value={status} onChange={(e) => setStatus(e.target.value)} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter CNIC' />
                            </div>
                        </div>
                        {/* <div className='w-[100%] my-4'>
                            <label className='truncate w-[15%] py-2 dark:text-white'>Enter Address *</label><br />
                            <input type="text" alt="" value={address} onChange={(e) => setAddress(e.target.value)} className='outline-none p-2 w-[97.5%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter address' />
                        </div> */}
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Upload member image</label><br />
                                {<ImageFunction />}
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='truncate w-[15%] py-2 dark:text-white'>Enter Address *</label><br />
                                <input type="text" alt="" value={address} onChange={(e) => (setAddress(e.target.value))} className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04] dark:text-white' placeholder='Enter address' />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className='dark:bg-[#1e1e1e]'>
                    <button onClick={() => (handleUpdate(), setUpdating(true))} disabled={updating == true} className={`bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 py-2 rounded text-white ${updating && "bg-[grey] border-[grey] hover:border-[grey] hover:text-[white] hover:bg-[grey]"}`}>Update</button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}