import {
  Flex,
  Box,
  Button,
  Input,
  Text,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import ImageCanvas from "./ImageCanvas";
import { IconButton } from "@chakra-ui/react";
import { BiCodeAlt, BiImage, BiUpload, BiShareAlt } from "react-icons/bi";
import ColorInfoModal from "../color info modal/ColorInfoModal";
import axios from "axios";
import { usePalette } from "../../context/palette-context";
import SocialShare from "../social share/SocialShare";
const ImageBox = () => {
  const { url, setUrl, palettes } = usePalette();
  const inputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const uploadHandler = () => {
    inputRef.current.click();
  };

  const changeHandler = (e) => {
    let imageUrl = URL.createObjectURL(e.target.files[0]);
    setUrl(imageUrl);
  };
  const fetchImage = async () => {
    try {
      const response = await axios.get(
        " https://colors.dopely.top/api/images/random/"
      );
      setUrl(response.data.main);
    } catch (error) {
      console.log(error);
    }
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
          {url === "" ? <Spinner size="xl" color="#0078ff" /> : <ImageCanvas />}
        </Flex>
        <Flex
          w="5rem"
          h="30rem"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          pt={5}
          gap={5}
        >
          <Tooltip placement="right" label="upload image">
            <IconButton
              icon={<BiUpload />}
              bgColor="#0078ff"
              color="#fff"
              onClick={uploadHandler}
            />
          </Tooltip>
          <Tooltip placement="right" label="view properties">
            <IconButton
              icon={<BiCodeAlt />}
              disabled={palettes.length === 0 ? true : false}
              onClick={() => setShowModal(true)}
            />
          </Tooltip>

          <Tooltip placement="right" label="next image">
            <IconButton icon={<BiImage />} onClick={fetchImage} />
          </Tooltip>
          <Tooltip placement="right" label="share" zIndex={1}>
            <IconButton
              icon={<BiShareAlt onClick={() => setShowSocial(true)} />}
              disabled={palettes.length === 0 ? true : false}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Box>
        <Input
          type="file"
          display="none"
          ref={inputRef}
          onChange={changeHandler}
        />
      </Box>
      {showModal && <ColorInfoModal setShowModal={setShowModal} />}
      {showSocial && <SocialShare setShowSocial={setShowSocial} />}
    </Flex>
  );
};

export default ImageBox;
