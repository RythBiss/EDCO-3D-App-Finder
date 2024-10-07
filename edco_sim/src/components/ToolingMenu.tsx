import { useEffect, useState } from 'react'
import ListButton from './ListButton'
import NextButton from './NextButton';


export default function ToolingMenu(props: any) {
  //temporary tooling data table until backend is developed.
  const toolsByApplicationAndMachine: any = {
    Scaler: {
      apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
      name: 'Chisel Scalers',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10302_4_SteelChisel-450x450.jpg',
      CSP: 1,
      info: 'Ceramic,Ice,Glue',
      number: ['C10302']
    },
    // ScalerBS: {
    //   apps: ['vinyl', 'ceramic', 'carpet', 'linoleum', 'ice', 'glue/adhesive'],
    //   name: 'Chisel Scalers',
    //   machines: ['ALRBS'],
    //   image: 'https://edcostore.com/wp-content/uploads/2017/06/27033_BigStick_3_SingleBevel.jpg',
    //   CSP: 1,
    //   info: 'Used for hard floor coverings: pergo flooring, pre-cut wood flooring, hard material build up, etc.' 
    // },
    Scraper: {
      apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
      name: 'Scrapper Blades',
      machines: ['ALR'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/C10305_ScraperBlades.jpg',
      CSP: 1,
      info: 'Vinyl,Carpet,Glue',
      number: ['C10305']
    }, 
    // ScraperBS: {
    //   apps: ['vinyl', 'linoleum', 'carpet', 'rubber', 'paint', 'corrosion', 'oil'],
    //   name: 'Scrapper Blades',
    //   machines: ['ALRBS'],
    //   image: 'https://edcostore.com/wp-content/uploads/2018/04/27035_ScraperBlade-1.jpg',
    //   CSP: 1,
    //   info: 'Used for soft flooring flooring removal: VCT, vinyl, linoleum, carpet, thin set, mortar, material build up, flaking paint, and brittle adhesives.'
    // }, 
    FloorStripperRigid: {
      apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
      name: '8" Rigid Scrapper Blade',
      machines: ['TS8'],
      image: 'https://edcostore.com/wp-content/uploads/2017/12/28030_TileSharkBlade-450x450.jpg',
      CSP: 1,
      info: 'Vinyl,Carpet,VCT',
      number: ['28040']
    },
    MagnaBlades: {
      apps: ['glue/adhesive', 'paint', 'mastic'],
      name: 'Magna-Blades',
      machines: ['SEC', 'TG10', '_2DHD', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/12501LC_MagnaBlade-450x450.jpg',
      CSP: 1,
      info: 'Glue,Paint,Mastic',
      number: ['12501LC']
    },
    DymaDots: {
      apps: ['paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer'],
      name: 'Dyma-Dots',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC2B-MC-0030_DoubleDotGray-450x450.jpg',
      CSP: 1,
      info: 'General Grinding,Epoxy,Residual Glue',
      number: ['QC2B-MC-0030']
    },
    PCDbacking: {
      apps: ['industrial buildup', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual glue/adhesive', 'high spots', 'sealer'],
      name: 'PCD w/Backing Segment',
      machines: ['SEC', 'TG10', 'TL9', '_2DHD', 'TMC7', '_2GC'],
      image: 'https://edcostore.com/wp-content/uploads/2017/04/QC-PCD1-LB_DymaPCD_Blue-450x450.jpg',
      CSP: 3,
      info: 'Aggressive Grinding,Industrial Buildup,Epoxy',
      number: ['QC-PCD1-LB']
    },
    CarbideCutter: {
      apps: ['leveling', 'rubber', 'concrete', 'trip hazard', 'high spots'],
      name: 'Carbide Cutter',
      machines: ['CPM8', 'CPL8', 'CPM10'],
      image: 'https://edcostore.com/wp-content/uploads/2017/05/20156_6_PointBlueCutter-450x450.jpg',
      CSP: 6,
      info: 'Concrete Removal,Trip Hazard Removal,High Spots',
      number: ['20156']
    },
    FivePoint: {
      apps: ['concrete', 'trip hazard', 'high spots'],
      name: '5-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18810_5PointCarbideBit-450x450.jpg',
      CSP: 9,
      info: 'Heavy Concrete Removal,Trip Hazard removal,High Spots',
      number: ['18810']
    },
    NinePoint: {
      apps: ['concrete', 'trip hazard', 'high spots'],
      name: '9-Point Bit',
      machines: ['CD5'],
      image: 'https://edcostore.com/wp-content/uploads/2017/06/18820_9PointCarbideBit-450x450.jpg',
      CSP: 9,
      info: 'Heavy Concrete Removal,Trip Hazard removal,High Spots',
      number: ['18820']
    },
  }

  const [matchingTooling, setMatchingTooling] = useState<string[][]>([]);
  const [openTab, setOpenTab] = useState<number>(-1);

  const handlePopup = (item: any) =>{
    props.setPopupInfo(toolsByApplicationAndMachine[item].info)
  }

  const setTooling = (newTooling: string, layer:number, CSP: number) => {
    props.layerObject.setTooling(newTooling, layer, CSP);
    //setSelectedSurface(newTooling);
  }

    //checks if tooling has been selected for each layer, and allows the user to access recommendations if so.
    useEffect(()=>{
      let machinesSelected: boolean = true;
  
      props.layerObject.sublayerObjects.forEach((obj: any) => {
        if(obj.tooling == ''){
          machinesSelected = false;
        }
      })
  
      if(machinesSelected){
        console.log('setting progress in tooling')
        props.setAllowProgress(3);
      }
    })

    useEffect(() => {
      console.log("progress " + props.allowProgress)
    }, [])

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
      <ListButton lable={'First Layer'} onClick={() => toolSelect(0)} selected={props.layerObject.sublayerObjects[0].tooling !== ''} />
      {openTab == 0 &&
        matchingTooling.length !== 0 &&
          matchingTooling[0].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1}
              popupOn={props.popupOn}
              showMenu={true} 
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 0, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

      {/* layer 2 */}
      {props.layerObject.sublayerObjects.length > 1 &&
        <ListButton lable={'Second Layer'} onClick={() => toolSelect(1)} selected={props.layerObject.sublayerObjects[1].tooling !== ''} />
      }
      {openTab == 1 &&
        matchingTooling.length !== 0 &&
          matchingTooling[1].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1} popupOn={props.popupOn} 
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 1, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

      {/* layer 3 */}
      {props.layerObject.sublayerObjects.length > 2 &&
        <ListButton lable={'Third Layer'} onClick={() => toolSelect(2)} selected={props.layerObject.sublayerObjects[2].tooling !== ''} />
      }
      {openTab == 2 &&
        matchingTooling.length !== 0 &&
          matchingTooling[2].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1} popupOn={props.popupOn}
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image}
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 2, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}
      
      {/* layer 4 */}
      {props.layerObject.sublayerObjects.length > 3 &&
        <ListButton lable={'Fourth Layer'} onClick={() => toolSelect(3)} selected={props.layerObject.sublayerObjects[3].tooling !== ''} />
      }
      {openTab == 3 &&
        matchingTooling.length !== 0 &&
          matchingTooling[3].map((tool: any, i: any) => 
            <ListButton
              key={i}
              lable={toolsByApplicationAndMachine[tool].name}
              indent={1}
              popupOn={props.popupOn}
              showMenu={true}
              icon={toolsByApplicationAndMachine[tool].image} 
              onClick={() =>
                setTooling(toolsByApplicationAndMachine[tool].name, 3, toolsByApplicationAndMachine[tool].CSP)}
              mouseAction={() => handlePopup(tool)}
              setIsInfoPopupOnupYPos={props.setPopupYPos}
              popupInfo={toolsByApplicationAndMachine[tool].info}
              partNumber={toolsByApplicationAndMachine[tool].number[0]}
              />
        )}

          {props.allowProgress == 3 &&
            <NextButton lable={'View Recommendation'} onClick={() => props.printPDF()} />
          }
    </div>
  )
}
