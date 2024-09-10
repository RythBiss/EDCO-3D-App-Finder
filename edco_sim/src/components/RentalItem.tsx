import { useEffect, useState } from 'react'
import DropDown from './DropDown';
import { motion } from "framer-motion"

export default function RentalItem(props:any) {
    const [thick, setThick] = useState<string>('1/32');
    const [value, setValue] = useState<number>(0);
    const [allowThick, setAllowThick] = useState<boolean>(false);
    const [optionList, setOptionList] = useState(['']);
    const [machine, setMachine] = useState<string>('');
    const [tool, setTool] = useState<string>('');

    //assigns layer thickness, takes slider event result.
    const handleSetThick = (value: string) => {

        props.layerObject.setMaterialThickness(value)
        
        switch(value){
            case '0':
                setThick('1/32')
                setValue(0)
                break;
            case '1':
                setThick('1/16')
                setValue(1)
                break;
            case '2':
                setThick('1/8')
                setValue(2)
                break;
            case '3':
                setThick('1/4')
                setValue(3)
                break;
            default:
                setThick('1/32')
                setValue(0)
        }
    }

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

    //get changes made (type of layer, example: vinyl to linoleum) from dropdown component and update.
    const handleChange = (change: string) => {
        const result = props.getAltLayers(change);

        setOptionList(result);

        if(change !== props.layerObject.materialRemoved){
            props.layerObject.modMaterialRemoved(change)
        }
    }

    //enables the thickness slider only for concrete layers.
    useEffect(() => {
        if( props.layerObject.materialRemoved == 'concrete' ||
            props.layerObject.materialRemoved == 'trip hazard' ||
            props.layerObject.materialRemoved == 'high spots'
        ){
            setAllowThick(true);
        }else{
            setAllowThick(false);
        }

        handleChange(props.layerObject.materialRemoved)
        setMachine(props.layerObject.machine)
        setTool(props.layerObject.tooling)
    })

  return (
    <div className='row bottom-gap' onClick={handleOnClick}>
        <div className='col-12 tab-bar'>
            <div className={`list-btn w-100 container  ${props.active == true && 'btn-active'}`}>
                <div className='row justify-content-around align-items-top'>
                    <div className='col'>
                        <ul className='list-btn-bullets'>
                            <motion.li
                                initial={{ backgroundColor: '#ffffffCC' }}
                                animate={{ backgroundColor: '#ffffff00' }}
                                transition={{
                                    type: "linear",
                                    duration: 1.25
                                }}
                            >MATERIAL:  
                                {props.active ?
                                    <>
                                        <DropDown
                                            optionsStringArray={optionList}
                                            onChange={handleChange}
                                            currentValue={props?.layerObject?.materialRemoved}
                                            />
                                    </>
                                    : 
                                    <>
                                        {` ${props?.layerObject?.materialRemoved}`}
                                    </>
                                }

                            </motion.li>
                            <motion.li
                                  key={machine + props.layerIndex} // makes sure this key is unique, otherwise the other rental items would have the same "machine" key.
                                  initial={{ backgroundColor: '#ffffffCC' }}
                                  animate={{ backgroundColor: '#ffffff00' }}
                                  transition={{
                                    type: "linear",
                                    duration: 1.25
                                  }}

                            >MACHINE: {props?.layerObject?.machine}</motion.li>
                            <motion.li
                                key={tool} //this one did not have the same problem as machine.
                                initial={{ backgroundColor: '#ffffffCC' }}
                                animate={{ backgroundColor: '#ffffff00' }}
                                transition={{
                                    type: "linear",
                                    duration: 1.25
                                }}
                            >TOOLING: {props?.layerObject?.tooling}</motion.li>

                            {allowThick == true &&
                                <motion.li
                                key={thick} //this one did not have the same problem as machine.
                                initial={{ backgroundColor: '#ffffffCC' }}
                                animate={{ backgroundColor: '#ffffff00' }}
                                transition={{
                                    type: "linear",
                                    duration: 1.25
                                }}
                                >THICKNESS: {thick}</motion.li>
                            }

                        </ul>
                    </div>
                    <div className='col-1 history-item-num'>

                        {props.layerIndex > 0 && props.layerIndex + 1}

                        {props.layerIndex == 0 && 1}

                        {props.layerIndex == 'Active' && 'Active Layer'}

                    </div>
                    {(props.active && allowThick == true) &&
                        <>
                            <label htmlFor="customRange1" className="form-label list-btn-title" style={{marginBottom: '0', marginTop: '0.5rem'}}>LAYER THICKNESS</label>
                            <input id="slider" className='thick-slider' type="range" min="0" max="3" step='1' value={value} onChange={(e) => {handleSetThick(e.target.value)}} />
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
