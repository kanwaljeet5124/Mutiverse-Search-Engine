import React from 'react'

export default function CharacterCard({data, key}) {
    const statusChecker = {
        "Alive": "bg-green-500",
        "Dead": "bg-red-500",
        "unknown": "bg-gray-500"
    };

    return (
        <div className='bg-white rounded-lg shadow-2xl'>
            <img src={data.image??'/file.svg'} className='w-full rounded-t-lg'/>
            <div className='p-5 capitalize'>
                <h3 className='text-xl font-bold text-black'>{data.name}</h3>
                <div className='w-full flex items-center gap-2'>
                    <div className={`size-1.5 rounded-full ${statusChecker[data.status]}`}></div>
                    <h4 className='text-base text-gray-400 font-semibold'>{data.status} - {data.species}</h4>
                </div>
            </div>
        </div>
    )
}
