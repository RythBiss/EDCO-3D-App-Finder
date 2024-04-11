import { useEffect, useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';

export default function EditLayer(props: any) {

const [displayMenu, setDisplayMenu] = useState(0);

const menus = [
    <SurfaceMenu layerObject={props.layerObject}/>,
    <MachineMenu layerObject={props.layerObject} />,
    <ToolingMenu layerObject={props.layerObject} />
]


useEffect(() => {
    console.log(props.mobileLeft)
  }, [props.mobileLeft])

  return (
    <div className={`col-lg-3 col-sm-8 shadow scroll h-100 ${props.mobileLeft == false ? 'hide-menu' : 'show-menu'}`} >
        <div className='edit-layer'>
            <div className='row'>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 0 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(0)}>JOBSITE</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 1 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(1)}>MACHINES</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 2 && 'tab-btn-active'}`} onClick={() => setDisplayMenu(2)}>TOOLING</button>
                </div>
            </div>
            <div style={{margin: '0', paddingBottom: '64px'}}>
                {menus[displayMenu]}
            </div>
        </div>
    </div>
  )
}
