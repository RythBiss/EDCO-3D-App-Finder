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
    //setSelectedSurface(newTooling);
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


  useEffect(() => {
    //2D array to store tooling options
    let fourLayers: any[] = [[],[],[],[]]
    let count = 0;
   
    //for each layer
    props.layerObject.sublayerObjects.forEach((item: { machine: any; materialRemoved: any; }, layerIndex: number) => {
      count++;
      let concatList: string[] = [];

      //go through each tooling
      Object.keys(toolsByApplicationAndMachine).forEach((key) => {
        const machinesArray = toolsByApplicationAndMachine[key].machines;
        const appsArray = toolsByApplicationAndMachine[key].apps;
        const toolFitsMachine = machinesArray.includes(item.machine);
        const toolFitsApplication = appsArray.includes(item.materialRemoved);

        //add tools that fit application
        if(toolFitsApplication && toolFitsMachine){
          concatList.push(key)
        }
      })

      //add tools to 2D array
      fourLayers[layerIndex] = concatList;
    });

    setMatchingTooling(fourLayers)
  }, [])

  //opens accordion of currently selected layer.
  const toolSelect = (num: number) => {
    if(openTab == num){
      setOpenTab(-1)
    }else{
      setOpenTab(num)
    }
  }
  
  return (
    <div className='col edit-menu scroll-on'>
      {/* lists of tooling organized by layer */}

      {/* layer 1 */}
      <ListButton lable={'First Layer'} onClick={() => toolSelect(0)} selected={props.layerObject.sublayerObjects[0].tooling !== ''} />
      {openTab == 0 &&
        matchingTooling.length !== 0 &&
          matchingTooling[0].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1}
              popupOn={props.popupOn}
              showMenu={true} 
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 0, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

      {/* layer 2 */}
      {props.layerObject.sublayerObjects.length > 1 &&
        <ListButton lable={'Second Layer'} onClick={() => toolSelect(1)} selected={props.layerObject.sublayerObjects[1].tooling !== ''} />
      }
      {openTab == 1 &&
        matchingTooling.length !== 0 &&
          matchingTooling[1].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1} popupOn={props.popupOn} 
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 1, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

      {/* layer 3 */}
      {props.layerObject.sublayerObjects.length > 2 &&
        <ListButton lable={'Third Layer'} onClick={() => toolSelect(2)} selected={props.layerObject.sublayerObjects[2].tooling !== ''} />
      }
      {openTab == 2 &&
        matchingTooling.length !== 0 &&
          matchingTooling[2].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1} popupOn={props.popupOn}
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 2, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}
      
      {/* layer 4 */}
      {props.layerObject.sublayerObjects.length > 3 &&
        <ListButton lable={'Fourth Layer'} onClick={() => toolSelect(3)} selected={props.layerObject.sublayerObjects[3].tooling !== ''} />
      }
      {openTab == 3 &&
        matchingTooling.length !== 0 &&
          matchingTooling[3].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1}
              popupOn={props.popupOn}
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image} 
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 3, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

          {props.allowProgress == 3 &&
            <NextButton lable={'View Recommendation'} onClick={() => props.printPDF()} />
          }
    </div>
  )
}
