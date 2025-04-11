import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../../store/slices/createCourse'
import { TiTick } from "react-icons/ti";
import CourseBuilderForm from "./courseInfromation/CourseBuilderForm"
import CourseInformationForm from "./courseInfromation/CourseInformationForm"

const RenderSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Course Infromation",
    },
    {
      id: 2,
      title: "Course Buinder",
    }
  ]

  const { step } = useSelector(state => state.step)
  const dispatch = useDispatch()
  return (
    <div>
      <div className='flex items-center  justify-evenly max-w-[70%]'>
        {
          steps.map(item => (
            <div key={item.id} className=''>
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center ${item.id == step ? "bg-yellow-500" : "bg-gray-600"} ${item.id < step ? "bg-yellow-800" : ""}`}>{step > item.id ? "" : item.id}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${item.id < step ? "" : "hidden"}`}><TiTick size={30} /></div>
              </div>
              <p className={`text-sm ${item.id == step ? "text-yellow-500" : "text-gray-600"} `}>{item.title}</p>
            </div>
          ))
        }
      </div>
      <div className='mt-10'>
        {
          step == 1 && <CourseInformationForm/>
        }
        {
          step == 2 && <CourseBuilderForm/>
        }
      </div>
    </div>
  )
}

export default RenderSteps
