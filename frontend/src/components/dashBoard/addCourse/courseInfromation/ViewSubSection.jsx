import React from 'react'

const ViewSubSection = ({subSection}) => {
  return (
    <div className='bg-gray-600 p-2 m-2 rounded-sm '>
      {
        subSection.map((sub)=>{
          return (
            <div key={sub._id} className='flex flex-col border-b-2 border-gray-500 my-3'>
              <p>{sub.title} {sub.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ViewSubSection

