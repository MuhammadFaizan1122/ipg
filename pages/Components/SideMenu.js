import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AnnouncementIcon from '@mui/icons-material/Announcement';

export default function SideMenu() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("logedIn")
  }
  return (
    <div className='fixed top-20 w-[15%] tab:w-[25%] h-[100%] bg-[#ffcb040a] sm:hidden ls:hidden'>
      <div>
        <ul className=''>
          <Link href="/">
            <li className={` ${router.route == "/" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><DashboardIcon className='-mt-1 mx-2' />Dashboard</li>
          </Link>
          <Link href="/new-admission">
            <li className={` ${router.route == "/new-admission" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><PersonAddAltIcon  className='-mt-1 mx-2' />Add New Member</li>
          </Link>
          <Link href="/all-admissions">
            <li className={` ${router.route == "/all-admissions" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><PeopleOutlineIcon className='-mt-1 mx-2' />All Members</li>
          </Link>
          <Link href="/active-admissions">
            <li className={` ${router.route == "/active-admissions" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><GroupIcon className='-mt-1 mx-2' />Active Members</li>
          </Link>
          <Link href="/inactive-admissions">
            <li className={` ${router.route == "/inactive-admissions" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><PersonRemoveIcon className='-mt-1 mx-2' />Inactive Members</li>
          </Link>
          <Link href="/charged">
            <li className={` ${router.route == "/charged" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><DoneAllIcon  className='-mt-1 mx-2' />Paid members</li>
          </Link>
          <Link href="/expired-memberships">
            <li className={` ${router.route == "/expired-memberships" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`}><AnnouncementIcon  className='-mt-1 mx-2' />Unpaid members</li>
          </Link>
          <Link href="/login">
            <li className={` ${router.route == "/login" ? "bg-[#ffcb04] text-white" : ""} mt-2 rounded-tr-3xl px-2 py-[12px] w-[100%] border-b-[2px] border-[#ffcb04] hover:bg-[#ffcb04] hover:text-white cursor-pointer transition-all duration-300`} onClick={() => handleLogout()}><LogoutIcon className='-mt-1 mx-2' />Log Out</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
