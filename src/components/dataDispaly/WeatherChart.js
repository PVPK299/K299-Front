// Chakra imports
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    Input,
    FormLabel,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/card/Card.js";
  import LineChart from "components/charts/LineChart";
  import React from "react";
  import { getLatestKaunasWeather } from "networking/api";
  import { useState, useEffect } from "react";
  import { IoCheckmarkCircle } from "react-icons/io5";
  import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
  // Assets
  import { RiArrowUpSFill } from "react-icons/ri";
  import {
    weatherLineChartCloudCover,
    lineChartOptionsTotalSpent,
  } from "./charts";
  
  export default function TotalACPower(props) {
    const { Yaxis, Xaxis } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [yAxisData, setYAxisData] = useState({});
    const [xAxisData, setXAxisData] = useState({});
    const [dateFromValue, setDateFromValue] = useState("");
    const [dateToValue, setDateToValue] = useState("");
  
    // Chakra Color Mode
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
      { bg: "secondaryGray.400" },
      { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.100" }
    );

    useEffect(() => {
      getLatestKaunasWeather()
        .then((data) => {
        const xAxisKaunas = data.map(item => item.observationTimeUtc);
        const yAxisKaunas = data.map(item => item.cloudCover);
        setYAxisData(weatherLineChartCloudCover(yAxisKaunas));
        setXAxisData(lineChartOptionsTotalSpent(xAxisKaunas.map((element) => element.replace('T', ' ').substring(0, 19))));
        setIsLoading(false);
          });
    }, []);

    return (
      <Card
        justifyContent='center'
        align='center'
        direction='column'
        w='100%'
        mb='0px'>
        <Flex w='100%' flexDirection={{ base: "column" }}>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            Latest Cloud Cover In Kaunas, %
          </Text>
          {isLoading ? (
            <Flex justifyContent='center' alignItems='center' width='100%'>Loading...</Flex>
          ) : (
            <>
              {Object.keys(yAxisData).length > 0 && Object.keys(xAxisData).length > 0 && (
                <Box minH='280px' minW='75%' mt='auto'>
                  <LineChart
                    chartData={yAxisData}
                    chartOptions={xAxisData}
                  />
                </Box>
              )}
            </>
          )}
        </Flex>
      </Card>
    );
  }
  