// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { getLatestKaunasWeather } from "networking/api";
import { useState, useEffect } from "react";

// Assets

import {
  weatherLineChartCloudCover,
  lineChartOptionsTotalSpent,
} from "./charts";

export default function TotalACPower(props) {
  const { title, isLoading, yAxisData, xAxisData } = props;



  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");




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
          {title}
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
