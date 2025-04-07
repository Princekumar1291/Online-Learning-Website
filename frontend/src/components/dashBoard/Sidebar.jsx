import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { deleteToken } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import ConformationModal from '../ConformationModal'


const SideBar = () => {
  const { userType } = useSelector(state => state.profile)
  console.log("userType: ", userType)
  const setting = {
    id: 8,
    name: "Setting",
    path: "/dashboard/setting",
    icon: "VscSettingsGear",
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [conformationModal, setConformationModal] = useState(false);

  return (
    <div className=''>
      <div className='absolute left-4 top-20  flex flex-col gap-2 w-[20%] min-h-screen min-w-[200px] border-r-1'>
        <div>
          {
            sidebarLinks.map(link => (
              (!link.type || userType === link.type) &&
              <SidebarLink link={link} key={link.id} />
            ))
          }
        </div>
        <div className='border-t-2 border-gray-700'>
          <SidebarLink link={setting} />
        </div>
        <button className='flex items-center gap-2 my-1' onClick={() => setConformationModal({
          text1: "Are you sure you want to logout?",
          text2: "You will be logged out of your account",
          button1Text: "Logout",
          button2Text: "Cancel",
          button1Action: () => {
            dispatch(deleteToken());
            toast.success("Logout Successfully");
            navigate("/");
          },
          button2Action: () => {
            setConformationModal(false);
          }
        })}><CiLogout fontSize={25} />Logout
        </button>
      </div>
      {conformationModal && <ConformationModal modalData={conformationModal} />}
    </div>
  )
}

export default SideBar
