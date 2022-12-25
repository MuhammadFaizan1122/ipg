import React from 'react'
import Link from 'next/link'
import Menu from './Menu'
// import Image from 'next/image'
export default function Header() {
    return (
        <div className='h-20 fixed w-[100%] px-8 flex shadow-lg justify-between bg-white z-20'>
            <div className='flex w-[50%]'>
                <Link className='flex' href="/">
                    <div className='w-[80px] h-[80px] cursor-pointer'>
                        <img src='/Iron-Power-Gym.png' className='w-[100%]' alt="iron power gym" />
                    </div>
                    <p className='text-[30px] mt-[18px] logoText cursor-pointer sm:hidden'>IRON POWER <span className='text-[#ffcb04] font-bold'>GYM</span></p>
                </Link>
            </div>
            <div className='flex w-[50%]'>
                <div className='fixed right-2 top-[3%] hidden sm:block ls:block'>
                    <Menu />
                </div>
            </div>
        </div>
    )
}
