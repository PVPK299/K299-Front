// chakra imports
import { Icon, Flex, Text, useColorModeValue, Link } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'
import React from "react";

export function ItemContent(props) {
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <>
    <Flex
      justify='center'
      align='center'
      borderRadius='16px'
      minH={{ base: "60px", md: "70px" }}
      h={{ base: "60px", md: "70px" }}
      minW={{ base: "60px", md: "70px" }}
      w={{ base: "60px", md: "70px" }}
      me='14px'
      bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'>
      <Icon
      as={SunIcon}
      width='20px'
      height='20px'
      color='white'
    />
    </Flex>
    <Link
      mx='3px'
      color={textColor}
      href='/admin/weather-information'
      fontWeight='700'>
      <Flex flexDirection='column'>
        <Text
          mb='5px'
          fontWeight='bold'
          color={textColor}
          fontSize={{ base: "md", md: "md" }}>
          New Weather Forecast
        </Text>
        <Flex alignItems='center'>
          <Text
            fontSize={{ base: "sm", md: "sm" }}
            lineHeight='100%'
            fontWeight='400'
            color={textColor}>
            Check out our weather forecast to plan your power generation!
          </Text>
        </Flex>
      </Flex>
    </Link>
    </>
  );
}
