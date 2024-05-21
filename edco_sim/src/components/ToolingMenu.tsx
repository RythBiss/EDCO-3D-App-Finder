import { useEffect, useState } from 'react'
import ListButton from './ListButton'

export default function ToolingMenu(props: any) {
  //temporary tooling data table until backend is developed.
  const toolsByApplicationAndMachine: any = {
    Scaler: {
      apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue'],
      name: 'Chisel Scalers',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg',
      CSP: 1,
      info: 'Scaler info block'
    },
    ScalerBS: {
      apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue'],
      name: 'Chisel Scalers',
      machines: ['ALRBS'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/27033_BigStick_3_SingleBevel.jpg',
      CSP: 1,
      info: 'Scaler info block'
    },
    Scraper: {
      apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
      name: 'Scrapper Blades',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg',
      CSP: 1,
      info: 'Scraper Blade info block'
    }, 
    ScraperBS: {
      apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
      name: 'Scrapper Blades',
      machines: ['ALRBS'],
      image: 'https://edcostore.com/wp-content/uploads/2018/04/27035_ScraperBlade-1.jpg',
      CSP: 1,
      info: 'Scraper Blade info block'
    }, 
    FloorStripperRigid: {
      apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
      name: '8" Rigid Scrapper Blade',
      machines: ['TS8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
      CSP: 1,
      info: 'Rigid Blade info block'
    },
    MagnaBlades: {
      apps: ['glue', 'paint', 'mastic'],
      name: 'Magna-Blades',
      machines: ['SEC', 'TG10', '_2DHD', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
      CSP: 1,
      info: 'Magna Blades info block'
    },
    DymaDots: {
      apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
      name: 'Dyma-Dots',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg',
      CSP: 1,
      info: 'Dots info block'
    },
    PCDbacking: {
      apps: ['industrial buildup', 'glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual'],
      name: 'PCD w/Backing Segment',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
      CSP: 3,
      info: 'PCD Backing info block'
    },
    CarbideCutter: {
      apps: ['leveling', 'rubber', 'concrete', 'trip hazard'],
      name: 'Carbide Cutter',
      machines: ['CPM8', 'CPL8', 'CPM10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/05/20156_6_PointBlueCutter-450x450.jpg',
      CSP: 6,
      info: 'Carbide info block'
    },
    FivePoint: {
      apps: ['concrete', 'trip hazard'],
      name: '5-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg',
      CSP: 9,
      info: '5 point info block'
    },
    NinePoint: {
      apps: ['concrete', 'trip hazard'],
      name: '9-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18820_9PointCarbideBit-450x450.jpg',
      CSP: 9,
      info: '9 point info block'
    },
  }

  //const [selectedMachine, setSelectedMachine] = useState('');
  //const [selectedSurface, setSelectedSurface] = useState('');
  const [matchingTooling, setMatchingTooling] = useState<string[][]>([]);
  const [openTab, setOpenTab] = useState<number>(-1);

  const handlePopup = (item: any) =>{
    console.log(toolsByApplicationAndMachine[item].info)
    props.setPopupInfo(toolsByApplicationAndMachine[item].info)
  }

  const setTooling = (newTooling: string, layer:number, CSP: number) => {
    props.layerObject.setTooling(newTooling, layer, CSP);
    //setSelectedSurface(newTooling);
  }

  //
  useEffect(() => {
    //2D array to store tooling options
    let fourLayers: any[] = [[],[],[],[]]
    let count = 0;
   
    //for each layer
    props.layerObject.sublayerObjects.forEach((item: { machine: any; materialRemoved: any; }, layerIndex: number) => {
      count++;
      let concatList: string[] = [];

      //go through each tooling
      Object.keys(toolsByApplicationAndMachine).forEach((key) => {
        const machinesArray = toolsByApplicationAndMachine[key].machines;
        const appsArray = toolsByApplicationAndMachine[key].apps;
        const toolFitsMachine = machinesArray.includes(item.machine);
        const toolFitsApplication = appsArray.includes(item.materialRemoved);

        //add tools that fit application
        if(toolFitsApplication && toolFitsMachine){
          concatList.push(key)
        }
      })

      //add tools to 2D array
      fourLayers[layerIndex] = concatList;
    });

    setMatchingTooling(fourLayers)
  }, [])

  //opens accordion of currently selected layer.
  const toolSelect = (num: number) => {
    if(openTab == num){
      setOpenTab(-1)
    }else{
      setOpenTab(num)
    }
  }
  
  return (
    <div className='col edit-menu scroll-on'>
      {/* lists of tooling organized by layer */}

      {/* layer 1 */}
      <ListButton lable={matchingTooling[0] == undefined ? 'First Layer' : `First Layer (${matchingTooling[0].length})`} onClick={() => toolSelect(0)} />
      {openTab == 0 &&
        matchingTooling.length !== 0 &&
          matchingTooling[0].map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} popupOn={props.popupOn} showMenu={true} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 0, toolsByApplicationAndMachine[tool].CSP)} mouseAction={() => handlePopup(tool)} setPopupYPos={props.setPopupYPos} />
        )}

      {/* layer 2 */}
      {props.layerObject.sublayerObjects.length > 1 &&
        <ListButton lable={matchingTooling[1] == undefined ? 'Second Layer' : `Second Layer (${matchingTooling[1].length})`} onClick={() => toolSelect(1)} />
      }
      {openTab == 1 &&
        matchingTooling.length !== 0 &&
          matchingTooling[1].map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} popupOn={props.popupOn} showMenu={true} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 1, toolsByApplicationAndMachine[tool].CSP)} mouseAction={() => handlePopup(tool)} setPopupYPos={props.setPopupYPos} />
        )}

      {/* layer 3 */}
      {props.layerObject.sublayerObjects.length > 2 &&
        <ListButton lable={matchingTooling[2] == undefined ? 'Third Layer' : `Third Layer (${matchingTooling[2].length})`} onClick={() => toolSelect(2)} />
      }
      {openTab == 2 &&
        matchingTooling.length !== 0 &&
          matchingTooling[2].map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} popupOn={props.popupOn} showMenu={true} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 2, toolsByApplicationAndMachine[tool].CSP)} mouseAction={() => handlePopup(tool)} setPopupYPos={props.setPopupYPos} />
        )}
      
      {/* layer 4 */}
      {props.layerObject.sublayerObjects.length > 3 &&
        <ListButton lable={matchingTooling[0] == undefined ? 'Fourth Layer' : `Fourth Layer (${matchingTooling[3].length})`} onClick={() => toolSelect(3)} />
      }
      {openTab == 3 &&
        matchingTooling.length !== 0 &&
          matchingTooling[3].map((tool: any, i: any) => 
            <ListButton key={i} lable={toolsByApplicationAndMachine[tool].name} indent={1} popupOn={props.popupOn} showMenu={true} icon={toolsByApplicationAndMachine[tool].image} onClick={() => setTooling(toolsByApplicationAndMachine[tool].name, 3, toolsByApplicationAndMachine[tool].CSP)} mouseAction={() => handlePopup(tool)} setPopupYPos={props.setPopupYPos} />
        )}
    </div>
  )
}
