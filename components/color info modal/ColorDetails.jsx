import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import convert from "color-convert";
import axios from "axios";
import { BiClipboard } from "react-icons/bi";
import { useToast } from "@chakra-ui/react";

const ColorDetails = ({ palette }) => {
  const [colorName, setColorName] = useState("");
  const [pantoneName, setPantoneName] = useState("");
  const toast = useToast();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://colors.dopely.top/api/colors_name/?colors=%23${palette.substring(
            1
          )}`
        );
        setColorName(response.data.results[0].name);
        const pantone = await axios.get(
          `https://colors.dopely.top/api/pantone/pantone_name/?hexadecimal=${palette.substring(
            1
          )}`
        );
        setPantoneName(pantone.data.code);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [palette]);
  const lab = convert.hex.lab.raw(palette).map((color) => color.toFixed(2));
  const hsl = convert.hex.hsl(palette);
  const cmyk = convert.hex.cmyk(palette);
  const rgb = convert.hex.rgb(palette);
  const copyHandler = (value) => {
    navigator.clipboard.writeText(value);
    toast({
      title: `${value} copied to clipboard`,
      position: "top-right",
      status: "success",
      duration: "2000",
      isClosable: true,
    });
  };
  return (
    <Flex flexDirection="column" alignItems="center" gap={5} >
      <Text fontSize="x-large" fontWeight="bold">
        {colorName ? colorName : "Loading..."}
      </Text>
      <Flex
        w="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(palette)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">HEX</Text>
          <Text>{palette}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(`HSL(${hsl.toString()})`)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">hsl</Text>
          <Text>{hsl.toString()}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(`CMYK(${cmyk.toString()})`)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">cmyk</Text>
          <Text>{cmyk.toString()}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(`LAB(${lab.toString()})`)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">lab</Text>
          <Text>{lab.toString()}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(`RGB(${rgb.toString()})`)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">RGB</Text>
          <Text>{rgb.toString()}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
      <Flex
        w="100%"
        flexDirection="row"
        alignItems="center"
        cursor="pointer"
        borderRadius="5px"
        p={1}
        _hover={{ background: "rgba(0,0,0,0.1)" }}
        onClick={() => copyHandler(`Pantone(${pantoneName})`)}
      >
        <Flex flexDirection="column" flexBasis="90%" alignItems="flex-start">
          <Text fontWeight="bold">Pantone</Text>
          <Text>{pantoneName}</Text>
        </Flex>
        <IconButton icon={<BiClipboard />} />
      </Flex>
    </Flex>
  );
};

export default ColorDetails;
