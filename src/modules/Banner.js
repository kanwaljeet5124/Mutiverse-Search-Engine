import React, { useState } from 'react'
import SearchBar from './SearchBar';

export default function Banner() {
    const [query, setQuery] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='w-full bg-gray-950 py-20 sm:py-24 md:py-32 flex flex-col items-center justify-center'>
            <div className='wrapper flex flex-col items-center justify-center'>
                <h1 className='text-4xl sm:text-5xl md:text-xl lg:text-7xl font-bebas text-white tracking-wide text-center'>Multiverse Search Engine</h1>
                <p className='w-full sm:w-3/4 xl:w-1/2 text-white text-center mt-4 font-nunito text-base md:text-lg'>
                    One search bar. Endless universes. Find characters, locations, and episodes instantly from the Rick & Morty multiverse.
                </p>
                <SearchBar />
            </div>
        </div>
    )
}
