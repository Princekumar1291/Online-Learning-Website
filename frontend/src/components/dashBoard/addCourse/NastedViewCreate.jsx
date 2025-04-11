import React from 'react'
import { useSelector } from 'react-redux';
import CreateViewSubsection from './courseInfromation/CreateViewSubsection';

const NastedViewCreate = () => {
  const { courseSubsection } = useSelector(state => state.step);
  console.log("courseSubsection::", courseSubsection)

  return (
    <div>
      {courseSubsection.length!=0 && <div 
        className='bg-gray-800 p-4 my-4 rounded-sm'>
        <ul className='list-disc pl-4'>
          {courseSubsection.map(section => {
            return <CreateViewSubsection section={section}/>
          })}
        </ul>
      </div>}
    </div>
  )
}

export default NastedViewCreate
