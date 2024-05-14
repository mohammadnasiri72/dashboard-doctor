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
    subheader: 'patient',
    items: [
      { title: 'پروفایل', path: '/dashboard/profile', icon: <CgProfile /> },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <LiaUserEditSolid /> },
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <FaRegCalendarCheck /> },
      { title: 'نوبت های من', path: '/dashboard/viewReservation', icon: <FaRegCalendarAlt /> },
      { title: 'لیست بیماری های من', path: '/dashboard/sicknessList', icon: <CiViewList /> },
      { title: 'مشاوره آنلاین', path: '/dashboard/counseling', icon: <MdSupportAgent /> },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'staff',
    items: [
      { title: 'لیست بیماران', path: '/dashboard/patientListStaff', icon: <CgProfile /> },
      { title: 'پذیرش', path: '/dashboard/reception', icon: <CgProfile /> },
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
  {
    subheader: 'doctor',
    items: [
      { title: 'ویزیت', path: '/dashboard/visit', icon: <CgProfile /> },
    ]
  },
  {
    subheader: 'admin',
    items: [
      { title: 'مدیریت دارو', path: '/dashboard/manageDrug', icon: <CgProfile /> },
      { title: 'مدیریت خدمات', path: '/dashboard/manageServices', icon: <CgProfile /> },
      { title: 'مدیریت پرسنل', path: '/dashboard/managStaff', icon: <CgProfile /> },
      { title: 'مدیریت پزشک', path: '/dashboard/managDoctor', icon: <CgProfile /> },
    ]
  }
];

export default sidebarConfig;
