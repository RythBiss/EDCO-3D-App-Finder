import {useEffect, useState } from 'react'
import ListButton from './ListButton';

export default function EditLayer(props: any) {

const allMachineData: any = {
  //job size is per hour, remember that when making the lists
  ALR: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['air'],
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  ALRBS: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['air'],
    image: 'https://portal.edcoinc.com/storage/product-slider/big-stick-chisel-scalers/ALR-BS-Straight-Machine-Slider.jpg'
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'carpet', 'VCT', 'glue'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
  },
  SEC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: false,
    power: ['electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
  },
  _2GC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: false,
    power: ['gas', 'electric', 'propane'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg'
  },
  _2DHD: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
    depth: 0,
    recJobSize: 2,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: false,
    power: ['electric', 'propane'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg'
  },
  TL9: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: false,
    power: ['electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-turbo-lite-grinder/TL-9-Machine-Slider.jpg'
  },
  TMC7: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'edges', 'residual'],
    depth: 0,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: true,
    power: ['electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  TG10: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete'],
    depth: 1,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: true,
    edges: false,
    power: ['gas', 'electric', 'propane'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  //make trip hazard surface`
  CPL8: {
    apps: ['leveling', 'rubber', 'concrete', 'trip hazard'],
    depth: 1,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['gas', 'electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Electric-Machine-Slider.jpg'
  },
  CPM8: {
    apps: ['leveling', 'concrete', 'trip hazard', 'rubber'],
    depth: 2,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['gas', 'electric', 'propane'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CPM10: {
    apps: ['leveling', 'concrete', 'trip hazard', 'rubber'],
    depth: 2,
    recJobSize: 1,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['gas', 'electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Gas-Machine-Slider.jpg'
  },
  CD5: {
    apps: ['leveling', 'concrete', 'trip hazard'],
    depth: 3,
    recJobSize: 0,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: false,
    power: ['air'],
    image: 'https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'
  }
}

const [selectedMachine, setSelectedMachine] = useState('');
const [selectedLayerState, setSelectedLayerState] = useState<number>();

const [matchingMachinesL1, setmatchingMachinesL1] = useState<any>();
const [matchingMachinesL2, setmatchingMachinesL2] = useState<any>();
const [matchingMachinesL3, setmatchingMachinesL3] = useState<any>();
const [matchingMachinesL4, setmatchingMachinesL4] = useState<any>();

const [subdL1, setSubdL1] = useState<boolean>(false);
const [subdL2, setSubdL2] = useState<boolean>(false);
const [subdL3, setSubdL3] = useState<boolean>(false);
const [subdL4, setSubdL4] = useState<boolean>(false);

const setMachine = (newMachine: string, layer: number) => {
    props.layerObject.setMachine(newMachine, layer);
    setSelectedMachine(newMachine);
}

const handleMenuState = (newState: number) => {
  if(newState == selectedLayerState){
      setSelectedLayerState(-1)
  }else{
      setSelectedLayerState(newState)
  }
}

const substituteMachine = (list: any) => {
  
  let temp = list;

  list?.invalidReasons.forEach((item: any) => {
    if(item.materialRemoved == true && item.materialThickness == true){
      console.log(item.name);
      console.log(list.machines);

      temp.machines.push(item.name);
    }
  })

  return temp;
}

const compileMachineList = (layerInstance:any) => {
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
        jobSize: false,
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

useEffect(() => {

  //somehow use this or parts of it to also filter for the applications additional layers
  let generatedList = compileMachineList(props.layerObject)

  if(generatedList.machines.length == 0){
    setmatchingMachinesL1(substituteMachine(generatedList))
    setSubdL1(true);
  }else{
    setmatchingMachinesL1(compileMachineList(props.layerObject));
    setSubdL1(false);
  }
  
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

}, [props.layerObject])

  return (
    <div className='col edit-menu scroll-on'>
        {matchingMachinesL1 &&
          <ListButton lable={`First Layer (${matchingMachinesL1.machines.length})`} active={selectedLayerState == 0 ? true : false} onClick={() => {handleMenuState(0)}} />
        }
        {subdL1 && selectedLayerState == 0 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {selectedLayerState == 0 && matchingMachinesL1 !== undefined &&
          matchingMachinesL1.machines.length > 0 &&
            matchingMachinesL1.machines.map((item: string, i: number) => <ListButton key={i} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 0)} />)        
        }

        {props.layerObject.layerNumber >= 2 && matchingMachinesL2 !== undefined  &&
          <ListButton lable={`Second Layer (${matchingMachinesL2.machines.length})`} active={selectedLayerState == 1 ? true : false} onClick={() => {handleMenuState(1)}} />
        }
        {subdL2 && selectedLayerState == 1 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {selectedLayerState == 1 && matchingMachinesL2 !== undefined  &&
          matchingMachinesL2.machines.length > 0 &&
            matchingMachinesL2.machines.map((item: string, i: number) => <ListButton key={i} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 1)} />)        
        }

        {props.layerObject.layerNumber >= 3 && matchingMachinesL3 !== undefined  &&
          <ListButton lable={`Third Layer (${matchingMachinesL3.machines.length})`} active={selectedLayerState == 2 ? true : false} onClick={() => {handleMenuState(2)}} />
        }
        {subdL3 && selectedLayerState == 2 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {selectedLayerState == 2 && matchingMachinesL3 !== undefined  &&
          matchingMachinesL3.machines.length > 0 &&
            matchingMachinesL3.machines.map((item: string, i: number) => <ListButton key={i} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 2)} />)        
        }

        {props.layerObject.layerNumber >= 4 && matchingMachinesL4 !== undefined  &&
          <ListButton lable={`Fourth Layer (${matchingMachinesL4.machines.length})`} active={selectedLayerState == 3 ? true : false} onClick={() => {handleMenuState(3)}} />
        }
        {subdL4 && selectedLayerState == 3 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {selectedLayerState == 3 && matchingMachinesL4 !== undefined  &&
          matchingMachinesL4.machines.length > 0 &&
            matchingMachinesL4.machines.map((item: string, i: number) => <ListButton key={i} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 3)} />)        
        }

    </div>
  )
}