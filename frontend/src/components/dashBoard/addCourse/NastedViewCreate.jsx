import React from 'react'
import { useSelector } from 'react-redux';
import CreateViewSubsection from './courseInfromation/CreateViewSubsection';

const NastedViewCreate = () => {
  const { courseSubsection } = useSelector(state => state.step);

  return (
    <div>
      {courseSubsection.length!=0 && <div
        className='bg-gray-800 p-4 my-4 rounded-sm'>
        <ul className='list-disc pl-4'>
          {courseSubsection.map(section => {
            console.log(courseSubsection)
            return <CreateViewSubsection section={section}/>
          })}
        </ul>
      </div>}
    </div>
  )
}

export default NastedViewCreate
