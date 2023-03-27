/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  columnsDataCheck,
  columnsDataComplex,
  SolarDataHeader
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import DataTable from "components/dataDispaly/DataTable";
import GetData from "components/menu/test";
import TotalACPower from "components/dataDispaly/TotalACPower";
import Card from "components/card/Card";
import { useState, useEffect } from 'react';
export default function UserReports() {
  // Chakra Color Mode
  
  // data needs to be JSON format

  // begin nonsense
const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pvpk299-back.azurewebsites.net/api/SolarData/GetByIDFromTo/60/65');
      const jsonData = await response.json();

      setData(jsonData);
    }

    fetchData();
  }, []);

  const fakedata = [{"id":60,"controllerName":"T15133M013","time":"2015-01-01T13:44:31","temperature":20,"pV1_Voltage":652.7,"pV2_Voltage":607.8,"pV1_Current":0.5,"pV2_Current":0.3,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":351,"daily_Energy":0.6},{"id":61,"controllerName":"T15133M013","time":"2015-01-01T13:49:31","temperature":20,"pV1_Voltage":770.5,"pV2_Voltage":787.4,"pV1_Current":0.4,"pV2_Current":0.2,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":137,"daily_Energy":0.6},{"id":62,"controllerName":"T15133M013","time":"2015-01-01T13:54:31","temperature":21,"pV1_Voltage":788.4,"pV2_Voltage":790.8,"pV1_Current":0.4,"pV2_Current":0.2,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":124,"daily_Energy":0.6},{"id":63,"controllerName":"T15133M013","time":"2015-01-01T13:59:31","temperature":20,"pV1_Voltage":806.7,"pV2_Voltage":816.6,"pV1_Current":0.4,"pV2_Current":0.2,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":191,"daily_Energy":0.6},{"id":64,"controllerName":"T15133M013","time":"2015-01-01T14:04:31","temperature":20,"pV1_Voltage":743.1,"pV2_Voltage":770.8,"pV1_Current":0.4,"pV2_Current":0.2,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":150,"daily_Energy":0.6},{"id":65,"controllerName":"T15133M013","time":"2015-01-01T14:09:31","temperature":21,"pV1_Voltage":820.1,"pV2_Voltage":818.3,"pV1_Current":0.4,"pV2_Current":0.2,"total_Energy":211.1,"total_Operation_Hours":340,"total_AC_Power":155,"daily_Energy":0.6}];

  var AC = fakedata.map((obj) => obj.total_AC_Power);
  var TIME = fakedata.map((obj) => obj.time);



  // end nonssense

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'><TotalACPower Yaxis={AC} Xaxis={TIME}/></SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'><DataTable columnsData={SolarDataHeader} tableData={fakedata}/></SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
