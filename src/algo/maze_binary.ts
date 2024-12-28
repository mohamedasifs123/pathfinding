import { MAX_COL, MAX_ROW } from "../utils/cons";
import { checkStack, createWall, destroyWall, getRandInt, getUntraversedNeighbours, isEqual, sleep } from "../utils/helper";
import { GridType,SpeedType,TileType } from "../utils/types";

export const BinaryTree = async (
    
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    setIsDisabled: (isDisabled:boolean) => void,
    speed: SpeedType
)=>{
    createWall(startTile,endTile,speed);
    await sleep(MAX_COL*MAX_ROW);

    for (const row of grid){
        for(const tile of row){
            if(tile.row%2===0||tile.col%2===0){
                if (!isEqual(tile,startTile ) && !isEqual(tile,endTile)) {
                    tile.isWall=true;
                }
            }
        }
    }

    for (let row = 1; row < MAX_ROW; row+=2) {
        for (let col = 1; col < MAX_COL; col+=2) {
            if (row===MAX_ROW-2 && col ===MAX_COL-2  ) {
                continue
            } else if(row===MAX_ROW-2) {
                await destroyWall(grid,row,col,1,speed)
            }         
        
         else if(col===MAX_COL-2) {
            await destroyWall(grid,row,col,0,speed)
        }     else {
            await destroyWall(grid,row,col,getRandInt(0,2),speed)
        }
        }
        
    }
setIsDisabled(false);
}


//bfs
export const bfs =(grid:GridType, startTile:TileType,endTile:TileType) =>{
    const traversedTiles: TileType[]=[];
    const base = grid[startTile.row][startTile.col]
    base.distance= 0
    base.isTraversed= true
    const unTraversed =[base]

    while (unTraversed.length) {
        const tile = unTraversed.shift()as TileType;
        if (tile.isWall) {
            continue
        }
        if (tile.distance=== Infinity) {
            break
        }
        tile.isTraversed= true
        traversedTiles.push(tile)
        if (isEqual(tile, endTile)) {
            break
        }

        const neighbours = getUntraversedNeighbours(grid,tile);
        for (let i = 0; i < neighbours.length; i++) {
            if(!isInQueue(neighbours[i],unTraversed)){
                const neighbour = neighbours[i];
                neighbour.distance=tile.distance+1
                neighbour.parent=tile
                unTraversed.push(neighbour)
            }
            
        }
    }

    const path= []
    let tile = grid[endTile.row][endTile.col];
    while (tile!== null) {
        tile.isPath=true;
        path.unshift(tile)
        tile= tile.parent
    }

    return {traversedTiles,path}
}
export const dfs =(grid:GridType, startTile:TileType,endTile:TileType) =>{
    const traversedTiles=[];
    const base = grid[startTile.row][startTile.col]
    base.distance= 0
    base.isTraversed= true
    const unTraversed =[base]

    while (unTraversed.length>0) {
        const tile = unTraversed.pop();
        if (tile) {
        if (tile.isWall) {
            continue
        }
        if (tile.distance=== Infinity) {
            break
        }
        tile.isTraversed= true
        traversedTiles.push(tile)
        if (isEqual(tile, endTile)) {
            break
        }

        const neighbours = getUntraversedNeighbours(grid,tile);
        for (let i = 0; i < neighbours.length; i++) {
            if(!checkStack(neighbours[i],unTraversed)){
                const neighbour = neighbours[i];
                neighbour.distance=tile.distance+1
                neighbour.parent=tile
                unTraversed.push(neighbour)
            }
            
        }}
    }

    const path= []
    let tile = grid[endTile.row][endTile.col];
    while (tile!== null) {
        tile.isPath=true;
        path.unshift(tile)
        tile= tile.parent
    }

    return {traversedTiles,path}
}
export const djs =(grid:GridType, startTile:TileType,endTile:TileType) =>{
    const traversedTiles=[];
    const base = grid[startTile.row][startTile.col]
    base.distance= 0
    base.isTraversed= true
    const unTraversed =[base]

    while (unTraversed.length>0) {
        unTraversed.sort((a,b)=> a.distance-b.distance)
        const tile = unTraversed.shift();
        if (tile) {
        if (tile.isWall) {
            continue
        }
        if (tile.distance=== Infinity) {
            break
        }
        tile.isTraversed= true
        traversedTiles.push(tile)
        if (isEqual(tile, endTile)) {
            break
        }

        const neighbours = getUntraversedNeighbours(grid,tile);
        for (let i = 0; i < neighbours.length; i++) {
            if(tile.distance+1 < neighbours[i].distance){
                dropFromQueue(neighbours[i],unTraversed)
                const neighbour = neighbours[i];
                neighbour.distance=tile.distance+1
                neighbour.parent=tile
                unTraversed.push(neighbour)
            }
            
        }}
    }

    const path= []
    let tile = grid[endTile.row][endTile.col];
    while (tile!== null) {
        tile.isPath=true;
        path.unshift(tile)
        tile= tile.parent
    }

    return {traversedTiles,path}
}


export function isInQueue (tile:TileType, queue:TileType[]){
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) return true;
        
    }
    return false
}
export function dropFromQueue (tile:TileType, queue:TileType[]){
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) 
        queue.splice(i,1)
    break;
        
    }
}

