// components
import { CgProfile } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { BiSelectMultiple } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
// ----------------------------------------------------------------------




const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v3.3.0',
    items: [
      { title: 'پروفایل', path: '/dashboard/profile', icon: <CgProfile /> },
      { title: 'ویرایش پروفایل', path: '/dashboard/updateProfile', icon: <GrUpdate /> },
      { title: 'نوبت دهی اینترنتی', path: '/dashboard/reserve', icon: <BiSelectMultiple /> },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
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
