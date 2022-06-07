import { createContext, useContext, useState } from "react";
const PaletteContext = createContext(null);

const PaletteProvider = ({ children }) => {
  const [palettes, setPalettes] = useState([]);
  const [url,setUrl] = useState("");

  return (
    <PaletteContext.Provider value={{url,setUrl,palettes, setPalettes }}>
      {children}
    </PaletteContext.Provider>
  );
};

const usePalette = () => useContext(PaletteContext);

export { usePalette, PaletteProvider };
