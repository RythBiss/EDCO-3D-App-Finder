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
    edges: true,
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
    edges: true,
    power: ['air'],
    image: 'https://portal.edcoinc.com/storage/product-slider/big-stick-chisel-scalers/ALR-BS-Straight-Machine-Slider.jpg'
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'carpet', 'VCT', 'glue'],
    depth: 0,
    recJobSize: 1,
    onCrete: true,
    //if the machine can achive a CSP 2-3 for new coatings
    surfacePrep: false,
    edges: true,
    power: ['electric'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
  },
  SEC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
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
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
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
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
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
    apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'edges'],
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
const [matchingMachinesL1, setmatchingMachinesL1] = useState<string[]>([]);
const [selectedLayerState, setSelectedLayerState] = useState<number>();

const setMachine = (newMachine: string, ) => {
    props.layerObject.setMachine(newMachine);
    setSelectedMachine(newMachine);
}

const handleMenuState = (newState: number) => {
  if(newState == selectedLayerState){
      setSelectedLayerState(-1)
  }else{
      setSelectedLayerState(newState)
  }
}

useEffect(() => {
  //create new array
  let validMachineList: string[] = [];

  //sort through machines and concat any that match the application to the validMachineList 
  Object.keys(allMachineData).forEach((key) => {
    //checklist for current machine
    let machineChecklist = {
      //onConcrete: false,
      materialRemoved: false,
      materialThickness: false,
      //finishedSurface: false,
      jobSize: false,
      //edger: false,
      powerType: false
    }

    //shorthand for current machine apps
    const machineApplications = allMachineData[key].apps;
    //shorthand for length of machine apps list
    const length: number = machineApplications.length;

    //compare each app of the current machine to the layer objects property counterpart
    for (let index = 0; index < length; index++) {
      const applicationAtIndex = machineApplications[index];

      if(applicationAtIndex == props.layerObject.materialRemoved){
        //validMachineList = validMachineList.concat(key);
        machineChecklist.materialRemoved = true;
        break;
      }
    }
    
    if(allMachineData[key].depth == props.layerObject.materialThickness){
        machineChecklist.materialThickness = true;
    }

    // if(allMachineData[key].surfacePrep == props.layerObject.materialThickness){
    //     machineChecklist.materialThickness = true;
    // }
    
    if(allMachineData[key].recJobSize <= props.layerObject.jobSize){
      machineChecklist.jobSize = true;
    }
    
    //removed greenConcrete check, thats for tooling
    
    //removed dust check, just adds a vacuum to the list

    //removed edges check, just adds an edger if true and grinding the edges is needed

    allMachineData[key].power.forEach((item) => {
      if(item == props.layerObject.powerType) {
        machineChecklist.powerType = true;
      }
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////

    let validateMachine:boolean = true;

    Object.keys(machineChecklist).forEach((item, i) => {
      console.log(machineChecklist)
      if(machineChecklist[item] == false){
        validateMachine = false;
      }
    })

    if(validateMachine == true){
      validMachineList = validMachineList.concat(key);
      setmatchingMachinesL1(validMachineList);
    }

    //change to go through check list and only add if the machine is all true
    // if(machineChecklist.materialRemoved == true){
    //   //set the machine list as a state
    //   validMachineList = validMachineList.concat(key);
    //   setmatchingMachinesL1(validMachineList)
    // }
  })
}, [props.layerObject])

  return (
    <div className='col edit-menu'>
        <ListButton lable={`First Layer (${matchingMachinesL1.length})`} active={selectedLayerState == 0 ? true : false} onClick={() => {handleMenuState(0)}} />
        {selectedLayerState == 0 &&
          matchingMachinesL1.length > 0 &&
            matchingMachinesL1.map((item, i) => <ListButton key={i} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item)} />)        
        }

        <ListButton lable={'Second Layer'} active={selectedLayerState == 1 ? true : false} onClick={() => {handleMenuState(1)}} />
        <ListButton lable={'Third Layer'} active={selectedLayerState == 2 ? true : false} onClick={() => {handleMenuState(2)}} />
        <ListButton lable={'Fourth Layer'} active={selectedLayerState == 3 ? true : false} onClick={() => {handleMenuState(3)}} />
    </div>
  )
}