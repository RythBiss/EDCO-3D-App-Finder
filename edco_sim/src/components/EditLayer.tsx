import { useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';

export default function EditLayer(props: any) {

const [displayMenu, setDisplayMenu] = useState(0);

const menus = [
    <SurfaceMenu layerObject={props.layerObject} />,
    <MachineMenu layerObject={props.layerObject} />,
    <ToolingMenu layerObject={props.layerObject} />
]

  return (
    <div className='col-3 h-100 z-0 shadow'>
        <div className='edit-layer'>
            <div className='row'>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 0 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(0)}>JOBSITE</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 1 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(1)}>MACHINE</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 2 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(2)}>TOOLING</button>
                </div>
            </div>
            {menus[displayMenu]}
        </div>
    </div>
  )
}
