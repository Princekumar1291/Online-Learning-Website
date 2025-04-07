import React from 'react'

const ConformationModal = ({ modalData }) => {
  return (
    <div className='absolute top-0 left-0 w-full min-h-screen bg-transparent backdrop-blur-sm'>
      <div className='border p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 rounded-2xl'>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-2xl'>{modalData.text1}</p>
          <p className='text-sm text-gray-500'>{modalData.text2}</p>
        </div>
        <div className='flex gap-2'>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={modalData.button1Action}>{modalData.button1Text}</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={modalData.button2Action}>{modalData.button2Text}</button>
        </div>
      </div>
    </div>
  )
}

export default ConformationModal
