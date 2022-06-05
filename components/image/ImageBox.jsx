import { Flex, Box, Button, Input,Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import ImageCanvas from './ImageCanvas';
const ImageBox = () => {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef();
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
        <Flex w="30rem" h="30rem" boxShadow="lg" justifyContent="center" alignItems="center">
          {imageUrl === "" ? (
            <Text>Kindly upload an image</Text>
          ) : (
            <ImageCanvas url={imageUrl}/>
          )}
        </Flex>
        <Box w="5rem" h="30rem" boxShadow="base"></Box>
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
    </Flex>
  );
};

export default ImageBox;
