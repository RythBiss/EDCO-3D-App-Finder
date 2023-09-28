import React, { useEffect, useState } from 'react'
import ListButton from './ListButton'

export default function ToolingMenu(props: any) {

  const toolsByApplicationAndMachine: any = {
    Scaler: {
      apps: ['vinyl', 'ceramic', 'carpet'],
      name: 'Chisel Scalers',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg',
      CSP: 0
    },
    Scraper: {
      apps: ['vinyl', 'linoleum', 'carpet'],
      name: 'Scrapper Blades',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg',
      CSP: 0
    }, 
    FloorStripperRigid: {
      apps: ['vinyl', 'linoleum', 'carpet'],
      name: '8" Rigid Scrapper Blade',
      machines: ['TS8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
      CSP: 0
    },
    MagnaBlades: {
      apps: ['adhesives', 'glues', 'paint'],
      name: 'Magna-Blades',
      machines: ['SEC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
      CSP: 0
    },
    DymaDots: {
      apps: ['thin mil coatings', 'sealers', 'thinsets', 'leveling', 'residual adhesive', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'Dyma-Dots',
      machines: ['SEC', 'TG10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg',
      CSP: 1
    },
    PCDbacking: {
      apps: ['industrial buildup', 'leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'PCD w/Backing Segment',
      machines: ['SEC', 'TG10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
      CSP: 3
    },
    CarbideCutter: {
      apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: 'Carbide Cutter',
      machines: ['CPM8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/05/20156_6_PointBlueCutter-450x450.jpg',
      CSP: 5
    },
    FivePoint: {
      apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: '5-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg',
      CSP: 9
    },
    NinePoint: {
      apps: ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'],
      name: '9-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18820_9PointCarbideBit-450x450.jpg',
      CSP: 8
    },
  }

  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedSurface, setSelectedSurface] = useState('');
  const [matchingTooling, setMatchingTooling] = useState<string[]>([]);

  const setTooling = (newTooling: string, CSP: number) => {
    props.layerObject.setTooling(newTooling, CSP);
    setSelectedSurface(newTooling);
  }

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
              concatList = concatList.concat(key);
            }
          }
        }
      }
    })
  
    setMatchingTooling(concatList);
  }, [selectedMachine, selectedSurface])
  

  return (
    <div className='col edit-menu'>
      {matchingTooling.map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, toolsByApplicationAndMachine[tool].CSP)} />
        )}
    </div>
  )
}
