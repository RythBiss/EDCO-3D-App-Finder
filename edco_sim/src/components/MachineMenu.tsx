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
      image: [
              'https://portal.edcoinc.com/storage/product-slider/alr-steel-chisel-scalers/ALR-5-Machine-Slider.jpg'
              ],
      info: 'Light Weight,Compact,Versatile',
      number: ['C10301'] //add diferent sizes as different machines.
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
      image: [
              'https://portal.edcoinc.com/storage/product-slider/big-stick-chisel-scalers/ALR-BS-Straight-Machine-Slider.jpg'
              ],
      info: 'Light Weight,Heavy Duty,Versatile',
      number: ['27100'] //add ERGO model as seperate machine
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
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-manual-tile-shark-floor-stripper/TS-8-Machine-Slider.jpg'
              ],
      info: 'Light Weight,Heavy Duty,High Production Rate',
      number: ['94400']
    },
    SEC: {
      apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual', 'high spots', 'sealer'],
      depth: 0,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-single-disc-floor-grinder/SEC-NG-Machine-Slider.jpg'
              ],
      info: 'Small Scale,Residential,Versatile',
      number: ['59800']
    },
    _2GC: {
      apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual', 'high spots', 'sealer'],
      depth: 0,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['gas', 'electric', 'electric 3 phase'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2GC-NG-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2EC-NG-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-dual-disc-floor-grinder/2EC-NG-Machine-Slider.jpg'
              ],
      info: 'Mid Scale,Commercial,Versatile',
      number: ['59300', '59200', '59600']
    },
    _2DHD: {
      apps: ['glue', 'paint', 'leveling', 'epoxy', 'mastic', 'concrete', 'rubber', 'residual', 'high spots', 'sealer'],
      depth: 0,
      recJobSize: 2,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-heavy-duty-floor-grinder-polisher/2D-HD-Propane-Machine-Slider.jpg'
              ],
      info: 'Large Scale,Industrial,Versatile',
      number: ['58100', '58200']
    },
    TL9: {
      apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'high spots', 'sealer'],
      depth: 0,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['electric'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-turbo-lite-grinder/TL-9-Machine-Slider.jpg'
              ],
      info: 'Light Weight,Compact,Versatile',
      number: ['58900']
    },
    TMC7: {
      apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'edges', 'residual', 'high spots', 'sealer'],
      depth: 0,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: true,
      power: ['electric'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-r-7-turbo-edge-grinder/TMC-7-Electric-Machine-Slider.jpg'
              ],
      info: 'Light Weight,Compact,Edges',
      number: ['57200']
    },
    TG10: {
      apps: ['leveling', 'rubber', 'epoxy', 'concrete', 'high spots', 'sealer'],
      depth: 1,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: true,
      edges: false,
      power: ['gas', 'electric', 'electric 3 phase', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Electric-Machine.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Electric-Machine.jpg',
              'https://portal.edcoinc.com/storage/product-slider/magna-trap-10-turbo-grinder/TG-10-Propane-Machine-Slider.jpg'
              ],
      info: 'Aggressive,Residential,Versatile',
      number: ['56600', '56900', '56800', '56700']
    },
    //make trip hazard surface`
    CPL8: {
      apps: ['leveling', 'rubber', 'concrete', 'trip hazard', 'high spots'],
      depth: 1,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Electric-Machine-Slider.jpg'
              ],
      info: 'Small Scale, Residential, Removal',
      number: ['69500', '69300']
    },
    CPM8: {
      apps: ['leveling', 'concrete', 'trip hazard', 'rubber', 'high spots'],
      depth: 2,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric', 'propane'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8-Electric-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/8-walk-behind-crete-planer-r/CPM-8%20Propane%20Machine%20Slider.jpg'
              ], 
      info: 'Mid Scale, Commercial, Removal',
      number: ['79300', '79500', '72600']
    },
    CPM10: {
      apps: ['leveling', 'concrete', 'trip hazard', 'rubber', 'high spots'],
      depth: 2,
      recJobSize: 1,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['gas', 'electric'],
      image: [
              'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Gas-Machine-Slider.jpg',
              'https://portal.edcoinc.com/storage/product-slider/10-walk-behind-crete-planer-r/CPM-10-Electric-Machine-Slider.jpg'
              ],
      info: 'Large Scale, Industrial, Removal',
      number: ['69100', '69200']
    },
    CD5: {
      apps: ['leveling', 'concrete', 'trip hazard', 'high spots'],
      depth: 3,
      recJobSize: 0,
      onCrete: true,
      //if the machine can achive a CSP 2-3 for new coatings
      surfacePrep: false,
      edges: false,
      power: ['air'],
      image: ['https://portal.edcoinc.com/storage/product-slider/5-head-crete-crusher-r/CD-5-Machine-Slider.jpg'],
      info: 'Aggressive, Rough, Removal',
      number: ['63100']
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

  //
  const getPowerTypeImageIndex = (machine: string) => {

    let index = allMachineData[machine].power.indexOf(props.layerObject.powerType)

    if(index == -1) index = 0

    return index
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


  //checks if a machine has been selected for each layer, and allows the user to access the next tab if so.
  useEffect(()=>{
    let machinesSelected: boolean = true;

    props.layerObject.sublayerObjects.forEach((obj: any) => {
      if(obj.machine == ''){
        machinesSelected = false;
      }
    })

    if(machinesSelected){
      console.log('setting progress in machines')
      props.setAllowProgress(2);
    }
  })

  useEffect(() => {
    console.log("machine list test")
    
    props.layerObject.sublayerObjects.forEach((item: any, index: number) =>{
      console.log("i = " + index)
      if(props.layerObject.sublayerObjects[index]!== undefined){
        console.log(props.layerObject.sublayerObjects[index].machine)
      }
    })
  }, [selectedMachine])

  return (
    <div className='col edit-menu scroll-on'>
      {/* layer 1 accordion open/close button */}
        {matchingMachinesL1 &&
          <ListButton
            lable={`First Layer (${matchingMachinesL1.machines.length})`}
            active={selectedLayerState == 0 ? true : false}
            onClick={() => {handleMenuState(0)}}
            selected={props.layerObject.sublayerObjects[0].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL1 && selectedLayerState == 0 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 0 && matchingMachinesL1 !== undefined &&
          matchingMachinesL1.machines.length > 0 &&
            matchingMachinesL1.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[0].machine == item ? true : false}
                onClick={() => setMachine(item, 0)}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }

      {/* layer 2 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 2 && matchingMachinesL2 !== undefined  &&
          <ListButton
            lable={`Second Layer (${matchingMachinesL2.machines.length})`}
            active={selectedLayerState == 1 ? true : false}
            onClick={() => {handleMenuState(1)}}
            selected={props.layerObject.sublayerObjects[1].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL2 && selectedLayerState == 1 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 1 && matchingMachinesL2 !== undefined  &&
          matchingMachinesL2.machines.length > 0 &&
            matchingMachinesL2.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[1].machine == item ? true : false}
                onClick={() => setMachine(item, 1)}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                
                />
              )        
        }

      {/* layer 3 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 3 && matchingMachinesL3 !== undefined  &&
          <ListButton
            lable={`Third Layer (${matchingMachinesL3.machines.length})`}
            active={selectedLayerState == 2 ? true : false}
            onClick={() => {handleMenuState(2)}}
            selected={props.layerObject.sublayerObjects[2].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL3 && selectedLayerState == 2 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 2 && matchingMachinesL3 !== undefined  &&
          matchingMachinesL3.machines.length > 0 &&
            matchingMachinesL3.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true}
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[2].machine == item ? true : false}
                onClick={() => setMachine(item, 2)}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }

      {/* layer 4 accordion open/close button, if there is a layer 2 */}
        {props.layerObject.layerNumber >= 4 && matchingMachinesL4 !== undefined  &&
          <ListButton
            lable={`Fourth Layer (${matchingMachinesL4.machines.length})`}
            active={selectedLayerState == 3 ? true : false}
            onClick={() => {handleMenuState(3)}}
            selected={props.layerObject.sublayerObjects[3].machine !== ''}
            />
        }
        {/* substitutes added indicator */}
        {subdL4 && selectedLayerState == 3 &&
          <ListButton lable='No results with current jobsite filter. Try these substitutes:' indent={1} />
        }
        {/* list of buttons for machines that passed population filters */}
        {selectedLayerState == 3 && matchingMachinesL4 !== undefined  &&
          matchingMachinesL4.machines.length > 0 &&
            matchingMachinesL4.machines.map((item: string, i: number) =>
              <ListButton
                key={i}
                popupOn={props.popupOn}
                showMenu={true} 
                indent={1}
                lable={item}
                icon={allMachineData[item].image[getPowerTypeImageIndex(item)]}
                active={props.layerObject.sublayerObjects[3].machine == item ? true : false}
                onClick={() => setMachine(item, 3)}
                mouseAction={() => handlePopup(item)}
                setIsInfoPopupOnupYPos={props.setPopupYPos}
                popupInfo={allMachineData[item].info}
                partNumber={allMachineData[item].number[getPowerTypeImageIndex(item)]}
                />
              )        
        }
    </div>
  )
}