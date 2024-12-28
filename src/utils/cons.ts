import { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROW= 39;
export const MAX_COL= 49;

export const START_TILE_CONF = {
    row: 1,
    col: 1,
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0 ,
    isStart: false,
    isTraversed: false,
    parent: null,
    
}

export const END_TILE_CONF = {
    row: MAX_ROW -2,
    col: MAX_COL-2,
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0 ,
    isStart: false,
    isTraversed: false,
    parent: null,
    
}

export const TILE_STYLE = 
" lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] lg:h-[17px] md:h-[15px] xs:h-[8px] h-[7px] border-t border-r border-sky-200 "

export const TRAVERSED_TILE_STYLE = TILE_STYLE + "bg-cyan-500";
export const START_TILE_STYLE = TILE_STYLE + "bg-green-500";
export const END_TILE_STYLE = TILE_STYLE + "bg-red-500";
export const WALL_TILE_STYLE = TILE_STYLE + "bg-gray-500";
export const PATH_TILE_STYLE = TILE_STYLE + "bg-green-300";

export const MAZES: MazeSelectType[]=[
    {name: "No maze", value:"NONE"},
    {name: "Binary tree", value: "BINARY_TREE"},
    {name: "Recursive division", value:"RECURIVE_DIVISION"}
]


export const ALGORITHMS: AlgorithmSelectType[]=[
    {name: "Diskstra", value:"Disjtra"},
    {name: "A_STAR", value:"a_star" },
    {name: "BFS", value:"bfs"},
    {name:"DFS", value:"dfs"}
]
export const SPEEDS: SpeedSelectType[]=[
    {name: "slow", value:4},
    {name: "medium", value: 2},
    {name: "fast", value:1}
]

export const SLEEP_TIME = 8 ;

export const EXTENDED_SLEEP_TIME= 40