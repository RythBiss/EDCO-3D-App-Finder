import { useEffect } from 'react'
import './App.css'
import EditLayer from './components/EditLayer'
import Header from './components/Header'
import LayerHistory from './components/LayerHistory'
import Viewport from './components/Viewport'


function App() {

  class Layer{
    surface: string;
    machine: string;
    tooling: string;

    constructor(){
      this.surface = '';
      this.machine = '';
      this.tooling = '';
    }

    setSurface(newSurface: string): void{
      this.surface = newSurface;
      console.log(this.surface)
    }
    
    setMachine(newMachine: string): void{
      this.machine = newMachine;
    }

    setTooling(newTooling: string): void{
      this.tooling = newTooling;
    }
  }

  let layerObj = new Layer;

  useEffect(() => {
    console.log(layerObj.surface)
  })

  return (
    <>
      <Header />
      <div className='container-fluid ui-container'>
        <div className='row ui-row h-100'>
          <EditLayer layerObject={layerObj} />
          <Viewport />
          <LayerHistory />
        </div>
      </div>
    </>
  )
}

export default App