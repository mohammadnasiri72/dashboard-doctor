// components
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiViewList } from "react-icons/ci";
import { MdSupportAgent } from "react-icons/md";
// ----------------------------------------------------------------------




const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.3.0',
    items: [
      { title: 'پروفایل', path: '/dashboard/profile', icon: <CgProfile /> },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <FaRegCalendarCheck /> },
      { title: 'نوبت های من', path: '/dashboard/viewReservation', icon: <FaRegCalendarAlt /> },
      { title: 'لیست بیماری های من', path: '/dashboard/patientList', icon: <CiViewList /> },
      { title: 'مشاوره آنلاین', path: '/dashboard/counseling', icon: <MdSupportAgent /> },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <CgProfile /> },
      {
        title: 'user',
        path: '/dashboard/user',
        icon: <FaRegUser />,
        children: [
          { title: 'Four', path: '/dashboard/user/four' },
          { title: 'Five', path: '/dashboard/user/five' },
          { title: 'Six', path: '/dashboard/user/six' },
        ],
      },
    ],
  },
];

export default sidebarConfig;
