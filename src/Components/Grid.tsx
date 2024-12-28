import { twMerge } from "tailwind-merge";
import { usePathFinding } from "../hooks/usePathFinding";
import { MAX_COL, MAX_ROW } from "../utils/cons";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { chechIfStartOrEnd, createNewGrid } from "../utils/helper";

export function Grid({
    isVisualizationunningef,
}: {
    isVisualizationunningef: MutableRefObject<boolean>;
}) {
    const { grid, setGrid } = usePathFinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (row: number, col: number) => {
        if (isVisualizationunningef.current || chechIfStartOrEnd(row, col)) {
            return;
        }

        setIsMouseDown(true);
        const newGrid = createNewGrid(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = (row: number, col: number) => {
        if (isVisualizationunningef.current || chechIfStartOrEnd(row, col)) {
            return;
        }
        setIsMouseDown(false)
    }
    const handleMouseEnter = (row: number, col: number) => {
        if (isVisualizationunningef.current || chechIfStartOrEnd(row, col)) {
            return;
        }
        if (isMouseDown) {
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid);
        }
    }

    return (
        <div
            className={twMerge(
                "flex items-center flex-col justify-center border-sky-300 bg-black", 
                `lg:min-h-[${MAX_ROW * 17}px] md:min-h-[${MAX_ROW * 15}px] xs:min-h-[${MAX_ROW * 8}px] min-h-[${MAX_ROW * 7}px]`,
                `lg:w-[${MAX_COL * 17}px] md:w-[${MAX_COL * 15}px] xs:w-[${MAX_COL * 8}px] w-[${MAX_COL * 7}px]`
            )}
        >
            {grid.map((r, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {r.map((tile, tileIndex) => {
                        const {row,col, isEnd, isStart, isPath, isTraversed, isWall } = tile;
                        return (
                            <Tile
                                key={tileIndex}
                                row={tile.row}
                                col={tile.col}
                                isEnd={isEnd}
                                isStart={isStart}
                                isPath={isPath}
                                isTrversed={isTraversed}
                                isWall={isWall}
                                handleMouseDown={()=> handleMouseDown(row,col)}
                                handleMouseUp={()=> handleMouseUp(row,col)}
                                handleMouseEnter={()=> handleMouseEnter(row,col)}

                               />
                        )
                    })}
                </div>
            ))}
        </div>
    );

}
