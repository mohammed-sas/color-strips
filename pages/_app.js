import { ChakraProvider } from "@chakra-ui/react";
import { PaletteProvider } from "../context/palette-context";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PaletteProvider>
        <Component {...pageProps} />
      </PaletteProvider>
    </ChakraProvider>
  );
}

export default MyApp;
