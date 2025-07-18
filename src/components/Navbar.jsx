import React from 'react'

const Navbar = () => {
    return (
        <div className=' flex justify-between text-[#29969c] bg-[#c6eefc] px-8 py-3 rounded-full mt-2 mx-4 shadow'>
            <div className='flex gap-2 items-center'>
                <img src="frame.png" className='w-6 h-6' alt="QR" />
                <h1 className='text-2xl font-bold '>QR Code Generator</h1>
            </div>
            <h3>...</h3>
        </div>
    )
}

export default Navbar