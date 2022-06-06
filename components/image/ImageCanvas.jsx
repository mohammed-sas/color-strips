import { Box, Flex, Button } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import Palette from "../palette/Palette";

const ImageCanvas = ({ url }) => {
  let canvasRef = useRef();
  let parent = useRef();
  let picker1 = useRef();
  let picker2 = useRef();
  let picker3 = useRef();
  let picker4 = useRef();
  let picker5 = useRef();
  const [palettes,setPalettes] = useState([]);
  useEffect(() => {
    setPalettes([]);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = `${url}`;
    img.crossOrigin = "Anonymous";
    const drawActual = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.onload = drawActual;
  },[url]);

  const pickerPalettes = (positions) => {
    let result = [];
    for (let i of positions) {
      let x = i.x;
      let y = i.y;
      let rgb = getRgb(x, y);
      result.push(rgb);
    }
    return result;
  };
  const pickersXYpos = () => {
    let result = [];
    let parentRect = parent.current.getBoundingClientRect();
    let pickers = [
      picker1.current,
      picker2.current,
      picker3.current,
      picker4.current,
      picker5.current,
    ];
    for (let i of pickers) {
      let childRect = i.getBoundingClientRect();
      let x = childRect.left - parentRect.left;
      let y = childRect.top - parentRect.top;
      result.push({ x, y });
    }
    return result;
  };

  const rgbToHex = (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    r.length == 1 ? (r = "0" + r) : (r = r);
    g.length == 1 ? (g = "0" + g) : g;
    b.length == 1 ? (b = "0" + b) : b;
    return "#" + r + g + b;
  };

  const getRgb = (x, y) => {
    let params = canvasRef.current.getContext("2d");
    let squareImage = params.getImageData(x, y, 1, 1);
    let colorData = squareImage.data;
    let rgb = rgbToHex(colorData[0], colorData[1], colorData[2]);
    return rgb;
  };

  const trackPos = (e) => {
    let parentRect = parent.current.getBoundingClientRect();
    let pickerRect = e.target.getBoundingClientRect();
    let x = pickerRect.left - parentRect.left;
    let y = pickerRect.top - parentRect.top;
    const rgb = getRgb(x, y);
    return rgb;
  };
  const generatePalette = () => {
    let initialXYpositions = pickersXYpos();
    let imagePalattes = pickerPalettes(initialXYpositions);
    setPalettes(imagePalattes);
  };
  const throttle = (cb) => {
    let timer = false;
    return (...args) => {
      if (!timer) {
        timer = true;
        cb(...args);
        setTimeout(() => (timer = false), 400);
      }
    };
  };
  return (
    <Box h="100%" w="100%">
      <Box h="60%" w="100%" position="relative" ref={parent}>
        <canvas
          ref={canvasRef}
          style={{ height: "100%", width: "100%" }}
        ></canvas>
        <Draggable
          bounds="parent"
          axis="both"
          onDrag={throttle((e, data) => trackPos(e))}
        >
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            left={0}
            ref={picker1}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          onDrag={throttle((e, data) => trackPos(e))}
        >
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            left={30}
            ref={picker2}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          onDrag={throttle((e, data) => trackPos(e))}
        >
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            bottom={20}
            left={0}
            ref={picker3}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          onDrag={throttle((e, data) => trackPos(e))}
        >
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            right={0}
            ref={picker4}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          onDrag={(e, data) => trackPos(e)}
        >
          <Box
            w="2rem"
            h="2rem"
            bg="transparent"
            border="3px solid white"
            borderRadius="50%"
            position="absolute"
            top={0}
            right={20}
            ref={picker5}
          ></Box>
        </Draggable>
      </Box>
      <Flex flexDirection="row" mt="1rem" gap={1} h="7rem">
        {
          palettes.map((palette,index)=>{
            return <Palette key={palette+index} palette={palette}/>
          })
        }
      </Flex>
      <Box mt="1rem">
        <Button onClick={generatePalette} colorScheme="messenger">
          Generate Palatte
        </Button>
      </Box>
    </Box>
  );
};

export default ImageCanvas;
