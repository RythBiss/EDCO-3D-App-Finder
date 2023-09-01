import React from 'react'
import HistoryItem from './HistoryItem'
import NewLayer from './NewLayer'

export default function LayerHistory() {
  return (
    <div className='col-2 container-fluid shadow z-0 layer-history layer-menus'>
      <HistoryItem />
      <NewLayer />
    </div>
  )
}
