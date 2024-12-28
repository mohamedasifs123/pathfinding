import  { useContext } from 'react'

import { PathFindingContext } from '../context/pathFindingContext'

export const usePathFinding = () => {
    const context = useContext(PathFindingContext);
    if(!context){
        throw new Error("usePathFimding must be used on pathFInding context")
    }
  return context;
}
