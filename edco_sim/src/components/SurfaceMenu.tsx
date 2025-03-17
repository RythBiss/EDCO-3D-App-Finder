import { useState, useEffect } from 'react'
import ListButton from './ListButton';
import NextButton from './NextButton';
import ClusterButton from './ClusterButton';
import { populateMaterialRemovedAnswers } from '../functions';
import DropDown from './DropDown';
import { AnimatePresence, motion } from 'framer-motion';


export default function SurfaceMenu(props:any) {

    const [materialRemovedAnswers, setmaterialRemovedAnswers] = useState<string[]>([]);
    const jobSizeAnswers = ['500-', '500+', '1,000+', '2,000+', '5,000+'];
    const greenConcreteAnswers = ['No', 'Yes'];
    const edgeGrindingAnswers = ['No', 'Yes'];
    const puttyKnifeAnswers = ['No', 'Yes'];
    const powerOptionAnswers = ['Gas', ['Electric Residential', 'Electric Commercial', 'Electric Industrial'], 'Propane', 'pneumatic'];
    const finishOptionAnswers = ['Smooth', 'Textured'];
    const surfaceTypeAnswers = ['Wood', 'Concrete/Asphalt'];


    const [matSelected, setMatSelected] = useState<boolean>(false);
    const [thickSelected, setThickSelected] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<boolean>(false);
    const [greenSelected, setGreenSelected] = useState<boolean>(false);
    const [edgeSelected, setEdgeSelected] = useState<boolean>(false);
    const [puttyKnifeSelected, setPuttyKnifeSelected] = useState<boolean>(false);
    const [powerSelected, setPowerSelected] = useState<boolean>(false);
    const [finishSelected, setFinishSelected] = useState<boolean>(false);
    const [surfaceTypeSelected, setSurfaceTypeSelected] = useState<boolean>(false);


    const [activeMaterial, setActiveMaterial] = useState<string>();
    const [activeThickness, setActiveThickness] = useState<string>();
    const [activeSize, setActiveSize] = useState<string>();
    const [activeGreenConcrete, setActiveGreenConcrete] = useState<string>();
    const [activeEdgingNeeded, setActiveEdgingNeeded] = useState<string>();
    const [activePuttyKnife, setActivePuttyKnife] = useState<string>();
    const [activePower, setActivePower] = useState<string>();
    const [activeFinish, setActiveFinish] = useState<string>();
    const [activeSurfaceType, setActiveSurfaceType] = useState<string>();

    const [openedMenu, setOpenedMenu] = useState<number>(-1);

    const thicknessRemovedConditional = ['1/32"', '1/16"', '1/8"', '1/4"', '+1/4""'];

    useEffect(() => {
        console.log(props.resetToggle);
        resetSelections();
    }, [props.resetToggle]);
    

    const resetSelections = () => {

        const activeSelections = [
            setActiveMaterial,
            setActiveThickness,
            setActiveSize,
            setActiveGreenConcrete,
            setActiveEdgingNeeded,
            setActivePuttyKnife,
            setActivePower,
            setActiveFinish,
            setActiveSurfaceType,
          ];

          const selectedFlags = [
            setMatSelected,
            setThickSelected,
            setSizeSelected,
            setGreenSelected,
            setEdgeSelected,
            setPuttyKnifeSelected,
            setPowerSelected,
            setFinishSelected,
            setSurfaceTypeSelected,
          ];

          activeSelections.forEach(element => {
            element(undefined);
          });

          selectedFlags.forEach(element => {
            element(false);
          });
    }

    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(-1)
        }else{
            setOpenedMenu(newState)
        }
    }

    const setMaterialRemoved = (res: string, layer: number, sublayers: string[]) => {
        const material =  res.toLowerCase();

        props.layerObject.setMaterialRemoved(material, layer, sublayers);

        setActiveMaterial(res);
        handleMenuState(-1);
    }

    const setThicknessHandler = (fraction: string) => {

        setActiveThickness(fraction);


        switch(fraction){
            case '1/32"':
                props.layerObject.setMaterialThickness(0);
                break;
            case '1/16"':
                props.layerObject.setMaterialThickness(1);
                break;
            case '1/8"':
                props.layerObject.setMaterialThickness(2);
                break;
            case '1/4"':
                props.layerObject.setMaterialThickness(3);
                break;
            case '+1/4""':
                props.layerObject.setMaterialThickness(3);
                break;
            default:
                props.layerObject.setMaterialThickness(0);
        }

        setThickSelected(true);
        handleMenuState(-1);
    }
    
    const setJobSize = (res: string) => {

        switch(res){
            case '500-':
                props.layerObject.setJobSize(0);
                break;
            case '500+':
                props.layerObject.setJobSize(1);
                break;
            case '1,000+':
                props.layerObject.setJobSize(2);
                break;
            case '2,000+':
                props.layerObject.setJobSize(3);
                break;
            case '5,000+':
                props.layerObject.setJobSize(4);
                break;
        }

        setActiveSize(res);
        handleMenuState(-1);
    }
        
    const setGreenConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.setGreenConcrete(true);
        else props.layerObject.setGreenConcrete(false);

        setActiveGreenConcrete(res);
        handleMenuState(-1);
    }
            
    const setEdger = (res: string) => {
        if(res == 'Yes') props.layerObject.setEdger(true);
        else props.layerObject.setEdger(false);

        setActiveEdgingNeeded(res);
        handleMenuState(-1);
    }
                
    const setPowerType = (res: string) => {

        const power =  res.toLowerCase();

        props.layerObject.setPowerType(power);

        setActivePower(res);

        if(power == 'electric residential' || power == 'electric commercial' || power == 'electric industrial')
            props.setElectricValue(res);

        handleMenuState(-1);
    }
                
    const setFinishType = (res: string) => {
        const finish =  res.toLowerCase();

        props.layerObject.setFinishedSurface(finish);

        setActiveFinish(res);
        handleMenuState(-1);
    }

    const setPuttyKnife = (res: string) => {
        if(res == 'Yes')
            props.layerObject.setPuttyKnifeCuts(true);
        else
            props.layerObject.setPuttyKnifeCuts(false);

        setActivePuttyKnife(res);
        handleMenuState(-1);
    }

    const setSurfaceType = (res: string) => {
        if (res === 'Wood') props.layerObject.setSurfaceType('wood');
        else if (res === 'Concrete/Asphalt') props.layerObject.setSurfaceType('concrete');

        setActiveSurfaceType(res);
        handleMenuState(-1);
    };

    const isThicknessRelevant = () => {
        if(props.layerObject){
            return  props.layerObject.materialRemoved == 'concrete' ||
                    props.layerObject.materialRemoved == 'high spots' ||
                    props.layerObject.materialRemoved == 'epoxy coating'
        }

        return false;
    }

    const isTextureRelevant = () => {
        if(props.layerObject){
            return  props.layerObject.materialRemoved !== 'trip hazard';
        }

        return false;
    }

    const isSqftRelevant = () => {
        
        if(props.layerObject){
            return props.layerObject.materialRemoved !== 'trip hazard'  
        }

        return false;
    }

    const isPuttyKnifeRelevant = () => {

        let hasAdhesive: boolean = false;

        const length = props?.layerObject?.sublayers?.length;
    
        for(let i = 0; i < length; i++){
            const material = props?.layerObject?.sublayers[i];
            if(
                material == "glue/adhesive" ||
                material == "thinset" ||
                material == "mastic"
            ){
                hasAdhesive = true;
                break;
            }
        }

        return hasAdhesive;

    }

    const isConcreteRelevant = () => {
        return props?.layerObject?.getSurfaceType() !== 'wood';
    }



    const onConcreteSelectionSatisfied = () => {
        return (
            matSelected == true &&
            sizeSelected == true &&
            greenSelected == true &&
            edgeSelected == true &&
            powerSelected == true &&
            finishSelected == true &&
            props.layerObject.getSurfaceType() == "concrete"
        )
    }

    const onWoodSelectionSatisfied = () => {
        return (
            matSelected == true && powerSelected == true && props.layerObject.getSurfaceType() == "wood"
        );
    }

    const puttyKnifeSatisfied = () => {
        return (isPuttyKnifeRelevant() == true && puttyKnifeSelected == true) || isPuttyKnifeRelevant() == false;
    }

    const thicknessSatisfied = () => {
        return (isThicknessRelevant() == true && thickSelected == true) || isThicknessRelevant() == false;
    }

    const concreteSatisfied = () => {
        return ((isConcreteRelevant() == true && surfaceTypeSelected == true) || isConcreteRelevant() == false);
    }



    useEffect(() => {
        if(props.layerObject){
            setMatSelected(props?.layerObject?.materialRemoved !== '');
            setSizeSelected(props?.layerObject?.jobSize !== null);
            setGreenSelected(props?.layerObject?.greenConcrete !== null);
            setEdgeSelected(props?.layerObject?.edger !== null);
            setPowerSelected(props?.layerObject?.powerType !== '');
            setFinishSelected(props?.layerObject?.finishedSurface !== '');
            setPuttyKnifeSelected(props?.layerObject?.puttyKnifeCuts !== null);
            setSurfaceTypeSelected(props?.layerObject?.surfaceType !== null);
        }
    })

    useEffect(() => {
        if(props.layerObject){
            props.layerObject.clearFinishedLayers();          
        }
    }, [])

    useEffect(() =>{ //controls 'allow progress'
        if(props.layerObject){
            if( ((onConcreteSelectionSatisfied() && puttyKnifeSatisfied() && thicknessSatisfied()) ||
                (onWoodSelectionSatisfied() && concreteSatisfied())) &&
                props.allowProgress == 0){
                    props.setAllowProgress(1)
            } else if(  props.layerObject.materialRemoved == 'trip hazard' && matSelected == true && powerSelected == true){
                props.setAllowProgress(1)
            }
            
        }

    }, [matSelected, sizeSelected, greenSelected, edgeSelected, powerSelected, finishSelected, thickSelected, puttyKnifeSelected, surfaceTypeSelected])

    //clears thickness selection when switching to a material that does not require it.
    useEffect(() => {
        if(props.layerObject){
            if(isThicknessRelevant() == false){
                setThicknessHandler("1/32");
            }
        }
    }, [activeMaterial]);

    useEffect(() => {
        if(props.allowProgress == 0){
            setMatSelected(false);
            setSizeSelected(false);
            setGreenSelected(false);
            setEdgeSelected(false);
            setPowerSelected(false);
            setFinishSelected(false);
            setPuttyKnifeSelected(false);
            setSurfaceTypeSelected(false);
        }
    }, [props.allowProgress])
    
    useEffect(() => {
        setmaterialRemovedAnswers(populateMaterialRemovedAnswers(props.layerObject));
    }, [activeSurfaceType])

  return (
    <div className='col edit-menu'>
    <AnimatePresence mode="wait">

        
        {/* what is the bottom layer? */}
       <motion.div
       key="drop8"
        initial={{ x: '-150%' }} // Start fully off-screen to the left
        animate={{ x: 0 }} // Move to its normal position
        exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
       >
        <ListButton lable={'Are you working on wood or concrete?'} onClick={() => handleMenuState(11)} selected={surfaceTypeSelected} />
            {openedMenu == 11 && (
                    <>
                    <p className='suggestion montserrat'>The type of surface underneath the application determines what tools are appropriate.</p>
                    <div className="cluster-btn-container">
                        
                        {surfaceTypeAnswers.map((layer, i) => (
                            <ClusterButton 
                                key={i} 
                                active={activeSurfaceType === layer} 
                                lable={layer} 
                                layerObject={props.layerObject} 
                                onClick={() => setSurfaceType(layer)} 
                            />
                        ))}
                    </div>
                </>
            )}
       </motion.div>

       </AnimatePresence>

        {activeSurfaceType !== undefined &&
            <>
            <AnimatePresence>
                <motion.div
                key="drop7"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                    {/* what application are you trying to solve? */}
                    <ListButton lable={'What is the material being removed?'} onClick={() => handleMenuState(1)} selected={matSelected} />
                    {openedMenu == 1 &&
                        <><p className='suggestion montserrat'>Choose the application that best describes the material that is being removed.</p>
                        <div className='cluster-btn-container'>
                            {materialRemovedAnswers.map((layer:any, i) => 
                                <ClusterButton key={i} active={activeMaterial == layer?.name}
                                    lable={layer.name} layerObject={props.layerObject} onClick={() => setMaterialRemoved(layer.name, layer.layers, layer.sublayers)} />
                            )}
                        </div></>
                    }

                    {/* How thick is the material? (only for concrete, highspots, epoxy coating, and paint). */}
                    {(isThicknessRelevant() && isConcreteRelevant()) &&
                        <>
                            <ListButton lable={'What is the thickness of the material?'} onClick={() => handleMenuState(2)} selected={thickSelected} />
                            {openedMenu == 2 &&
                                <><p className='suggestion montserrat'>It’s important to know how thick the material being removed is. This is only the thickness of the removed material (high spots, trip hazards, epoxy coatings etc.), not the overall thickness of the slab.</p>
                                <div className='cluster-btn-container'>
                                    {thicknessRemovedConditional.map((layer:any, i) => 
                                        <ClusterButton key={i} active={activeThickness == thicknessRemovedConditional[i]}
                                            lable={thicknessRemovedConditional[i]} layerObject={props.layerObject} onClick={() => setThicknessHandler(thicknessRemovedConditional[i])} layer={layer} />
                                    )}
                                </div></>
                            }
                        </>
                    }
                </motion.div>

                {/* how big is the site? */} 
                <motion.div
                key="drop6"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                    {(isSqftRelevant() && isConcreteRelevant()) &&
                        <>        
                            <ListButton lable={'What is the square footage of your job?'} onClick={() => handleMenuState(4)} selected={sizeSelected} />
                            {openedMenu == 4 &&
                                <><p className='suggestion montserrat'>The size of the application can change what products are recommended for the task.</p>
                                <div className="cluster-btn-container">
                                {jobSizeAnswers.map((layer, i) => 
                                        <ClusterButton key={i} active={activeSize == layer}
                                            lable={layer} layerObject={props.layerObject} onClick={() => setJobSize(layer)} />
                                    )}
                                </div></>
                            }
                        </>
                    }
                </motion.div>


                {/* is your concrete new? */}
                <motion.div
                key="drop5"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                {(isSqftRelevant() && isConcreteRelevant()) &&
                    <>        
                        <ListButton lable={'Is your concrete older than 28 days?'} onClick={() => handleMenuState(5)} selected={greenSelected} />
                        {openedMenu == 5 &&
                            <><p className='suggestion montserrat'>Fresh concrete requires softer tools than old concrete.</p>
                            <div className="cluster-btn-container">
                                {greenConcreteAnswers.map((layer, i) => 
                                    <ClusterButton key={i} active={activeGreenConcrete == layer}
                                    lable={layer} layerObject={props.layerObject} onClick={() => setGreenConcrete(layer)} />
                                )}
                            </div></>
                        }
                    </>
                }
                </motion.div>


                {/* are you going to need an edger? */}
                <motion.div
                key="drop4"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} >
                {(isSqftRelevant() && isConcreteRelevant()) &&
                    <>        
                        <ListButton lable={'Do you need to grind or clean along a vertical a wall?'} onClick={() => handleMenuState(7)} selected={edgeSelected} />
                        {openedMenu == 7 &&
                            <><p className='suggestion montserrat'>Some applications may require operating against a wall, curb, or other vertical surface. Specialized products are required to operate near vertical surfaces to avoid damage.</p>
                            <div className="cluster-btn-container">
                                {edgeGrindingAnswers.map((layer, i) => 
                                    <ClusterButton key={i} active={activeEdgingNeeded == layer}
                                    lable={layer} layerObject={props.layerObject} onClick={() => setEdger(layer)} />
                                )}
                            </div></>
                        }
                    </>
                }
                </motion.div>

                {/* will you need to test your material with a putty knife? */}
                <motion.div
                key="drop3"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                {(isPuttyKnifeRelevant() && isConcreteRelevant()) &&
                    <>        
                        <ListButton lable={'Can you cut the adhesive with a utility knife?'} onClick={() => handleMenuState(10)} selected={puttyKnifeSelected} />
                        {openedMenu == 10 &&
                            <><p className='suggestion montserrat'>Different products will be recommended if your adhesive is malleable than if your adhesive is hard or brittle.</p>
                            <div className="cluster-btn-container">
                                {puttyKnifeAnswers.map((layer, i) => 
                                    <ClusterButton key={i} active={activePuttyKnife == layer}
                                    lable={layer} layerObject={props.layerObject} onClick={() => setPuttyKnife(layer)} />
                                )}
                            </div></>
                        }
                    </>
                }
                </motion.div>


                {/* what power option is desired? */}
                <motion.div
                key="drop2"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                <ListButton lable={'What type of machine power is desired?'} onClick={() => handleMenuState(8)} selected={powerSelected} />
                {openedMenu == 8 &&
                    <><p className='suggestion montserrat'>The location of the application will determine what power option is needed. Indoor applications should use electric machines due to ventilation restrictions.</p>
                    <div className="cluster-btn-container">
                        {powerOptionAnswers.map((layer: any, i) => {
                                if(layer.constructor !== Array){
                                    return <ClusterButton key={i} active={activePower == layer}
                                    lable={layer} layerObject={props.layerObject} onClick={() => setPowerType(layer)} />
                                } else {
                                    let options = [];
                                    let active = props.layerObject.powerType == 'electric residential' || props.layerObject.powerType == 'electric commercial' || props.layerObject.powerType == 'electric industrial';

                                    for(let i = 0; i < layer.length; i++){
                                        options.push(layer[i]);
                                    }

                                    return <DropDown key={i} optionsStringArray={options} currentValue={props.electricValue} onChange={setPowerType} active={active} />
                                }
                        })}
                    </div></>
                }
                </motion.div>

                {/* what finish is desired? */}
                <motion.div
                key="drop1"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                >
                {(isTextureRelevant() && isConcreteRelevant()) &&
                    <>
                        <ListButton lable={'What type of surface texture is desired?'} onClick={() => handleMenuState(9)} selected={finishSelected} />
                        {openedMenu == 9 &&
                            <><p className='suggestion montserrat'>Choose the finished texture based on what will be applied to the surface after removing the material. Epoxy coatings require rougher finishes than vinyl or ceramic.</p>
                            <div className="cluster-btn-container">
                                {finishOptionAnswers.map((layer, i) => 
                                    <ClusterButton key={i} active={activeFinish == layer}
                                    lable={layer} layerObject={props.layerObject} onClick={() => setFinishType(layer)} />
                                )}
                            </div></>
                        }
                    </>
                }
                </motion.div>
                </AnimatePresence>
            </>
        }

            <AnimatePresence>
                {props.allowProgress === 1 ? (
                    <motion.div
                    key="nextButton"
                    initial={{ x: '-150%' }} // Start fully off-screen to the left
                    animate={{ x: 0 }} // Move to its normal position
                    exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                    >
                    <NextButton lable={'Next: Machines'} onClick={() => props.nextFunction()} clickable={props.allowProgress == 1} />
                    </motion.div>
                )
            
            :
            <motion.p
                key="nextButtonDisabled"
                initial={{ x: '-150%' }} // Start fully off-screen to the left
                animate={{ x: 0 }} // Move to its normal position
                exit={{ x: '-150%', position: "absolute" }} // Move fully off-screen when it disappears
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                className="suggestion montserrat"
              >
                Click on a question to answer. Complete all questions above to continue.
              </motion.p>
            }
            </AnimatePresence>

    </div>
  )
}
