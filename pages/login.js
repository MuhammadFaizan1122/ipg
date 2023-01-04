import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props) {
    const { children, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
};

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const [userErr, setUserErr] = useState()
    const [passErr, setPassErr] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const router = useRouter()
    useEffect(() => {
        const loginCheck = localStorage.getItem('logedIn');
        if (loginCheck == undefined) {
            handleClickOpen()
        } else {
            router.push('/')
        }
    }, [])

    const handleLogin = () => {
        if (user == "" && pass == "") {
            setUserErr("Please enter username")
            setPassErr("Please enter password")
        } else if (user !== 'ayaz321' || pass !== "1230") {
            setPassErr("Invalid username or password ")
        } else if (user == 'ayaz321' || pass == "1230") {
            localStorage.setItem('logedIn', "")
            handleClose()
            router.push('/')
        }

    }
    return (
        <div>
            {/* <button className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 rounded text-white'>Edit</button> */}
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                className='bg-white'
                open={open}
            >
                <BootstrapDialogTitle className="text-center">
                    <div className='w-[100px] mx-auto'>
                        <img src='/Iron-Power-Gym.png' className='w-[100%]' alt="iron power gym" />
                    </div>
                    <p className='text-[30px] logoText cursor-pointer'>IRON POWER <span className='text-[#ffcb04] font-bold'>GYM</span></p>
                </BootstrapDialogTitle>
                <DialogContent>
                    <div className='sm:w-[100%]'>
                        <div className='mx-auto w-[85%] sm:w-[100%]'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2 capitalize'>Username</label><br />
                                <input type="text" autoFocus onChange={(e) => setUser(e.target.value)} alt="iron power gym login" className='outline-none p-2 w-[100%] border-b-[2px] border-[#ffcb04]' placeholder='Enter username' />
                                <p className='text-[14px] text-[red] text-center  p-0 m-0'>{userErr}</p>
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2 capitalize'>Password </label><br />
                                <input type="password" onChange={(e) => setPass(e.target.value)} alt="iron power gym login" className='outline-none p-2 w-[100%]  border-b-[2px] border-[#ffcb04]' placeholder='Enter password' />
                                <p className='text-[14px] text-[red] text-center p-0 m-0'>{passErr}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <button onClick={handleLogin} className='mx-auto w-[80%] my-4 mb-8 bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 py-2 rounded-full text-white'>Login</button>
            </BootstrapDialog>
        </div>
    );
}