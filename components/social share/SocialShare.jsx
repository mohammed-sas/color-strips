import "core-js/actual";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { BiXCircle } from "react-icons/bi";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { usePalette } from "../../context/palette-context";

const SocialShare = ({ setShowSocial }) => {
  const { palettes } = usePalette();
  let output = "";
  for (let i in palettes) output += `color${Number(i) + 1} : ${palettes[i]}, `;
  return (
    <Flex
      position="fixed"
      w="100vw"
      h="100vh"
      top={0}
      left={0}
      justifyContent="center"
      alignItems="center"
      bg="rgba(0,0,0,0.2)"
    >
      <Flex bg="white" h="60%" w="70%" zIndex={10} borderRadius="1rem">
        <Flex flexBasis="50%" h="100%" borderRadius="1rem">
          {palettes.map((palette, index) => {
            return (
              <Box
                key={palette + index}
                h="100%"
                flexBasis="20%"
                bg={palette}
              ></Box>
            );
          })}
        </Flex>
        <Flex
          flexBasis="50%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={10}
          position="relative"
        >
          <IconButton
            icon={<BiXCircle />}
            position="absolute"
            top={1}
            right={1}
            onClick={() => setShowSocial(false)}
          />
          <Text fontWeight="bold" fontSize="lg">
            Share your palettes
          </Text>
          <Flex gap={5} justifyContent="center" alignItems="center">
            <TwitterShareButton url={output}>
              <TwitterIcon size={50} round={true}></TwitterIcon>
            </TwitterShareButton>
            <WhatsappShareButton url={output}>
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SocialShare;
