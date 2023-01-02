import React, { useState } from 'react'
import {
  UsersIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

function Members() {

    let [input, setInput] = useState<string>('')
    let [showSearch, setShowSearch] = useState<boolean>(false)
  
    const toggleSearch = () => {
      input = ''
      setInput(input)
      setShowSearch(!showSearch)
    }
  
    const refreshSearch = () => {
      input = ''
      setInput(input)
    }

    return (
        <div className='flex flex-col bg-white dark:bg-darkgray border-b dark:border-lightgray'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start space-x-2 p-2'>
                    <UsersIcon className='w-5 h-5' />
                    <p className='font-semibold'>Members</p>
                </div>
                <div className='flex items-center justify-end space-x-2 p-2'>
                    <MagnifyingGlassIcon onClick={() => toggleSearch()} className='w-5 h-5 cursor-pointer' />
                    <UserPlusIcon className='w-5 h-5 cursor-pointer' />
                </div>
            </div>
            <div className={`items-center space-x-2 p-2 group ${showSearch ? 'flex' : 'hidden'}`}>
                <MagnifyingGlassIcon className="w-5 h-5" />
                <input
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search Blockd"
                    className='flex-1 outline-none bg-transparent' />
                <XMarkIcon
                    onClick={() => refreshSearch()}
                    className={`w-5 h-5 cursor-pointer ${input ? 'inline' : 'hidden'}`} />
            </div>
            <div className='flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <div className='flex items-center justify-start p-2'>
                    <div className='flex items-center justify-center'>
                        <img src="/images/pfp/pfp1.jpg" className='w-10 h-10 rounded-full' />
                    </div>
                    <div className='flex flex-col items-start justify-start ml-4'>
                        <span className='text-base font-semibold'>@Crypto_Crazy</span>
                        <span className='text-xs'>Last seen Recently</span>
                    </div>
                </div>
                <div className='flex items-center justify-end p-2 text-orange-600'>
                    <span className='text-sm font-semibold'>Admin</span>
                </div>
            </div>
            <div className='flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <div className='flex items-center justify-start p-2'>
                    <div className='flex items-center justify-center'>
                        <img src="/images/pfp/pfp2.jpg" className='w-10 h-10 rounded-full' />
                    </div>
                    <div className='flex flex-col items-start justify-start ml-4'>
                        <span className='text-base font-semibold'>@Egoist</span>
                        <span className='text-xs'>Last seen Recently</span>
                    </div>
                </div>
                <div className='flex items-center justify-end p-2 text-orange-600'>
                    <span className='text-sm font-semibold'>Moderator</span>
                </div>
            </div>
            <div className='flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <div className='flex items-center justify-start p-2'>
                    <div className='flex items-center justify-center'>
                        <img src="/images/pfp/pfp3.jpg" className='w-10 h-10 rounded-full' />
                    </div>
                    <div className='flex flex-col items-start justify-start ml-4'>
                        <span className='text-base font-semibold'>@Monkey_crypto</span>
                        <span className='text-xs'>Last seen Recently</span>
                    </div>
                </div>
                <div className='flex items-center justify-end p-2 text-orange-600'>
                    <span className='text-sm font-semibold'></span>
                </div>
            </div>
        </div>
    )
}

export default Members