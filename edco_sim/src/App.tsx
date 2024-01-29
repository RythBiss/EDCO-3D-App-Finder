import { useEffect, useState } from 'react'
import './App.css'
import EditLayer from './components/EditLayer'
import Header from './components/Header'
import LayerHistory from './components/LayerHistory'
import Viewport from './components/Viewport'


function App() {

  const [layerList, setLayerList] = useState<Layer[]>([])
  const [currentLayer, setCurrentLayer] = useState<Layer>()
  const [updateState, update] = useState(false);
  const [activeCSP, setActiveCSP] = useState(-1);


  //keep new layer function incase users have multiple types of jobs to do
  class Layer{
    constructor(){
      this.surface = '';
      this.machine = '';
      this.tooling = '';
      this.CSP = 0;

      this.onConcrete = false;
      this.materialRemoved = '';
      this.materialThickness = 0;
      this.finishedSurface = '';
      this.jobSize = 0;
      this.greenConcrete = false;
      this.dustControl = false;
      this.edger = false;
      this.powerType = '';
    }

    surface: string;
    machine: string;
    tooling: string;
    CSP: number;

    onConcrete: boolean;
    materialRemoved: string;
    materialThickness: number;
    finishedSurface: string;
    jobSize: number;
    greenConcrete: boolean;
    dustControl: boolean;
    edger: boolean;
    powerType: string;

    //call for any state change to update react
    requestUpdate = () => {
      update(prevState => !prevState);
    }

    setMaterialRemoved(value: string){
      this.materialRemoved = value;

      this.requestUpdate();
    }

    setMaterialThickness = (value: number) => {
      this.materialThickness = value;
      
      this.requestUpdate();
    }

    setFinishedSurface = (value: string) => {
      this.finishedSurface = value;
      
      this.requestUpdate();
    }

    setJobSize = (value: number) => {
      this.jobSize = value;
      
      this.requestUpdate();
    }

    setGreenConcrete = (value: boolean) => {
      this.greenConcrete = value;
      
      this.requestUpdate();
    }

    setDustControl = (value: boolean) => {
      this.dustControl = value;
      
      this.requestUpdate();
    }

    setEdger = (value: boolean) => {
      this.edger = value;
      
      this.requestUpdate();
    }

    setPowerType = (value: string) => {
      this.powerType = value;
      
      this.requestUpdate();
    }

    setSurface(newSurface: string): void{
      this.surface = newSurface;
      this.machine = '';
      this.tooling = '';

      this.requestUpdate();
    }
    
    setMachine(newMachine: string): void{
      this.machine = newMachine;
      this.tooling = '';
      this.requestUpdate();
    }

    setTooling(newTooling: string, CSP: number): void{
      this.tooling = newTooling;
      this.CSP = CSP;
      setActiveCSP(CSP);
      this.requestUpdate();
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
          <Viewport CSP={activeCSP} history={layerList[layerList.length - 1]} layer={currentLayer} />
          <LayerHistory newLayer={createNewLayer} history={layerList} current={currentLayer} />
        </div>
      </div>
    </>
  )
}

export default App