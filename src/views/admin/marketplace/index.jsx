import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { WiDaySunny } from "react-icons/wi";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniWeather from "components/weather/MiniWeather";

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
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import WeatherChart from "components/dataDispaly/WeatherChart";

import { fetchSolarData, getCurrentWeather, getLatestKaunasWeather } from "networking/api";

import { useState, useEffect } from 'react';

export default function UserReports() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [data, setData] = useState(null);
  const [ac, setAc] = useState(null);
  const [time, setTime] = useState(null);
  const [airTemperature, setWeatherTemperature] = useState(null);
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [conditionCode, setConditionCode] = useState(null);

  useEffect(() => {
    fetchSolarData(60, 63)
      .then((data) => {
        setAc(data.map((obj) => obj.total_AC_Power));
        setTime(data.map((obj) => obj.time));
        setData(data);
      });

      getCurrentWeather()
          .then((data) => {
            setWeatherTemperature(data.airTemperature);
            setFeelsLikeTemperature(data.feelsLikeTemperature);
            setWindSpeed(data.windSpeed);
            setCloudCover(data.cloudCover);
            setPrecipitation(data.precipitation);
            setConditionCode(data.conditionCode);
          });

  }, []);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        {data && <WeatherChart Yaxis={ac} Xaxis={time}  />}
      </SimpleGrid>
      <Text
              color={textColor}
              fontSize='34px'
              textAlign='start'
              fontWeight='700'
              lineHeight='100%'
              my='10px'>
              Current Weather Data
            </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        
        <MiniWeather />
        <MiniStatistics
            startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={
                        <i class="fa-solid fa-temperature-half weather-icon"></i>
                    }
                />
            }
            name='Feels Like'
            value={feelsLikeTemperature == null ? "- °C" : `${feelsLikeTemperature} °C`}
        />
        <MiniStatistics
            startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={
                        <i class="fa-solid fa-wind weather-icon"></i>
                    }
                />
            }
            name='Curr. Wind'
            value={windSpeed == null ? "- m/s" : `${windSpeed} m/s`}
        />
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
                        <i class="fa-solid fa-cloud-moon-rain weather-icon"></i>
                    }
                />
            }
            name='Precipitation'
            value={precipitation == null ? "- %" : `${precipitation} %`}
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
