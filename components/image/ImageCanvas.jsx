import { Box, Flex } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import Draggable from "react-draggable";
const ImageCanvas = ({ url }) => {
  let canvasRef = useRef();
  let parent = useRef();
  let picker1 = useRef();
  let picker2 = useRef();
  let picker3 = useRef();
  let picker4 = useRef();
  let picker5 = useRef();


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
    
    let initialXYpositions = pickersXYpos();
    let initialPalettes =pickerPalettes(initialXYpositions);
    console.log(initialPalettes);
    

  }, [url]);
  const pickerPalettes=(positions)=>{
      let result=[];
      for(let i of positions){
          let x = i.x;
          let y=i.y;
          let rgb = getRgb(x,y);
          result.push(rgb);
      }
      return result;
  }
  const pickersXYpos=()=>{
    let result=[];
    let parentRect = parent.current.getBoundingClientRect();
    let pickers =[picker1.current,picker2.current,picker3.current,picker4.current,picker5.current];
    for(let i of pickers){
        let childRect = i.getBoundingClientRect();
        let x = childRect.left - parentRect.left;
        let y = childRect.top - parentRect.top;
        result.push({x,y});
    }
    return result;
  }

  const rgbToHex = (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    r.length == 1 ? (r = "0" + r) : (r = r);
    g.length == 1 ? (g = "0" + g) : g;
    b.length == 1 ? (b = "0" + b) : b;
    return "#" + r + g + b;
  };

  const getRgb =async  (x, y) => {
    let params = canvasRef.current.getContext("2d");
    console.log(x,y);
    let squareImage =await params.getImageData(x, y, 1, 1);
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
    console.log(rgb);
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
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Box h="80%" w="100%" position="relative" ref={parent}>
        <canvas
          style={{ height: "100%", width: "100%" }}
          ref={canvasRef}
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
    </Flex>
  );
};

export default ImageCanvas;
