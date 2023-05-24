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
import illustration from "assets/img/auth/auth.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NewUser } from "models/user.js";
import { registerUser } from "networking/api.js";




function RegisterCentered() {


  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const history = useHistory();

  const register = () => {
    var newUser = new NewUser(email, password, firstName, lastName);

    console.log(newUser);
    registerUser(newUser).then((user) => {
      console.log(user);

      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    });
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
            Register
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            All you have to do is entering your email and password to register!
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

            <InputLabel text="Password" />
            <InputGroup size='md'>
              <TextInputField
                type='password'
                minLength={8}
                placeholder='Min. 8 characters'
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
            <InputLabel text="Re-password" />
            <InputGroup size='md'>
              <TextInputField
                type='password'
                minLength={8}
                placeholder='repeat password'
                onChange={(e) => { setRePassword(e.target.value) }}
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
            <InputLabel text="First name" />
            <TextInputField
              type='name'
              minLength={2}
              placeholder='John'
              onChange={(e) => { setFirstName(e.target.value) }}
            />
            <InputLabel text="Last name" />
            <TextInputField
              type='name'
              minLength={2}
              placeholder='Sunny'
              onChange={(e) => { setLastName(e.target.value) }}
            />
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={register}>
              Register
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Already have an account?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Login
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

export default RegisterCentered;
