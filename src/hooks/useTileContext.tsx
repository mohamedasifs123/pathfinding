import React, { useContext } from 'react'
import { TileContext } from '../context/TileContext';

export const useTile = () => {
    const context = useContext(TileContext);
    if(!context){
        throw new Error("usetile must be used tilecontext")
    }
  return context;
}
