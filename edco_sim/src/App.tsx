import {  } from 'react'
import './App.css'
import EditLayer from './components/EditLayer'
import Header from './components/Header'
import LayerHistory from './components/LayerHistory'
import Viewport from './components/Viewport'


function App() {

  class Layer{
    constructor(){
      this.surface = '';
      this.machine = '';
      this.tooling = '';
    }

    surface: string;
    machine: string;
    tooling: string;

    setSurface(newSurface: string): void{
      this.surface = newSurface;
    }
    
    setMachine(newMachine: string): void{
      this.machine = newMachine;
    }

    setTooling(newTooling: string): void{
      this.tooling = newTooling;
    }
  }

  let layerObj = new Layer;

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