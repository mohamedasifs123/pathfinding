import { SPEEDS, WALL_TILE_STYLE } from "../utils/cons"
import { getRandInt, isEqual, sleep } from "../utils/helper"
import { GridType, TileType } from "../utils/types"

export default async function recursive({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    weight,
    setIsDisabled,
    speed
}:{
    grid:GridType
    startTile:TileType
    endTile:TileType
    row:number
    col:number
    height: number
    weight:number
    setIsDisabled:(isDisabled:boolean) => void
    speed:number
}) {
    if (height <= 1|| weight<= 1) {
        return
    }
    if (height>weight) {
        await horizontal({grid,
        startTile,
        endTile,
        row,
        col,
        height,
        weight,
        setIsDisabled,
        speed})    
            
    } else {
        await vertical({grid,
            startTile,
            endTile,
            row,
            col,
            height,
            weight,
            setIsDisabled,
            speed})    
                
    }
}

export async function horizontal ({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    weight,
    setIsDisabled,
    speed
}:{
    grid:GridType
    startTile:TileType
    endTile:TileType
    row:number
    col:number
    height: number
    weight:number
    setIsDisabled:(disabled: boolean) => void
    speed:number
}) {
    const MakeWallAt = row+ getRandInt(0,height-1)* 2 +1
    const MakePassageAt = col+ getRandInt(0,weight)* 2
    
    for (let i = 0; i < 2 *weight-1; i+=1) {
        if (MakePassageAt !== col+i) {
            if (!isEqual(grid[MakeWallAt][col+i], startTile) && !isEqual(grid[MakeWallAt][col+i],endTile)) {
                grid[MakeWallAt][col+i].isWall=true
                document.getElementById(`${MakeWallAt}-${col+i}`)!.className=`${WALL_TILE_STYLE} animate-wall` 
                await sleep(10* SPEEDS.find((s)=>s.value===speed)!.value-5)
        } }
        
    }
await recursive({
    grid,
    startTile,
    endTile,
    row,
    col,
    height: (MakeWallAt-row+ 1 )/2,
    weight,
    setIsDisabled,
    speed    
})
await recursive({
    grid,
    startTile,
    endTile,
    row: MakeWallAt + 1,
    col,
    height: height - (MakeWallAt -row+ 1) /2,
    weight,
    setIsDisabled,
    speed
})
}
export async function vertical ({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    weight,
    setIsDisabled,
    speed
}:{
    grid:GridType
    startTile:TileType
    endTile:TileType
    row:number
    col:number
    height: number
    weight:number
    setIsDisabled:(disabled: boolean) => void
    speed:number
}) {
    const MakeWallAt = col+ getRandInt(0,weight-1)* 2 +1
    const MakePassageAt = row+ getRandInt(0,height)* 2
    
    for (let i = 0; i < 2 *height-1; i+=1) {
        if (MakePassageAt !== row+i) {
            if (!isEqual(grid[row+i][MakeWallAt], startTile) && !isEqual(grid[row+i][MakeWallAt],endTile)) {
                grid[row+i][MakeWallAt].isWall=true
                document.getElementById(`${row+i}-${MakeWallAt}`)!.className=`${WALL_TILE_STYLE} animate-wall` 
                await sleep(10* SPEEDS.find((s)=>s.value===speed)!.value-5)
        } }
        
    }
await recursive({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    weight:(MakeWallAt -col + 1)/2,
    setIsDisabled,
    speed    
})
await recursive({
    grid,
    startTile,
    endTile,
    row,
    col:MakePassageAt+ 1,
    height,
    weight:weight-(MakeWallAt-col+ 1)/2,
    setIsDisabled,
    speed
})
}
