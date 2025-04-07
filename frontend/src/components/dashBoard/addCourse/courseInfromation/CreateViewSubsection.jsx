import React, { useState } from 'react'
import { MdCreateNewFolder } from 'react-icons/md'
import AddAndCreateCourse from './AddAndCreateCourse';
import ViewSubSection from './ViewSubSection';

const CreateViewSubsection = ({ section }) => {
  const [open, setOpen] = useState(false);
  const handleOnButtonClick = () => {
    setOpen(true);
    console.log("open", open);
  };
  return (
    <>
      <details open className="bg-gray-700 my-2 p-2 rounded-md shadow-md">
        <summary key={section._id} className="text-white text-lg font-bold">{section.sectionName}</summary>
        <div className="border-t-2 border-gray-500 my-2" />
        {section.subSection.length != 0 && <ViewSubSection subSection={section.subSection} />}
        <div className="flex justify-end">
          <button
            className="relative bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-2 rounded-md w-[150px] text-left"
            onClick={handleOnButtonClick}
          >
            ADD Lecture
            <MdCreateNewFolder size={20} className="absolute ml-2 top-3 right-4 text-white" />
          </button>
        </div>
      {open && <AddAndCreateCourse setOpen={setOpen} section={section}/>}
      </details>
    </>
  )
}

export default CreateViewSubsection

