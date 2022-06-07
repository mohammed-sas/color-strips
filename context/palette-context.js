import { createContext, useContext, useState,useEffect } from "react";
import axios from 'axios';
const PaletteContext = createContext(null);

const PaletteProvider = ({ children }) => {
  const [palettes, setPalettes] = useState([]);
  const [url,setUrl] = useState("");
  useEffect(()=>{
    console.log("inside palette context");
    const fetchImage=async ()=>{
      try{
        const response = await axios.get("https://colors.dopely.top/api/images/random/");
        setUrl(response.data.main)
      }catch(error){
        console.log(error);
      }
    }
    fetchImage();
  },[])
  return (
    <PaletteContext.Provider value={{url,setUrl,palettes, setPalettes }}>
      {children}
    </PaletteContext.Provider>
  );
};

const usePalette = () => useContext(PaletteContext);

export { usePalette, PaletteProvider };
