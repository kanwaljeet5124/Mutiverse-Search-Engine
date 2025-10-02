import React from 'react'
import CharacterCard from './CharacterCard'

export default function CharacterSection() {
    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-zinc-50 mt-16 border border-[#d1d1d1] rounded-xl'>
            <h2 className='text-3xl font-bold text-blue-400 mb-6'>Characters</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
                <CharacterCard/>
            </div>
        </div>
    )
}
