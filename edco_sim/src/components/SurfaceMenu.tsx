import { useState, useEffect } from 'react'
import ListButton from './ListButton';

export default function SurfaceMenu(props:any) {

    const surfacesFirstLayer = ['vinyl', 'linoleum', 'ceramic', 'carpet'];
    const surfacesSecondLayer = ['adhesives', 'glues', 'thinsets', 'industrial buildup'];
    const surfacesThirdLayer = ['residual adhesive', 'sealers', 'thin mil coatings', 'paint'];
    const surfacesFourthLayer = ['leveling', 'CSP 1-9'];



    const [openedMenu, setOpenedMenu] = useState(0);
    const [selectedSurface, setSelectedSurface] = useState('');



    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(0)
        }else{
            setOpenedMenu(newState)
        }
    }

    const setSurface = (newLayer: string, ) => {
        props.layerObject.setSurface(newLayer);
        setSelectedSurface(newLayer);
    }
    

    
  return (
    <div className='col edit-menu'>
        <ListButton lable={'First Layer Surfaces'} onClick={() => handleMenuState(1)} />
        {openedMenu == 1 && surfacesFirstLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedSurface == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
        <ListButton lable={'Second Layer Surfaces'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && surfacesSecondLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedSurface == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
        <ListButton lable={'Third Layer Surfaces'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && surfacesThirdLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedSurface == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
        <ListButton lable={'Fourth Layer Surfaces'} onClick={() => handleMenuState(4)} />
        {openedMenu == 4 && surfacesFourthLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedSurface == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
    </div>
  )
}
