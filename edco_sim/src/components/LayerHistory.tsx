import { useEffect } from 'react'
import HistoryItem from './HistoryItem'
import ListButton from './ListButton'

export default function LayerHistory(props: any) {

  useEffect(() => {
    console.log(props?.current?.sublayerObjects, " layerHistory")
  })

  return (
    <div className='col-2 container-fluid shadow z-0 layer-history layer-menus'>
      {props.current !== undefined &&
          props.current.sublayerObjects.map((obj: object, key: number) => 
            <HistoryItem key={key} layerObject={obj} layerIndex={key}  />
      )}

      {/* <HistoryItem layerObject={props.current} layerIndex={'Active'} />
      <ListButton lable='New Layer' onClick={props.newLayer} /> */}
    </div>
  )
}