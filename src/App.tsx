import { PathFindingProvider } from "./context/pathFindingContext";
import { TileProvider } from "./context/TileContext";
import {  SpeedProvider } from "./context/SpeedContext";
import { Grid } from "./Components/Grid";
import { useRef } from "react";
import { Nav } from "./Components/Nav";


function App() {
  const isVisualizationunningef = useRef(false);

  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider >
        <h1>allah</h1>

<div className="h-screen w-screen bg-black justify-center  flex flex-col">
  <Nav isVisualizationunningef={isVisualizationunningef} />

  <Grid isVisualizationunningef={isVisualizationunningef} />
  </div></SpeedProvider>
       </TileProvider>
    </PathFindingProvider>
    
  )
}

export default App
