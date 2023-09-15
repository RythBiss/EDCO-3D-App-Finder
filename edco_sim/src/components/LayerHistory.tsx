import {  } from 'react'
import HistoryItem from './HistoryItem'
import ListButton from './ListButton'

export default function LayerHistory(props: any) {

  return (
    <div className='col-3 container-fluid shadow z-0 layer-history layer-menus'>
      {props.history.map((obj: object, key: number) => 
        <HistoryItem key={key} layerObject={obj} layerIndex={key} />
      )}
      <HistoryItem layerObject={props.current} layerIndex={'Active'} />
      <ListButton lable='New Layer' onClick={props.newLayer} />
    </div>
  )
}