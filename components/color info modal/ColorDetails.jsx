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
    <Flex flexDirection="column" w="100%" gap={5}>
      <Text fontWeight="bold">{colorName ? colorName : "Loading..."}</Text>
      <Box>
        <Text>HEX</Text>
        <Text>{palette}</Text>
      </Box>
      <Box>
        <Text>hsl</Text>
        <Text>{hsl.toString()}</Text>
      </Box>
      <Box>
        <Text>cmyk</Text>
        <Text>{cmyk.toString()}</Text>
      </Box>
      <Box>
        <Text>lab</Text>
        <Text>{lab.toString()}</Text>
      </Box>
      <Box>
        <Text>Pantone</Text>
        <Text>{pantoneName}</Text>
      </Box>
      <Box>
        <Text></Text>
        <Text></Text>
      </Box>
    </Flex>
  );
};

export default ColorDetails;
