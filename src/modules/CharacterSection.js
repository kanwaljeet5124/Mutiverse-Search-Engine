import React from 'react'
import CharacterCard from './CharacterCard'

export default function CharacterSection({results}) {
    return (
        <div className='wrapper flex flex-wrap flex-col items-center justify-center'>
            <div className='w-full mt-5 flex flex-wrap items-center justify-center'>
                {/* <h2 className='w-full text-3xl tracking-wide text-blue-400 mb-5 font-bebas'>Characters</h2> */}
                {results?.characters?.length>0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
                    {results?.characters?.map((item, index) => <CharacterCard key={index} data={item} />)}
                </div>: <div>
                    No data found for characters.
                </div>}
            </div>
        </div>
    )
}
