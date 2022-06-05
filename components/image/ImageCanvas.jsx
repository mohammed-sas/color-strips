import { Box, Flex } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
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
    }
      img.onload = drawActual;
      img.src = `${url}`;
      img.crossOrigin = "Anonymous";
    
  }, [url]);

  return (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Box h="80%" w="100%">
        <canvas
          style={{ height: "100%", width: "100%" }}
          ref={canvasRef}
        ></canvas>
      </Box>
    </Flex>
  );
};

export default ImageCanvas;
