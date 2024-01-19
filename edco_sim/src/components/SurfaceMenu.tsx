import { useState, useEffect } from 'react'
import ListButton from './ListButton';

export default function SurfaceMenu(props:any) {

    // const surfacesFirstLayer = ['vinyl', 'linoleum', 'ceramic', 'carpet'];
    // const surfacesSecondLayer = ['adhesives', 'glues', 'thinsets', 'industrial buildup'];
    // const surfacesThirdLayer = ['residual adhesive', 'sealers', 'thin mil coatings', 'paint'];
    // const surfacesFourthLayer = ['leveling', 'Soft Concrete', 'Medium Concrete', 'Hard Concrete'];

    const qOneAnswers = ['Yes', 'No'];
    const qTwoAnswers = ['Concrete', 'Trip Hazard', 'High Spots', 'Vinyl', 'Linoleum', 'Ceramic', 'Carpet', 'Rubber', 'Mastic', 'Paint', 'Glue'];
    const qThreeAnswers = ['1/32"', '1/16"', '1/8"', '1/4"'];
    const qFourAnswers = ['Vinyl', 'Linoleum', 'Ceramic', 'Carpet', 'Rubber', 'Paint'];
    const qFiveAnswers = ['< 250', '< 500', '< 750', '< 1000', '> 1000'];
    const qSixAnswers = ['Yes', 'No'];
    const qSevenAnswers = ['Yes', 'No'];
    const qEightAnswers = ['Yes', 'No'];
    const qNineAnswers = ['Gas', 'Electric', 'Propane', 'Air'];


    const [openedMenu, setOpenedMenu] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState('');


    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(0)
        }else{
            setOpenedMenu(newState)
        }
    }

    const setSurface = (newLayer: string, ) => {
        props.layerObject.setSurface(newLayer);
        //setSelectedQuestion(newLayer);
    }



    const setOnConcrete = (res: string) => {
        console.log(res);

        if(res == 'Yes') props.layerObject.onConcrete = true;
        else props.layerObject.onConcrete = false;

        console.log(props.layerObject.onConcrete)
    }

    const setMaterialRemoved = (res: string) => {
        const material =  res.toLowerCase();

        props.layerObject.setMaterialRemoved(material);

        //console.log(props.layerObject.materialRemoved)
    }

    const setMaterialThickness = (res: string) => {
        
        switch(res){
            case '1/32"':
                props.layerObject.materialThickness = 0;
                break;
            case '1/16"':
                props.layerObject.materialThickness = 1;
                break;
            case '1/8"':
                props.layerObject.materialThickness = 2;
                break;
            case '1/4"':
                props.layerObject.materialThickness = 3;
                break;
        }

        console.log(props.layerObject.materialThickness)
    }

    const setFinishedSurface = (res: string) => {

        const finish =  res.toLowerCase();

        props.layerObject.finishedSurface = finish;

        console.log(props.layerObject.finishedSurface)
    }
    
    const setJobSize = (res: string) => {

        switch(res){
            case '< 250':
                props.layerObject.jobSize = 0;
                break;
            case '< 500':
                props.layerObject.jobSize = 1;
                break;
            case '< 750':
                props.layerObject.jobSize = 2;
                break;
            case '< 1000':
                props.layerObject.jobSize = 3;
                break;
            case '> 1000':
                props.layerObject.jobSize = 4;
                break;
        }

        console.log(props.layerObject.jobSize);
    }
        
    const setGreenConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.greenConcrete = true;
        else props.layerObject.greenConcrete = false;

        console.log(props.layerObject.greenConcrete)
    }
        
    const setDustControl = (res: string) => {
        if(res == 'Yes') props.layerObject.dustControl = true;
        else props.layerObject.dustControl = false;

        console.log(props.layerObject.dustControl)
    }
            
    const setEdger = (res: string) => {
        if(res == 'Yes') props.layerObject.edger = true;
        else props.layerObject.edger = false;

        console.log(props.layerObject.edger)
    }
                
    const setPowerType = (res: string) => {
        const power =  res.toLowerCase();

        props.layerObject.powerType = power;

        console.log(props.layerObject.powerType)
        console.log(props.layerObject)
    }
  return (
    <div className='col edit-menu'>
        <ListButton lable={'Are you on concrete?'} onClick={() => handleMenuState(1)} />
        {openedMenu == 1 && qOneAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setOnConcrete(layer)} />
        )}
        <ListButton lable={'What is the material being removed?'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && qTwoAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setMaterialRemoved(layer)} />
        )}
        <ListButton lable={'How much material is being removed?'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && qThreeAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setMaterialThickness(layer)} />
        )}
        <ListButton lable={'What is the desired finished surface?'} onClick={() => handleMenuState(4)} />
        {openedMenu == 4 && qFourAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setFinishedSurface(layer)} />
        )}
        <ListButton lable={'What is the square footage of the site?'} onClick={() => handleMenuState(5)} />
        {openedMenu == 5 && qFiveAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setJobSize(layer)} />
        )}
        <ListButton lable={'Is your concrete more than 28 days old?'} onClick={() => handleMenuState(6)} />
        {openedMenu == 6 && qSixAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setGreenConcrete(layer)} />
        )}
        <ListButton lable={'Do you already have dust control in the form  of an EDCO vac or water?'} onClick={() => handleMenuState(7)} />
        {openedMenu == 7 && qSevenAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setDustControl(layer)} />
        )}
        <ListButton lable={'Do you need to grind or clean against a wall?'} onClick={() => handleMenuState(8)} />
        {openedMenu == 8 && qEightAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setEdger(layer)} />
        )}
        <ListButton lable={'What machine power is desired?'} onClick={() => handleMenuState(9)} />
        {openedMenu == 9 && qNineAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setPowerType(layer)} />
        )}

        {/************************************************************OLD*******************************************************************/}

        {/* <ListButton lable={'Second Layer Surfaces'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && surfacesSecondLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
        <ListButton lable={'Third Layer Surfaces'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && surfacesThirdLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setSurface(layer)} />
        )}
        <ListButton lable={'Fourth Layer Surfaces'} onClick={() => handleMenuState(4)} />
        {openedMenu == 4 && surfacesFourthLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setSurface(layer)} />
        )} */}
    </div>
  )
}
