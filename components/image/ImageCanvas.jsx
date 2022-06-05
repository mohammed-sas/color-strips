import { Box, Flex } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import Draggable from "react-draggable";
const ImageCanvas = ({ url }) => {
  let canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let img = new Image();
    const drawActual = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.onload = drawActual;
    img.src = `${url}`;
    img.crossOrigin = "Anonymous";
  }, [url]);

  return (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Box h="80%" w="100%" position="relative">
        <canvas
          style={{ height: "100%", width: "100%" }}
          ref={canvasRef}
        ></canvas>
        <Draggable bounds="parent" axis="both">
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            left={0}
          ></Box>
        </Draggable>
        <Draggable bounds="parent" axis="both">
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            left={30}
          ></Box>
        </Draggable>
        <Draggable bounds="parent" axis="both">
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position='absolute'
            bottom={20}
            left={0}
          ></Box>
        </Draggable>
        <Draggable bounds="parent" axis="both">
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            right={0}
          ></Box>
        </Draggable>
        <Draggable bounds="parent" axis="both">
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            right={20}
          ></Box>
        </Draggable>
      </Box>
    </Flex>
  );
};

export default ImageCanvas;
