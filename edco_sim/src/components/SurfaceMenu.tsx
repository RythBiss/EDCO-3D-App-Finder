import { useState, useEffect } from 'react'
import ListButton from './ListButton';
import NextButton from './NextButton';
import ClusterButton from './ClusterButton';
import { populateMaterialRemovedAnswers } from '../functions';
import DropDown from './DropDown';


export default function SurfaceMenu(props:any) {

    const [materialRemovedAnswers, setmaterialRemovedAnswers] = useState<string[]>([]);
    const jobSizeAnswers = ['500-', '500+', '1,000+', '2,000+', '5,000+'];
    const greenConcreteAnswers = ['No', 'Yes'];
    const edgeGrindingAnswers = ['No', 'Yes'];
    const puttyKnifeAnswers = ['No', 'Yes'];
    const powerOptionAnswers = ['Gas', ['Electric Residential', 'Electric Commercial', 'Electric Industrial'], 'Propane', 'pneumatic'];
    const finishOptionAnswers = ['Smooth', 'Textured'];

    const [matSelected, setMatSelected] = useState<boolean>(false);
    const [thickSelected, setThickSelected] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<boolean>(false);
    const [greenSelected, setGreenSelected] = useState<boolean>(false);
    const [edgeSelected, setEdgeSelected] = useState<boolean>(false);
    const [puttyKnifeSelected, setActivePuttyKnifeSelected] = useState<boolean>(false);
    const [powerSelected, setPowerSelected] = useState<boolean>(false);
    const [finishSelected, setFinishSelected] = useState<boolean>(false);

    const [activeMaterial, setActiveMaterial] = useState<string>();
    const [activeThickness, setActiveThickness] = useState<string>();
    const [activeSize, setActiveSize] = useState<string>();
    const [activeGreenConcrete, setActiveGreenConcrete] = useState<string>();
    const [activeEdgingNeeded, setActiveEdgingNeeded] = useState<string>();
    const [activePuttyKnife, setActivePuttyKnife] = useState<string>();
    const [activePower, setActivePower] = useState<string>();
    const [activeFinish, setActiveFinish] = useState<string>();

    const [openedMenu, setOpenedMenu] = useState<number>(-1);

    const thicknessRemovedConditional = ['1/32"', '1/16"', '1/8"', '1/4"', '+1/4""'];



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

        setActiveMaterial(res)
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

        setActiveSize(res)
    }
        
    const setGreenConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.setGreenConcrete(true);
        else props.layerObject.setGreenConcrete(false);

        setActiveGreenConcrete(res)
    }
            
    const setEdger = (res: string) => {
        if(res == 'Yes') props.layerObject.setEdger(true);
        else props.layerObject.setEdger(false);

        setActiveEdgingNeeded(res)
    }
                
    const setPowerType = (res: string) => {

        const power =  res.toLowerCase();

        props.layerObject.setPowerType(power);

        setActivePower(res);

        if(power == 'electric residential' || power == 'electric commercial' || power == 'electric industrial')
            props.setElectricValue(res);
    }
                
    const setFinishType = (res: string) => {
        const finish =  res.toLowerCase();

        props.layerObject.setFinishedSurface(finish);

        setActiveFinish(res);
    }

    const setPuttyKnife = (res: string) => {
        if(res == 'Yes')
            props.layerObject.setPuttyKnifeCuts(true);
        else
            props.layerObject.setPuttyKnifeCuts(false);

        setActivePuttyKnife(res);
    }

    const isThicknessRelevant = () => {
        if(props.layerObject){
            return  props.layerObject.materialRemoved == 'concrete' ||
                    props.layerObject.materialRemoved == 'trip hazard' ||
                    props.layerObject.materialRemoved == 'high spots' ||
                    props.layerObject.materialRemoved == 'epoxy coating' //||
                    //props.layerObject.materialRemoved == 'paint'
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

    useEffect(() => {
        if(props.layerObject){
            setMatSelected(props?.layerObject?.materialRemoved !== '');
            setSizeSelected(props?.layerObject?.jobSize !== null);
            setGreenSelected(props?.layerObject?.greenConcrete !== null);
            setEdgeSelected(props?.layerObject?.edger !== null);
            setPowerSelected(props?.layerObject?.powerType !== '');
            setFinishSelected(props?.layerObject?.finishedSurface !== '');
            setActivePuttyKnifeSelected(props?.layerObject?.puttyKnifeCuts !== null);
        }

    })

    useEffect(() =>{
        if(props.layerObject){
            if( matSelected == true &&
                sizeSelected == true &&
                greenSelected == true &&
                edgeSelected == true &&
                powerSelected == true &&
                finishSelected == true &&
                ((isPuttyKnifeRelevant() == true && puttyKnifeSelected == true) || isPuttyKnifeRelevant() == false) &&
                ((isThicknessRelevant() == true && thickSelected == true) || isThicknessRelevant() == false) && props.allowProgress == 0){
                    props.setAllowProgress(1)
            } else if(  props.layerObject.materialRemoved == 'trip hazard' && matSelected == true && powerSelected == true){
                props.setAllowProgress(1)
            }
            
        }
    }, [matSelected, sizeSelected, greenSelected, edgeSelected, powerSelected, finishSelected, thickSelected, puttyKnifeSelected])

    useEffect(() => {
        if(props.allowProgress == 0){
            setMatSelected(false);
            setSizeSelected(false);
            setGreenSelected(false);
            setEdgeSelected(false);
            setPowerSelected(false);
            setFinishSelected(false);
            setActivePuttyKnifeSelected(false);
        }
    }, [props.allowProgress])
    
    useEffect(() => {
        setmaterialRemovedAnswers(populateMaterialRemovedAnswers());
    }, [])

  return (
    <div className='col edit-menu'>
        {/* what application are you trying to solve? */}
        <ListButton lable={'What is the material being removed?'} onClick={() => handleMenuState(1)} selected={matSelected} />
        {openedMenu == 1 &&
            <div className='cluster-btn-container'>
                {materialRemovedAnswers.map((layer:any, i) => 
                    <ClusterButton key={i} active={activeMaterial == layer?.name}
                        lable={layer.name} layerObject={props.layerObject} onClick={() => setMaterialRemoved(layer.name, layer.layers, layer.sublayers)} />
                )}
            </div>
        }

        {/* How thick is the material? (only for concrete, highspots, epoxy coating, and paint). */}
        {isThicknessRelevant() &&
            <>
                <ListButton lable={'What is the thickness of the material?'} onClick={() => handleMenuState(2)} selected={thickSelected} />
                {openedMenu == 2 &&
                    <div className='cluster-btn-container'>
                        {thicknessRemovedConditional.map((layer:any, i) => 
                            <ClusterButton key={i} active={activeThickness == thicknessRemovedConditional[i]}
                                lable={thicknessRemovedConditional[i]} layerObject={props.layerObject} onClick={() => setThicknessHandler(thicknessRemovedConditional[i])} />
                        )}
                    </div>
                }
            </>
        }

        {/* how big is the site? */} 
        {isSqftRelevant() &&
            <>        
                <ListButton lable={'What is the square footage of your job?'} onClick={() => handleMenuState(4)} selected={sizeSelected} />
                {openedMenu == 4 &&
                    <div className="cluster-btn-container">
                    {jobSizeAnswers.map((layer, i) => 
                            <ClusterButton key={i} active={activeSize == layer}
                                lable={layer} layerObject={props.layerObject} onClick={() => setJobSize(layer)} />
                        )}
                    </div>
                }
            </>
        }


        {/* is your concrete new? */}
        {isSqftRelevant() &&
            <>        
                <ListButton lable={'Is your concrete older than 28 days?'} onClick={() => handleMenuState(5)} selected={greenSelected} />
                {openedMenu == 5 &&
                    <div className="cluster-btn-container">
                        {greenConcreteAnswers.map((layer, i) => 
                            <ClusterButton key={i} active={activeGreenConcrete == layer}
                            lable={layer} layerObject={props.layerObject} onClick={() => setGreenConcrete(layer)} />
                        )}
                    </div>
                }
            </>
        }


        {/* are you going to need an edger? */}
        {isSqftRelevant() &&
            <>        
                <ListButton lable={'Do you need to grind or clean along a vertical a wall?'} onClick={() => handleMenuState(7)} selected={edgeSelected} />
                {openedMenu == 7 &&
                    <div className="cluster-btn-container">
                        {edgeGrindingAnswers.map((layer, i) => 
                            <ClusterButton key={i} active={activeEdgingNeeded == layer}
                            lable={layer} layerObject={props.layerObject} onClick={() => setEdger(layer)} />
                        )}
                    </div>
                }
            </>
        }

        {/* will you need to test your material with a putty knife? */}
        {isPuttyKnifeRelevant() &&
            <>        
                <ListButton lable={'Can you cut the adhesive with a utility knife?'} onClick={() => handleMenuState(10)} selected={puttyKnifeSelected} />
                {openedMenu == 10 &&
                    <div className="cluster-btn-container">
                        {puttyKnifeAnswers.map((layer, i) => 
                            <ClusterButton key={i} active={activePuttyKnife == layer}
                            lable={layer} layerObject={props.layerObject} onClick={() => setPuttyKnife(layer)} />
                        )}
                    </div>
                }
            </>
        }


        {/* what power option is desired? */}
        <ListButton lable={'What type of machine power is desired?'} onClick={() => handleMenuState(8)} selected={powerSelected} />
        {openedMenu == 8 &&
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
            </div>
        }

        {/* what power option is desired? */}
        <ListButton lable={'What type of surface texture is desired?'} onClick={() => handleMenuState(9)} selected={finishSelected} />
        {openedMenu == 9 &&
            <div className="cluster-btn-container">
                {finishOptionAnswers.map((layer, i) => 
                    <ClusterButton key={i} active={activeFinish == layer}
                    lable={layer} layerObject={props.layerObject} onClick={() => setFinishType(layer)} />
                )}
            </div>
        }

        {props.allowProgress == 1 &&
            <NextButton lable={'Next: Machines'} onClick={() => props.nextFunction()} />
        }
    </div>
  )
}
