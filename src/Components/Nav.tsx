import {  MutableRefObject, useState } from "react";
import { usePathFinding } from "../hooks/usePathFinding";
import {Select} from "./Select"
import { useTile } from "../hooks/useTileContext";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { resetGrid } from "../utils/reset";
import { ALGORITHMS, EXTENDED_SLEEP_TIME, MAZES, SLEEP_TIME, SPEEDS } from "../utils/cons";
import { runMazeAlgorithm } from "../utils/run";
import { useSpeed } from "../hooks/useSpeed";
import { animatePath, runPathFindingAlgorithm } from "../utils/helper";
import { PlayButton } from "./Play";

export function Nav({
    isVisualizationunningef
}:{
    isVisualizationunningef:MutableRefObject<boolean>
}){
    const [isDisabled,setIsDisabled] = useState(false);
    const {maze,setMaze,grid,setGrid,isGraphVisualized, setIsGraphVisualized,algorithm,setAlgorithm} = usePathFinding();
    const {startTile,endTile} = useTile();
    const {speed,setSpeed} = useSpeed()

    const handleGenerateMaze =(maze: MazeType) => {
        if (maze==="NONE") {
            setMaze(maze);
            resetGrid({grid,startTile,endTile})
            return
        }
        setMaze(maze)
        setIsDisabled(true)
        runMazeAlgorithm({
            maze,grid, startTile,endTile,setIsDisabled,speed
        })
        const newGrid  =grid.slice()
        setGrid(newGrid)
        setIsGraphVisualized(false)


    }

    const handleRunVisualizer =()=>{
        if(isGraphVisualized){
            setIsGraphVisualized(false)
            resetGrid({grid: grid.slice(), startTile,endTile})
            return;
        }
        const {traversedTiles, path} = runPathFindingAlgorithm({
            algorithm,
                grid,
                startTile,
                endTile,
            })
            animatePath(traversedTiles,path, startTile,endTile,speed)
            setIsDisabled(true)

            isVisualizationunningef.current=true
            setTimeout(() => {
                const newGrid = grid.slice()
                setGrid(newGrid)
                setIsGraphVisualized(true)
                setIsDisabled(false)
                isVisualizationunningef.current= false
            }, (SLEEP_TIME* (traversedTiles.length + SLEEP_TIME* 2) + EXTENDED_SLEEP_TIME *(path.length+60) * SPEEDS.find((s) => s.value === speed)!.value));
        }
    return(
        <div className="flex items-center justify-center  min-h-[4.5rem] border-b shadow-gray-500 sm:px-5 px-0">
            <h1 className="lg:flex hidden w-[44%]  text-2x2 pl-2">
            Pathfinding Visualizer
        </h1>
    <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        {/* Title */}
        
        {/* Select Dropdown */}
        <div className=" flex sm:items-end items-center justify-center sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-2 sm:py-0 py-4 sm:space-x-4">
            <Select
                label="Maze"
                value={maze}
                options={MAZES}
                isDisabled={isDisabled}
                onChange={(e) => {
                    handleGenerateMaze(e.target.value as MazeType);
                }}
            />
            <Select
                label="speed"
                value={speed}
                options={SPEEDS}
              
                onChange={(e) => {
                    setSpeed(parseInt(e.target.value) as SpeedType)
                }}
            />
            <Select
                label="GRAPH"
                value={algorithm}
                options={ALGORITHMS}
              
                onChange={(e) => {
                    setAlgorithm(e.target.value as AlgorithmType)
                }}
            />
            
            <PlayButton isDisabled={isDisabled} isGraphVisualized={isGraphVisualized} handleRunVisualizer={handleRunVisualizer}           
            />
        </div>
    </div>
</div>

    )
}