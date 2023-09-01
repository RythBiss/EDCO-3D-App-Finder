import React from 'react'
import ListButton from './ListButton'

export default function EditLayer() {
  return (
    <div className='col-3 h-100 z-0 shadow edit-layer layer-menus'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col tab-bar'>
                    <button type="button" className="tab-btn w-100">SURFACE</button>
                </div>
                <div className='col tab-bar'>
                    <button type="button" className="tab-btn w-100">MACHINE</button>
                </div>
                <div className='col tab-bar'>
                    <button type="button" className="tab-btn w-100">TOOLING</button>
                </div>
            </div>
            <ListButton />
        </div>
    </div>
  )
}
