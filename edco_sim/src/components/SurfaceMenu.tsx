import { useState, useEffect } from 'react'
import ListButton from './ListButton';
import NextButton from './NextButton';
import ClusterButton from './ClusterButton';
import { populateMaterialRemovedAnswers } from '../functions';


export default function SurfaceMenu(props:any) {

    const [materialRemovedAnswers, setmaterialRemovedAnswers] = useState<string[]>([]);
    const jobSizeAnswers = ['500-', '500+', '1,000+', '2,000+', '5,000+'];
    const greenConcreteAnswers = ['No', 'Yes'];
    const edgeGrindingAnswers = ['No', 'Yes'];
    const powerOptionAnswers = ['Gas', 'Electric', 'Electric 3 Phase', 'Propane', 'pneumatic'];

    const [matSelected, setMatSelected] = useState<boolean>(false);
    const [thickSelected, setThickSelected] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<boolean>(false);
    const [greenSelected, setGreenSelected] = useState<boolean>(false);
    const [edgeSelected, setEdgeSelected] = useState<boolean>(false);
    const [powerSelected, setPowerSelected] = useState<boolean>(false);

    const [activeMaterial, setActiveMaterial] = useState<string>();
    const [activeThickness, setActiveThickness] = useState<string>();
    const [activeSize, setActiveSize] = useState<string>();
    const [activeGreenConcrete, setActiveGreenConcrete] = useState<string>();
    const [activeEdgingNeeded, setActiveEdgingNeeded] = useState<string>();
    const [activePower, setActivePower] = useState<string>();

    const [openedMenu, setOpenedMenu] = useState<number>(-1);

    const thicknessRemovedConditional = ['1/32', '1/16', '1/8', '1/4', '+1/4'];



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
            case '1/32':
                props.layerObject.setMaterialThickness(0);
                break;
            case '1/16':
                props.layerObject.setMaterialThickness(1);
                break;
            case '1/8':
                props.layerObject.setMaterialThickness(2);
                break;
            case '1/4':
                props.layerObject.setMaterialThickness(3);
                break;
            case '+1/4':
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

        setActivePower(res)
    }

    const isThicknessRelevant = () => {
        if(props.layerObject){
            return  props.layerObject.materialRemoved == 'concrete' ||
                    props.layerObject.materialRemoved == 'trip hazard' ||
                    props.layerObject.materialRemoved == 'high spots' ||
                    props.layerObject.materialRemoved == 'epoxy coating' ||
                    props.layerObject.materialRemoved == 'paint'
        }

        return false;
    }

    useEffect(() => {
        if(props.layerObject){
            setMatSelected(props?.layerObject?.materialRemoved !== '');
            setSizeSelected(props?.layerObject?.jobSize !== null);
            setGreenSelected(props?.layerObject?.greenConcrete !== null);
            setEdgeSelected(props?.layerObject?.edger !== null);
            setPowerSelected(props?.layerObject?.powerType !== '');
        }
    })

    useEffect(() =>{
        if(matSelected == true &&
            sizeSelected == true &&
            greenSelected == true &&
            edgeSelected == true &&
            powerSelected == true &&
            ((isThicknessRelevant() == true && thickSelected == true) || isThicknessRelevant() == false) &&
            props.allowProgress == 0){
                props.setAllowProgress(1)
        }
    }, [matSelected, sizeSelected, greenSelected, edgeSelected, powerSelected, thickSelected])

    useEffect(() => {
        if(props.allowProgress == 0){
            setMatSelected(false)
            setSizeSelected(false)
            setGreenSelected(false)
            setEdgeSelected(false)
            setPowerSelected(false)
        }
    }, [props.allowProgress])
    
    useEffect(() => {
        setmaterialRemovedAnswers(populateMaterialRemovedAnswers()
    );
    }, [])

  return (
    <div className='col edit-menu'>
        {/* what application are you trying to solve? */}
        <ListButton lable={'Choose an application'} onClick={() => handleMenuState(1)} selected={matSelected} />
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
                <ListButton lable={'How thick is the material?'} onClick={() => handleMenuState(2)} selected={thickSelected} />
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
        <ListButton lable={'What is the square footage of the site?'} onClick={() => handleMenuState(4)} selected={sizeSelected} />
        {openedMenu == 4 &&
            <div className="cluster-btn-container">
            {jobSizeAnswers.map((layer, i) => 
                    <ClusterButton key={i} active={activeSize == layer}
                        lable={layer} layerObject={props.layerObject} onClick={() => setJobSize(layer)} />
                )}
            </div>
        }

        {/* is your concrete new? */}
        <ListButton lable={'Is your concrete more than 28 days old?'} onClick={() => handleMenuState(5)} selected={greenSelected} />
        {openedMenu == 5 &&
            <div className="cluster-btn-container">
                {greenConcreteAnswers.map((layer, i) => 
                    <ClusterButton key={i} active={activeGreenConcrete == layer}
                    lable={layer} layerObject={props.layerObject} onClick={() => setGreenConcrete(layer)} />
                )}
            </div>
        }

        {/* are you going to need an edger? */}
        <ListButton lable={'Do you need to grind or clean against a wall?'} onClick={() => handleMenuState(7)} selected={edgeSelected} />
        {openedMenu == 7 &&
            <div className="cluster-btn-container">
                {edgeGrindingAnswers.map((layer, i) => 
                    <ClusterButton key={i} active={activeEdgingNeeded == layer}
                    lable={layer} layerObject={props.layerObject} onClick={() => setEdger(layer)} />
                )}
            </div>
        }

        {/* what power option is desired? */}
        <ListButton lable={'What machine power is desired?'} onClick={() => handleMenuState(8)} selected={powerSelected} />
        {openedMenu == 8 &&
            <div className="cluster-btn-container">
                {powerOptionAnswers.map((layer, i) => 
                    <ClusterButton key={i} active={activePower == layer}
                    lable={layer} layerObject={props.layerObject} onClick={() => setPowerType(layer)} />
                )}
            </div>
        }

        {props.allowProgress == 1 &&
            <NextButton lable={'Next: Machines'} onClick={() => props.nextFunction()} />
        }
    </div>
  )
}
