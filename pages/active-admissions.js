import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { fsDb } from '../config/firebase';
import Edit from './Components/Edit';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
}
export default function ActiveAdmissions() {
    const [open, setOpen] = useState(false);
    const [delId, setDelId] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    const memberCollectionRef = collection(fsDb, "members")
    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState([])
    useEffect(() => {
        const loginCheck = localStorage.getItem('logedIn');
        if (loginCheck == undefined) {
            router.push('/login')
        }
        const getting = async () => {
            const data = await getDocs(memberCollectionRef)
            const activeList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            let positive_array = activeList?.filter(function (value) {
                return value.member_status == "active";
            });
            setLoading(false)
            setMembers(positive_array)
        }
        getting()
    }, [])
    // Delete member 
    const handleDelete = async () => {
        if (delId != undefined || delId != "") {
            const userDoc = doc(fsDb, "members", delId)
            await deleteDoc(userDoc)
        }
        location.reload();
    }
    return (
        <div className='w-[95%] mt-4 mx-auto'>
            <div className='border-b-[2px] border-[#ffcb04]'>
                <h2 className='text-2xl p-2'>Active Members</h2>
            </div>
            <div className='w-[100%] my-2'>
                <div className='bg-[#ffcb043b] py-4 rounded flex'>
                    <div className='font-semibold truncate h-6 w-[4%] text-center sm:hidden'>S/N</div>
                    <div className='font-semibold truncate h-6 w-[4%] sm:hidden sm:pl-2'>Img</div>
                    <div className='font-semibold truncate h-6 w-[22%] sm:w-[41%] sm:pl-2'>Name</div>
                    <div className='font-semibold truncate h-6 w-[20%] sm:hidden'>Father Name</div>
                    <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Status</div>
                    <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[28%]'>Number</div>
                    <div className='font-semibold truncate h-6 w-[10%] text-center sm:hidden'>Date</div>
                    <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Edit</div>
                    <div className='font-semibold truncate h-6 w-[10%] text-center sm:w-[15%]'>Delete</div>
                </div>
                <div className='w-[100%] my-2 mb-10'>
                    {
                        loading ?
                            <div className='text-center mt-10 mx-auto w-[100%]'>
                                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                            :
                            members.length == 0 ?
                                <div className='text-center mt-10 mx-auto w-[100%]'>
                                    <div class="text-[22px]">No Data Found</div>
                                </div> :
                                members.map((item, index) => {
                                    return (
                                        <div className='border-b-[1px] flex' key={index}>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[2%] text-center sm:hidden'>{index + 1}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[6%] h-[60px] sm:hidden'>
                                                <img src={item.member_image != undefined ? item.member_image : "/profile.jpg"} className='w-auto mx-auto h-[100%]' alt="" />
                                            </div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[22%] sm:w-[42%] sm:pl-2'>{item.member_name}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[20%] sm:hidden'>{item.member_father}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.member_status}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[28%] text-center'>{item.member_num}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] text-center sm:hidden'>{item.joining_date}</div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><Edit item={item} /></div>
                                            <div className='py-2 border-[1px] border-[transparent] truncate w-[10%] sm:w-[15%] text-center'><button onClick={() => (handleOpen(), setDelId(item.id))} className='bg-[red] hover:bg-[#ff00001a] hover:text-[red] border-[2px] duration-200 border-[red] px-4 sm:px-2 rounded text-white'><span className='hidden sm:block text-white'><MdDeleteOutline /></span> <span className='sm:hidden'>Delete</span></button></div>
                                        </div>
                                    )
                                })
                    }
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="dark:bg-[#1e1e1e] bg-white">
                    <Typography id="modal-modal-title" variant="h5" component="h2" className='text-center underline'>
                        Delete Member
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ m: 2 }} className='text-center'>
                        Are you sure you want to delete this member ?
                    </Typography>
                    <button onClick={() => handleDelete()} className='bg-[red] text-white p-2 mx-2 text-center mx-auto w-[45%] rounded'>Yes</button>
                    <button onClick={() => handleClose()} className='bg-[#ffcb04] text-white p-2 mx-2 text-center mx-auto w-[45%] rounded'>No</button>
                </Box>
            </Modal>
        </div>
    )
}
