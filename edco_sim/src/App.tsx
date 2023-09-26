import { useEffect, useState } from 'react'
import './App.css'
import EditLayer from './components/EditLayer'
import Header from './components/Header'
import LayerHistory from './components/LayerHistory'
import Viewport from './components/Viewport'


function App() {

  const [layerList, setLayerList] = useState<Layer[]>([])
  const [currentLayer, setCurrentLayer] = useState<Layer>()
  const [updateState, toggle] = useState(false);
  const [activeCSP, setActiveCSP] = useState(1);


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
      this.machine = '';
      this.tooling = '';

      toggle(prevState => !prevState)
    }
    
    setMachine(newMachine: string): void{
      this.machine = newMachine;
      this.tooling = '';
      toggle(prevState => !prevState)
    }

    setTooling(newTooling: string, CSP: number): void{
      this.tooling = newTooling;
      setActiveCSP(CSP);
      toggle(prevState => !prevState)
    }
  }

  const createNewLayer = () => {
    if(currentLayer == undefined){
      setCurrentLayer(new Layer);
    }else{
      setLayerList(layerList?.concat(currentLayer));
      setCurrentLayer(new Layer);
    }
  }

  useEffect(() => {
    createNewLayer()
  }, [])

  return (
    <>
      <Header />
      <div className='container-fluid ui-container'>
        <div className='row ui-row h-100'>
          <EditLayer layerObject={currentLayer} />
          <Viewport CSP={activeCSP} />
          <LayerHistory newLayer={createNewLayer} history={layerList} current={currentLayer} />
        </div>
      </div>
    </>
  )
}

export default App