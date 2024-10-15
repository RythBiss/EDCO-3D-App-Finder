import { useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { toolingHasDiamonds, getMachinePartNumberGlobal, getToolingPartNumberGlobal } from '../functions';

export default function EditLayer(props: any) {

  
//generates a PDF rental ticket with selected machines and tools.
  const printPDF = () => {
    
    // const pdf = new jsPDF;
    // let printString: string = 'Order: \n'
    
    // props.layerObject.sublayerObjects.forEach((item: any) =>{
    //   printString += `   \nMachine: ${item.machine} \nTooling: ${item.tooling}`
    // })

    // pdf.text(printString, 10, 10);
    // pdf.output('dataurlnewwindow', {filename: 'EDCO App Finder Recommendation'});

    // Initialize jsPDF

    
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(16);
    doc.text("Equipment Development Co.", 105, 10, { align: "center" });

    //sub title
    doc.setFontSize(14);
    doc.text("Application Finder Generated Recommendation", 105, 15, { align: "center" });

    //contact info
    doc.setFontSize(12);
    doc.text("Customer Support Contact Information", 10, 25);
    doc.text("100 Thomas Johnson Dr", 10, 30);
    doc.text("Frederick, MD 21702", 10, 35);
    doc.text("Phone: (800) 638-3326", 10, 40);

    // Table Header
    doc.text("Machine", 10, 50);
    doc.text("Part Number", 60, 50);
    doc.text("Tooling", 110, 50);
    doc.text("Part Number", 160, 50);



    //array that helps keep the machine list unique
    let machineArray: string[] | null | undefined = [];

    props.layerObject.sublayerObjects.forEach((item: any, i: number) =>{

      if(machineArray.includes(item.machine) == false){

        doc.text(item.machine, 10, 60+(i*5));
        doc.text(`${getMachinePartNumberGlobal(item.machine, props.layerObject)}`, 60, 60+(i*5)); // move machine and tooling tables/algorithms to a seperate functions file so they can be called globally.
        machineArray.push(item.machine);

      }

      doc.text(item.tooling, 110, 60+(i*5));
      doc.text(`${getToolingPartNumberGlobal(item.tooling)}`, 160, 60+(i*5)); // move machine and tooling tables/algorithms to a seperate functions file so they can be called globally.
    })


    doc.text(`What is your application: ${props.layerObject.getMaterialForPDF()}`, 10, 90);

    doc.text(`What is the square footage of your job: ${props.layerObject.getJobSizeForPDF()}`, 10, 100);

    doc.text(`Is your concrete older than 28 days: ${props.layerObject.geteEdgerforPDF()}.`, 10, 110);

    doc.text(`Do you need to grind or clean against a wall: ${props.layerObject.geteEdgerforPDF()}.`, 10, 120);



    let power = props.layerObject.getePowerforPDF();

    doc.text(`What machine power is desired: ${power.charAt(0).toUpperCase() + power.slice(1)}.`, 10, 130);
    


    const cordChart = new Image();
    cordChart.src = '../Images/extension_cord_chart.png';  // Image URL

    if(props.layerObject.containsElectric == true){
      doc.addImage(cordChart, 'JPEG', 10, 170, 190, 50);  // Add the image when loaded
    }
    
    const diamondChart = new Image();
    diamondChart.src = '../Images/tooling_hardness_chart.jpeg';  // Image URL

    if(props.layerObject.containsDiamonds == true){
      doc.addImage(diamondChart, 'JPEG', 10, 220, 190, 50);  // Add the image when loaded
    }



    // disclaimer
    doc.text("Recommendations may be inacurate. Please speak with an expert or call our customer support\nto validate information. [workshop this line]", 10, 275);

    // output PDF
    doc.output('dataurlnewwindow', {filename: 'EDCO App Finder Recommendation'});

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