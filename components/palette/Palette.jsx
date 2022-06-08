import { Box, Flex,Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from 'axios'

const Palette = ({palette}) => {
    const [colorName,setColorName] = useState("");
    useEffect(()=>{
        (async ()=>{
            const response = await axios.get(`https://colors.dopely.top/api/colors_name/?colors=%23${palette.substring(1)}`);
            setColorName(response.data.results[0].name);
        })()
    },[palette])
    return (
        <Flex flexDirection="column" gap={2} alignItems="center" flexBasis="20%" flexGrow={0}>
        <Box bg={palette} w="100%" h="4rem"> 
        </Box>
        <Text fontWeight="bold" h="2rem" w={{base:"4rem",lg:"5rem"}} fontSize="sm" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{colorName}</Text>
        {colorName===""? <Text>Loading...</Text> : <Text>{palette}</Text>}
        </Flex>
    )
}

export default Palette
