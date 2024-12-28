import { bfs, dfs, djs } from "../algo/maze_binary";
import { EXTENDED_SLEEP_TIME, MAX_COL, MAX_ROW, PATH_TILE_STYLE, SLEEP_TIME, SPEEDS, TILE_STYLE, TRAVERSED_TILE_STYLE, WALL_TILE_STYLE } from "./cons";
import { AlgorithmType, GridType, SpeedType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
    const CurrentRow = []
    for (let col = 0; col < MAX_COL; col++) {
        CurrentRow.push({
            row,
            col,
            isEnd: row === endTile.row && col === endTile.col,
            isWall: false,
            isPath: false,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isTraversed: false,
            parent: null,


        });
    }
    return CurrentRow;
}

export const createGrid = (startTile: TileType, endTile: TileType) => {
    const grid: GridType = [];
    for (let row = 0; row < MAX_ROW; row++) {
        grid.push(createRow(row, startTile, endTile))
    }
    return grid;
}

export const chechIfStartOrEnd = (row: number, col: number) => {
    return (row === 1 && col === 1) || (row === MAX_ROW - 2 && col === MAX_COL - 2);
}


export const createNewGrid = (grid: GridType, row: number, col: number) => {
    const newGrid = grid.slice();
    const newTile = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall,
    }
    newGrid[row][col] = newTile
    return newGrid
}

export const isEqual = (a: TileType, b: TileType) => {
    return a.row === b.row && a.col === b.col

}

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
    return row === tile.row && col === tile.col

}
export const sleep = (s: number) => {
    return new Promise((resolve) => setTimeout(resolve, s))
}

export const getRandInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)+ min)
}
export const destroyWall = async (
    grid: GridType,
    row: number,
    col: number,
    isRight: number,
    speed: SpeedType,
) => {
    if (isRight && grid[row][col + 1]) {
        grid[row][col + 1].isWall = false;
        document.getElementById(`${row}-${col + 1}`)!.className = TILE_STYLE;
        await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5)
    } else if (grid[row + 1]) {
        grid[row + 1][col].isWall = false;
        document.getElementById(`${row + 1}-${col}`)!.className = TILE_STYLE;
        await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5)
    } else {
        grid[row][col].isWall = false;
        document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
        await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5)
    }
}

export const createWall = (
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType,
) => {
    const delay = 6 * SPEEDS.find((s) => s.value === speed)!.value - 1;
    for (let row = 0; row < MAX_ROW; row++) {
        setTimeout(() => {
            for (let col = 0; col < MAX_COL; col++) {
                if (row % 2 === 0 || col % 2 === 0) {
                    if (!isRowColEqual(row, col, startTile) && !isRowColEqual(row, col, endTile)) {
                        setTimeout(() => {
                            document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`
                        }, delay * col);
                    }
                }

            }
        }, delay * (MAX_ROW / 2) * row);
    }
}


export async function constructBorder(
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) {
    const shape = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: -1, col: 0 },
    ]
    let row = 0
    let col = 0
    for (let i = 0; i < 4; i++) {
        const direction = shape[i]
        while (
            row + direction.row >= 0 &&
            row + direction.row < MAX_ROW &&
            col + direction.col >= 0 &&
            col + direction.col < MAX_COL
        ) {
            row += direction.row
            col += direction.col
            if (!isEqual(grid[row][col], startTile) && !isEqual(grid[row][col], endTile)) {
                grid[row][col].isWall = true
                const tileElement = document.getElementById(`${row}-${col}`)
                if (tileElement) {
                    tileElement.classList.add(
                        ...WALL_TILE_STYLE.split(""), "animate-wall"
                    )
                }
                await sleep(SLEEP_TIME)
            }
        }
        if (row < 0) row = 0;
        if (row >= MAX_ROW) row = MAX_ROW - 1

        if (col < 0) col = 0;
        if (col >= MAX_COL) col = MAX_COL - 1


    }
}



export const runPathFindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}: {
    algorithm: AlgorithmType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType
}) => {
    switch (algorithm) {
        case "bfs":
            return bfs(grid, startTile, endTile)
        case "dfs":
            return  dfs(grid, startTile, endTile);
        case "Disjtra":
            return  djs(grid, startTile, endTile);
        default:
            return bfs(grid, startTile, endTile);
    }
}

export const getUntraversedNeighbours = (grid: GridType, tile: TileType) => {
    const { row, col } = tile
    const neighbours = []
    if (row > 0) {
        neighbours.push(grid[row - 1][col]);
    }
    if (row < MAX_ROW - 1) {
        neighbours.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbours.push(grid[row][col - 1]);
    }
    if (col < MAX_COL - 1) {
        neighbours.push(grid[row][col + 1]);
    }
    return neighbours.filter((neighbour) => !neighbour.isTraversed)
}


export const animatePath = (
    traversedTiles: TileType[],
    path: TileType[],
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType,
) => {
    for (let i = 0; i < traversedTiles.length; i++) {
        setTimeout(() => {
            const tile = traversedTiles[i]
            if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                document.getElementById(
                    `${tile.row}-${tile.col}`
                    )!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`

            }
        }, SLEEP_TIME * i * SPEEDS.find((s) => s.value === speed)!.value);

    }
    setTimeout(() => {

        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const tile = path[i]
                if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                    document.getElementById(
                        `${tile.row}-${tile.col}`
                        )!.className = `${PATH_TILE_STYLE} animate-path`

                }
            }, EXTENDED_SLEEP_TIME * i * SPEEDS.find((s) => s.value === speed)!.value);
        }
    },SLEEP_TIME * traversedTiles.length  * SPEEDS.find((s) => s.value === speed)!.value);

}

export const checkStack = (tile:TileType, stack: TileType[])=>{
    for (let i = 0; i < stack.length; i++) {
        if (isEqual(stack[i], tile)) {
            return true
        }
        
    }
    return false
}







