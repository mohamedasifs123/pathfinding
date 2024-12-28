import { twMerge } from "tailwind-merge"
import { END_TILE_STYLE, MAX_ROW, PATH_TILE_STYLE, START_TILE_STYLE, TILE_STYLE, TRAVERSED_TILE_STYLE, WALL_TILE_STYLE } from "../utils/cons"

interface MouseFunction {
    (row: number,col:number): void;
}
export function Tile({
    row,
    col,
    isStart,
    isEnd,
    isTrversed,
    isWall,
    isPath,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp
}:{
    row:number
    col: number
    isStart: boolean
    isEnd: boolean
    isTrversed: boolean
    isWall: boolean
    isPath: boolean
    handleMouseDown: MouseFunction
    handleMouseEnter:MouseFunction
    handleMouseUp:MouseFunction
}) {
    let tileStyle;
    if (isStart) {
        tileStyle= START_TILE_STYLE
    }else if (isEnd) {
        tileStyle= END_TILE_STYLE
    } else if (isWall) {
        tileStyle= WALL_TILE_STYLE

    }else if (isPath) {
        tileStyle= PATH_TILE_STYLE
    }else if (isTrversed) {
        tileStyle=TRAVERSED_TILE_STYLE
    }else {
        tileStyle= TILE_STYLE
    }

    const borderStyle = row=== MAX_ROW-1 ? "border-b" : col===0 ? "border-l" :  ""

    const edgeStyle = row=== MAX_ROW-1 && col===0 ? "border-l" :  ""
    
return (
<div className={twMerge(tileStyle, borderStyle, edgeStyle)}  id={`${row}-${col}`} 
onMouseDown={()=> handleMouseDown(row,col)}
onMouseEnter={()=> handleMouseEnter(row,col)}
onMouseUp={()=>handleMouseUp(row,col)}
/>


)

}
