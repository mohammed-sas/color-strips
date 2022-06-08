import { Box, Flex, Button } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import Palette from "../palette/Palette";
import { usePalette } from "../../context/palette-context";
import convert from "color-convert";
const ImageCanvas = () => {
  const { palettes, setPalettes, url } = usePalette();
  const [borders, setBorders] = useState([
    "white",
    "white",
    "white",
    "white",
    "white",
  ]);
  let canvasRef = useRef();
  let parent = useRef();
  let picker1 = useRef();
  let picker2 = useRef();
  let picker3 = useRef();
  let picker4 = useRef();
  let picker5 = useRef();
  let pickers = [
    picker1.current,
    picker2.current,
    picker3.current,
    picker4.current,
    picker5.current,
  ];

  useEffect(() => {
    buildImage(url);
    setBorders(["white", "white", "white", "white", "white"]);
  }, [url]);

  const buildImage = (imageUrl) => {
    setPalettes([]);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = `${imageUrl}`;
    img.crossOrigin = "Anonymous";
    const drawActual = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.onload = drawActual;
  };

  const pickerPalettes = (positions) => {
    let result = [];
    for (let i of positions) {
      let x = i.x;
      let y = i.y;
      let rgb = getHex(x, y);
      result.push(rgb);
    }
    return result;
  };
  const pickersXYpos = () => {
    let result = [];
    let parentRect = canvasRef.current.getBoundingClientRect();
    let scaleX =
      canvasRef.current.width / canvasRef.current.getBoundingClientRect().width;
    let scaleY =
      canvasRef.current.height /
      canvasRef.current.getBoundingClientRect().height;
    for (let i of pickers) {
      let childRect = i.getBoundingClientRect();
      let x = (childRect.left - parentRect.left) * scaleX;
      let y = (childRect.top - parentRect.top) * scaleY;
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

  function getContrastYIQ() {
    let rgb = palettes.map((palette) => convert.hex.rgb(palette));
    let yiq = rgb.map((c) => (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000);
    let pickerBorders = yiq.map((y) => (y >= 128 ? "black" : "white"));
    setBorders(pickerBorders);
  }

  const getHex = (x, y) => {
    let ctx = canvasRef.current.getContext("2d");
    let squareImage = ctx.getImageData(x, y, 1, 1);
    let colorData = squareImage.data;
    let hex = rgbToHex(colorData[0], colorData[1], colorData[2]);
    return hex;
  };

  const trackPos = (e, index) => {
    let parentRect = parent.current.getBoundingClientRect();
    let pickerRect = e.target.getBoundingClientRect();
    let scaleX =
      canvasRef.current.width / canvasRef.current.getBoundingClientRect().width;
    let scaleY =
      canvasRef.current.height /
      canvasRef.current.getBoundingClientRect().height;
    let x = (pickerRect.left - parentRect.left) * scaleX;
    let y = (pickerRect.top - parentRect.top) * scaleY;
    const hex = getHex(x, y);

    setPalettes(
      palettes.map((palette, i) => {
        if (i === index) {
          return hex;
        } else {
          return palette;
        }
      })
    );
    getContrastYIQ();
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
    <Box h="100%" w={{ base: "90%", lg: "100%" }}>
      <Box h="60%" w="100%" position="relative" ref={parent}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
        <Draggable
          bounds="parent"
          axis="both"
          disabled={palettes.length === 0 && true}
          onDrag={throttle((e, data) => trackPos(e, 0))}
        >
          <Box
            w="1.5rem"
            h="1.5rem"
            bg={palettes[0] ? palettes[0] : "transparent"}
            border={`3px solid ${borders[0]}`}
            borderRadius="50%"
            position="absolute"
            top="5%"
            left="5%"
            ref={picker1}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          disabled={palettes.length === 0 && true}
          onDrag={throttle((e, data) => trackPos(e, 1))}
        >
          <Box
            w="1.5rem"
            h="1.5rem"
            bg={palettes[1] ? palettes[1] : "transparent"}
            border={`3px solid ${borders[1]}`}
            borderRadius="50%"
            position="absolute"
            top="30%"
            left="20%"
            ref={picker2}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          disabled={palettes.length === 0 && true}
          onDrag={throttle((e, data) => trackPos(e, 2))}
        >
          <Box
            w="1.5rem"
            h="1.5rem"
            bg={palettes[2] ? palettes[2] : "transparent"}
            border={`3px solid ${borders[2]}`}
            borderRadius="50%"
            position="absolute"
            bottom="10%"
            left="60%"
            ref={picker3}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          disabled={palettes.length === 0 && true}
          onDrag={throttle((e, data) => trackPos(e, 3))}
        >
          <Box
            w="1.5rem"
            h="1.5rem"
            bg={palettes[3] ? palettes[3] : "transparent"}
            border={`3px solid ${borders[3]}`}
            borderRadius="50%"
            position="absolute"
            top="25%"
            right="5%"
            ref={picker4}
          ></Box>
        </Draggable>
        <Draggable
          bounds="parent"
          axis="both"
          disabled={palettes.length === 0 && true}
          onDrag={throttle((e, data) => trackPos(e, 4))}
        >
          <Box
            w="1.5rem"
            h="1.5rem"
            bg={palettes[4] ? palettes[4] : "transparent"}
            border={`3px solid ${borders[4]}`}
            borderRadius="50%"
            position="absolute"
            top="5%"
            right="30%"
            ref={picker5}
          ></Box>
        </Draggable>
      </Box>
      <Flex flexDirection="row" mt="1rem" gap={1} h="7rem" zIndex={5}>
        {palettes.map((palette, index) => {
          return <Palette key={palette + index} palette={palette} />;
        })}
      </Flex>
      <Box mt="1rem" textAlign="center">
        <Button
          onClick={generatePalette}
          colorScheme="messenger"
          disabled={palettes.length !== 0 && true}
        >
          Generate Palatte
        </Button>
      </Box>
    </Box>
  );
};

export default ImageCanvas;
