import { useEffect, useRef, useState } from 'react'
import RentalItem from './RentalItem'
import "jspdf/dist/polyfills.es.js";
import ListButton from './ListButton';


export default function RentalOrder(props: any) {

  //selected tab is stored in a ref so it persists on DOM updates
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const selectedTab = useRef(selectedLayer);

  //2D array that contains alternitive layer choices for each layer. This makes sure only valid layer types are assigned to each layer.
  const altLayers = [
    ['vinyl', 'linoleum', 'ceramic', 'carpet'],
    ['glue/adhesive', 'mastic', 'thinset'],
    ['sealer', 'residual glue/adhesive', 'paint'],
    ['concrete', 'high spots', 'trip hazard']
  ]

  //updates selected layer state.
  const activateLayer = (layerIndex: number) =>{
    if(layerIndex == selectedTab.current){
      setSelectedLayer(0)
    }else{
      setSelectedLayer(layerIndex)
    }
  }

  //when a layer type is passed, finds other layer types that could also be assigned to that layer.
  const getAltLayers = (change: string) => {
    for(let i = 0; i < 4; i++){
      if(altLayers[i].includes(change)){
        return altLayers[i];
      }
    }
  }

  //updates rendered layer.
  useEffect(() => {
    props.setRenderedLayer(selectedLayer);
  }, [selectedLayer])


  return (
      <div className={`col-lg-2 col-sm-8 shadow scroll h-100 ${props.mobileRight == false ? 'hide-menu' : 'show-menu-right'}`} style={{overflowY: "scroll"}}>
        {props.current !== undefined &&
            props.current.sublayerObjects.map((obj: object, key: number) => 
              <RentalItem
                key={key}
                layerObject={obj}
                layerIndex={key}
                active={selectedLayer == key}
                onClick={() => activateLayer(key)}
                getAltLayers={getAltLayers}
                />
        )}
      </div>
  )
}