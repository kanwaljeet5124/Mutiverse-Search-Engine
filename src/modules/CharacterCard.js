import React from 'react'

export default function CharacterCard() {
    return (
        <div className='bg-white rounded-lg shadow-2xl'>
            <img src='/file.svg' className='w-full rounded-l-lg'/>
            <div className='p-5'>
                <h3 className='text-xl font-bold text-black'>Character Name</h3>
                <div className='w-full flex items-center gap-2'>
                    <div className='size-1 rounded-full bg-green-500'></div>
                    <h4 className='text-base text-gray-400 font-semibold'>Alive - Alien</h4>
                </div>
            </div>
        </div>
    )
}
