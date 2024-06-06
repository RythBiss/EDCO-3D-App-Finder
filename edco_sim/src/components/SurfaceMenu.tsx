import { useState, useEffect } from 'react'
import ListButton from './ListButton';
import ClusterButton from './ClusterButton';
//import LayerHistory from './LayerHistory';

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
        // thinmil: {
        //     name: 'Thin Mil Coatings',
        //     layers: 2,
        //     sublayers: ['thin mil coatings', 'concrete']
        // },
    }

    //const qOneAnswers = ['Yes', 'No'];
    const [qTwoAnswers, setqTwoAnswers] = useState<string[]>([]);
    //const qThreeAnswers = ['1/32"', '1/16"', '1/8"', '1/4"'];
    //const qFourAnswers = ['Vinyl', 'Linoleum', 'Ceramic', 'Carpet', 'Rubber', 'Paint', 'None'];
    const qFiveAnswers = ['1,000+', '2,000+', '5,000+'];
    const qSixAnswers = ['Yes', 'No'];
    //const qSevenAnswers = ['Yes', 'No'];
    const qEightAnswers = ['Yes', 'No'];
    const qNineAnswers = ['Gas', 'Electric', 'Propane', 'Air'];

    const [matSelected, setMatSelected] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<boolean>(false);
    const [greenSelected, setGreenSelected] = useState<boolean>(false);
    const [edgeSelected, setEdgeSelected] = useState<boolean>(false);
    const [powerSelected, setPowerSelected] = useState<boolean>(false);


    const [openedMenu, setOpenedMenu] = useState(-1);
    //const [selectedQuestion, setSelectedQuestion] = useState('');

    const populateqTwoAnswers = () => {
        let arr: string[] = []

        Object.keys(applicationDataObjects).map((key) =>{
            arr.push(applicationDataObjects[key])
        })

        setqTwoAnswers(arr);
    }

    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(-1)
        }else{
            setOpenedMenu(newState)
        }
    }

    // const setOnConcrete = (res: string) => {
    //     if(res == 'Yes') props.layerObject.onConcrete = true;
    //     else props.layerObject.onConcrete = false;
    // }

    const setMaterialRemoved = (res: string, layer: number, sublayers: string[]) => {
        const material =  res.toLowerCase();

        props.layerObject.setMaterialRemoved(material, layer, sublayers);
    }

    // const setMaterialThickness = (res: string) => {
        
    //     switch(res){
    //         case '1/32"':
    //             props.layerObject.setMaterialThickness(0);
    //             break;
    //         case '1/16"':
    //             props.layerObject.setMaterialThickness(1);
    //             break;
    //         case '1/8"':
    //             props.layerObject.setMaterialThickness(2);
    //             break;
    //         case '1/4"':
    //             props.layerObject.setMaterialThickness(3);
    //             break;
    //     }
    // }

    // const setFinishedSurface = (res: string) => {

    //     const finish =  res.toLowerCase();

    //     props.layerObject.setFinishedSurface(finish);
    // }
    
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
    }
        
    const setGreenConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.setGreenConcrete(true);
        else props.layerObject.setGreenConcrete(false);
    }
        
    // const setDustControl = (res: string) => {
    //     if(res == 'Yes') props.layerObject.setDustControl(true);
    //     else props.layerObject.setDustControl(false);
    // }
            
    const setEdger = (res: string) => {
        if(res == 'Yes') props.layerObject.setEdger(true);
        else props.layerObject.setEdger(false);
    }
                
    const setPowerType = (res: string) => {
        const power =  res.toLowerCase();

        props.layerObject.setPowerType(power);
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
        if(matSelected == true && sizeSelected == true && greenSelected == true && edgeSelected == true && powerSelected == true){
            props.setAllowProgress(1)
        }
    }, [matSelected, sizeSelected, greenSelected, edgeSelected, powerSelected])
    
    useEffect(() => {
        populateqTwoAnswers()
    }, [])

  return (
    <div className='col edit-menu'>
        {/* <ListButton lable={'Are you on concrete?'} onClick={() => handleMenuState(0)} />
        {openedMenu == 0 && qOneAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setOnConcrete(layer)} />
        )} */}

        {/* what application are you trying to solve? */}
        <ListButton lable={'What is the material being removed?'} onClick={() => handleMenuState(1)} selected={matSelected} />
        {openedMenu == 1 &&
            <div className='cluster-btn-container'>
                {qTwoAnswers.map((layer:any, i) => 
                    <ClusterButton key={i} lable={layer.name} layerObject={props.layerObject} onClick={() => setMaterialRemoved(layer.name, layer.layers, layer.sublayers)} />
                )}
            </div>
        }
        {/* <ListButton lable={'How thick is the material?'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && qThreeAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setMaterialThickness(layer)} />
        )} */}
        {/* <ListButton lable={'What is the desired finished surface?'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && qFourAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setFinishedSurface(layer)} />
        )} */}

        {/* how big is the site? */}
        <ListButton lable={'What is the square footage of the site?'} onClick={() => handleMenuState(4)} selected={sizeSelected} />
        {openedMenu == 4 &&
            <div className="cluster-btn-container">
            {qFiveAnswers.map((layer, i) => 
                    <ClusterButton key={i} lable={layer} layerObject={props.layerObject} onClick={() => setJobSize(layer)} />
                )}
            </div>
        }

        {/* is your concrete new? */}
        <ListButton lable={'Is your concrete more than 28 days old?'} onClick={() => handleMenuState(5)} selected={greenSelected} />
        {openedMenu == 5 &&
            <div className="cluster-btn-container">
                {qSixAnswers.map((layer, i) => 
                    <ClusterButton key={i} lable={layer} layerObject={props.layerObject} onClick={() => setGreenConcrete(layer)} />
                )}
            </div>
        }
        {/* <ListButton lable={'Do you already have dust control in the form  of an EDCO vac or water?'} onClick={() => handleMenuState(6)} />
        {openedMenu == 6 && qSevenAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setDustControl(layer)} />
        )} */}

        {/* are you going to need an edger? */}
        <ListButton lable={'Do you need to grind or clean against a wall?'} onClick={() => handleMenuState(7)} selected={edgeSelected} />
        {openedMenu == 7 &&
            <div className="cluster-btn-container">
                {qEightAnswers.map((layer, i) => 
                    <ClusterButton key={i} lable={layer} layerObject={props.layerObject} onClick={() => setEdger(layer)} />
                )}
            </div>
        }

        {/* what power option is desired? */}
        <ListButton lable={'What machine power is desired?'} onClick={() => handleMenuState(8)} selected={powerSelected} />
        {openedMenu == 8 &&
            <div className="cluster-btn-container">
                {qNineAnswers.map((layer, i) => 
                    <ClusterButton key={i} lable={layer} layerObject={props.layerObject} onClick={() => setPowerType(layer)} />
                )}
            </div>
        }
    </div>
  )
}
