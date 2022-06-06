import { createContext, useContext, useState } from "react";
const PaletteContext = createContext(null);

const PaletteProvider = ({ children }) => {
  const [palettes, setPalettes] = useState([]);

  return (
    <PaletteContext.Provider value={{ palettes, setPalettes }}>
      {children}
    </PaletteContext.Provider>
  );
};

const usePalette = () => useContext(PaletteContext);

export { usePalette, PaletteProvider };
