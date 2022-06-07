import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import ImageCanvas from "./ImageCanvas";
import { IconButton } from "@chakra-ui/react";
import { BiCodeAlt, BiImage } from "react-icons/bi";
import ColorInfoModal from "../color info modal/ColorInfoModal";
import axios from "axios";
import { usePalette } from "../../context/palette-context";
const ImageBox = () => {
    const {url,setUrl} = usePalette();
  const inputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const uploadHandler = () => {
    inputRef.current.click();
  };

  const changeHandler = (e) => {
    let imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };
  const fetchImage=async ()=>{
    try{
      const response = await axios.get(" https://colors.dopely.top/api/images/random/");
      setUrl(response.data.main)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      flexDirection="column"
    >
      <Flex justifyContent="center" alignItems="center" gap="1rem">
        <Flex
          w="35rem"
          h="30rem"
          boxShadow="lg"
          justifyContent="center"
          alignItems="center"
        >
          {url === "" ? (
            <Text>Kindly upload an image</Text>
          ) : (
            <ImageCanvas/>
          )}
        </Flex>
        <Flex
          w="5rem"
          h="30rem"
          boxShadow="base"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          pt={5}
          gap={5}
        >
          <IconButton
            aria-label="color-properties"
            icon={<BiCodeAlt />}
            onClick={() => setShowModal(true)}
          />
          <IconButton aria-label="new-image" icon={<BiImage />} onClick={fetchImage} />
        </Flex>
      </Flex>
      <Box>
        <Input
          type="file"
          display="none"
          ref={inputRef}
          onChange={changeHandler}
        />
        <Button
          variant="solid"
          colorScheme="messenger"
          color="white"
          onClick={uploadHandler}
        >
          Upload Image{" "}
        </Button>
      </Box>
      {showModal && <ColorInfoModal setShowModal={setShowModal} />}
    </Flex>
  );
};

export default ImageBox;
