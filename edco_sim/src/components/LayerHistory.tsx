import {  } from 'react'
import HistoryItem from './HistoryItem'
import ListButton from './ListButton'

export default function LayerHistory(props: any) {

  return (
    <div className='col-2 container-fluid shadow z-0 layer-history layer-menus'>
      {props.history.map((obj: object, key: number) => 
        <HistoryItem key={key} layerObject={obj} />
      )}
      {/* <HistoryItem layerObject={props.current} /> make this show current layer */}
      <ListButton lable='New Layer' onClick={props.newLayer} />
    </div>
  )
}