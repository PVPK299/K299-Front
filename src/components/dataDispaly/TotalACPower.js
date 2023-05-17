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
  import { fetchSolarDataByDate } from "networking/api";
  import { useState, useEffect } from "react";
  import { IoCheckmarkCircle } from "react-icons/io5";
  import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
  // Assets
  import { RiArrowUpSFill } from "react-icons/ri";
  import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
  } from "./charts";
  
  export default function TotalACPower(props) {
    const { Yaxis, Xaxis } = props;
    const [isLoading, setIsLoading] = useState(false);
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
    
    function filterByDate() {
      setIsLoading(true);
      fetchSolarDataByDate(dateFromValue, dateToValue)
        .then((data) => {
          const timeArray = data.map(item => item.time);
          const ACPowerArray = data.map(item => item.total_AC_Power);
          setYAxisData(lineChartDataTotalSpent(ACPowerArray));
          setXAxisData(lineChartOptionsTotalSpent(timeArray.map((element) => element.replace('T', ' ').substring(0, 19))));
          setIsLoading(false);
      });
    }

    useEffect(() => {
      setYAxisData(lineChartDataTotalSpent(Yaxis));
      setXAxisData(lineChartOptionsTotalSpent(Xaxis.map((element) => element.replace('T', ' ').substring(0, 19))));
    }, []);

    return (
      <Card
        justifyContent='center'
        align='center'
        direction='column'
        w='100%'
        mb='0px'>
        <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
          <Flex flexDirection='column' me='20px' mt='28px'>
            <Text
              color={textColor}
              fontSize='34px'
              textAlign='start'
              fontWeight='700'
              lineHeight='100%'>
              AC power
            </Text>
            <FormLabel mt='20px' mb='0' ml='1px' fontSize='14px'>Date From</FormLabel>
            <Input
              size="sm"
              type="date"
              id="date-from"
              value={dateFromValue}
              onChange={(e) => setDateFromValue(e.target.value)}/>
            <FormLabel mt='5px' mb='0' ml='1px' fontSize='14px'>Date To</FormLabel>
            <Input
              size="sm"
              type="date"
              id="date-to"
              value={dateToValue}
              onChange={(e) => setDateToValue(e.target.value)}/>
            <Button colorScheme='purple' mt='15px' size='sm' onClick={filterByDate}>
              Filter
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justifyContent='center' alignItems='center' width='100%'>Loading...</Flex>
          ) : (
            <>
              {Object.keys(yAxisData).length > 0 && Object.keys(xAxisData).length > 0 && (
                <Box minH='280px' mt='auto' flexGrow={1}>
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
  