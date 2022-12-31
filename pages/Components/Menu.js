import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link"
import { AiOutlineMenu } from 'react-icons/ai';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AnnouncementIcon from '@mui/icons-material/Announcement';

export default function Menu() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleLogout = () => {
        localStorage.removeItem("logedIn")
    }
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link href="/">
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dasboard" />
                    </ListItem>
                </Link>
                <Link href="/new-admission">

                    <ListItem>
                        <ListItemIcon>
                            <PersonAddAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Member" />
                    </ListItem>
                </Link>

                <Link href="/all-admissions">
                    <ListItem>
                        <ListItemIcon>
                            <PeopleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Members" />
                    </ListItem>
                </Link>
                <Link href="/inactive-admissions">
                    <ListItem>
                        <ListItemIcon>
                            <PersonRemoveIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inactive Members" />
                    </ListItem>
                </Link>
                <Link href="/active-admissions">
                    <ListItem>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Active Members" />
                    </ListItem>
                </Link>
                <Link href="/charged">
                    <ListItem>
                        <ListItemIcon>
                            <DoneAllIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paid Member" />
                    </ListItem>
                </Link>
                <Link href="/expired-memberships">
                    <ListItem>
                        <ListItemIcon>
                            <AnnouncementIcon />
                        </ListItemIcon>
                        <ListItemText primary="Unpaid Members" />
                    </ListItem>
                </Link>
                <Link href="/login">
                    <ListItem onClick={() => handleLogout()}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <div>
            <>
                <Button className='text-black' onClick={toggleDrawer("right", true)}>
                    <AiOutlineMenu className='text-[20px]' />

                </Button>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
            </>
        </div>
    );
}