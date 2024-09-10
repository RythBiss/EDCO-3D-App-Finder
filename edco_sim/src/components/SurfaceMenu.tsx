import { useState, useEffect } from 'react'
import ListButton from './ListButton';
import ClusterButton from './ClusterButton';
//import RentalOrder from './RentalOrder';

export default function SurfaceMenu(props:any) {
    //temporary application data table until backend is developed.
    const applicationDataObjects: any = {
        concrete: {
            name: 'Concrete',
            layers: 1,
            sublayers: ['concrete']
        },
        triphazard: {
            name: 'Trip Hazard',
            layers: 2,
            sublayers: ['trip hazard', 'concrete']
        },
        highspots: {
            name: 'High Spots',
            layers: 2,
            sublayers: ['high spots', 'concrete']
        },
        vinyl: {
            name: 'Vinyl',
            layers: 4,
            sublayers: ['vinyl', 'glue', 'residual', 'concrete']
        },
        linoleum: {
            name: 'Linoleum',
            layers: 4,
            sublayers: ['linoleum', 'glue', 'residual', 'concrete']
        },
        ceramic: {
            name: 'Ceramic',
            layers: 4,
            sublayers: ['ceramic', 'glue', 'residual', 'concrete']
        },
        carpet: {
            name: 'Carpet',
            layers: 4,
            sublayers: ['carpet', 'glue', 'residual', 'concrete']
        },
        mastic: {
            name: 'Mastic',
            layers: 3,
            sublayers: ['mastic', 'residual', 'concrete']
        },
        paint: {
            name: 'Paint',
            layers: 2,
            sublayers: ['paint', 'concrete']
        },
        glue: {
            name: 'Glue',
            layers: 3,
            sublayers: ['glue', 'residual', 'concrete']
        },
        residual: {
            name: 'Residual Glue',
            layers: 2,
            sublayers: ['residual', 'concrete']
        },
        sealer: {
            name: 'Sealer',
            layers: 2,
            sublayers: ['sealer', 'concrete']
        },
    }

    const [materialRemovedAnswers, setmaterialRemovedAnswers] = useState<string[]>([]);
    const jobSizeAnswers = ['1,000+', '2,000+', '5,000+'];
    const greenConcreteAnswers = ['No', 'Yes'];
    const edgeGrindingAnswers = ['No', 'Yes'];
    const powerOptionAnswers = ['Gas', 'Electric', 'Electric 3 Phase', 'Propane', 'Air'];

    const [matSelected, setMatSelected] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<boolean>(false);
    const [greenSelected, setGreenSelected] = useState<boolean>(false);
    const [edgeSelected, setEdgeSelected] = useState<boolean>(false);
    const [powerSelected, setPowerSelected] = useState<boolean>(false);

    const [activeMaterial, setActiveMaterial] = useState<string>();
    const [activeSize, setActiveSize] = useState<string>();
    const [activeGreenConcrete, setActiveGreenConcrete] = useState<string>();
    const [activeEdgingNeeded, setActiveEdgingNeeded] = useState<string>();
    const [activePower, setActivePower] = useState<string>();


    const [openedMenu, setOpenedMenu] = useState(-1);

    const populateMaterialRemovedAnswers = () => {
        let arr: string[] = []

        Object.keys(applicationDataObjects).map((key) =>{
            arr.push(applicationDataObjects[key])
        })

        setmaterialRemovedAnswers(arr);
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

        setActiveMaterial(res)
    }
    
    const setJobSize = (res: string) => {

        switch(res){
            case '1,000+':
                props.layerObject.setJobSize(0);
                break;
            case '2,000+':
                props.layerObject.setJobSize(1);
                break;
            case '5,000+':
                props.layerObject.setJobSize(2);
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
            props.allowProgress == 0){
                props.setAllowProgress(1)
        }
    }, [matSelected, sizeSelected, greenSelected, edgeSelected, powerSelected])

    useEffect(() => {
        console.log('progress reading from surfaces')
        if(props.allowProgress == 0){
            setMatSelected(false)
            setSizeSelected(false)
            setGreenSelected(false)
            setEdgeSelected(false)
            setPowerSelected(false)
        }
    }, [props.allowProgress])
    
    useEffect(() => {
        populateMaterialRemovedAnswers()
        console.log('loading surfaces menu')
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
    </div>
  )
}
