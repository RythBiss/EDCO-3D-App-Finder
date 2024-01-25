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
    const qFourAnswers = ['Vinyl', 'Linoleum', 'Ceramic', 'Carpet', 'Rubber', 'Paint', 'None'];
    const qFiveAnswers = ['< 250', '< 500', '< 750', '< 1000', '> 1000'];
    const qSixAnswers = ['Yes', 'No'];
    const qSevenAnswers = ['Yes', 'No'];
    const qEightAnswers = ['Yes', 'No'];
    const qNineAnswers = ['Gas', 'Electric', 'Propane', 'Air'];


    const [openedMenu, setOpenedMenu] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState('');


    const handleMenuState = (newState: number) => {
        if(newState == openedMenu){
            setOpenedMenu(-1)
        }else{
            setOpenedMenu(newState)
        }
    }

    const setOnConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.onConcrete = true;
        else props.layerObject.onConcrete = false;
    }

    const setMaterialRemoved = (res: string) => {
        const material =  res.toLowerCase();

        props.layerObject.setMaterialRemoved(material);
    }

    const setMaterialThickness = (res: string) => {
        
        switch(res){
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
        }
    }

    const setFinishedSurface = (res: string) => {

        const finish =  res.toLowerCase();

        props.layerObject.setFinishedSurface(finish);
    }
    
    const setJobSize = (res: string) => {

        switch(res){
            case '< 250':
                props.layerObject.setJobSize(0);
                break;
            case '< 500':
                props.layerObject.setJobSize(1);
                break;
            case '< 750':
                props.layerObject.setJobSize(2);
                break;
            case '< 1000':
                props.layerObject.setJobSize(3);
                break;
            case '> 1000':
                props.layerObject.setJobSize(4);
                break;
        }
    }
        
    const setGreenConcrete = (res: string) => {
        if(res == 'Yes') props.layerObject.setGreenConcrete(true);
        else props.layerObject.setGreenConcrete(false);
    }
        
    const setDustControl = (res: string) => {
        if(res == 'Yes') props.layerObject.setDustControl(true);
        else props.layerObject.setDustControl(false);
    }
            
    const setEdger = (res: string) => {
        if(res == 'Yes') props.layerObject.setEdger(true);
        else props.layerObject.setEdger(false);
    }
                
    const setPowerType = (res: string) => {
        const power =  res.toLowerCase();

        props.layerObject.setPowerType(power);
    }
  return (
    <div className='col edit-menu'>
        <ListButton lable={'Are you on concrete?'} onClick={() => handleMenuState(0)} />
        {openedMenu == 0 && qOneAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setOnConcrete(layer)} />
        )}
        <ListButton lable={'What is the material being removed?'} onClick={() => handleMenuState(1)} />
        {openedMenu == 1 && qTwoAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setMaterialRemoved(layer)} />
        )}
        <ListButton lable={'How thick is the material?'} onClick={() => handleMenuState(2)} />
        {openedMenu == 2 && qThreeAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setMaterialThickness(layer)} />
        )}
        <ListButton lable={'What is the desired finished surface?'} onClick={() => handleMenuState(3)} />
        {openedMenu == 3 && qFourAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setFinishedSurface(layer)} />
        )}
        <ListButton lable={'What is the square footage of the site?'} onClick={() => handleMenuState(4)} />
        {openedMenu == 4 && qFiveAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setJobSize(layer)} />
        )}
        <ListButton lable={'Is your concrete more than 28 days old?'} onClick={() => handleMenuState(5)} />
        {openedMenu == 5 && qSixAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setGreenConcrete(layer)} />
        )}
        <ListButton lable={'Do you already have dust control in the form  of an EDCO vac or water?'} onClick={() => handleMenuState(6)} />
        {openedMenu == 6 && qSevenAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setDustControl(layer)} />
        )}
        <ListButton lable={'Do you need to grind or clean against a wall?'} onClick={() => handleMenuState(7)} />
        {openedMenu == 7 && qEightAnswers.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedQuestion == layer ? true : false} onClick={() => setEdger(layer)} />
        )}
        <ListButton lable={'What machine power is desired?'} onClick={() => handleMenuState(8)} />
        {openedMenu == 8 && qNineAnswers.map((layer, i) => 
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
