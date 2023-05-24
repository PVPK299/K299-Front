// chakra imports
import { Icon, Box, Flex, Stack, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { MdLock } from "react-icons/md";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";

import { NavLink, useLocation, useHistory } from "react-router-dom";




// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;

  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");


  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    history.push('/');
  }

  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
          {localStorage.getItem('user') !== null &&
            <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
              <Box>
                <HStack
                  spacing="26px"
                  py='5px'
                  ps='10px'>
                  <Flex w='100%' alignItems='center' justifyContent='center'>
                    <Box
                      color={textColor}
                      me='18px'>
                      <Icon as={MdLock} width='20px' height='20px' color='inherit' />
                    </Box>
                    <Text
                      me='auto'
                      color={textColor}
                      fontWeight="normal"
                    >
                      Sign out
                    </Text>
                  </Flex>
                  <Box
                    h='36px'
                    w='4px'
                    bg="transparent"
                    borderRadius='5px'
                  />
                </HStack>
              </Box>
            </div>
          }
        </Box>
      </Stack>

      <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        {/* <SidebarCard /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
