import React from "react";

import { Icon } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import RegisterCentered from "views/auth/register";
import LoginCentered from "views/auth/login";

const routes = [
  {
    name: "Main Information",
    layout: "/admin",
    path: "/main-information",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Weather Information",
    layout: "/admin",
    path: "/weather-information",
    icon: (
      <Icon
        as={SunIcon}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Register",
    layout: "/auth",
    path: "/register",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: RegisterCentered,
  },
  {
    name: "Login",
    layout: "/auth",
    path: "/login",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: LoginCentered,
  },
];

export default routes;
