import { Flex, Box, Button, Input, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import ImageCanvas from "./ImageCanvas";
import { IconButton } from "@chakra-ui/react";
import { BiCodeAlt } from "react-icons/bi";
import ColorInfoModal from "../color info modal/ColorInfoModal";
const ImageBox = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const uploadHandler = () => {
    inputRef.current.click();
  };

  const changeHandler = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };
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
          {imageUrl === "" ? (
            <Text>Kindly upload an image</Text>
          ) : (
            <ImageCanvas url={imageUrl} />
          )}
        </Flex>
        <Flex
          w="5rem"
          h="30rem"
          boxShadow="base"
          flexDirection="column"
          alignItems="center"
        >
          <IconButton
            aria-label="color-properties"
            icon={<BiCodeAlt />}
            onClick={() => setShowModal(true)}
          />
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
