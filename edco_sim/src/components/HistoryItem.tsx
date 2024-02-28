import React, { useEffect, useState } from 'react'

export default function HistoryItem(props:any) {
    const [thick, setThick] = useState<string>('1/4');

    const handleSetThick = (value: string) => {

        props.layerObject.setMaterialThickness(value)
        
        switch(value){
            case '0':
                setThick('1/32')
                break;
            case '1':
                setThick('1/16')
                break;
            case '2':
                setThick('1/8')
                break;
            case '3':
                setThick('1/4')
                break;
            default:
                setThick('1/32')
        }
    }

    const handleOnClick = () => {
        props.onClick();
    }

  return (
    <div className='row bottom-gap' style={{position: 'relative'}} onClick={handleOnClick}>
        {/* {props.active &&
            <div className='active-layer-tab'/>
        } */}
        <div className='col-12 tab-bar'>
            <div className={`list-btn w-100 container  ${props.active == true && 'btn-active btn-active-shift-left'}`}>
                <div className='row justify-content-around align-items-center'>
                    <div className='col'>
                        <ul className='list-btn-bullets'>
                            <li>MATERIAL: {props?.layerObject?.materialRemoved}</li>
                            <li>MACHINE: {props?.layerObject?.machine}</li>
                            <li>TOOLING: {props?.layerObject?.tooling}</li>
                            <li>THICKNESS: {thick}</li>
                        </ul>
                    </div>
                    <div className='col-1 history-item-num'>
                        {props.layerIndex > 0 && props.layerIndex + 1}
                        {props.layerIndex == 0 && 1}
                        {props.layerIndex == 'Active' && 'Active Layer'}
                    </div>
                    {props.active &&
                        <>
                            <label htmlFor="customRange1" className="form-label list-btn-title" style={{marginBottom: '0', marginTop: '0.5rem'}}>LAYER THICKNESS</label>
                            <input id="slider" className='thick-slider' type="range" min="0" max="3" step='1' onChange={(e) => {handleSetThick(e.target.value)}} ></input>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
