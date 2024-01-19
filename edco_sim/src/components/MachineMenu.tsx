import {useEffect, useState } from 'react'
import ListButton from './ListButton';


export default function EditLayer(props: any) {

const machinesByApplication: any = {
  ALR: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'mastic', 'paint', 'ice', 'concrete', 'asphalt', 'corrosion', 'oil', 'glue'],
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  ALRBS: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'mastic', 'paint', 'ice', 'concrete', 'asphalt', 'corrosion', 'oil', 'glue'],
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'carpet', 'VCT', 'glue'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
  },
  SEC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
  },
  _2GC: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg'
  },
  _2DHD: {
    apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg'
  },
  TL9: {
    apps: ['leveling', 'rubber', 'epoxy', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  TMC7: {
    apps: ['leveling', 'rubber', 'epoxy', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete', 'edges'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  TG10: {
    apps: ['leveling', 'rubber', 'epoxy', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  //make trip hazard surface`
  CPL8: {
    apps: ['leveling', 'rubber', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CPM8: {
    apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CD5: {
    apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
    image: 'https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'
  }
}



const [selectedMachine, setSelectedMachine] = useState('');
const [matchingMachines, setMatchingMachines] = useState<string[]>([]);



const setMachine = (newMachine: string, ) => {
    props.layerObject.setMachine(newMachine);
    setSelectedMachine(newMachine);
}



useEffect(() => {
  setSelectedMachine(props.layerObject.surface)
  let concatList: string[] = [];

  Object.keys(machinesByApplication).forEach((key) => {
    const arr = machinesByApplication[key].apps;
    const length: number = arr.length;

    for (let index = 0; index < length; index++) {
      const surfaceAtIndex = arr[index];
      
      if(surfaceAtIndex == selectedMachine){
        concatList = concatList.concat(key)
      }
    }
  })

  setMatchingMachines(concatList);
}, [selectedMachine])



  return (
    <div className='col edit-menu'>
        {matchingMachines.map((machine, i) => 
            <ListButton key={i} lable={machine} icon={machinesByApplication[machine].image} active={selectedMachine == machine ? true : false} onClick={() => setMachine(machine)} />
        )}
    </div>
  )
}