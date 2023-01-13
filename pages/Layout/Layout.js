import React, { useLayoutEffect, useEffect, useState } from 'react'
import Header from '../Components/Header'
import SideMenu from '../Components/SideMenu'
import { useRouter } from 'next/router';
import { fsDb } from "../../config/firebase";
import { collection, getDocs } from 'firebase/firestore';

export default function Layout({ children }) {
    const memberCollectionRef = collection(fsDb, "members")
    const [member, setMember] = useState([])
    // Data Fetching 
    useEffect(() => {
        const getting = async () => {
            const data = await getDocs(memberCollectionRef)
            const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setMember(list)
        }
        getting()
    }, [])
    function unPaid(member) {
        let currentDay = new Date().getDate()
        let currentMonth = new Date().getMonth()
        let currentYear = new Date().getFullYear()

        let filter = member.filter(data => {
            let day = new Date(data.pay_date).getDate()
            let month = new Date(data.pay_date).getMonth()
            let year = new Date(data.pay_date).getFullYear()
            return currentDay > day && currentMonth > month && currentYear == year && data.member_status == "active" || currentMonth == 0 && currentYear > year ? currentDay > day && month == 11 && data.member_status == "active" || month <= 10 && data.member_status == "active" : ""
        })
        return filter
    }

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
        console.log(loginCheck)

    }, [])
    const handleNotification = () => {
        Notification.requestPermission().then((perm) => {
            if (perm === "granted") {
                unPaid(member).map((item) => {
                    return (
                        new Notification("IRON POWER GYM", {
                            body: `${item.member_name} ${item.member_father} was paid on ${item.pay_date}`,
                            icon: "/Iron-Power-Gym.png"
                        })
                    )
                })
            }
        })
    }
    useEffect(() => {
        if (unPaid(member).length != 0) {
            handleNotification()
        }
    }, [unPaid(member)])


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