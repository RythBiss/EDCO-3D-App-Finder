import React, { useState, useEffect } from 'react'
import ListButton from './ListButton';
import { label } from 'three/examples/jsm/nodes/Nodes.js';

export default function SurfaceMenu(props) {

    const surfacesFirstLayer = ['vinyl', 'linoleum', 'ceramic', 'carpet'];
    const surfacesSecondLayer = ['adhesives', 'glues', 'thinsets', 'industrial buildup'];
    const surfacesThirdLayer = ['residual adhesive', 'sealers', 'thin mil coatings', 'paint'];
    const surfacesFourthLayer = ['leveling', 'CSP 1-9'];

    const [openedMenu, setOpenedMenu] = useState(0);

    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(0)
        }else{
            setOpenedMenu(newState)
        }
    }
    

  return (
    <div className='edit-menu'>
        <ListButton lable={'First Layer Surfaces'} onClick={() => handleMenuState(1)} />
        {openedMenu == 1 && surfacesFirstLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} onClick={() => props.layerObject.setSurface(layer)} />
        )}
        <ListButton lable={'Second Layer Surfaces'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && surfacesSecondLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1}/>
        )}
        <ListButton lable={'Third Layer Surfaces'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && surfacesThirdLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1}/>
        )}
        <ListButton lable={'Fourth Layer Surfaces'} onClick={() => handleMenuState(4)} />
        {openedMenu == 4 && surfacesFourthLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1}/>
        )}
    </div>
  )
}
