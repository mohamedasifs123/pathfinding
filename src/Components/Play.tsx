import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

//play.jsx
export function PlayButton({
    handleRunVisualizer,
    isDisabled,
    isGraphVisualized,
}:{
    isDisabled: boolean;
    isGraphVisualized: boolean;
    handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
        disabled={isDisabled}
        onClick={handleRunVisualizer}
        >
            {isGraphVisualized? (
                <GrPowerReset className="w-5 h-5"/>

            ):(
                <BsFillPlayFill className="w-5 h-5"/>
            )}
        </button>

    )
}