import React, { useLayoutEffect } from 'react'
import Header from '../Components/Header'
import SideMenu from '../Components/SideMenu'
import { useRouter } from 'next/router';

export default function Layout({ children }) {

    const router = useRouter()
    useLayoutEffect(() => {
        const loginCheck = localStorage.getItem('logedIn');
        if (loginCheck == undefined) {
            router.push('/login')
        } else if (loginCheck != undefined) {
            setTimeout(() => {
                localStorage.removeItem("logedIn")
            }, 3600000);
        }
    }, [])
    return (
        <>
            <Header />
            <SideMenu />
            <div className="">
                <div className='pt-20 pl-[15%] tab:pl-[25%] sm:pl-0'>{children}</div>
            </div>
        </>
    )
}