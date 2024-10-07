import { useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';
import jsPDF from 'jspdf';


export default function EditLayer(props: any) {

//generates a PDF rental ticket with selected machines and tools.
  const printPDF = () => {
    
    const pdf = new jsPDF;
    let printString: string = 'Order: \n'
    
    props.layerObject.sublayerObjects.forEach((item: any) =>{
      printString += `   \nMachine: ${item.machine} \nTooling: ${item.tooling}`
    })

    pdf.text(printString, 10, 10);
    pdf.output('dataurlnewwindow', {filename: 'EDCO App Finder Recommendation'});
  }

//state is used as the index to select a menu in the menu array.
const [displayMenu, setDisplayMenu] = useState<number>(0);

//array stores menus that will be rendered based on which tab is selected.
const menus = [
    <SurfaceMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} nextFunction={() => setDisplayMenu(1)}/>,
    <MachineMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} nextFunction={() => setDisplayMenu(2)}/>,
    <ToolingMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} printPDF={printPDF} />
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
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 1 && 'tab-btn-active'} ${props.allowProgress < 1 && 'tab-btn-inactive'}`} onClick={() => {if(props.allowProgress > 0){setDisplayMenu(1)}}} >MACHINES</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 2 && 'tab-btn-active'} ${props.allowProgress < 2 && 'tab-btn-inactive-light'}`} onClick={() => {if(props.allowProgress > 1){setDisplayMenu(2)}}}>TOOLING</button>
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