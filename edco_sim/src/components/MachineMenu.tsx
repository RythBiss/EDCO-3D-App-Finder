import {useEffect, useState } from 'react'
import ListButton from './ListButton';


export default function EditLayer(props: any) {

const machinesByApplication: any = {
  ALR: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet'],
    image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
  },
  SEC: {
    apps: ['adhesives', 'glues', 'thinsets', 'industrial buildup', 'residual adhesive', 'sealers', 'thin mil coatings', 'paint', 'leveling', 'CSP 1-9'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
  },
  TG10: {
    apps: ['residual adhesive', 'sealers', 'thin mil coatings', 'paint','leveling', 'CSP 1-9'],
    image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg'
  },
  CPM8: {
    apps: ['leveling', 'CSP 1-9'],
    image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg'
  },
  CD5: {
    apps: ['leveling', 'CSP 1-9'],
    image: 'https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'
  }
}



const [selectedMachine, setSelectedMachine] = useState('');
const [matchingMachines, setMatchingMachines] = useState<string[]>([]);



const setMachine = (newMachine: string, ) => {
    props.layerObject.setMachine(newMachine);
    setSelectedMachine(newMachine);
    console.log(props.layerObject)
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
    <div className='edit-menu'>
        {matchingMachines.map((machine, i) => 
            <ListButton key={i} lable={machine} icon={machinesByApplication[machine].image} active={selectedMachine == machine ? true : false} onClick={() => setMachine(machine)} />
        )}
    </div>
  )
}