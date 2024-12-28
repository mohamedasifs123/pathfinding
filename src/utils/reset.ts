//resetgrid

import { END_TILE_CONF, MAX_COL, MAX_ROW, START_TILE_CONF, TILE_STYLE } from "./cons";
import { isEqual } from "./helper";
import { GridType, TileType } from "./types";

export const resetGrid =({
    grid,
    startTile = START_TILE_CONF,
    endTile= END_TILE_CONF,
}:{
    grid: GridType;
    startTile?: TileType;
    endTile?: TileType;
}) => {
    
    for(let row=0 ;row<MAX_ROW;row++){
        for(let col=0 ;row<MAX_COL;col++){
            const tile = grid[row][col]
            tile.distance= Infinity
            tile.isTraversed= false
            tile.isPath= false
            tile.parent= null
            tile.isWall= false
        
        if (!isEqual(startTile,tile) && !isEqual(endTile,tile) ) {
            const tileElement =  document.getElementById(`$(tile.row-$(tile.col)`)

            if (tileElement) {
                tileElement.className= TILE_STYLE
            }
            if (tile.row === MAX_ROW -1) {
                tileElement?.classList.add("border-b")
            }
            if (tile.col===0) {
                tileElement?.classList.add("border-l")
            }
        }
    }  }
}