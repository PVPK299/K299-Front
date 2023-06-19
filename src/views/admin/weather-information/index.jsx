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

// Custom components
import MiniWeather from "components/weather/MiniWeather";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";

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


import WeatherChart from "components/dataDispaly/WeatherChart";
import { weatherLineChartCloudCover, lineChartOptionsTotalSpent, LineChartData } from "components/dataDispaly/charts.js"

import { getCurrentWeather, getLastNDaysWeatherObservations } from "networking/api";

import { useState, useEffect } from 'react';

export default function UserReports() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [cloudCover, setCloudCover] = useState(null);
  const [airTemperature, setAirTemperature] = useState(null);
  const [observationTimeUtc, setObservationTimeUtc] = useState(null);

  const [observations, setObservations] = useState(null);

  const days = 7;

  useEffect(() => {
    getLastNDaysWeatherObservations(days).then((data) => {

      setObservations(data);

      setObservationTimeUtc(lineChartOptionsTotalSpent(data.map(item => item.observationTimeUtc)));
      setCloudCover(LineChartData("Cloud cover", data.map(item => item.cloudCover)));
      setAirTemperature(LineChartData("Air temperature", data.map(item => item.airTemperature)));

    });

    getCurrentWeather()
      .then((data) => {
        setCurrentWeather(data);
      });

  }, []);

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <WeatherChart title={`Cloud coverage, % (Last ${days} days)`} isLoading={cloudCover === null} yAxisData={cloudCover} xAxisData={observationTimeUtc} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <WeatherChart title={`Air temperature, C (Last ${days} days)`} isLoading={airTemperature === null} yAxisData={airTemperature} xAxisData={observationTimeUtc} />
      </SimpleGrid>

      <Text
        color={textColor}
        fontSize='34px'
        textAlign='start'
        fontWeight='700'
        lineHeight='100%'
        my='10px'>
        Current weather
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
          value={currentWeather == null ? "- °C" : `${currentWeather.feelsLikeTemperature} °C`}
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
          value={currentWeather == null ? "- m/s" : `${currentWeather.windSpeed} m/s`}
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
          value={currentWeather == null ? "- %" : `${currentWeather.cloudCover} %`}
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
          value={currentWeather == null ? "- %" : `${currentWeather.precipitation} %`}
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
          value={currentWeather == null ? "-" : `${currentWeather.conditionCode}`}
        />
      </SimpleGrid>
    </Box>
  );
}
