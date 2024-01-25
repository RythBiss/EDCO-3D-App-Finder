import {useEffect, useState } from 'react'
import ListButton from './ListButton';

export default function EditLayer(props: any) {

const machinesByApplication: any = {
  ALR: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
    depth: 0,
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  ALRBS: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
    depth: 0,
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'carpet', 'VCT', 'glue'],
    depth: 0,
    image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
  },
  SEC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
  },
  _2GC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg'
  },
  _2DHD: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg'
  },
  TL9: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  TMC7: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'edges'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  TG10: {
    apps: ['leveling', 'rubber', 'epoxy', 'concrete'],
    depth: 1,
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  //make trip hazard surface`
  CPL8: {
    apps: ['leveling', 'rubber', 'concrete', 'trip hazard'],
    depth: 2,
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CPM8: {
    apps: ['leveling', 'concrete', 'trip hazard', 'rubber'],
    depth: 2,
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CD5: {
    apps: ['leveling', 'concrete', 'trip hazard'],
    depth: 3,
    image: 'https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'
  }
}

const [selectedMachine, setSelectedMachine] = useState('');
const [matchingMachinesL1, setmatchingMachinesL1L1] = useState<string[]>([]);
const [selectedLayerState, setSelectedLayerState] = useState<number>();
const [listUI, setListUI] = useState();

const setMachine = (newMachine: string, ) => {
    props.layerObject.setMachine(newMachine);
    setSelectedMachine(newMachine);
}

const setSelectedLayer = (value: number) => {
  setSelectedLayerState(value)
}

const handleMenuState = (newState: number) => {
  if(newState == selectedLayerState){
      setSelectedLayerState(-1)
  }else{
      setSelectedLayerState(newState)
  }
}

useEffect(() => {
  setSelectedMachine(props.layerObject.surface)
  let validMachineList: string[] = [];

  Object.keys(machinesByApplication).forEach((key) => {
    const arr = machinesByApplication[key].apps;
    const length: number = arr.length;

    for (let index = 0; index < length; index++) {
      const surfaceAtIndex = arr[index];

      if(surfaceAtIndex == props.layerObject.materialRemoved){
        validMachineList = validMachineList.concat(key);
      }
    }
  })
  setmatchingMachinesL1L1(validMachineList)
}, [props.layerObject])

useEffect(() => {
  if(matchingMachinesL1.length > 0){
    matchingMachinesL1.map((item, i) => 
    console.log(item))
  }
}, [matchingMachinesL1])

  return (
    <div className='col edit-menu'>
        <ListButton lable={`First Layer (${matchingMachinesL1.length})`} active={selectedLayerState == 0 ? true : false} onClick={() => {handleMenuState(0)}} />
        {selectedLayerState == 0 &&
          matchingMachinesL1.length > 0 &&
            matchingMachinesL1.map((item, i) => <ListButton key={i} indent={1} lable={item} icon={machinesByApplication[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item)} />)
                  
        }

        <ListButton lable={'Second Layer'} active={selectedLayerState == 1 ? true : false} onClick={() => {handleMenuState(1)}} />
        <ListButton lable={'Third Layer'} active={selectedLayerState == 2 ? true : false} onClick={() => {handleMenuState(2)}} />
        <ListButton lable={'Fourth Layer'} active={selectedLayerState == 3 ? true : false} onClick={() => {handleMenuState(3)}} />

        {/* {matchingMachinesL1.map((machine, i) => 
            <ListButton key={i} lable={machine} icon={machinesByApplication[machine].image} active={selectedMachine == machine ? true : false} onClick={() => setMachine(machine)} />
        )} */}
    </div>
  )
}