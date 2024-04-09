import { useEffect, useState } from 'react'
import ListButton from './ListButton'

export default function ToolingMenu(props: any) {

  const toolsByApplicationAndMachine: any = {
    Scaler: {
      apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue'],
      name: 'Chisel Scalers',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg',
      CSP: 1
    },
    Scraper: {
      apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
      name: 'Scrapper Blades',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg',
      CSP: 1
    }, 
    FloorStripperRigid: {
      apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
      name: '8" Rigid Scrapper Blade',
      machines: ['TS8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
      CSP: 1
    },
    MagnaBlades: {
      apps: ['glue', 'paint', 'mastic'],
      name: 'Magna-Blades',
      machines: ['SEC', 'TG10', '_2DHD', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
      CSP: 1
    },
    DymaDots: {
      apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
      name: 'Dyma-Dots',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg',
      CSP: 1
    },
    PCDbacking: {
      apps: ['industrial buildup', 'glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
      name: 'PCD w/Backing Segment',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
      CSP: 3
    },
    CarbideCutter: {
      apps: ['leveling', 'rubber', 'concrete', 'trip hazard'],
      name: 'Carbide Cutter',
      machines: ['CPM8', 'CPL8', 'CPM10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/05/20156_6_PointBlueCutter-450x450.jpg',
      CSP: 6
    },
    FivePoint: {
      apps: ['concrete', 'trip hazard'],
      name: '5-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg',
      CSP: 9
    },
    NinePoint: {
      apps: ['concrete', 'trip hazard'],
      name: '9-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18820_9PointCarbideBit-450x450.jpg',
      CSP: 9
    },
  }

  //const [selectedMachine, setSelectedMachine] = useState('');
  //const [selectedSurface, setSelectedSurface] = useState('');
  const [matchingTooling, setMatchingTooling] = useState<string[][]>([]);
  const [openTab, setOpenTab] = useState<number>(-1);

  const setTooling = (newTooling: string, layer:number, CSP: number) => {
    props.layerObject.setTooling(newTooling, layer, CSP);
    //setSelectedSurface(newTooling);
  }

  useEffect(() => {

    let fourLayers: any[] = [[],[],[],[]]
    let count = 0;
   
    //for each layer
    props.layerObject.sublayerObjects.forEach((item: { machine: any; materialRemoved: any; }, layerIndex: number) => {
      count++
      let concatList: string[] = [];

      //go through each tooling
      Object.keys(toolsByApplicationAndMachine).forEach((key) => {

        const machinesArray = toolsByApplicationAndMachine[key].machines;
        const appsArray = toolsByApplicationAndMachine[key].apps;

        const toolFitsMachine = machinesArray.includes(item.machine);
        const toolFitsApplication = appsArray.includes(item.materialRemoved);

        if(toolFitsApplication && toolFitsMachine){
          concatList.push(key)
        }
      })
      console.log(concatList)
      fourLayers[layerIndex] = concatList;

      // setMatchingTooling(concatList);
    });
    console.log(count)
    console.log(fourLayers)
    setMatchingTooling(fourLayers)
  }, [])

  const toolSelect = (num: number) => {
    console.log(matchingTooling[num].length, ` options in list ${num+1}`)
    if(openTab == num){
      setOpenTab(-1)
    }else{
      setOpenTab(num)
    }
  } 

  useEffect(() => {
    console.log(matchingTooling.length)
    console.log(matchingTooling)

    if(matchingTooling.length !== 0){
      matchingTooling.forEach
    }
  }, [matchingTooling])
  

  return (
    <div className='col edit-menu scroll-on'>
      
      {/* layer 1 */}
      <ListButton lable={matchingTooling[0] == undefined ? 'First Layer' : `First Layer (${matchingTooling[0].length})`} onClick={() => toolSelect(0)} />
      {openTab == 0 &&
          matchingTooling.length !== 0 &&
                matchingTooling[0].map((tool: any, i: any) => 
                  <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 0, toolsByApplicationAndMachine[tool].CSP)} />
        )}

      {/* layer 2 */}
      {props.layerObject.sublayerObjects.length > 1 &&
        <ListButton lable={matchingTooling[1] == undefined ? 'Second Layer' : `Second Layer (${matchingTooling[1].length})`} onClick={() => toolSelect(1)} />
      }
      {openTab == 1 &&
          matchingTooling.length !== 0 &&
              matchingTooling[1].map((tool: any, i: any) => 
                <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 1, toolsByApplicationAndMachine[tool].CSP)} />
        )}

      {/* layer 3 */}
      {props.layerObject.sublayerObjects.length > 2 &&
        <ListButton lable={matchingTooling[2] == undefined ? 'Third Layer' : `Third Layer (${matchingTooling[2].length})`} onClick={() => toolSelect(2)} />
      }
      {openTab == 2 &&
          matchingTooling.length !== 0 &&
              matchingTooling[2].map((tool: any, i: any) => 
                <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 2, toolsByApplicationAndMachine[tool].CSP)} />
        )}
      
      {/* layer 4 */}
      {props.layerObject.sublayerObjects.length > 3 &&
        <ListButton lable={matchingTooling[0] == undefined ? 'Fourth Layer' : `Fourth Layer (${matchingTooling[3].length})`} onClick={() => toolSelect(3)} />
      }
      {openTab == 3 &&
          matchingTooling.length !== 0 &&
              matchingTooling[3].map((tool: any, i: any) => 
                <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 3, toolsByApplicationAndMachine[tool].CSP)} />
        )}

    </div>
  )
}
