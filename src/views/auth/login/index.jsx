import React from "react";
import { useState, Component, PropTypes } from "react";

import { NavLink, useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import InputLabel from "./components/InputLabel.js";
import TextInputField from "./components/TextInputField.js";

// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import illustration from "assets/img/auth/Solar-login.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NewUser } from "models/user.js";
import { loginUser, getAllStations } from "networking/api.js";

function LoginCentered() {

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const history = useHistory();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const failedlogin = () => toast("Failed to login");
  const notify = () => toast("Logging you in");

  const login = () => {
    
    loginUser(email, password).then((data) => {
      console.log(data);
      if(data.error == null){
        notify();
        var newUser = new NewUser(data.email, data.password, data.first_name, data.last_name, data.park_share);
        localStorage.setItem('user', JSON.stringify(newUser))
        history.push('/admin/main-information');
      }
      else
      {
        failedlogin();
      }
  });
    getAllStations();
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Login
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            All you have to do is entering your email and password to login!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Flex align='center' mb='25px'>
            <HSeparator />
          </Flex>
          <FormControl>
            <InputLabel text="Email" />
            <TextInputField
              type='email'
              placeholder='example@mail.com'
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <InputGroup size='md'>
              <TextInputField
                type='password'
                minLength={8}
                placeholder='password'
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={login}>
              Login
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Don't have an account?
              <NavLink to='/auth/register'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Register
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <ToastContainer />
    </DefaultAuth>
  );
}

export default LoginCentered;
