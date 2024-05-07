import { useEffect, useState } from 'react'
import './App.css'
import EditLayer from './components/EditLayer'
import Header from './components/Header'
import LayerHistory from './components/LayerHistory'
import Viewport from './components/Viewport'


function App() {

  const [layerList, setLayerList] = useState<Layer[]>([]);
  const [currentLayer, setCurrentLayer] = useState<Layer>();
  const [renderLayer, setRenderLayer] = useState<number>(0);
  const [updateState, update] = useState(false);
  const [mobileLeft, setLeft] = useState<boolean>(false);
  const [mobileRight, setRight] = useState<boolean>(false);
  const [popupOn, setPopupOn] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<string>('blank');
  const [popupYPos, setPopupYPos] = useState<number>(0);

  //keep new layer function incase users have multiple types of jobs to do
  class Layer{
    constructor(){
      this.machine = '';
      this.tooling = '';
      this.CSP = '';

      this.onConcrete = false;
      this.materialRemoved = '';
      this.materialThickness = 0;
      this.finishedSurface = '';
      this.jobSize = 0;
      this.greenConcrete = false;
      this.dustControl = false;
      this.edger = false;
      this.powerType = '';
      this.layerNumber = 0;
      this.sublayers = [];
      this.sublayerObjects = [];
    }

    machine: string;
    tooling: string;
    CSP: string;

    onConcrete: boolean;
    materialRemoved: string;
    materialThickness: number;
    finishedSurface: string;
    jobSize: number;
    greenConcrete: boolean;
    dustControl: boolean;
    edger: boolean;
    powerType: string;
    layerNumber: number;
    sublayers: string[];
    sublayerObjects: any[];

    //call for any state change to update react
    requestUpdate = () => {
      update(prevState => !prevState);
    }

    setMaterialRemoved(value: string, layer: number, sublayers: string[]){
      this.clearSelections(0)

      this.materialRemoved = value;
      this.layerNumber = layer;
      this.sublayers = sublayers;
      this.sublayerObjects = [];

      for(let i = 0; i < sublayers.length; i++){
        const newLayer = new Layer;
        newLayer.materialRemoved = sublayers[i];
        this.sublayerObjects.push(newLayer);
      }

      this.requestUpdate();
    }

    //ask this for every layer below first layer (vinyl, tile, carpet, etc.). Have the question repeat for each layer.
    setMaterialThickness = (value: number) => {
      this.clearSelections(0)

      this.materialThickness = value;

      // this.sublayerObjects.forEach((item) => {
      //   item.materialThickness = value;
      // })
      
      //this.requestUpdate();
    }

    //if anything other than unfinished, then suggest tools that get CSP 3 or less.
    setFinishedSurface = (value: string) => {
      this.finishedSurface = value;
      
      //this.requestUpdate();
    }

    setJobSize = (value: number) => {
      this.clearSelections(0);

      this.jobSize = value;

      this.sublayerObjects.forEach((item) => {
        item.jobSize = value;
      })
      
      //this.requestUpdate();
    }

    setGreenConcrete = (value: boolean) => {
      this.clearSelections(0)

      this.greenConcrete = value;

      this.sublayerObjects.forEach((item) => {
        item.greenConcrete = value;
      })
      
      //this.requestUpdate();
    }

    //this question can be skipped, add a vac to the list of any machine requires it.
    setDustControl = (value: boolean) => {
      this.dustControl = value;
      
      //this.requestUpdate();
    }

    //toggle if TMC7 should be shown.
    setEdger = (value: boolean) => {
      this.clearSelections(0)

      this.edger = value;
      
      //this.requestUpdate();
    }

    //only show this question if there is more than 1 option with current selection.
    setPowerType = (value: string) => {
      this.clearSelections(0)

      this.powerType = value;

      this.sublayerObjects.forEach((item) => {
        item.powerType = value;
      })
      
      //this.requestUpdate();
    }
    
    setMachine(newMachine: string, layer: number): void{
      this.machine = newMachine;
      //this.setTooling('', layer, 0)
      this.clearSelections(1);
      if(this?.sublayerObjects[layer]?.machine !== undefined){
        this.sublayerObjects[layer].machine = newMachine;
      }
      //this.requestUpdate();
    }

    setTooling(newTooling: string, layer: number,CSP: number, doUpdate: boolean = true): void{
      this.tooling = newTooling;
      if(this.sublayerObjects[layer] !== undefined){
        this.sublayerObjects[layer].tooling = newTooling;
        this.sublayerObjects[layer].CSP = CSP;
      }
      if(doUpdate == true) this.requestUpdate();
    }

    clearSelections = (range: number) =>{
      this.sublayerObjects.forEach((obj) => {
        if(range == 0) obj.setMachine('', 0)
        if(range == 1 || range == 0) obj.setTooling('', 0, 0, false);
      })
    }
  }

  const createNewLayer = () => {

    const newLayer = new Layer;

    if(currentLayer == undefined){
      setCurrentLayer(newLayer);
    }else{
      setLayerList(layerList?.concat(currentLayer));
      setCurrentLayer(newLayer);
    }

    return newLayer;
  }

  useEffect(() => {
    createNewLayer();
    console.log(updateState)
  }, [])

  useEffect(() => {
    if(mobileLeft == true){
      setRight(false);
    }
  }, [mobileLeft])

  useEffect(() => {
    if(mobileRight == true){
      setLeft(false);
    }
  }, [mobileRight])

  useEffect(() => {
    console.log(renderLayer)
    update(prevState => !prevState);
  }, [renderLayer])

  useEffect(() => {
    console.log(popupYPos)
  }, [popupYPos])



  return (
    <>
      <Header setLeft={setLeft} setRight={setRight} />
      <div className='container-fluid ui-container'>
        <div className='row ui-row h-100' style={{position: 'relative'}}>
          <EditLayer setPopup={setPopupOn} layerObject={currentLayer} mobileLeft={mobileLeft} setPopupInfo={setPopupInfo} setPopupYPos={setPopupYPos} />
          <Viewport popup={popupOn} popupInfo={popupInfo} popupYPos={popupYPos} history={layerList[layerList.length - 1]} layer={currentLayer} renderLayer={renderLayer} updateTrigger={updateState} />
          <LayerHistory newLayer={createNewLayer} history={layerList} current={currentLayer} setRenderedLayer={setRenderLayer} mobileRight={mobileRight} />
        </div>
      </div>
    </>
  )
}

export default App