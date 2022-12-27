import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    BellIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import IconGroup from './IconGroup'
import {useTheme} from 'next-themes'

const Navbar = () => {
    const {systemTheme, theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;

        if(currentTheme === 'dark'){
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white" viewBox="0 0 20 20" fill="#9333ea" role="button" onClick={() => setTheme('light')}>
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                    />
                </svg>
            )
        }else{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9333ea" className="w-6 h-6 fill-white" role="button" onClick={() => setTheme('dark')}>
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
            )
        }
    }

    let [open, setOpen] = useState(false);
    return (
        <div className='w-full shadow-md top-0 left-0'>
            <div className='md:flex items-center justify-between bg-darkblue dark:bg-lightgray md:px-5 h-20'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins]'>
                        <Image
                            src="/images/logo.png"
                            alt="Blockd Logo"
                            className="m-6 ml-4 md:ml-8"
                            width={60}
                            height={40}
                        />
                </div>

                <div className='absolute right-14 md:hidden top-6 cursor-pointer flex flex-col items-center my-1'>
                    {renderThemeChanger()}
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-4 md:right-8 top-6 cursor-pointer md:hidden'>
                    <span className="text-white absolute text-xs -right-3 -top-2 md:-top-1 md:-right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-gray-900 dark:border-lightgray"><span>13</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white" name={open ? 'close' : 'menu'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>

                <ul className={`md:flex absolute items-center md:static z-[2] right-0 w-full md:w-auto md:pl-0 transition-all ease-in ${open ? 'top-20 h-fit bg-darkblue dark:bg-lightgray' : 'top-[-490px] h-20'}`}>
                    <li className='hidden md:inline flex-col items-center text-l my-1'>
                        {renderThemeChanger()}
                    </li>
                    <li className='flex flex-col items-center text-l my-1'>
                        <Link href="">
                            <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10" name='Messages'></IconGroup>
                        </Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-1'>
                        <Link href="">
                            <IconGroup Icon={BellIcon} notif="3" name='Notifications'></IconGroup>
                        </Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-1 md:ml-3'>
                        <Link href="/auth/signup" className='text-white dark:text-white hover:text-gray-300 dark:hover:text-gray-300 font-semibold'>Sign Up</Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-4'>
                    <hr className='w-1/2'></hr>
                    </li>     
                    <li className='md:ml-4 flex flex-col items-center text-l my-4'>
                        <button className="animate-pulse bg-transparent hover:bg-blockd text-white dark:text-white font-semibold hover:text-white py-2 px-4 border rounded-full border-white dark:border-white hover:border-blockd">
                            Connect Wallet
                        </button>
                    </li>              
                </ul>
            </div>
        </div>
    )
}

export default Navbar