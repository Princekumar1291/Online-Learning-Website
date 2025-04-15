import React from 'react'
import VideoDetailsSidebar from '../components/viewCourse/VideoDetailsSidebar'
import { Outlet } from 'react-router-dom'

const ViewCourse = () => {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar with scroll */}
      <div className="w-[200px] sm:w-[300px] h-screen overflow-y-auto border-r border-gray-700">
        <VideoDetailsSidebar />
      </div>

      {/* Fixed main content */}
      <div className='flex-1 h-screen overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

export default ViewCourse
