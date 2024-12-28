export type AlgorithmType = "Disjtra" | "a_star" | "bfs" | "dfs";

export type MazeType = "NONE" | "BINARY_TREE" | "RECURIVE_DIVISION";

export interface MazeSelectType {
    name: string;
    value: MazeType;
}

export interface AlgorithmSelectType {
    name: string;
    value: AlgorithmType;
}

export interface SpeedSelectType {
    name: string;
    value: SpeedType;
}

export type TileType={
    row: number;
    col: number;
    isEnd: boolean;
    isPath: boolean;
    isTraversed: boolean;
    isWall: boolean;
    distance: number;
    isStart: boolean;
    parent: TileType | null;
}
export type GridType = TileType[][];



export type SpeedType = 2 | 1 | 4;
