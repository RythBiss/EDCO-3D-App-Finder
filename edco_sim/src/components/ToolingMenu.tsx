import React, { useEffect, useState } from 'react'
import ListButton from './ListButton'

export default function ToolingMenu(props: any) {

  const toolsByApplicationAndMachine: any = {
    Scaler: {
      apps: ['vinyl', 'ceramic', 'carpet'],
      name: 'Chisel Scalers',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg'
    },
    Scraper: {
      apps: ['vinyl', 'linoleum', 'ceramic', 'carpet'],
      name: 'Scrapper Blades',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg'
    }, 
    FloorStripperRigid: {
      apps: ['vinyl', 'linoleum', 'carpet'],
      name: '8" Rigid Scrapper Blade',
      machines: ['TS8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg'
    },
    MagnaBlades: {
      apps: ['adhesives', 'glues', 'paint'],
      name: 'Magna-Blades',
      machines: ['SEC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg'
    },
    DymaDots: {
      apps: ['thin mil coatings', 'sealers', 'thinset', 'leveling', 'residual adhesive', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'Dyma-Dots',
      machines: ['SEC', 'TG10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg'
    },
    PCDbacking: {
      apps: ['industrial buildup', 'leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'PCD w/Backing Segment',
      machines: ['SEC', 'TG10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg'
    },
    CarbideCutter: {
      apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'Carbide Cutter',
      machines: ['CPM8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/05/20156_6_PointBlueCutter-450x450.jpg'
    },
    FivePoint: {
      apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: '5-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg'
    }
  }

  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedSurface, setSelectedSurface] = useState('');
  const [matchingTooling, setMatchingTooling] = useState<string[]>([]);

  useEffect(() => {
    setSelectedMachine(props.layerObject.machine);
    setSelectedSurface(props.layerObject.surface);
    let concatList: string[] = [];
  
    Object.keys(toolsByApplicationAndMachine).forEach((key) => {
      const machinesArr = toolsByApplicationAndMachine[key].machines;
      const machinesLength = machinesArr.length;

      for (let index = 0; index < machinesLength; index++) {
        if(machinesArr[index] == selectedMachine){
          const appsArr = toolsByApplicationAndMachine[key].apps;
          const appsLength = appsArr.length;

          for (let index = 0; index < appsLength; index++) {
            if(appsArr[index] == selectedSurface){
              console.log('match!', appsArr[index])
              concatList = concatList.concat(key);
            }
          }
        }
      }
    })
  
    setMatchingTooling(concatList);
  }, [selectedMachine, selectedSurface])

  useEffect(() => {
    console.log(matchingTooling)
  }, [matchingTooling])
  

  return (
    <div className='col edit-menu'>
      {matchingTooling.map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} icon={toolsByApplicationAndMachine[tool].image}  /> //active={selectedMachine == machine ? true : false} onClick={() => setMachine(machine)}
        )}
    </div>
  )
}
