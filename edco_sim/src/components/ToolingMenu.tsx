import { useEffect, useState } from 'react'
import ListButton from './ListButton'
import NextButton from './NextButton';
import { toolsByApplicationAndMachine, toolingHasDiamonds } from '../functions';


export default function ToolingMenu(props: any) {
  //temporary tooling data table until backend is developed.

  const [matchingTooling, setMatchingTooling] = useState<string[][]>([]);
  const [openTab, setOpenTab] = useState<number>(-1);

  const handlePopup = (item: any) =>{
    props.setPopupInfo(toolsByApplicationAndMachine[item].info)
  }

  const setTooling = (newTooling: string, layer:number, CSP: number) => {
    props.layerObject.setTooling(newTooling, layer, CSP);
    
    if(toolingHasDiamonds(newTooling) == true){
      props.layerObject.setContainsDiamonds(true)
    }

    toolSelect(-1);
    //setSelectedSurface(newTooling);
  }

  //opens accordion of currently selected layer.
  const toolSelect = (num: number) => {
    if(openTab == num){
      setOpenTab(-1)
    }else{
      setOpenTab(num)
    }
  }

  const getToolsAlgorithm = (layer: any) => {
    console.log("Starting getToolsAlgorithm for layer:", layer);

    let concatList: string[];
    const item = props.layerObject.sublayerObjects[layer];

    concatList = [];

    //go through each tooling
    Object.keys(toolsByApplicationAndMachine).forEach((key) => {
      console.log(`Checking tool: ${key}`);
      const machinesArray = toolsByApplicationAndMachine[key].machines;
      const appsArray = toolsByApplicationAndMachine[key].apps;
      const toolFitsMachine = machinesArray.includes(item.machine);
      const toolFitsApplication = appsArray.includes(item.materialRemoved);
      const hardGlueTool = (key == "DymaDots" || key == "DymaDots70" || key == "DymaDots120" || key == "DymaSegs");
      const softGlueTool = (key == "MagnaBlades" || key == "MagnaBladesDual");
      const adhesiveSpecialCase = hardGlueTool || softGlueTool;

      console.log(`Tool: ${key}, Fits Machine: ${toolFitsMachine}, Fits Application: ${toolFitsApplication}, Adhesive Special Case: ${adhesiveSpecialCase}`);

      let removeToolDueToSpecialCase = false;

      console.log(item);

      if(
        (item.materialRemoved == "glue/adhesive" ||
        item.materialRemoved == "thinset" ||
        item.materialRemoved == "mastic")
        &&
        adhesiveSpecialCase
      ){        
        console.log(`Special case for adhesive: puttyKnifeCuts=${props.layerObject.puttyKnifeCuts}, hardGlueTool=${hardGlueTool}, softGlueTool=${softGlueTool}`);
        if((props.layerObject.puttyKnifeCuts == true && hardGlueTool) || (props.layerObject.puttyKnifeCuts == false && softGlueTool)){
          console.log(`Removing tool due to special case (1): ${key}`);
          removeToolDueToSpecialCase = true;
        }
      }
      
      if(props.layerObject.getFinish() === 'smooth' && key == "PCDbacking" || key == "PCDbackingDual") {
        console.log(`Removing tool due to special case (2): ${key}`);
        removeToolDueToSpecialCase = true;
      }

      //add tools that fit application
      if(toolFitsApplication && toolFitsMachine && removeToolDueToSpecialCase == false){
        concatList.push(key)
      }
    });

    console.log("Tools that fit the criteria:", concatList);
    return concatList;

  }

  //checks if tooling has been selected for each layer, and allows the user to access recommendations if so.
  useEffect(()=>{
    let machinesSelected: boolean = true;

    props.layerObject.sublayerObjects.forEach((obj: any) => {
      if(obj.tooling == ''){
        machinesSelected = false;
      }
    })

    if(machinesSelected){
      props.setAllowProgress(3);
    }

  })

  return (
    <div className='col edit-menu scroll-on'>
      {/* lists of tooling organized by layer */}

        {props.layerObject.sublayerObjects.map((sublayer: any, index: number) => (
          <div key={index}>
            <ListButton
              lable={`Layer ${index + 1}`} //use number to word here, also move that function to functions.tsx
              onClick={() => toolSelect(index)}
              selected={sublayer.tooling !== ''}
            />
            {openTab === index && getToolsAlgorithm(index).length !== 0 &&
              getToolsAlgorithm(index).map((tool: any, i: any) => (
                <ListButton
                  key={i}
                  lable={toolsByApplicationAndMachine[tool].name}
                  displayName={toolsByApplicationAndMachine[tool].name}
                  indent={1}
                  popupOn={props.popupOn}
                  showMenu={true}
                  icon={toolsByApplicationAndMachine[tool].image}
                  onClick={() =>
                    setTooling(toolsByApplicationAndMachine[tool].name, index, toolsByApplicationAndMachine[tool].CSP)}
                  mouseAction={() => handlePopup(tool)}
                  setIsInfoPopupOnupYPos={props.setPopupYPos}
                  popupInfo={toolsByApplicationAndMachine[tool].info}
                  partNumber={toolsByApplicationAndMachine[tool].number[0]}
                  layerObject={props.layerObject}
                />
              ))}
          </div>
        ))}

        {props.allowProgress == 3 &&
          <NextButton lable={'View Recommendation'} onClick={() => props.printPDF()} />
        }
    </div>
  )
}
