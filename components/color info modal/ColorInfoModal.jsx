import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
} from "@chakra-ui/react";
import { usePalette } from "../../context/palette-context";
import ColorDetails from "./ColorDetails";
import { BiXCircle } from "react-icons/bi";
const ColorInfoModal = ({ setShowModal }) => {
  const { palettes } = usePalette();
  return (
    <Flex
      position="fixed"
      w="100vw"
      top={0}
      left={0}
      h="100vh"
      bg="rgba(0,0,0,0.5)"
      justifyContent="center"
      alignItems="center"
      onClick={() => setShowModal(false)}
    >
      <Flex
        h="80%"
        w={{ base: "80%", md: "30%" }}
        bg="white"
        justifyContent="space-between"
        borderRadius="1rem"
        onClick={(e) => e.stopPropagation()}
        position="relative"
      >
        <Tabs
          orientation="vertical"
          variant="unstyled"
          align="center"
          w="100%"
          h="100%"
          defaultIndex={0}
        >
          <TabList h="100%">
            {palettes.map((palette, index) => {
              return (
                <Tab
                  key={palette + index}
                  height="20%"
                  bg={palette}
                  w="4rem"
                  cursor="pointer"
                ></Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {palettes.map((palette, index) => {
              return (
                <TabPanel key={palette + index} w="100%" h="100%">
                  <ColorDetails palette={palette} />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
        <IconButton
          icon={<BiXCircle />}
          position="absolute"
          top={1}
          right={1}
          borderRadius="1rem"
          onClick={() => setShowModal(false)}
        />
      </Flex>
    </Flex>
  );
};
export default ColorInfoModal;
