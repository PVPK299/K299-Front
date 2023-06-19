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
import MiniWeather from "components/weather/MiniWeather";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdBarChart,
  MdFileCopy,
  MdOutlineToday,
  MdOutlineQueryStats
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  lineChartDataOverallRevenue,
  lineChartOptionsOverallRevenue,
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  barChartOptionsCharts2,
  pieChartOptions,
  pieChartData,
  barChartDataCharts2,
  bubbleChartData,
  bubbleChartOptions,
  donutChartDataCharts1,
  donutChartOptionsCharts1,
  lineBarChartData,
  lineBarChartOptions,
  lineChartDataAreaEventsCalendar,
  lineChartOptionsAreaEventsCalendar,
  polarChartDataCharts,
  polarChartOptionsCharts,
  radarChartDataCharts,
  radarChartOptionsCharts
} from "components/charts/chartData.js";

import LineChart from "components/charts/LineChart";

import {
  columnsDataCheck,
  columnsDataComplex,
  SolarDataHeader
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import DataTable from "components/dataDispaly/DataTable";
import TotalACPower from "components/dataDispaly/TotalACPower";
import { weatherLineChartCloudCover, lineChartOptionsTotalSpent, LineChartData } from "components/dataDispaly/charts.js"
import WeatherChart from "components/dataDispaly/WeatherChart";


import { fetchSolarData, fetchSolarDataByID, getCurrentWeather, getLastID } from "networking/api";


import { useState, useEffect } from 'react';
export default function UserReports() {


  // begin nonsense
  // const fakedata = [{ "id": 60, "controllerName": "T15133M013", "time": "2015-01-01T13:44:31", "temperature": 20, "pV1_Voltage": 652.7, "pV2_Voltage": 607.8, "pV1_Current": 0.5, "pV2_Current": 0.3, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 351, "daily_Energy": 0.6 }, { "id": 61, "controllerName": "T15133M013", "time": "2015-01-01T13:49:31", "temperature": 20, "pV1_Voltage": 770.5, "pV2_Voltage": 787.4, "pV1_Current": 0.4, "pV2_Current": 0.2, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 137, "daily_Energy": 0.6 }, { "id": 62, "controllerName": "T15133M013", "time": "2015-01-01T13:54:31", "temperature": 21, "pV1_Voltage": 788.4, "pV2_Voltage": 790.8, "pV1_Current": 0.4, "pV2_Current": 0.2, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 124, "daily_Energy": 0.6 }, { "id": 63, "controllerName": "T15133M013", "time": "2015-01-01T13:59:31", "temperature": 20, "pV1_Voltage": 806.7, "pV2_Voltage": 816.6, "pV1_Current": 0.4, "pV2_Current": 0.2, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 191, "daily_Energy": 0.6 }, { "id": 64, "controllerName": "T15133M013", "time": "2015-01-01T14:04:31", "temperature": 20, "pV1_Voltage": 743.1, "pV2_Voltage": 770.8, "pV1_Current": 0.4, "pV2_Current": 0.2, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 150, "daily_Energy": 0.6 }, { "id": 65, "controllerName": "T15133M013", "time": "2015-01-01T14:09:31", "temperature": 21, "pV1_Voltage": 820.1, "pV2_Voltage": 818.3, "pV1_Current": 0.4, "pV2_Current": 0.2, "total_Energy": 211.1, "total_Operation_Hours": 340, "total_AC_Power": 155, "daily_Energy": 0.6, }];


  const [data, setData] = useState(null);
  const [ac, setAc] = useState(null);
  const [time, setTime] = useState(null);
  const [totalGenerated, setTotalGenerated] = useState(null);
  const [todayGenerated, setTodayGenerated] = useState(null);
  const [totalOperationDays, setTotalOperationDays] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [conditionCode, setConditionCode] = useState(null);
<<<<<<< HEAD

  const [totalGenerated2, setTotalGenerated2] = useState(null);
  const [pV1_Voltage, setPV1_Voltage] = useState(null);
  const [pV2_Voltage, setPV2_Voltage] = useState(null);



=======
 
>>>>>>> main
  // TODO: sita logika reikia perkelti i atskira komponenta kartu su chart'u
  useEffect(() => {
    fetchSolarData(1,10)
      .then((data) => {
        setAc(data.map((obj) => obj.total_AC_Power));
        setTotalGenerated2(data.map((obj) => obj.total_Energy));
        setPV1_Voltage(data.map((obj) => obj.pV1_Voltage));
        setPV2_Voltage(data.map((obj) => obj.pV2_Voltage));
        setTime(data.map((obj) => obj.time));
        setData(data);
      });
    fetchSolarDataByID(1)
      .then((data) => {
        setTotalGenerated(data.total_Energy);
        setTodayGenerated(data.daily_Energy);
        const totalOperationDays = data.total_Operation_Hours / 24;
        setTotalOperationDays(totalOperationDays % 2 === 0 ? totalOperationDays : totalOperationDays.toFixed(2));
      });

    getCurrentWeather()
      .then((data) => {
        setCloudCover(data.cloudCover);
        setConditionCode(data.conditionCode === "null" ? "-" : data.conditionCode.replace(/-/g, " "));
      });

  }, []);

  // end nonssense

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        {data && <TotalACPower Yaxis={ac} Xaxis={time} />}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <WeatherChart
          title="PV1 and PV2 voltage"
          yAxisData={[
            {
              name: "pV2_Voltage",
              data: pV1_Voltage
            },
            {
              name: "pV2_Voltage",
              data: pV2_Voltage,
            }
          ]}
          xAxisData={lineChartOptionsTotalSpent(time)}
        />
      </SimpleGrid>
      {/* TODO: sitas table rodo max tik 5 eilutes, o duomenu yra daug daugiau */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        {data && <DataTable columnsData={SolarDataHeader} tableData={data} />}
      </SimpleGrid>
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
                <Icon w='32px' h='32px' as={MdOutlineQueryStats} color={brandColor} />
              }
            />
          }
          name='Total Generated'
          value={totalGenerated == null ? "- kW" : `${totalGenerated} kW`}
        />
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
          name='Generated Today'
          value={todayGenerated == null ? "- kW" : `${todayGenerated} kW`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdOutlineToday} color={brandColor} />
              }
            />
          }
          name='Total Operation Days'
          value={totalOperationDays == null ? "- Days" : `${totalOperationDays} Days`}
        />
        <MiniWeather />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <i class="fa-solid fa-cloud weather-icon"></i>
              }
            />
          }
          name='Cloud Cover'
          value={cloudCover == null ? "- %" : `${cloudCover} %`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <i class="fa-solid fa-user-large weather-icon"></i>
              }
            />
          }
          name='Condition'
          value={conditionCode == null ? "-" : `${conditionCode}`}
        />
      </SimpleGrid>
    </Box>
  );
}
