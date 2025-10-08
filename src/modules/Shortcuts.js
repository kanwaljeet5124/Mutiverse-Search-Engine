import React from 'react'

export default function Shortcuts({arr, handler}) {
  return (
    <div className='w-full flex flex-wrap gap-2 items-center justify-center mt-5'>
        {arr && arr.length>0 && arr.map((item, index) => <>
            <span key={`shortcuts-${item}`} onClick={() => handler(item)} role="button" className="w-auto py-1 px-3 text-sm bg-gray-200 rounded-full hover:bg-gray-500 cursor-pointer">{item}</span>
        </>)}
    </div>
  )
}
