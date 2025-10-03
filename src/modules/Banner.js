import React, { useState } from 'react'
import SearchBar from './SearchBar';

export default function Banner() {
    const [query, setQuery] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='w-full bg-gray-950 py-32 flex flex-col items-center justify-center'>
            <div className='wrapper flex flex-col items-center justify-center'>
                <h1 className='text-7xl font-bebas text-white tracking-wide'>Multiverse Search Engine</h1>
                <p className='w-2/4 text-white text-center mt-4 font-nunito text-lg'>
                    One search bar. Endless universes. Find characters, locations, and episodes instantly from the Rick & Morty multiverse.
                </p>
                <SearchBar />
            </div>
        </div>
    )
}
