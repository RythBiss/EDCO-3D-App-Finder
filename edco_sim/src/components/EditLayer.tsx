import { useEffect, useState } from 'react'
import SurfaceMenu from './SurfaceMenu';
import MachineMenu from './MachineMenu';
import ToolingMenu from './ToolingMenu';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { AnimatePresence, motion } from "framer-motion";
import { getMachinePartNumberGlobal, getToolingPartNumberGlobal, allMachineData, getPowerTypeImageIndexGlobal, getToolingKeyByName, toolsByApplicationAndMachine } from '../functions';

export default function EditLayer(props: any) {

  const [electricValue, setElectricValue] = useState<string>('Electric Residential');
  
//generates a PDF rental ticket with selected machines and tools.
const printPDF = () => {
  
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
  doc.text("Tooling", 95, 50);
  doc.text("Part Number", 160, 50);





  //array that helps keep the machine list unique
  let machineArray: string[] | null | undefined = [];

  const posBase = 55;
  const posIncrement = 5;
  let posMultiplier = 0;

  const getLine = () => {
    return posBase + (posIncrement*posMultiplier);
  }

  const getLineIncrement = () => {
    return posBase + (posIncrement*posMultiplier++);
  }

  const isAppOnConcrete = () => {
    return props.layerObject.getSurfaceType() == "concrete";
  }

  props.layerObject.sublayerObjects.forEach((item: any, index: number) =>{ //i think this statement is causing spaces because its skipping layers that have the same machine?
    const currentName = allMachineData[item.machine].displayName[getPowerTypeImageIndexGlobal(item.machine, props.layerObject)];

    if(machineArray.includes(item.machine) == false){
      doc.text(currentName, 10, getLine());
      doc.text(`${props.layerObject.sublayerObjects.length} - ${getMachinePartNumberGlobal(item.machine, props.layerObject)}`, 60, getLine());
      machineArray.push(item.machine);
      getLineIncrement();
    }

    
  })

  let use290 = false;
  let edger = props.layerObject.edger;
  

  machineArray.forEach((i)=>{
    if(i == 'TG10' || i == 'CPM10'){
      use290 = true;
    }
  })

  
  if(edger == true){
    doc.text('TMC-7E (Vert. Walls)', 10, getLine());
    doc.text(`57200`, 60, getLineIncrement());
    machineArray.push('TMC-7E');
  }

  let row = 0;

  //prints tool column outside of the normal flow due to it being a second column.
  props.layerObject.sublayerObjects.forEach((item: any) =>{

    let toolingKey = getToolingKeyByName(item.tooling);
    const toolingObject = toolsByApplicationAndMachine[toolingKey];
    const isToolingEdgerCompatible: boolean = toolingObject.machines.includes("TMC7");

    doc.text(item.tooling + " (grinder)", 95, 55 + (5*row));
    doc.text(`${getToolingPartNumberGlobal(item.tooling)}`, 160, 55 + (5*row));
    row++;

    if(isToolingEdgerCompatible){

      if(toolsByApplicationAndMachine[toolsByApplicationAndMachine[getToolingKeyByName(item.tooling)].singleTool] != undefined){
        toolingKey = toolsByApplicationAndMachine[getToolingKeyByName(item.tooling)].singleTool;
      }

      doc.text(toolsByApplicationAndMachine[toolingKey].name + " (edger)", 95, 55 + (5*(row)));
      doc.text(`${getToolingPartNumberGlobal(toolsByApplicationAndMachine[toolingKey].name)}`, 160, 55 + (5*(row)));
      row++;
    }
  })

  if(isAppOnConcrete()){
    if(use290){
      doc.text('VAC 290 (Dust Control)', 10, getLine());
      doc.text(`ED33280K`, 60, getLineIncrement());
      machineArray.push('VAC 290');
    }else{
      doc.text('VAC 200 (Dust Control)', 10, getLine());
      doc.text(`ED33125HCONK`, 60, getLineIncrement());
      machineArray.push('VAC 200');
    }

    doc.text('Liner Bags (optional)', 10, getLine());
    doc.text(`ED16766901`, 60, getLineIncrement());
    machineArray.push('Liner Bags');

    doc.text('2" Floor Wand (optional)', 10, getLine());
    doc.text(`ED5004K`, 60, getLineIncrement());
    machineArray.push('2" Floor Wand');
  }

  getLineIncrement();
  getLineIncrement();

  doc.text(`What is your application: ${props.layerObject.getMaterialForPDF()}`, 10, getLineIncrement());

  doc.text(`What is the square footage of your job: ${isAppOnConcrete() ? props.layerObject.getJobSizeForPDF() : "N/A"}`, 10, getLineIncrement());

  doc.text(`Is your concrete older than 28 days: ${isAppOnConcrete() ? props.layerObject.getGreenForPDF() : "N/A"}.`, 10, getLineIncrement());

  doc.text(`Do you need to grind or clean against a wall: ${isAppOnConcrete() ? props.layerObject.getEdgerforPDF() : "N/A"}.`, 10, getLineIncrement());

  let power = props.layerObject.getPowerforPDF();
  doc.text(`What machine power is desired: ${power.charAt(0).toUpperCase() + power.slice(1)}.`, 10, getLineIncrement());

  getLineIncrement();
  getLineIncrement();


  doc.text('Buy Now: ', 10, getLine());
  doc.setTextColor(0, 0, 255);
  doc.textWithLink('https://edcostore.com/', 30, getLineIncrement(), { url: 'https://edcostore.com/' });
  doc.setTextColor(0, 0, 0);
  doc.text('Find a Rental Store: 1-800-638-3326', 10, getLineIncrement());

  // surface profile chart
  doc.setTextColor(0, 0, 255);
  doc.textWithLink('Click here ', 10, getLine(), { url: 'https://portal.edcoinc.com/storage/EDCO%20Sales%20Rep%20Documents/EDCOCatalog_2.24.pdf#page=9' });
  doc.setTextColor(0, 0, 0);
  doc.text('to learn more about CSP, qualifying questions, and cord length recommendations.', 30, getLineIncrement());
  


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

  // gas engine warning and disclaimer
  doc.setFont(undefined, "bold");
  doc.text("Small gasoline engines produce high concentrations of carbon monoxide (CO). Never operate\ngas powered equipment indoors.\nAbove recommendation is based on information supplied. Application variables may alter machine\nor tooling requirements.Please speak with an expert or call our customer support\nto validate information.", 105, 275, { align: "center" });

  // output PDF
  doc.output('dataurlnewwindow', {filename: 'EDCO App Finder Recommendation'});

}

//state is used as the index to select a menu in the menu array.
const [displayMenu, setDisplayMenu] = useState<number>(0);
const [progress, setProgress] = useState<number>(0);

useEffect(() => {
  console.log("editlayer")
  setDisplayMenu(0);
}, [props.resetToggle]);

useEffect(() => {
  console.log("display menu is " + displayMenu);
}, [displayMenu])

useEffect(() => {
  setProgress(props.allowProgress);
}, [props.allowProgress])



//array stores menus that will be rendered based on which tab is selected.
const menus = [
    <SurfaceMenu resetToggle={props.resetToggle} popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} nextFunction={() => setDisplayMenu(1)} setElectricValue={setElectricValue} electricValue={electricValue}/>,
    <MachineMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} nextFunction={() => setDisplayMenu(2)}/>,
    <ToolingMenu popupOn={props.setPopup} layerObject={props.layerObject} setPopupInfo={props.setPopupInfo} setPopupYPos={props.setPopupYPos} update={props.update} setAllowProgress={props.setAllowProgress} allowProgress={props.allowProgress} printPDF={printPDF} />
]
                
  return (
    <div className={`col-lg-3 col-sm-8 shadow scroll h-100 ${props.mobileLeft == false ? 'hide-menu' : 'show-menu'}`} >
        <div className='edit-layer'>

                <div style={{display: "flex", alignItems: 'center', height: "106px"}}>
                <AnimatePresence mode="wait">
                  {props.allowProgress === 0 && (
                    <motion.p
                      key="step0"
                      initial={{ x: '-150%' }} // Start fully off-screen to the left
                      animate={{ x: 0 }} // Move to its normal position
                      exit={{ x: '-150%' }} // Move fully off-screen when it disappears
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                      className="suggestion montserrat"
                    >
                      Complete the questionnaire in the <span className="montserrat-red">jobsite</span> tab to unlock the machines and tooling tabs.
                    </motion.p>
                  )}
                  {props.allowProgress === 1 && (
                    <motion.p
                      key="step1"
                      initial={{ x: '-150%' }} // Start fully off-screen to the left
                      animate={{ x: 0 }} // Move to its normal position
                      exit={{ x: '-150%' }} // Move fully off-screen when it disappears
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                      className="suggestion montserrat"
                    >
                      Select products for all layers in the <span className="montserrat-red">machines</span> tab to unlock the tooling tab.
                    </motion.p>
                  )}
                  {props.allowProgress === 2 && (
                    <motion.p
                      key="step2"
                      initial={{ x: '-150%' }} // Start fully off-screen to the left
                      animate={{ x: 0 }} // Move to its normal position
                      exit={{ x: '-150%' }} // Move fully off-screen when it disappears
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                      className="suggestion montserrat"
                    >
                      Select products for all layers in the <span className="montserrat-red">tooling</span> tab to get product recommendations.
                    </motion.p>
                  )}
                  {props.allowProgress >= 3 && (
                    <motion.p
                      key="step3"
                      initial={{ x: '-150%' }} // Start fully off-screen to the left
                      animate={{ x: 0 }} // Move to its normal position
                      exit={{ x: '-150%' }} // Move fully off-screen when it disappears
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                      className="suggestion montserrat"
                    >
                      View recommendation by clicking <span className="montserrat-red">view recommendation</span> below.
                    </motion.p>
                  )}
                </AnimatePresence>

                </div>

            <div className='row'>
                {/* tab buttons */}
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 0 && 'tab-btn-active'} `} onClick={() => setDisplayMenu(0)}>JOBSITE</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 1 && 'tab-btn-active'} ${progress < 1 && 'tab-btn-inactive'}`} onClick={() => {if(progress > 0){setDisplayMenu(1)}}} >MACHINES</button>
                </div>
                <div className='col px-0'>
                    <button type="button" className={`w-100 tab-btn ${displayMenu == 2 && 'tab-btn-active'} ${progress < 2 && 'tab-btn-inactive-light'}`} onClick={() => {if(progress > 1){setDisplayMenu(2)}}}>TOOLING</button>
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