import {useEffect, useState } from 'react'
import ListButton from './ListButton';
import NextButton from './NextButton';
import { allMachineData, isMachineElectricGlobal } from '../functions';

export default function EditLayer(props: any) {

  const [selectedLayerState, setSelectedLayerState] = useState<number>();

  // const [matchingMachinesL1, setmatchingMachinesL1] = useState<any>();
  // const [matchingMachinesL2, setmatchingMachinesL2] = useState<any>();
  // const [matchingMachinesL3, setmatchingMachinesL3] = useState<any>();
  // const [matchingMachinesL4, setmatchingMachinesL4] = useState<any>();
  // const [matchingMachinesF1, setmatchingMachinesF1] = useState<any>();
  // const [matchingMachinesF2, setmatchingMachinesF2] = useState<any>();

  // const [subdL1, setSubdL1] = useState<boolean>(false);
  // const [subdL2, setSubdL2] = useState<boolean>(false);
  // const [subdL3, setSubdL3] = useState<boolean>(false);
  // const [subdL4, setSubdL4] = useState<boolean>(false);
  // const [subdF1, setSubdF1] = useState<boolean>(false);
  // const [subdF2, setSubdF2] = useState<boolean>(false);

  // const [finishLayers, //setFinishLayers] = useState<number>(0);


  //calls the set machine method from Layer object in App.tsx
  const setMachine = (newMachine: string, layer: number, machineNumber: string) => {
      props.layerObject.setMachine(newMachine, layer);
  
      if(isMachineElectricGlobal(machineNumber)){
        props.layerObject.setContainsElectric(true);
      }

      handleMenuState(-1);
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
        }else if(layerInstance.materialRemoved == "trip hazard" && key !== "CD5"){ // trip hazards are a "special case" since they are always used for this app, regardless of depth, size, etc.
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

      const returnPackage: { machines: string[], invalidReasons: any[], substitute?: boolean } = {
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


  const newLayerWithThickness = (thickness: number) => {

    props.layerObject.generateFinishLayers();

    const length = props.layerObject.getSubLayerLength();

    props.layerObject.getSubLayerByIndex(length - 1).setMaterialRemoved("concrete", 4, ["concrete"]);
    props.layerObject.getSubLayerByIndex(length - 1).setMaterialThickness(thickness);
    props.layerObject.getSubLayerByIndex(length - 1).setPowerType(props.layerObject.getPowerforPDF());

    let generatedList = compileMachineList(props.layerObject.getSubLayerByIndex(length - 1));

    return generatedList;
  }

  const mediumToSmooth = () =>{
    //setFinishLayers((prev: number) => prev + 1);    

    newLayerWithThickness(0);

  }

  const roughToSmooth = () =>{
    //setFinishLayers((prev: number) => prev + 1);

    newLayerWithThickness(2);

    mediumToSmooth();
  }

  const smoothToRough = () =>{
    //setFinishLayers((prev: number) => prev + 1);

    newLayerWithThickness(2);
  }

  const buildFinishLayer = () => {

    const thickness = props.layerObject.getThickness();
    const desiredFinish = props.layerObject.getFinish();
    
    if(desiredFinish == "smooth" && thickness == 0){
      // console.log("Already smooth")
    } else if(desiredFinish == "smooth" && (thickness > 0 && thickness <= 2)){
        props.layerObject.finishLayersMax = 1;
        mediumToSmooth();
    } else if(desiredFinish == "smooth" && thickness >= 3){
        props.layerObject.finishLayersMax = 2;
        roughToSmooth();
    } else if(desiredFinish == "textured" && thickness >= 2){
        props.layerObject.finishLayersMax = 0;
      // console.log("Already rough")
    } else if(desiredFinish == "textured" && thickness < 2){
        props.layerObject.finishLayersMax = 1;
        smoothToRough();
    }
  }

  const numberToWord = (num: number): string => {
    const words = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    return words[num - 1];
  };

  const getMachines = (index: number) => {

      let generatedList = compileMachineList(props.layerObject.sublayerObjects[index])
      let returnPackage;

      if(generatedList.machines.length == 0){
        returnPackage = substituteMachine(generatedList);
        returnPackage.substitute = true;
        return returnPackage;
      }else{
        returnPackage = compileMachineList(props.layerObject.sublayerObjects[index]);
        returnPackage.substitute = false;
        return returnPackage;
      }
    
  }

  useEffect(() => {

    buildFinishLayer();

  }, []);


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
        {props.layerObject.sublayerObjects.map((subLayer: any, index: number) => (
          <>
            <ListButton
              lable={`${numberToWord(index + 1)} Layer`}
              active={selectedLayerState == index ? true : false}
              onClick={() => {handleMenuState(index)}}
              selected={subLayer.machine !== ''}
            />
            {getMachines(index).substitute && selectedLayerState == index &&
              <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
            }
            {selectedLayerState == index && getMachines(index) !== undefined  &&
            getMachines(index).machines.length > 0 &&
              getMachines(index).machines.map((item: string, i: number) =>
                <ListButton
                  key={i}
                  popupOn={props.popupOn}
                  showMenu={true}
                  indent={1}
                  lable={item}
                  displayName={allMachineData[item].displayName[getPowerTypeImageIndex(item)]}
                  icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                  active={props.layerObject.sublayerObjects[index].machine == item ? true : false}
                  onClick={() => setMachine(item, index, allMachineData[item].number[getPowerTypeImageIndex(item)])}
                  mouseAction={() => handlePopup(item)}
                  setIsInfoPopupOnupYPos={props.setPopupYPos}
                  popupInfo={allMachineData[item].info}
                  partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                  layerObject={props.layerObject}
                  />
                )        
            }
          </>
        ))}

        {props.allowProgress == 2 &&
            <NextButton lable={'Next: Tooling'} onClick={() => props.nextFunction()} />
          }
    </div>
  )
}