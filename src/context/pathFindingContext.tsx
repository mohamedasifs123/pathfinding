import {  ReactNode, createContext, useState } from "react";
import { Algorithm, GridType, MazeType } from "../utils/types";
import { createGrid } from "../utils/helper";
import {  END_TILE_CONF, START_TILE_CONF } from "../utils/cons";

interface PathFindingContextInterface{
    algorithm: Algorithm;
    setAlgorithm: (algorithm: Algorithm) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) =>  void;
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isGraphVisualized: boolean;
    setIsGraphVisualized: (isGraphVisualized: boolean) => void;

}


export const PathFindingContext = createContext<PathFindingContextInterface | undefined>(undefined);

export const PathFindingProvider = ({children}: {children: ReactNode}) => {
    const [algorithm,setAlgorithm] = useState<Algorithm>("bfs");
    const [maze,setMaze] = useState<MazeType>("NONE");
    const [grid,setGrid] = useState<GridType>(createGrid(START_TILE_CONF,END_TILE_CONF));
    const [isGraphVisualized,setIsGraphVisualized] = useState<boolean>(false);

    return (
        <PathFindingContext.Provider
        value={{
            algorithm,
            setAlgorithm,
            maze,
            setMaze,
            grid,
            setGrid,
            isGraphVisualized,
            setIsGraphVisualized,
        }}
        >
            {children}
            </PathFindingContext.Provider>
    )
}

