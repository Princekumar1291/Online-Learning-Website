import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/dashBoard/Sidebar'

const Dashboard = () => {
  return (
    <div className='w-screen min-h-screen'>
      <div className=''>
        <SideBar />
      </div>
      <div className='ml-[220px] w-[80%]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
