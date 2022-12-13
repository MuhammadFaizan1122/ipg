import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

export default function Edit() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 rounded text-white'>Edit</button>
            <BootstrapDialog
                onClose={handleClose}

                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Client Information
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <div className='w-[800px]'>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Name</label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%] border-[2px] border-[#ffcb04] rounded' placeholder='Enter name' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Father Name  </label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter father name' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Phone Number</label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter phone number' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Joining Date</label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%]  border-[2px] border-[#ffcb04] rounded' placeholder='Enter joining date' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client Advance Fees</label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter advance fees' />
                            </div>
                            <div className='w-[100%] my-4'>
                                <label className='w-[15%] py-2'>Client CNIC</label><br />
                                <input type="text" alt="" className='outline-none p-2 w-[95%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter CNIC' />
                            </div>
                        </div>
                        <div className='w-[100%] my-4'>
                            <label className='w-[15%] py-2'>Client Address</label><br />
                            <input type="text" alt="" className='outline-none p-2 w-[97.5%] rounded border-[2px] border-[#ffcb04]' placeholder='Enter client address' />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='bg-[#ffcb04] hover:bg-[#ffcb043b] hover:text-[#ffcb04] border-[2px] duration-200 border-[#ffcb04] px-4 py-2 rounded text-white'>Update</button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}