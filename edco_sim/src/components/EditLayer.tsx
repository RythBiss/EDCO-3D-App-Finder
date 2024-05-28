import { useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';

export default function EditLayer(props: any) {

const [displayMenu, setDisplayMenu] = useState<number>(0);
const [allowProgress, setAllowProgress] = useState<number>(0);

//array stores menus that will be rendered based on which tab is selected.
const menus = [
    <SurfaceMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={setAllowProgress} />,
    <MachineMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={setAllowProgress} />,
    <ToolingMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} />
]

  return (
    <div className={`col-lg-3 col-sm-8 shadow scroll h-100 ${props.mobileLeft == false ? 'hide-menu' : 'show-menu'}`} >
        <div className='edit-layer'>
            <div className='row'>
                {/* tab buttons */}
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 0 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(0)}>JOBSITE</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 1 && 'tab-btn-active'}`} onClick={() => {if(allowProgress > 0){setDisplayMenu(1)}}} >MACHINES</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 2 && 'tab-btn-active'}`} onClick={() => {if(allowProgress > 1){setDisplayMenu(2)}}}>TOOLING</button>
                </div>
            </div>
            {/* displays selected menu */}
            <div className='menus-container'>
                {menus[displayMenu]}
            </div>
        </div>
    </div>
  )
}