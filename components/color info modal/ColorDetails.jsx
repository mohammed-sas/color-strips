import { Box, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import convert from "color-convert";
import axios from "axios";

const ColorDetails = ({ palette }) => {
  const [colorName, setColorName] = useState("");
  const [pantoneName, setPantoneName] = useState("");
  useEffect(() => {
    (async () => {
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
    })();
  }, [palette]);
  const lab = convert.hex.lab.raw(palette).map((color) => color.toFixed(2));
  const hsl = convert.hex.hsl(palette);
  const cmyk = convert.hex.cmyk(palette);
  const rgb = convert.hex.rgb(palette);

  return (
    <Flex flexDirection="column" alignItems="center" gap={5}>
      <Text fontSize="x-large" fontWeight="bold">{colorName ? colorName : "Loading..."}</Text>
      <Flex w="100%" flexDirection="column" alignItems="flex-start">
        <Text fontWeight="bold">HEX</Text>
        <Text>{palette}</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" alignItems="flex-start">
        <Text fontWeight="bold">hsl</Text>
        <Text>{hsl.toString()}</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" alignItems="flex-start">
        <Text fontWeight="bold">cmyk</Text>
        <Text>{cmyk.toString()}</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" alignItems="flex-start">
        <Text fontWeight="bold">lab</Text>
        <Text>{lab.toString()}</Text>
      </Flex>
      <Flex w="100%" flexDirection="column" alignItems="flex-start">
        <Text fontWeight="bold">Pantone</Text>
        <Text>{pantoneName}</Text>
      </Flex>
    </Flex>
  );
};

export default ColorDetails;
