import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { usePalette } from "../../context/palette-context";
import ColorDetails from "./ColorDetails";
const ColorInfoModal = ({setShowModal}) => {
  const { palettes } = usePalette();
  const [activePalette, setActivePalette] = useState("");
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
      onClick={()=>setShowModal(false)}
    >
      <Flex
        h="80%"
        w="30%"
        bg="white"
        justifyContent="space-between"
        borderRadius="1rem"
        onClick={e=>e.stopPropagation()}
      >
        <Tabs orientation="vertical" variant="unstyled" align="center" w="100%" h="100%">
          <TabList h="100%">
            {palettes.map((palette, index) => {
              return (
                <Tab
                height="20%"
                  key={palette + index}
                  bg={palette}
                  w="4rem"
                  cursor="pointer"
                  onClick={() => setActivePalette(palette)}
                ></Tab>
              );
            })}
          </TabList>
          <TabPanels>
              {
                  palettes.map((palette,index)=>{
                      return<TabPanel w="100%" h="100%">
                          <ColorDetails palette={palette}/>
                      </TabPanel>
                       
                  })
              }
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default ColorInfoModal;
