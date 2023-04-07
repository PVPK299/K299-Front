import { useColorModeValue, FormLabel, Text } from "@chakra-ui/react";

const InputLabel = ({ text }) => {
    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    return (
        <FormLabel
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            display='flex'>
            {text} <Text color={brandStars}>*</Text>
        </FormLabel>
    );
}

export default InputLabel;