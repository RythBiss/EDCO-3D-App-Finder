import {useEffect, useState } from 'react'
import ListButton from './ListButton';

export default function EditLayer(props: any) {
  //temporary machine data table until backend is developed.
  const allMachineData: any = {
    //job size is per hour, remember that when making the lists
    ALR: {
      apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
      depth: -1,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['air'],
      image: 'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg',
      info: 'Chisel Scalers have multiple accessories to remove many hard and soft coverings from walls, ceilings, roofs, floors, stationary objects, and outdoor spaces.'
    },
    ALRBS: {
      apps: ['vinyl', 'linoleum', 'ceramic', 'carpet', 'rubber', 'paint', 'ice', 'corrosion', 'oil', 'glue'],
      depth: -1,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['air'],
      image: 'https://portal.edcoinc.com/storage/product-slider/big-stick-chisel-scalers/ALR-BS-Straight-Machine-Slider.jpg',
      info: 'Big Stick chisel scalers solve industrial removal applications including scraping and chipping away concrete and thick coatings. Blast through ceramic tile and other floor coverings with the Big Stick’s increased air power.'
    },
    TS8: {
      apps: ['vinyl', 'linoleum', 'carpet', 'VCT'],
      depth: -1,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['electric'],
      image: 'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg',
      info: 'Electric floor strippers remove vinyl, linoleum, carpet, rubber, and other softer coverings from concrete floors. The “Tile Shark” floor stripper is 110 volt and can be used for removal of vinyl, linoleum, carpet, rubber, and other soft floor coverings.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg',
      info: 'Floor Grinders solve first layer applications like smoothing concrete, preparing floors for new coverings and removing thinner coatings, soft materials and ice.  This single-disc model grinds approximately 250sqft per hour.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg',
      info: 'Floor Grinders solve first layer applications like smoothing concrete, preparing floors for new coverings and removing thinner coatings, soft materials and ice. This dual-disc model grinds approximately 500sqft per hour.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg',
      info: 'Floor Grinders solve first-layer applications.  This Heavy-Duty Grinder is also designed to level concrete and deeper removal of industrial-strength coverings.  This dual-disc model grinds approximately 800 – 1,000 sq. ft. per hour.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-turbo-lite-grinder/TL-9-Machine-Slider.jpg',
      info: 'The “Turbo-Lite” is high-production and portable.  It aggressively grinds concrete surfaces like a turbo grinder while having portable attributes. It weighs less than 100lbs, has a folding handlebar with built-in handgrip for travel. The TL9 is great for removal and resurfacing in hard-to-reach areas.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-7-turbo-edge-grinder/TMC-7-Electric-Machine-Slider.jpg',
      info: 'This unique edging machine grinds concrete all the way to walls, poles, and stationary objects.  It resurfaces small, hard-to-reach areas eliminating hand grinding.  Turbo Grinders remove thick coverings, level uneven areas, and solve other industrial application problems. '
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
      image: 'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg',
      info: 'Turbo Grinders remove thick coverings, level uneven areas, and solve other industrial application problems.  This 10” Turbo Grinder is EDCO’s “beast.” Its heavy-duty, aggressive and should be used for thick and hard coating removal, leveling tasks and applications that other EDCO Magna-Trap Grinders cannot perform.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Electric-Machine-Slider.jpg',
      info: 'The “Sacri-Lite” Planer is for profiling and texturing the first layer of concrete and asphalt surfaces.  While it removes thin coatings, it does not solve the larger removal applications like other Crete-Planers.  Available in 110 Volt electric.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg',
      info: 'Crete-Planers level, remove, texture and groove concrete and asphalt surfaces. The 8” Planer solves common removal applications and is the best product to quickly level sidewalk trip hazards. Its available is gasoline, electric and propane.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Gas-Machine-Slider.jpg',
      info: 'Crete-Planers level, remove, texture and groove concrete and asphalt surfaces. The 10” Planer is designed for aggressive removal applications like surface leveling and heavy coating removal.'
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
      image: 'https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg',
      info: 'Crete-Crushers aggressively solve concrete removal applications by hammering pointed bits into surfaces.  These deep layer tasks include recapping floors and removing spalling or laitance concrete. The 5 Bit CD5 removes 250sqft of per hour.'
    }
  }

  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [selectedLayerState, setSelectedLayerState] = useState<number>();

  const [matchingMachinesL1, setmatchingMachinesL1] = useState<any>();
  const [matchingMachinesL2, setmatchingMachinesL2] = useState<any>();
  const [matchingMachinesL3, setmatchingMachinesL3] = useState<any>();
  const [matchingMachinesL4, setmatchingMachinesL4] = useState<any>();

  const [subdL1, setSubdL1] = useState<boolean>(false);
  const [subdL2, setSubdL2] = useState<boolean>(false);
  const [subdL3, setSubdL3] = useState<boolean>(false);
  const [subdL4, setSubdL4] = useState<boolean>(false);

  //calls the set machine method from Layer object in App.tsx
  const setMachine = (newMachine: string, layer: number) => {
      props.layerObject.setMachine(newMachine, layer);
      setSelectedMachine(newMachine);
  }

  //updates which, if any, accordion menu is open.
  const handleMenuState = (newState: number) => {
    if(newState == selectedLayerState){
        setSelectedLayerState(-1)
    }else{
        setSelectedLayerState(newState)
    }
  }

  //called to find substitutes for machines if no results match given a list
  const substituteMachine = (list: any) => {
    
    let temp = list;

    list?.invalidReasons.forEach((item: any) => {
      if(item.materialRemoved == true && item.materialThickness == true){

        temp.machines.push(item.name);
      }
    })

    return temp;
  }

  //adds machines info text to popup
  const handlePopup = (item: any) =>{
    props.setPopupInfo(allMachineData[item].info)
  }

  //called to compile list given a layer object
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
        }else if(allMachineData[key].depth == -1){
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

  //populate layer lists
  useEffect(() => {

    let generatedList = compileMachineList(props.layerObject)

    //below are 4 blocks, each populate its respective layer with machines based on provided information, and substitutes machines when none match the inputs.
    
    //layer 1
    if(props.layerObject.sublayerObjects[0] !== undefined){
      generatedList = compileMachineList(props.layerObject.sublayerObjects[0])

      if(generatedList.machines.length == 0){
        setmatchingMachinesL1(substituteMachine(generatedList))
        setSubdL1(true);
      }else{
        setmatchingMachinesL1(compileMachineList(props.layerObject.sublayerObjects[0]));
        setSubdL1(false);
      }
    }

    //layer 2
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

    //layer 3
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

    //layer 4
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

  }, [props.layerObject, props.update])


  useEffect(()=>{
    let machinesSelected: boolean = true;

    props.layerObject.sublayerObjects.forEach((obj: any) => {
      if(obj.machine == ''){
        machinesSelected = false;
      }
    })

    if(machinesSelected){
      props.setAllowProgress(2);
    }
  })

  return (
    <div className='col edit-menu scroll-on'>
      {/* layer 1 accordion open/close button */}
        {matchingMachinesL1 &&
          <ListButton lable={`First Layer (${matchingMachinesL1.machines.length})`} active={selectedLayerState == 0 ? true : false} onClick={() => {handleMenuState(0)}} selected={props.layerObject.sublayerObjects[0].machine !== ''} />
        }
        {/* substitutes added indicator */}
        {subdL1 && selectedLayerState == 0 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 0 && matchingMachinesL1 !== undefined &&
          matchingMachinesL1.machines.length > 0 &&
            matchingMachinesL1.machines.map((item: string, i: number) => <ListButton key={i} popupOn={props.popupOn} showMenu={true} indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 0)} mouseAction={() => handlePopup(item)} setPopupYPos={props.setPopupYPos} />)        
        }

      {/* layer 2 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 2 && matchingMachinesL2 !== undefined  &&
          <ListButton lable={`Second Layer (${matchingMachinesL2.machines.length})`} active={selectedLayerState == 1 ? true : false} onClick={() => {handleMenuState(1)}} selected={props.layerObject.sublayerObjects[1].machine !== ''}  />
        }
        {/* substitutes added indicator */}
        {subdL2 && selectedLayerState == 1 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 1 && matchingMachinesL2 !== undefined  &&
          matchingMachinesL2.machines.length > 0 &&
            matchingMachinesL2.machines.map((item: string, i: number) => <ListButton key={i} popupOn={props.popupOn} showMenu={true}  indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 1)} mouseAction={() => handlePopup(item)} setPopupYPos={props.setPopupYPos} />)        
        }

      {/* layer 3 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 3 && matchingMachinesL3 !== undefined  &&
          <ListButton lable={`Third Layer (${matchingMachinesL3.machines.length})`} active={selectedLayerState == 2 ? true : false} onClick={() => {handleMenuState(2)}} selected={props.layerObject.sublayerObjects[2].machine !== ''}  />
        }
        {/* substitutes added indicator */}
        {subdL3 && selectedLayerState == 2 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 2 && matchingMachinesL3 !== undefined  &&
          matchingMachinesL3.machines.length > 0 &&
            matchingMachinesL3.machines.map((item: string, i: number) => <ListButton key={i} popupOn={props.popupOn} showMenu={true}  indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 2)} mouseAction={() => handlePopup(item)} setPopupYPos={props.setPopupYPos} />)        
        }

      {/* layer 4 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 4 && matchingMachinesL4 !== undefined  &&
          <ListButton lable={`Fourth Layer (${matchingMachinesL4.machines.length})`} active={selectedLayerState == 3 ? true : false} onClick={() => {handleMenuState(3)}} selected={props.layerObject.sublayerObjects[3].machine !== ''}  />
        }
        {/* substitutes added indicator */}
        {subdL4 && selectedLayerState == 3 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 3 && matchingMachinesL4 !== undefined  &&
          matchingMachinesL4.machines.length > 0 &&
            matchingMachinesL4.machines.map((item: string, i: number) => <ListButton key={i} popupOn={props.popupOn} showMenu={true}  indent={1} lable={item} icon={allMachineData[item].image} active={selectedMachine == item ? true : false} onClick={() => setMachine(item, 3)} mouseAction={() => handlePopup(item)} setPopupYPos={props.setPopupYPos} />)        
        }
    </div>
  )
}