import { Flex, Box,Image, Text } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <Flex  flexDirection="row" justifyContent="space-between" boxShadow="base" alignItems="center" px="1rem">
            <Box w="10rem" h="5rem">
                <Image src="https://res.cloudinary.com/dx1vtnzy6/image/upload/v1654339592/my-uploads/COLOR_STRIPS_2_dmwm8i.png" 
                alt="logo" />
            </Box>
            <Box>
                <Text fontWeight="bold">Generate mesmerizing palettes </Text>
            </Box>
        </Flex>
    )
}

export default Navbar
