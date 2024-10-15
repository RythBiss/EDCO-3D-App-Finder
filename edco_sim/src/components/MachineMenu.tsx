import {useEffect, useState } from 'react'
import ListButton from './ListButton';
import NextButton from './NextButton';
import { allMachineData, isMachineElectricGlobal } from '../functions';

export default function EditLayer(props: any) {

  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [selectedLayerState, setSelectedLayerState] = useState<number>();

  const [matchingMachinesL1, setmatchingMachinesL1] = useState<any>();
  const [matchingMachinesL2, setmatchingMachinesL2] = useState<any>();
  const [matchingMachinesL3, setmatchingMachinesL3] = useState<any>();
  const [matchingMachinesL4, setmatchingMachinesL4] = useState<any>();

  const [subdL1, setSubdL1] = useState<boolean>(false);
  const [subdL2, setSubdL2] = useState<boolean>(false);
  const [subdL3, setSubdL3] = useState<boolean>(false);
  const [subdL4, setSubdL4] = useState<boolean>(false);

  //calls the set machine method from Layer object in App.tsx
  const setMachine = (newMachine: string, layer: number, machineNumber: string) => {
      props.layerObject.setMachine(newMachine, layer);
      setSelectedMachine(newMachine);
  
      if(isMachineElectricGlobal(machineNumber)){
        props.layerObject.setContainsElectric(true);
      }
    }

  //updates which, if any, accordion menu is open.
  const handleMenuState = (newState: number) => {
    if(newState == selectedLayerState){
        setSelectedLayerState(-1)
    }else{
        setSelectedLayerState(newState)
    }
  }

  //called to find substitutes for machines if no results match given a list
  const substituteMachine = (list: any) => {
    
    let temp = list;

    list?.invalidReasons.forEach((item: any) => {
      if(item.materialRemoved == true && item.materialThickness == true){

        temp.machines.push(item.name);
      }
    })

    return temp;
  }

  //adds machines info text to popup
  const handlePopup = (item: any) =>{
    props.setPopupInfo(allMachineData[item].info)
  }

  //called to compile list given a layer object
  const compileMachineList = (layerInstance: any) => {
      //create new array
      let validMachineList: string[] = [];
      let invalidResons:any[] = [];

      //sort through machines and concat any that match the application to the validMachineList 
      Object.keys(allMachineData).forEach((key) => {
        //checklist for current machine
        let machineChecklist:any = {
          //onconcrete: false,
          materialRemoved: false,
          materialThickness: false,
          //finishedSurface: false,
          //jobSize: false,
          edger: true,
          powerType: false
        }
    
        //shorthand for current machine apps
        const machineApplications = allMachineData[key].apps;
        //shorthand for length of machine apps list
        const length: number = machineApplications.length;
    
        //compare each app of the current machine to the layer objects property counterpart
        for (let index = 0; index < length; index++) {
          const applicationAtIndex = machineApplications[index];
    
          if(applicationAtIndex == layerInstance.materialRemoved){
            machineChecklist.materialRemoved = true;
            break;
          }
        }
        
        if(allMachineData[key].depth == layerInstance.materialThickness){
          machineChecklist.materialThickness = true;
        }else if(allMachineData[key].depth == -1){
          machineChecklist.materialThickness = true;
        }

        if(allMachineData[key].recJobSize <= layerInstance.jobSize){
          machineChecklist.jobSize = true;
        }

        allMachineData[key].power.forEach((item:string) => {
          if(item == layerInstance.powerType) {
            machineChecklist.powerType = true;
          }
        })

        if(props.layerObject.edger == false){
          if(allMachineData[key].edges == true){
            machineChecklist.edger = false;
          }
        }
    



        let validateMachine:boolean = true;
    
        Object.keys(machineChecklist).forEach((item) => {
          if(machineChecklist[item] == false){
            validateMachine = false;
          }
        })
    
        if(validateMachine == true){
          validMachineList = validMachineList.concat(key);
        }else{
          machineChecklist.name = key;
          invalidResons.push(machineChecklist)
        }
      })

      const returnPackage = {
        machines: validMachineList,
        invalidReasons: invalidResons
      }

      return returnPackage;
  }

  // returns index based on power type
  const getPowerTypeImageIndex = (machine: string) => {

    let index = allMachineData[machine].power.indexOf(props.layerObject.powerType)

    if(index == -1) index = 0

    return index
  }

  //populate layer lists
  useEffect(() => {

    let generatedList = compileMachineList(props.layerObject)

    //below are 4 blocks, each populate its respective layer with machines based on provided information, and substitutes machines when none match the inputs.
    
    //layer 1
    if(props.layerObject.sublayerObjects[0] !== undefined){
      generatedList = compileMachineList(props.layerObject.sublayerObjects[0])

      if(generatedList.machines.length == 0){
        setmatchingMachinesL1(substituteMachine(generatedList))
        setSubdL1(true);
      }else{
        setmatchingMachinesL1(compileMachineList(props.layerObject.sublayerObjects[0]));
        setSubdL1(false);
      }
    }

    //layer 2
    if(props.layerObject.sublayerObjects[1] !== undefined){
      generatedList = compileMachineList(props.layerObject.sublayerObjects[1])

      if(generatedList.machines.length == 0){
        setmatchingMachinesL2(substituteMachine(generatedList))
        setSubdL2(true);
      }else{
        setmatchingMachinesL2(compileMachineList(props.layerObject.sublayerObjects[1]));
        setSubdL2(false);
      }
    }

    //layer 3
    if(props.layerObject.sublayerObjects[2] !== undefined){
      generatedList = compileMachineList(props.layerObject.sublayerObjects[2])

      if(generatedList.machines.length == 0){
        setmatchingMachinesL3(substituteMachine(generatedList))
        setSubdL3(true);
      }else{
        setmatchingMachinesL3(compileMachineList(props.layerObject.sublayerObjects[2]));
        setSubdL3(false);
      }
    }

    //layer 4
    if(props.layerObject.sublayerObjects[3] !== undefined){
      generatedList = compileMachineList(props.layerObject.sublayerObjects[3])

      if(generatedList.machines.length == 0){
        setmatchingMachinesL4(substituteMachine(generatedList))
        setSubdL4(true);
      }else{
        setmatchingMachinesL4(compileMachineList(props.layerObject.sublayerObjects[3]));
        setSubdL4(false);
      }
    }

  }, [props.layerObject, props.update])


  //checks if a machine has been selected for each layer, and allows the user to access the next tab if so.
  useEffect(()=>{
    let machinesSelected: boolean = true;

    props.layerObject.sublayerObjects.forEach((obj: any) => {
      if(obj.machine == ''){
        machinesSelected = false;
      }
    })

    if(machinesSelected){
      props.setAllowProgress(2);
    }
  })

  return (
    <div className='col edit-menu scroll-on'>
      {/* layer 1 accordion open/close button */}
        {matchingMachinesL1 &&
          <ListButton
            lable={`First Layer`}
            active={selectedLayerState == 0 ? true : false}
            onClick={() => {handleMenuState(0)}}
            selected={props.layerObject.sublayerObjects[0].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL1 && selectedLayerState == 0 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 0 && matchingMachinesL1 !== undefined &&
          matchingMachinesL1.machines.length > 0 &&
            matchingMachinesL1.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[0].machine == item ? true : false}
                onClick={() => setMachine(item, 0, allMachineData[item].number[getPowerTypeImageIndex(item)])}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }

      {/* layer 2 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 2 && matchingMachinesL2 !== undefined  &&
          <ListButton
            lable={`Second Layer`}
            active={selectedLayerState == 1 ? true : false}
            onClick={() => {handleMenuState(1)}}
            selected={props.layerObject.sublayerObjects[1].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL2 && selectedLayerState == 1 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 1 && matchingMachinesL2 !== undefined  &&
          matchingMachinesL2.machines.length > 0 &&
            matchingMachinesL2.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[1].machine == item ? true : false}
                onClick={() => setMachine(item, 1, allMachineData[item].number[getPowerTypeImageIndex(item)])}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                
                />
              )        
        }

      {/* layer 3 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 3 && matchingMachinesL3 !== undefined  &&
          <ListButton
            lable={`Third Layer`}
            active={selectedLayerState == 2 ? true : false}
            onClick={() => {handleMenuState(2)}}
            selected={props.layerObject.sublayerObjects[2].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL3 && selectedLayerState == 2 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 2 && matchingMachinesL3 !== undefined  &&
          matchingMachinesL3.machines.length > 0 &&
            matchingMachinesL3.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[2].machine == item ? true : false}
                onClick={() => setMachine(item, 2, allMachineData[item].number[getPowerTypeImageIndex(item)])}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }

      {/* layer 4 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 4 && matchingMachinesL4 !== undefined  &&
          <ListButton
            lable={`Fourth Layer`}
            active={selectedLayerState == 3 ? true : false}
            onClick={() => {handleMenuState(3)}}
            selected={props.layerObject.sublayerObjects[3].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL4 && selectedLayerState == 3 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 3 && matchingMachinesL4 !== undefined  &&
          matchingMachinesL4.machines.length > 0 &&
            matchingMachinesL4.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true} 
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[3].machine == item ? true : false}
                onClick={() => setMachine(item, 3, allMachineData[item].number[getPowerTypeImageIndex(item)])}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }

        {props.allowProgress == 2 &&
            <NextButton lable={'Next: Tooling'} onClick={() => props.nextFunction()} />
          }
    </div>
  )
}