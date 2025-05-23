import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { VscSettingsGear } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { useState } from 'react'
const SideBar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10' > Loading... </div>
        )
    }

    return (
        <div className='' >
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10' >
                <div className='flex flex-col ' >
                    {
                        sidebarLinks.map((link, index) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SideBarLink key={link.id} link={link} iconName={link.icon} ></SideBarLink>
                            )
                        })
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600' ></div>
                <div className='flex flex-col' >
                    <SideBarLink link={{ name: "Settings", path: "dashbaoard/settings" }}
                        iconName="VscSettingsGear"  >

                    </SideBarLink>
                    <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                    dispatch(logout(navigate));
                    setConfirmationModal(null);
                  },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
            </div>

        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
       </div >
   
  )
}

export default SideBar
