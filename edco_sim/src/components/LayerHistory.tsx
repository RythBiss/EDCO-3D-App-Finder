import { useEffect, useRef, useState } from 'react'
import HistoryItem from './HistoryItem'

export default function LayerHistory(props: any) {

  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const selectedTab = useRef(selectedLayer);

  const activateLayer = (layerIndex: number) =>{

    if(layerIndex == selectedTab.current){
      setSelectedLayer(0)
    }else{
      setSelectedLayer(layerIndex)
    }
  }

  useEffect(() => {
    props.setRenderedLayer(selectedLayer);
  }, [selectedLayer])

  return (
    <div className='col-2 container-fluid shadow z-0 layer-history layer-menus'>
      {props.current !== undefined &&
          props.current.sublayerObjects.map((obj: object, key: number) => 
            <HistoryItem key={key} layerObject={obj} layerIndex={key} active={selectedLayer == key} onClick={() => activateLayer(key)} />
      )}
    </div>
  )
}