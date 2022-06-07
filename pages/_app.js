import { ChakraProvider } from "@chakra-ui/react";
import { PaletteProvider } from "../context/palette-context";
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PaletteProvider>
      <Head>
        <title>Color Strips</title>
      </Head>
        <Component {...pageProps} />
      </PaletteProvider>
    </ChakraProvider>
  );
}

export default MyApp;
