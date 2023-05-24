// Chakra imports
import { SimpleGrid, Text, useColorModeValue, InputGroup, FormControl, Button } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { useEffect } from "react";
import { React, useState } from "react";
import Information from "views/admin/profile/components/Information";

import InputLabel from "views/auth/register/components/InputLabel.js";
import TextInputField from "views/auth/register/components/TextInputField.js";
import { updateUser } from "networking/api.js";


// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const user = props.user;

  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState(user?.password)
  const [first_name, setFirstName] = useState(user?.first_name)
  const [last_name, setLastName] = useState(user?.last_name)

  useEffect(() => {
    setEmail(user?.email);
    setPassword(user?.password);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
  }, [user]);

  const handleSave = () => {
    updateUser({
      id: user.id,
      email: email,
    }).then(updatedUser => {
      console.log(updatedUser);

      if (updatedUser['error'] === null) {
        localStorage.setItem('user', JSON.stringify(updateUser));
      } else {
        console.error('There was an error. User profile is no updated in localStorage');
      }
    })
  }


  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Edit profile
      </Text>
      <FormControl>
        <InputLabel text="Email" />
        <TextInputField
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />

        <InputLabel text="Password" />
        <InputGroup size='md'>
          <TextInputField
            type='text'
            minLength={8}
            placeholder='Min. 8 characters'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

        </InputGroup>

        <InputLabel text="First name" />
        <TextInputField
          type='name'
          minLength={2}
          placeholder='John'
          value={first_name}
          onChange={(e) => { setFirstName(e.target.value) }}
        />
        <InputLabel text="Last name" />
        <TextInputField
          type='name'
          minLength={2}
          placeholder='Sunny'
          value={last_name}
          onChange={(e) => { setLastName(e.target.value) }}
        />
        <Button
          fontSize='sm'
          variant='brand'
          fontWeight='500'
          w='100%'
          h='50'
          mb='24px'
          onClick={handleSave}
        >
          Save changes
        </Button>
      </FormControl>
    </Card >
  );
}
