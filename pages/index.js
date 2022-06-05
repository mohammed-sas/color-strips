import { Navbar, ImageBox } from "../components";
import {Flex} from '@chakra-ui/react';
export default function Home() {
  return (
    <Flex flexDirection="column" gap="2rem" >
      <Navbar />
      <ImageBox />
    </Flex>
  );
}
