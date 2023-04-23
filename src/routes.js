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

const routes = [
  {
    name: "Main Information",
    layout: "/admin",
    path: "/main-information",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Weather Forecast",
    layout: "/admin",
    path: "/weather-forecast",
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
];

export default routes;
