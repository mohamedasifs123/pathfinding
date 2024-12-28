// runmaze algorithm

import recursive from "../algo/maze_Recursive";
import { BinaryTree } from "../algo/maze_binary";
import { MAX_COL, MAX_ROW, SPEEDS } from "./cons";
import { constructBorder } from "./helper";
import { GridType, MazeType, SpeedType, TileType } from "./types"

export const runMazeAlgorithm = async({
    maze,
    grid,   
    startTile,
    endTile,
    setIsDisabled,
    speed,
}:{
    maze: MazeType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    setIsDisabled: (isDisabled:boolean) => void;
    speed: SpeedType
})=>{
    if (maze==="BINARY_TREE") {
        await BinaryTree(grid,startTile,endTile,setIsDisabled,speed)  
    } else if (maze=== "RECURIVE_DIVISION"){
        const CurrentSpeed = SPEEDS.find((s)=>s.value===speed)!.value?? 2;

     //   await constructBorder(grid,startTile,endTile)
        await recursive({
            grid,
            startTile,
            endTile,
            row:1,
            col:1,
            height: Math.floor((MAX_ROW- 1)/2),
            weight: Math.floor((MAX_COL- 1)/2),
            setIsDisabled,
            speed
        })
        setTimeout(() => {
            setIsDisabled(false)
        }, 800 * CurrentSpeed);
    
    }


}

