import { useColorModeValue, Input } from "@chakra-ui/react";

const TextInputField = ({ name, type, placeholder, minLength, onChange }) => {
    return (
        <Input
            name={name}
            isRequired={true}
            variant='auth'
            fontSize='sm'
            ms={{ base: "0px", md: "0px" }}
            type={type}
            placeholder={placeholder}
            minLength={minLength}
            onChange={onChange}
            mb='24px'
            fontWeight='500'
            size='lg'
        />
    );
}

export default TextInputField;